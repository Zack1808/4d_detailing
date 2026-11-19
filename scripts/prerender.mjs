import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const server = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const {
  PAGE_META,
  SITE_URL,
  render,
  fetchPageData,
  loadMockData,
  generateBreadcrumbSchema,
} = server;

const DATA_TIMEOUT_MS = 20_000;

const loadData = async () => {
  if (process.env.PRERENDER_MOCK_DATA === "1") {
    console.log("prerender: using mock data (PRERENDER_MOCK_DATA=1)");
    return loadMockData();
  }

  try {
    const data = await Promise.race([
      fetchPageData(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timed out")), DATA_TIMEOUT_MS),
      ),
    ]);

    console.log(
      `prerender: loaded ${data.services.length} services, ${data.reviews.length} reviews from Firestore`,
    );
    return data;
  } catch (error) {
    console.warn(
      `prerender: could not load Firestore data (${error.message}); pages are written without it.`,
    );
    return null;
  }
};

const data = await loadData();

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

const jsonForScript = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const template = await readFile(path.join(dist, "index.html"), "utf8");

const baseTemplate = template
  .replace(/<title\b[\s\S]*?<\/title>\s*/i, "")
  .replace(/<meta\b[^>]*name="description"[^>]*>\s*/gi, "");

const HOISTED =
  /^(?:<title\b[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;

const splitHoisted = (html) => {
  const head = [];
  let rest = html;
  let match;

  while ((match = HOISTED.exec(rest))) {
    head.push(match[0]);
    rest = rest.slice(match[0].length);
  }

  return { head, body: rest };
};

const markPrerendered = (tag) =>
  tag.replace(/^<(title|meta|link)\b/, "<$1 data-prerendered");

const page = ({ url, snapshot, extraHead = [] }) => {
  const { head, body } = splitHoisted(render(url, snapshot));

  const headTags = [...head, ...extraHead].map(markPrerendered);

  const snapshotTag = snapshot
    ? `<script id="page-data" type="application/json">${jsonForScript(snapshot)}</script>\n    `
    : "";

  return baseTemplate
    .replace("</head>", `  ${headTags.join("\n    ")}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>\n    ${snapshotTag}`,
    );
};

const writePage = async (route, html) => {
  const target =
    route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered: ${route}`);
};

const BREADCRUMB_NAMES = {
  "/kontakt": "Kontakt",
  "/arhiva-cijenika": "Arhiva cjenika",
  "/pravila-privatnosti": "Pravila privatnosti",
  "/uvjeti-koristenja": "Uvjeti korištenja",
};

for (const meta of Object.values(PAGE_META)) {
  const crumb = BREADCRUMB_NAMES[meta.path];
  const extraHead = crumb
    ? [
        `<script type="application/ld+json">${jsonForScript(generateBreadcrumbSchema(crumb, meta.path))}</script>`,
      ]
    : [];

  await writePage(
    meta.path,
    page({ url: meta.path, snapshot: data, extraHead }),
  );
}

await writeFile(
  path.join(dist, "404.html"),
  page({ url: "/404", snapshot: data }),
);
console.log("prerendered: 404.html");

await writeFile(
  path.join(dist, "admin.html"),
  baseTemplate.replace(
    "</head>",
    `  <title>Administracija | 4D Detailing</title>
    <meta name="robots" content="noindex, nofollow">
  </head>`,
  ),
);
console.log("written: admin.html");

const today = new Date().toISOString().slice(0, 10);

const SITEMAP_PRIORITY = {
  "/": "1.0",
  "/usluge": "0.9",
  "/kontakt": "0.8",
  "/arhiva-cijenika": "0.3",
  "/pravila-privatnosti": "0.2",
  "/uvjeti-koristenja": "0.2",
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.values(PAGE_META)
  .map(
    ({ path: route }) => `  <url>
    <loc>${escapeAttr(`${SITE_URL}${route}`)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${SITEMAP_PRIORITY[route] ?? "0.5"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log("written: sitemap.xml");

// The server bundle was only needed for this step.
await rm(ssrDir, { recursive: true, force: true });

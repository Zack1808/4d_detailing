import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const bundle = async (entry) => {
  const { outputFiles } = await build({
    entryPoints: [path.join(root, entry)],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    outdir: "out",
  });

  const code = Buffer.from(outputFiles[0].text).toString("base64");

  return import(`data:text/javascript;base64,${code}`);
};

const { PAGE_META } = await bundle("src/config/seo.ts");
const { SITE_URL } = await bundle("src/config/business.ts");
const { generateAutoWashSchema } = await bundle("src/utils/schema.ts");

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = await readFile(path.join(dist, "index.html"), "utf8");

const stripped = template
  .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
  .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
  .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
  .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "")
  .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "")
  .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>\s*/gi, "");

const render = ({ title, description, path: route }, schema) => {
  const url = `${SITE_URL}${route}`;
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta data-rh="true" name="description" content="${escape(description)}">`,
    `<link data-rh="true" rel="canonical" href="${url}">`,
    `<meta data-rh="true" property="og:type" content="website">`,
    `<meta data-rh="true" property="og:site_name" content="4D Detailing">`,
    `<meta data-rh="true" property="og:locale" content="hr_HR">`,
    `<meta data-rh="true" property="og:title" content="${escape(title)}">`,
    `<meta data-rh="true" property="og:description" content="${escape(description)}">`,
    `<meta data-rh="true" property="og:url" content="${url}">`,
    `<meta data-rh="true" name="twitter:card" content="summary">`,
  ];

  if (schema) {
    tags.push(
      `<script data-rh="true" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    );
  }

  return stripped
    .replace(/<html([^>]*?)(\slang="[^"]*")?([^>]*)>/i, '<html$1$3 lang="hr">')
    .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
};

for (const meta of Object.values(PAGE_META)) {
  const html = render(
    meta,
    meta.path === "/" ? generateAutoWashSchema() : null,
  );
  const target =
    meta.path === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, meta.path.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered meta: ${meta.path}`);
}

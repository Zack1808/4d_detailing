import { Helmet } from "react-helmet-async";

import { SITE_URL } from "../../config/business";

export type SEOProps = {
  title: string;
  description?: string;
  path?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

const toJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const SEO = ({ title, description, path, schema, noindex }: SEOProps) => {
  const url = path === undefined ? undefined : `${SITE_URL}${path}`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <html lang="hr" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        url && <link rel="canonical" href={url} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="4D Detailing" />
      <meta property="og:locale" content="hr_HR" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary" />

      {schemas.map((item) => (
        <script key={toJsonLd(item)} type="application/ld+json">
          {toJsonLd(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

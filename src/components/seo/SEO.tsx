import React from "react";
import { Helmet } from "react-helmet-async";

import type { SEOProps } from "../../types/components";

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  schema,
  noindex,
}) => {
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        canonical && <link rel="canonical" href={canonical} />
      )}

      {schemaList.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

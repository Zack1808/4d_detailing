export type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

import { lazy } from "react";

import { PATHS } from "./config/paths";

export const loaders = {
  [PATHS.services]: () => import("./pages/Services"),
  [PATHS.contact]: () => import("./pages/Contact"),
  [PATHS.priceArchive]: () => import("./pages/PriceArchive"),
  [PATHS.privacy]: () => import("./pages/Privacy"),
  [PATHS.terms]: () => import("./pages/Terms"),
  notFound: () => import("./pages/NotFound"),
};

export const Services = lazy(loaders[PATHS.services]);
export const Contact = lazy(loaders[PATHS.contact]);
export const PriceArchive = lazy(loaders[PATHS.priceArchive]);
export const Privacy = lazy(loaders[PATHS.privacy]);
export const Terms = lazy(loaders[PATHS.terms]);
export const NotFound = lazy(loaders.notFound);

export const prefetchPage = (path: string) => {
  const loader = (
    loaders as Record<string, (() => Promise<unknown>) | undefined>
  )[path];

  loader?.().catch(() => undefined);
};

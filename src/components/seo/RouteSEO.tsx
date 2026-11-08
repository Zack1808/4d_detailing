import { useLocation } from "react-router-dom";

import SEO from "./SEO";

import { PAGE_META } from "../../config/seo";

const BY_PATH = new Map<string, (typeof PAGE_META)[keyof typeof PAGE_META]>(
  Object.values(PAGE_META).map((meta) => [meta.path, meta]),
);

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = BY_PATH.get(pathname);

  return meta ? <SEO {...meta} /> : null;
};

export default RouteSEO;

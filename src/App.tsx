import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/layout/ErrorBoundary";
import PublicLayout from "./components/layout/PublicLayout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Toaster from "./components/ui/Toast";

import { PATHS } from "./config/paths";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PriceArchive from "./pages/PriceArchive";
import Privacy from "./pages/Privacy";
import Services from "./pages/Services";
import Terms from "./pages/Terms";

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={PATHS.home} element={<Home />} />
          <Route path={PATHS.services} element={<Services />} />
          <Route path={PATHS.contact} element={<Contact />} />
          <Route path={PATHS.priceArchive} element={<PriceArchive />} />
          <Route path={PATHS.privacy} element={<Privacy />} />
          <Route path={PATHS.terms} element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;

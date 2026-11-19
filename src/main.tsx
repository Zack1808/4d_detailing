import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root")!;

document.head
  .querySelectorAll("[data-prerendered]")
  .forEach((element) => element.remove());

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (container.hasChildNodes() && !window.location.search) {
  hydrateRoot(container, app, {
    onRecoverableError: (error) => console.warn("Hydration:", error),
  });
} else {
  createRoot(container).render(app);
}

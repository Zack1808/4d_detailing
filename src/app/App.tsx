import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "@/app/routes";

import { CatalogProvider } from "@/features/catalog/context/CatalogContext";
import { ThemeProvider } from "@/shared/context/ThemeContext";

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <CatalogProvider>
        <AppRoutes />
        <ToastContainer autoClose={2500} closeOnClick />
      </CatalogProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "@/app/routes";

import { DataProvider } from "@features/catalog/context/DataContext";
import { ThemeProvider } from "@/shared/context/ThemeContext";

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <DataProvider>
        <AppRoutes />
        <ToastContainer autoClose={2500} closeOnClick />
      </DataProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

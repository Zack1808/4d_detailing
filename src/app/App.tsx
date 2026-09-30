import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "@/app/routes";

import { DataProvider } from "@features/catalog/context/DataContext";

const App: React.FC = () => (
  <BrowserRouter>
    <DataProvider>
      <AppRoutes />
      <ToastContainer autoClose={2500} closeOnClick />
    </DataProvider>
  </BrowserRouter>
);

export default App;

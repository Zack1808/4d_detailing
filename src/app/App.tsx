import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "@/app/routes";
import { ThemeProvider } from "@/shared/context/ThemeContext";

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AppRoutes />
      <ToastContainer autoClose={2500} closeOnClick />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

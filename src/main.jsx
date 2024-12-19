import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { ScrollProvider } from "./context/scrollContext";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScrollProvider>
    <App />
  </ScrollProvider>
);

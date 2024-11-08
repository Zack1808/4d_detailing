import { BrowserRouter, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navigation } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

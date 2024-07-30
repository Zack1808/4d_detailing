import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="outer-contaier">
        <div className="content">
          <Navbar />
        </div>
        <div className="mobile-navigation"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;

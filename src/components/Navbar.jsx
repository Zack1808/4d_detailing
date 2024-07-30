import { Link } from "react-router-dom";

import logo from "/logo.png";

import "../css/components/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-top">
      <div className="navbar-content-container">
        <img src={logo} alt="Logo" aria-label="Logo" />
        <ul className="links">
          <li>
            <Link to="/cjenik">Cijenik</Link>
          </li>
          <li>
            <Link to="/onama">O nama</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

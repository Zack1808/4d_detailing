import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import logo from "/logo.png";

import "../css/components/Navbar.css";

const Navbar = ({ toggleMenu }) => {
  return (
    <div className="navbar-top">
      <div className="navbar-content-container">
        <Link to="/">
          <img src={logo} alt="Logo" aria-label="Logo" />
        </Link>
        <HiOutlineMenuAlt3 className="menu" onClick={toggleMenu} />
        <ul className="links">
          <li>
            <Link to="/">Početna</Link>
          </li>
          <li>
            <Link to="/usluge">Usluge</Link>
          </li>
          <li>
            <Link to="/o-nama">O nama</Link>
          </li>
          <li>
            <Link to="/galerija">Galerija</Link>
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

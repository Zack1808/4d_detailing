import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa6";

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
            <button>
              Usluge <FaChevronDown />
              <div className={`navigation-dropdown`}>
                <Link to="/eksterijer" onClick={(event) => event.target.blur()}>
                  Čišćenje Eksterijera
                </Link>
                <Link to="/interijer" onClick={(event) => event.target.blur()}>
                  Čišćenje Interijera
                </Link>
                <Link to="/interijer" onClick={(event) => event.target.blur()}>
                  Poliranje i zaštita
                </Link>
                <Link to="/paketi" onClick={(event) => event.target.blur()}>
                  Paketi
                </Link>
              </div>
            </button>
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

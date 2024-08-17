import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa6";

import logo from "/logo.webp";

import "../css/components/Navbar.css";

const Navbar = ({ toggleMenu }) => {
  return (
    <div className="navbar-top">
      <div className="navbar-content-container">
        <Link to="/" aria-label="Početna">
          <img src={logo} alt="4D detailing logo" />
        </Link>
        <HiOutlineMenuAlt3
          className="menu"
          onClick={toggleMenu}
          aria-label="Otvori izbornik"
        />
        <ul className="links">
          <li>
            <Link to="/">Početna</Link>
          </li>
          <li>
            <button>
              Usluge <FaChevronDown />
              <div className={`navigation-dropdown`}>
                <Link
                  to="/čišćenje-eksterijera"
                  onClick={(event) => event.target.blur()}
                >
                  Čišćenje Eksterijera
                </Link>
                <Link
                  to="/čišćenje-interijera"
                  onClick={(event) => event.target.blur()}
                >
                  Čišćenje Interijera
                </Link>
                <Link
                  to="/poliranje-i-zaštita"
                  onClick={(event) => event.target.blur()}
                >
                  Poliranje i zaštita
                </Link>
                <Link
                  to="/posebni-paketi"
                  onClick={(event) => event.target.blur()}
                >
                  Posebni paketi
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

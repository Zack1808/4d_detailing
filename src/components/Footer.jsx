import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock, FaInstagram, FaWhatsapp } from "react-icons/fa6";

import "../css/components/Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-container">
        <div className="footer-about-us">
          <div>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="page logo" />
            </Link>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              perferendis exercitationem odio cum. Eum, facere amet atque odio
              ipsa id minima quas aliquid quaerat sunt!
            </p>
          </div>
        </div>
        <div className="footer-contact-information">
          <div>
            <h4>Kontakt</h4>
            <a href="mailto:4d.detailing.ln@gmail.com">
              <strong>
                <IoMail /> Email:
              </strong>
              4d.detailing.ln@gmail.com
            </a>
            <a href="tel:+385977588716">
              <strong>
                <FaPhoneAlt /> Telefon:
              </strong>{" "}
              +385 97 758 8716
            </a>
            <span>
              <strong>
                <FaClock /> Radno vrijeme:
              </strong>
              po dogovoru
            </span>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h4>Linkovi</h4>
            <Link to="/">Početna</Link>
            <Link to="/pravila-privatnosti">Pravila privatnosti</Link>
            <Link to="/uvijeti-korištenja">Uvjeti korištenja</Link>
            <Link to="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>

      <div className="copyright">
        <span>4D Detailing, {new Date().getFullYear()}</span>
        <div className="social-media">
          <a
            target="_blank"
            href="https://www.instagram.com/4ddetailingln?igsh=ZXF0bmI5b2YydmZy"
            aria-label="Kontakt Instagram"
          >
            <FaInstagram className="social-media-icon" />
          </a>
          <a
            target="_blank"
            href="https://wa.me/+385977588716"
            aria-label="Kontakt Whatsapp"
          >
            <FaWhatsapp className="social-media-icon" />
          </a>
        </div>
        <span>
          Izradio:{" "}
          <a target="_blank" href="https://jeanpierrenovak.netlify.app">
            &nbsp;JPN
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

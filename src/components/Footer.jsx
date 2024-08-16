import React from "react";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { FaClock, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "../css/components/Footer.css";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <div className="footer-container">
        <div className="footer-about-us">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="page logo" />
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            perferendis exercitationem odio cum. Eum, facere amet atque odio
            ipsa id minima quas aliquid quaerat sunt!
          </p>
        </div>
        <div className="footer-contact-information">
          <h4>Kontakt</h4>
          <a href="mailto:4d.detailing.ln@gmail.com">
            <IoMail aria-hidden="true" />
            <strong>Email:</strong> 4d.detailing.ln@gmail.com
          </a>
          <a href="tel:+385977588716">
            <FaPhoneAlt aria-hidden="true" />
            <strong>Telefon:</strong> +385 97 758 8716
          </a>
          <span>
            <FaClock aria-hidden="true" />
            <strong>Radno vrijeme:</strong> po dogovoru
          </span>
        </div>
        <div className="footer-links">
          <h4>Linkovi</h4>
          <Link to="/">Početna</Link>
          <Link to="/pravila-privatnosti">Pravila privatnosti</Link>
          <Link to="/uvijeti-korištenja">Uvjeti korištenja</Link>
          <Link to="/kontakt">Kontakt</Link>
        </div>
      </div>
      <div className="copyright">
        <span>4D Detailing, {currentYear}</span>
        <div className="social-media">
          <a
            href="https://www.instagram.com/4ddetailingln?igsh=ZXF0bmI5b2YydmZy"
            aria-label="Kontakt Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-media-icon" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/+385977588716"
            aria-label="Kontakt Whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="social-media-icon" aria-hidden="true" />
          </a>
        </div>
        <span>
          Izradio:{" "}
          <a
            href="https://jeanpierrenovak.from.hr"
            target="_blank"
            rel="noopener noreferrer"
          >
            JPN
          </a>
        </span>
      </div>
    </footer>
  );
});

export default Footer;

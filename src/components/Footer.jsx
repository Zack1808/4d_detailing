import React from "react";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import {
  FaClock,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaCopyright,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import logo from "/logo.svg";

import "../css/components/Footer.css";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <div className="footer-container">
        <div className="footer-about-us">
          <h4 className="visually-hidden">O nama</h4>
          <Link to="/" className="logo">
            <img src={logo} alt="page logo" />
          </Link>
          <p>
            Profesionalne usluge čišćenja i poliranja vozila.
            <br />
            Jer čistoća i sjaj nisu trošak, nego ulaganje!
          </p>
        </div>
        <div className="footer-contact-information">
          <span>
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
            <a href="https://maps.app.goo.gl/kQ868KeYKgo41F1r8" target="_blank">
              <FaLocationDot aria-hidden="true" />
              <p>
                <strong>Lokacija sjedišta:</strong> Rakitovec 274, 10410 Velika
                Gorica
              </p>
            </a>
          </span>
        </div>
        <div className="footer-links">
          <span>
            <h4>Linkovi</h4>
            <Link to="/">Početna</Link>
            <Link to="/pravila-privatnosti">Pravila privatnosti</Link>
            <Link to="/uvijeti-korištenja">Uvjeti korištenja</Link>
            <Link to="/kontakt">Kontakt</Link>
          </span>
        </div>
      </div>
      <div className="copyright">
        <span>
          <FaCopyright aria-label="copyright" /> 4D Detailing, 2024 -{" "}
          {currentYear}
        </span>
        <div className="social-media">
          <a
            href="https://www.instagram.com/4dcardetailing?igsh=MTAzYnVsa2U0bmY5MA=="
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

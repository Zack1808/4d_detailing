import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import {
  FaClock,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaCopyright,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { useStore } from "../context/storeContext";

import logoPng from "/logo.png";
import logoSvg from "/logo.svg";

import "../css/components/Footer.css";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  const { contactData } = useStore();

  return (
    <footer className="page-footer">
      <div className="footer-container">
        <div className="footer-about-us">
          <strong className="visually-hidden">O nama</strong>
          <Link to="/" className="logo">
            <picture>
              <source srcSet={logoSvg} media="(min-width: 62.5rem)" />
              <img src={logoPng} alt="page logo" />
            </picture>
          </Link>
          <p>
            Profesionalne usluge čišćenja i poliranja vozila.
            <br />
            Jer čistoća i sjaj nisu trošak, nego ulaganje!
          </p>
        </div>
        <div className="footer-contact-information">
          <span>
            <strong>Kontakt</strong>
            <a href={`mailto:${contactData.email}`}>
              <IoMail aria-hidden="true" />
              <strong>Email:</strong> {contactData.email}
            </a>
            <a href={`tel:${contactData.mobile}`}>
              <FaPhoneAlt aria-hidden="true" />
              <strong>Telefon:</strong> {contactData.mobile}
            </a>
            <span>
              <FaClock aria-hidden="true" />
              <strong>Radno vrijeme:</strong> {contactData.worktime}
            </span>
            <a href={contactData.maps} target="_blank">
              <FaLocationDot aria-hidden="true" />
              <p>
                <strong>Lokacija sjedišta:</strong> {contactData.location}
              </p>
            </a>
          </span>
        </div>
        <div className="footer-links">
          <span>
            <strong>Linkovi</strong>
            <Link to="/">Početna</Link>
            <Link to="/pravila-privatnosti">Pravila privatnosti</Link>
            <Link to="/uvijeti-korištenja">Uvjeti korištenja</Link>
            <Link to="/kontakt">Kontakt</Link>
          </span>
        </div>
      </div>
      <div className="copyright">
        <span>
          <FaCopyright aria-label="copyright" /> 4D Detailing, osnovan 2024
        </span>
        <div className="social-media">
          <a
            href="https://www.youtube.com/@4DDetailing"
            aria-label="Youtube kanal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-media-icon" aria-hidden="true" />
          </a>
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
          <a
            href="https://www.tiktok.com/@4ddetailing?_t=ZN-8sUT8kPvC5e&_r=1"
            aria-label="TikTok profil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="social-media-icon" aria-hidden="true" />
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

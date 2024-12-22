import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "./";

import "../css/components/GoogleAnalytic.css";

const GoogleAnalytic = ({ hasConsent, consentGiven, menuIsOpen }) => {
  const [popUpOpen, setPopUpOpen] = useState(true);

  useEffect(() => {
    if (hasConsent) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-4MMF4065DH";
      script.async = true;

      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];

      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", "G-4MMF4065DH", { anonymize_ip: true });
    }
  }, [hasConsent]);

  const closeConsetRequest = () => {
    setPopUpOpen(false);
  };

  return (
    <div
      className={`consent-container ${
        !hasConsent && popUpOpen ? "no-consent" : ""
      } ${menuIsOpen ? "remove-consent" : ""}`}
    >
      <h4>Kolačići</h4>
      <p>
        Koristimo kolačiće za praćenje prometa na web stranici i analizu
        interakcije korisnika s našom stranicom. To nam pomaže za poboljšanje
        korisničkog iskustvo.
        <br />
        <Link to="/pravila-privatnosti">
          Ovdje možete saznati više o tome kako Google koristi te podatke.
        </Link>
      </p>

      <div className="consent-buttons">
        <Button primary onClick={consentGiven}>
          Prihvati i zatvori
        </Button>
        <Button onClick={closeConsetRequest}>Odbij</Button>
      </div>
    </div>
  );
};

export default GoogleAnalytic;

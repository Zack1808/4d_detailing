import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Button from "./Button";

const STORAGE_KEY = "4d_consent";
const GA_ID = "G-4MMF4065DH";
const BANNER_ROUTES = ["/", "/usluge", "/kontakt"];

const GoogleAnalytics: React.FC = () => {
  const { pathname } = useLocation();
  const canShowBanner = BANNER_ROUTES.includes(pathname);

  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!canShowBanner) return;

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const state = JSON.parse(stored) === true;
      setHasConsent(state);
      if (state) return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canShowBanner]);

  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(id);
  }, [isOpen]);

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 250);
  }, []);

  const handleApprove = useCallback(() => {
    setHasConsent(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
    close();
  }, [close]);

  const handleDecline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(false));
    close();
  }, [close]);

  useEffect(() => {
    if (!hasConsent) return;
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`))
      return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }, [hasConsent]);

  if (!isOpen) return null;

  return (
    <div
      className={`w-full fixed bottom-0 px-6 py-12 bg-gray-light/60 dark:bg-gray-dark/60 backdrop-blur-xl transition-[transform, opacity] motion-reduce:transition-none duration-250 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-100 opacity-0"}`}
    >
      <div className="max-w-[1700px] mx-auto flex flex-col gap-9">
        <span className="text-dark dark:text-light font-medium text-2xl">
          Kolačići
        </span>
        <p className="text-dark dark:text-light font-light">
          Koristimo kolačiće za praćenje prometa na web stranici i analizu
          interakcije korisnika s našom stranicom. To nam pomaže za poboljšanje
          korisničkog iskustvo.
          <br />
          <Button
            variant="none"
            to="/pravila-privatnosti"
            className="p-0! underline text-normal!"
          >
            Ovdje možete saznati više o tome kako Google koristi te podatke.
          </Button>
        </p>
        <div className="flex gap-3 self-end">
          <Button variant="primary" className="text-sm" onClick={handleApprove}>
            Prihvati i zatvori
          </Button>
          <Button
            variant="secondary"
            className="text-sm"
            onClick={handleDecline}
          >
            Odbij
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalytics;

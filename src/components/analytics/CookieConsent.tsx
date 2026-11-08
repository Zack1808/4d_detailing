import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../ui/Button";

import { PATHS } from "../../config/paths";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  disableAnalytics,
  enableAnalytics,
  readConsent,
  saveConsent,
} from "../../lib/analytics";
import { cn } from "../../utils/cn";

const BANNER_ROUTES: string[] = [PATHS.home, PATHS.services, PATHS.contact];
const SCROLL_THRESHOLD = 100;
const EXIT_MS = 250;

const CookieConsent = () => {
  const { pathname } = useLocation();
  const canShow = BANNER_ROUTES.includes(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === true) enableAnalytics();
  }, []);

  useEffect(() => {
    if (!canShow || readConsent() !== null) return;

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [canShow]);

  useEffect(() => {
    const reopen = () => setIsOpen(true);

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);

    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const id = window.setTimeout(() => setIsVisible(true), 50);

    return () => window.clearTimeout(id);
  }, [isOpen]);

  const close = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), EXIT_MS);
  }, []);

  const decide = (granted: boolean) => {
    saveConsent(granted);

    if (granted) enableAnalytics();
    else disableAnalytics();

    close();
  };

  if (!isOpen) return null;

  return (
    <section
      aria-label="Kolačići"
      className={cn(
        "fixed bottom-0 z-40 w-full bg-gray-light/60 px-6 py-12 backdrop-blur-xl transition-[transform,opacity] duration-250 motion-reduce:transition-none dark:bg-gray-dark/60",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-[1700px] flex-col gap-9">
        <h2 className="text-2xl font-medium">Kolačići</h2>
        <p className="font-light">
          Koristimo kolačiće za praćenje prometa na web stranici i analizu
          interakcije korisnika s našom stranicom. To nam pomaže za poboljšanje
          korisničkog iskustva.
          <br />
          <Button variant="link" to={PATHS.privacy} className="py-0 underline">
            Ovdje možete saznati više o tome kako Google koristi te podatke.
          </Button>
        </p>
        <div className="flex gap-3 self-end">
          <Button
            variant="primary"
            className="text-sm"
            onClick={() => decide(true)}
          >
            Prihvati i zatvori
          </Button>
          <Button
            variant="secondary"
            className="text-sm"
            onClick={() => decide(false)}
          >
            Odbij
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;

import { readStorage, writeStorage } from "./storage";

const GA_ID = "G-4MMF4065DH";
const CONSENT_KEY = "4d_consent";

export const OPEN_COOKIE_SETTINGS_EVENT = "4d:open-cookie-settings";

export const openCookieSettings = () =>
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));

export const readConsent = (): boolean | null => {
  const stored = readStorage<unknown>(CONSENT_KEY);

  return typeof stored === "boolean" ? stored : null;
};

export const saveConsent = (granted: boolean) =>
  writeStorage(CONSENT_KEY, granted);

const disableFlag = `ga-disable-${GA_ID}` as const;

export const enableAnalytics = () => {
  (window as unknown as Record<string, unknown>)[disableFlag] = false;

  if (document.querySelector('script[src*="googletagmanager.com/gtag"]'))
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
};

const expireCookie = (name: string) => {
  const host = window.location.hostname;
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  document.cookie = `${name}=; ${expired}; path=/`;
  document.cookie = `${name}=; ${expired}; path=/; domain=${host}`;
  document.cookie = `${name}=; ${expired}; path=/; domain=.${host}`;
};

export const disableAnalytics = () => {
  (window as unknown as Record<string, unknown>)[disableFlag] = true;

  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach(expireCookie);
};

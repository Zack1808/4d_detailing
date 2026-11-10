import type { IconType } from "react-icons";
import {
  FaChevronRight,
  FaCopyright,
  FaEnvelope,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaSquareFacebook,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

import Button from "../ui/Button";
import Logo from "../ui/Logo";

import { BUSINESS, SOCIAL_LINKS, type SocialId } from "../../config/business";
import { FOOTER_LINKS, PATHS } from "../../config/paths";
import { openCookieSettings } from "../../lib/analytics";
import { cn } from "../../utils/cn";

const SOCIAL_ICONS: Record<SocialId, IconType> = {
  tiktok: FaTiktok,
  instagram: FaInstagram,
  facebook: FaSquareFacebook,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
};

const ROW = "w-full max-w-none text-sm lg:max-w-max";
const COLUMN =
  "flex flex-col items-center justify-center gap-0 px-3 py-3 lg:px-9";
const HEADING = "mb-3 text-2xl font-medium";

const Chevron = () => (
  <FaChevronRight className="ml-auto block lg:hidden" aria-hidden="true" />
);

const Footer = () => (
  <footer className="flex w-full flex-col items-center justify-center gap-12 border-t-2 border-t-gray-light bg-light px-3 py-18 dark:border-t-gray-dark dark:bg-dark">
    <div className="mt-6 flex w-full max-w-[1700px] flex-1 flex-col items-start justify-between gap-12 lg:flex-row">
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 px-3 py-3 lg:px-9">
        <div className="flex items-center gap-3">
          <Logo width={80} height={70} className="w-20" />
          <span className="text-4xl font-bold">{BUSINESS.name}</span>
        </div>
        <div className="flex flex-col gap-6">
          <p className="max-w-[35ch] text-sm font-light">
            Profesionalne usluge čišćenja i poliranja vozila. Jer čistoća i sjaj
            nisu trošak, nego ulaganje!
          </p>
          <Button variant="secondary" to={PATHS.contact} className="text-xs">
            Rezerviraj termin
          </Button>
        </div>
      </div>

      <div className={cn(COLUMN, "w-full flex-1 lg:w-auto")}>
        <div className="flex w-full flex-col lg:w-auto">
          <h2 className={HEADING}>Kontakt</h2>
          <Button
            variant="link"
            className={ROW}
            href={`mailto:${BUSINESS.email}`}
          >
            <FaEnvelope className="text-lg" aria-hidden="true" />
            {BUSINESS.email}
            <Chevron />
          </Button>
          <Button variant="link" className={ROW} href={BUSINESS.phone.href}>
            <FaPhone className="text-lg" aria-hidden="true" />
            {BUSINESS.phone.display}
            <Chevron />
          </Button>
          <Button
            variant="link"
            className={ROW}
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLocationDot className="text-lg" aria-hidden="true" />
            {BUSINESS.address.full}
            <Chevron />
          </Button>
        </div>
      </div>

      <nav
        aria-label="Poveznice"
        className={cn(COLUMN, "w-full flex-1 lg:w-auto")}
      >
        <div className="flex w-full flex-col lg:w-auto">
          <h2 className={HEADING}>Linkovi</h2>
          {FOOTER_LINKS.map(({ to, label }) => (
            <Button key={to} variant="link" className={ROW} to={to}>
              {label}
              <Chevron />
            </Button>
          ))}
          <Button variant="link" className={ROW} onClick={openCookieSettings}>
            Postavke kolačića
            <Chevron />
          </Button>
        </div>
      </nav>
    </div>

    <div className="flex w-full flex-col items-center justify-between gap-9 lg:flex-row lg:px-9 md:max-w-[1700px]">
      <p className="order-2 flex flex-1 justify-start text-center text-sm lg:order-1">
        <FaCopyright className="mr-2 text-lg font-light" aria-hidden="true" />
        <span>
          2024 - {new Date().getFullYear()}{" "}
          <b className="font-semibold">{BUSINESS.name}</b>.{" "}
          <br className="block lg:hidden" />
          Sva prava pridržana.
        </span>
      </p>

      <div className="order-1 flex w-full flex-col justify-center px-3 py-3 pb-12 lg:order-2 lg:w-auto lg:flex-row lg:gap-6 lg:px-0 lg:pb-0">
        <h2 className="mb-3 block text-2xl font-medium lg:hidden">
          Pratite nas
        </h2>
        {SOCIAL_LINKS.map(({ id, label, href }) => {
          const Icon = SOCIAL_ICONS[id];

          return (
            <Button
              key={id}
              variant="link"
              className={ROW}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className="text-lg lg:text-2xl" aria-hidden="true" />
              <span className="block lg:hidden">{label}</span>
              <Chevron />
            </Button>
          );
        })}
      </div>

      <div className="order-3 flex flex-1 justify-end">
        <a
          href="https://jeanpierrenovak.from.hr/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-light text-gray-500 dark:text-gray-400"
        >
          Izradio: <b className="font-semibold">JPN</b>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

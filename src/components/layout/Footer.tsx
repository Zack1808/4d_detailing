import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaCopyright,
  FaTiktok,
  FaInstagram,
  FaSquareFacebook,
  FaYoutube,
  FaWhatsapp,
  FaChevronRight,
} from "react-icons/fa6";

import Button from "../common/Button";

import { useData } from "../../context/DataContext";

const Footer: React.FC = () => {
  const { isDark } = useData();

  const logo = isDark ? "/images/logo_dark.svg" : "/images/logo_light.svg";

  return (
    <footer className="w-full bg-light dark:bg-dark px-3 py-18 border-t-gray-light dark:border-t-gray-dark border-t-2 flex items-center justify-center flex-col gap-12">
      <div className="flex lg:flex-row flex-col items-start justify-between gap-12 flex-1 w-full mt-6 max-w-[1700px]">
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full items-center justify-center flex-1 gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              width={80}
              height={70}
              className="w-20"
            />
            <span className="text-dark dark:text-light font-bold text-4xl">
              4D Detailing
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-dark dark:text-light font-light text-sm max-w-[35ch]">
              Profesionalne usluge čišćenja i poliranja vozila. Jer čistoća i
              sjaj nisu trošak, nego ulaganje!
            </p>
            <Button variant="secondary" to="/kontakt" className="text-xs">
              Rezerviraj termin
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full justify-center items-center flex-1 w-full lg:w-auto">
          <div className="flex flex-col w-full lg:w-auto">
            <span className="text-dark dark:text-light font-medium text-2xl mb-3">
              Kontakt
            </span>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              href="mailto:4d.detailing.ln@gmail.com"
            >
              <FaEnvelope className="text-lg" />
              4d.detailing.ln@gmail.com
              <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              href="tel:+385977588716"
            >
              <FaPhone className="text-lg" />
              +385 97 758 8716{" "}
              <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLocationDot className="text-lg" />
              Rakitovec 274, 10410 Velika Gorica{" "}
              <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full flex-1 justify-center items-center w-full lg:w-auto">
          <div className="flex flex-col w-full lg:w-auto">
            <span className="text-dark dark:text-light font-medium text-2xl mb-3">
              Linkovi
            </span>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              to="/"
            >
              Home <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              to="/usluge"
            >
              Usluge <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              to="/uvijeti-koristenja"
            >
              Uvijeti korištenja{" "}
              <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              to="/pravila-privatnosti"
            >
              Pravila privatnosti{" "}
              <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm max-w-none w-full lg:max-w-"
              to="/kontakt"
            >
              Kontakt <FaChevronRight className="ml-auto lg:hidden block" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[1700px] flex justify-between align-center gap-9 text-dark lg:px-9 dark:text-light lg:flex-row flex-col items-center">
        <span className="flex justify-start text-center text-sm flex-1 lg:order-1 order-2">
          <FaCopyright className="text-lg font-light mr-2" />{" "}
          <span>
            2024 - {new Date().getFullYear()}{" "}
            <b className="font-semibold">4D Detailing</b>.{" "}
            <br className="lg:hidden block" />
            Sva prava pridržana.
          </span>
        </span>
        <div className="flex lg:flex-row flex-col lg:px-0 px-3 py-3 h-full justify-center items-centerflex-1 w-full lg:w-auto lg:gap-6 lg:order-2 order-1 pb-12 lg:pb-0">
          <span className="text-dark dark:text-light font-medium text-2xl mb-3 lg:hidden block">
            Pratite nas
          </span>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full lg:max-w-max"
            href="https://www.tiktok.com/@4ddetailing?_t=ZN-8sUT8kPvC5e&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="lg:text-2xl text-lg" />
            <span className="lg:hidden block">TikTok</span>{" "}
            <FaChevronRight className="ml-auto lg:hidden block" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full lg:max-w-"
            href="https://www.instagram.com/4dcardetailing?igsh=MTAzYnVsa2U0bmY5MA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="lg:text-2xl text-lg" />
            <span className="lg:hidden block">Instagram</span>{" "}
            <FaChevronRight className="ml-auto lg:hidden block" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full lg:max-w-max"
            href="https://www.facebook.com/p/4D-Detailing-61573426065582/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaSquareFacebook className="lg:text-2xl text-lg" />
            <span className="lg:hidden block">Facebook</span>{" "}
            <FaChevronRight className="ml-auto lg:hidden block" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full lg:max-w-max"
            href="https://wa.me/+385977588716"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
          >
            <FaWhatsapp className="lg:text-2xl text-lg" />
            <span className="lg:hidden block">Whatsapp</span>{" "}
            <FaChevronRight className="ml-auto lg:hidden block" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full lg:max-w-max"
            href="https://www.youtube.com/@4DDetailing"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube className="lg:text-2xl text-lg" />
            <span className="lg:hidden block">YouTube</span>{" "}
            <FaChevronRight className="ml-auto lg:hidden block" />
          </Button>
        </div>
        <div className="flex-1 flex justify-end order-3">
          <a
            href="https://jeanpierrenovak.from.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 font-light"
          >
            Izradio: <b className="font-semibold">JPN</b>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

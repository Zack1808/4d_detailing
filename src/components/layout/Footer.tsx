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
    <footer className="w-full bg-light dark:bg-dark px-4 py-4 border-t-gray-light dark:border-t-gray-dark border-t-2 flex items-center justify-center flex-col gap-6">
      <div className="flex lg:flex-row flex-col items-start justify-between gap-3 flex-1 w-full mt-6 max-w-[1700px]">
        <div className="flex xl:flex-row flex-col lg:px-9 px-3 py-3 h-full items-center justify-center flex-2 gap-6">
          <img src={logo} alt="logo" className="w-45" />
          <div className="flex flex-col gap-3">
            <p className="text-dark dark:text-light font-light">
              Profesionalne usluge čišćenja i poliranja vozila. Jer čistoća i
              sjaj nisu trošak, nego ulaganje!
            </p>
            <Button variant="secondary" to="/kontakt">
              Rezerviraj termin
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full justify-center flex-1 w-full lg:w-auto">
          <span className="text-dark dark:text-light font-medium text-2xl mb-3">
            Kontakt
          </span>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="mailto:4d.detailing.ln@gmail.com"
          >
            <FaEnvelope className="text-lg" />
            4d.detailing.ln@gmail.com
            <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full "
            href="tel:+385977588716"
          >
            <FaPhone className="text-lg" />
            +385 97 758 8716 <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
            target="_blank"
          >
            <FaLocationDot className="text-lg" />
            Rakitovec 274, 10410 Velika Gorica{" "}
            <FaChevronRight className="ml-auto" />
          </Button>
        </div>
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full flex-1 justify-center w-full lg:w-auto">
          <span className="text-dark dark:text-light font-medium text-2xl mb-3">
            Linkovi
          </span>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            to="/"
          >
            Home <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            to="/usluge"
          >
            Usluge <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            to="/uvijeti-koristenja"
          >
            Uvijeti korištenja <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            to="/pravila-privatnosti"
          >
            Pravila privatnosti <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            to="/kontakt"
          >
            Kontakt <FaChevronRight className="ml-auto" />
          </Button>
        </div>
        <div className="flex flex-col lg:px-9 px-3 py-3 h-full flex-1 justify-center w-full lg:w-auto">
          <span className="text-dark dark:text-light font-medium text-2xl mb-3">
            Pratite nas
          </span>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://www.tiktok.com/@4ddetailing?_t=ZN-8sUT8kPvC5e&_r=1"
            target="_blank"
          >
            <FaTiktok className="text-lg" />
            TikTok <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://www.instagram.com/4dcardetailing?igsh=MTAzYnVsa2U0bmY5MA=="
            target="_blank"
          >
            <FaInstagram className="text-lg" />
            Instagram <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://www.facebook.com/p/4D-Detailing-61573426065582/"
            target="_blank"
          >
            <FaSquareFacebook className="text-lg" />
            Facebook <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://wa.me/+385977588716"
            target="_blank"
          >
            <FaWhatsapp className="text-lg" />
            Whatsapp <FaChevronRight className="ml-auto" />
          </Button>
          <Button
            variant="none"
            className="px-0! text-sm max-w-none w-full"
            href="https://www.youtube.com/@4DDetailing"
            target="_blank"
          >
            <FaYoutube className="text-lg" />
            YouTube <FaChevronRight className="ml-auto" />
          </Button>
        </div>
      </div>
      <div className="w-full md:max-w-[1700px] flex justify-between align-center gap-3 text-dark dark:text-light px-9 lg:flex-row flex-col items-center">
        <span className="flex justify-center gap-3 text-center">
          <FaCopyright className="text-xl font-light" />{" "}
          <span>
            2024 - {new Date().getFullYear()}{" "}
            <b className="font-semibold">4D Detailing</b>. Sva prava pridržana.
          </span>
        </span>
        <a
          href="https://jeanpierrenovak.from.hr/"
          target="_blank"
          className="opacity-50 font-light"
        >
          Izradio: <b className="font-semibold">JPN</b>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

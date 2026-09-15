import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaLocationDot,
  FaCopyright,
  FaTiktok,
  FaInstagram,
  FaSquareFacebook,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

import Button from "../common/Button";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-light dark:bg-dark px-4 py-4 border-t-gray-light dark:border-t-gray-dark border-t-2 flex items-center justify-center flex-col gap-6">
      <div className="flex md:flex-row flex-col items-start justify-between gap-3 flex-1 w-full mt-6">
        <div className="flex p-3 h-full items-center justify-center flex-1.5">
          <div className="flex flex-col">
            <span className="text-dark dark:text-light font-bold text-2xl mb-3">
              Kontakt
            </span>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="mailto:4d.detailing.ln@gmail.com"
            >
              <b className="flex gap-3 items-center">
                <FaEnvelope className="text-lg" /> Email:
              </b>{" "}
              4d.detailing.ln@gmail.com
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm "
              href="tel:+385977588716"
            >
              <b className="flex gap-3 items-center">
                <FaPhone className="text-lg" /> Telefon:
              </b>{" "}
              +385 97 758 8716
            </Button>
            <Button variant="none" className="px-0! text-sm">
              <b className="flex gap-3 items-center">
                <FaClock className="text-lg" /> Radno vrijeme:
              </b>{" "}
              Po dogovoru
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://maps.app.goo.gl/BM2TStTNWFyDirfr9"
              target="_blank"
            >
              <b className="flex gap-3 items-center">
                <FaLocationDot className="text-lg" /> Lokacija sjedišta:
              </b>{" "}
              Rakitovec 274, 10410 Velika Gorica
            </Button>
          </div>
        </div>
        <div className="flex p-3 h-full flex-1 justify-center">
          <div className="flex flex-col">
            <span className="text-dark dark:text-light font-bold text-2xl mb-3">
              Linkovi
            </span>
            <Button variant="none" className="px-0! text-sm" to="/">
              Home
            </Button>
            <Button variant="none" className="px-0! text-sm" to="/usluge">
              Usluge
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              to="/uvijeti-koristenja"
            >
              Uvijeti korištenja
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              to="/pravila-privatnosti"
            >
              Pravila privatnosti
            </Button>
            <Button variant="none" className="px-0! text-sm" to="/kontakt">
              Kontakt
            </Button>
          </div>
        </div>
        <div className="flex p-3 h-full flex-1 justify-center">
          <div className="flex flex-col">
            <span className="text-dark dark:text-light font-bold text-2xl mb-3">
              Pratite nas
            </span>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://www.tiktok.com/@4ddetailing?_t=ZN-8sUT8kPvC5e&_r=1"
              target="_blank"
            >
              <FaTiktok className="text-lg" />
              TikTok
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://www.instagram.com/4dcardetailing?igsh=MTAzYnVsa2U0bmY5MA=="
              target="_blank"
            >
              <FaInstagram className="text-lg" />
              Instagram
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://www.facebook.com/p/4D-Detailing-61573426065582/"
              target="_blank"
            >
              <FaSquareFacebook className="text-lg" />
              Facebook
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://wa.me/+385977588716"
              target="_blank"
            >
              <FaWhatsapp className="text-lg" />
              Whatsapp
            </Button>
            <Button
              variant="none"
              className="px-0! text-sm"
              href="https://www.youtube.com/@4DDetailing"
              target="_blank"
            >
              <FaYoutube className="text-lg" />
              YouTube
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[1700px] flex justify-between align-center gap-3 text-dark dark:text-light px-9 md:flex-row flex-col items-center">
        <span className="flex justify-center gap-3 text-center">
          <FaCopyright className="mt-1" /> 4D Detailing, osnovan 2024
        </span>
        <a
          href="https://jeanpierrenovak.from.hr/"
          target="_blank"
          className="opacity-20"
        >
          Izradio: JPN
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const linkClasses =
    "font-semibold text-lg text-dark dark:text-light flex md:w-max w-full px-4 py-3 items-center justify-center";

  return (
    <header className="w-full bg-light/10 dark:bg-dark/10 fixed  px-4 py-4 backdrop-blur-xs dark:backdrop-blur-lg shadow-sm flex items-center justify-center z-40">
      <div className="w-full md:max-w-[1700px] flex justify-between align-center md:flex-row flex-col gap-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-4 md:w-max w-full"
        >
          <img
            src={darkMode ? "/logo_dark.svg" : "/logo_light.svg"}
            alt="4D Detailing"
            className="w-24"
          />
          <p className="font-semibold text-4xl text-dark dark:text-light">
            4D Detailing
          </p>
        </Link>

        <nav className="flex items-center justify-center md:flex-row flex-col">
          <Link to="/" className={linkClasses}>
            Početna
          </Link>
          <Link to="/usluge" className={linkClasses}>
            Usluge
          </Link>
          <Link to="/kontakt" className={linkClasses}>
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

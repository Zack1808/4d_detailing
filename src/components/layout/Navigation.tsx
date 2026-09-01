import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const linkClasses =
    "font-semibold text-content text-lg text-secondary flex md:w-max w-full px-4 py-3 items-center justify-center hover:bg-thertiary";

  return (
    <header className="w-full bg-primary px-4 py-4 shadow-thertiary shadow-sm flex items-center justify-center">
      <div className="w-full md:max-w-[1700px] flex justify-between align-center md:flex-row flex-col gap-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-4 md:w-max w-full font-title text-secondary"
        >
          <img src="/logo_light.svg" alt="4D Detailing" className="w-14" />
          <p className="font-semibold text-3xl">4D Detailing</p>
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

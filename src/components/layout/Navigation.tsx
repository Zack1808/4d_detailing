import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";

import Button from "../common/Button";

import Wheel from "../animated/Wheel";

import { useData } from "../../context/DataContext";

const Navigation: React.FC = () => {
  const [changeBlur, setChangeBlur] = useState<boolean>(false);
  const [changeBg, setChangeBg] = useState<number>(10);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { isDark } = useData();

  const linkClasses =
    "font-normal text-lg text-dark dark:text-light flex md:w-max w-full px-4 py-3 items-center justify-center";

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setChangeBlur(window.scrollY > 500);

      const percentage = Math.round((window.scrollY / 500) * 100);

      setChangeBg((prevState) => {
        if (percentage <= 10 || percentage >= 95) return prevState;
        return percentage;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true)),
      );
    } else {
      setIsVisible(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (isVisible) return;

    const timer = setTimeout(() => {
      setMenuOpen(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    setChangeBg(10);
    setChangeBlur(false);
  }, [location.pathname]);

  const openMenu = () => setMenuOpen(true);

  const closeMenu = () => setIsVisible(false);

  return (
    <>
      <header
        className={`w-full fixed md:p-4 p-3 shadow-sm flex items-center justify-center z-40  ${changeBlur ? "backdrop-blur-xl" : "backdrop-blur-xs"}`}
        style={{
          backgroundColor: isDark
            ? `color-mix(in srgb, var(--color-dark) ${changeBg}%, transparent)`
            : `color-mix(in srgb, var(--color-light) ${changeBg}%, transparent)`,
        }}
      >
        <div className="w-full md:max-w-[1700px] flex justify-between md:align-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-4 md:w-max"
          >
            <img
              src={isDark ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
              alt="4D Detailing"
              className="md:w-24 w-20"
            />
            <p className="font-bold text-4xl text-dark dark:text-light md:flex hidden">
              4D Detailing
            </p>
          </Link>

          <nav className="md:flex items-center justify-center hidden">
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

          <Button variant="none" className="md:hidden flex" onClick={openMenu}>
            <FaBars className="text-2xl" />
          </Button>
        </div>
      </header>

      {menuOpen && (
        <nav
          className={`fixed md:hidden flex flex-col gap-3 items-center justify-center bg-light dark:bg-dark inset-0 z-50 scale-0 origin-center transition-transform motion-reduce:transition-none!  ease-in-out ${isVisible ? "scale-100 duration-250" : "scale-0 delay-150 duration-150"}`}
        >
          <Wheel
            size={1000}
            className="absolute md:right-80 right-0 -z-50 opacity-3 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
            speed={70}
            isDark={isDark}
          />

          <div
            className={`fixed top-0 p-3 pt-5 w-full flex justify-end items-center opacity-0 transition-opacity motion-reduce:transition-none! ${isVisible ? "opacity-100 delay-250 transition-700" : "delay-none transition-150"}`}
          >
            <Button variant="none" onClick={closeMenu}>
              <FaX className="text-2xl" />
            </Button>
          </div>
          <Link
            to="/"
            className={`${linkClasses} opacity-0 transition-opacity motion-reduce:transition-none! font-semibold! ${isVisible ? "opacity-100 delay-400 transition-500" : "delay-none transition-150"}`}
            onClick={closeMenu}
          >
            Početna
          </Link>
          <Link
            to="/usluge"
            className={`${linkClasses} opacity-0 transition-opacity motion-reduce:transition-none! font-semibold! ${isVisible ? "opacity-100 delay-400 transition-500" : "delay-none transition-150"}`}
            onClick={closeMenu}
          >
            Usluge
          </Link>
          <Link
            to="/kontakt"
            className={`${linkClasses} opacity-0 transition-opacity motion-reduce:transition-none! font-semibold! ${isVisible ? "opacity-100 delay-400 transition-500" : "delay-none transition-150"}`}
            onClick={closeMenu}
          >
            Kontakt
          </Link>
        </nav>
      )}
    </>
  );
};

export default Navigation;

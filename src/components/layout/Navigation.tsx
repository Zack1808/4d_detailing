import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";

import Button from "../ui/Button";
import Logo from "../ui/Logo";
import Wheel from "../animated/Wheel";

import { BUSINESS } from "../../config/business";
import { NAV_LINKS, PATHS } from "../../config/paths";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useIsDark } from "../../hooks/useMediaQuery";
import { useTransitionMount } from "../../hooks/useTransitionMount";
import { cn } from "../../utils/cn";

const SOLID_AT_PX = 500;
const MIN_OPACITY = 10;
const MAX_OPACITY = 95;
const MENU_EXIT_MS = 350;

const linkClasses =
  "flex w-full items-center justify-center px-4 py-3 text-lg font-normal md:w-max";

const Navigation = () => {
  const isDark = useIsDark();

  const [opacity, setOpacity] = useState(MIN_OPACITY);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLElement>(null);

  const { mounted, visible } = useTransitionMount(menuOpen, MENU_EXIT_MS);
  const closeMenu = () => setMenuOpen(false);

  useBodyScrollLock(mounted);
  useFocusTrap(menuRef, mounted && menuOpen, closeMenu);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const percentage = Math.round((window.scrollY / SOLID_AT_PX) * 100);

      setOpacity(Math.min(MAX_OPACITY, Math.max(MIN_OPACITY, percentage)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const menuLinkClasses = cn(
    linkClasses,
    "font-semibold! opacity-0 transition-opacity motion-reduce:transition-none!",
    visible ? "opacity-100 delay-400 duration-500" : "duration-150",
  );

  return (
    <>
      <header
        className={cn(
          "fixed z-40 flex w-full items-center justify-center px-6 py-3 shadow-sm md:px-3",
          opacity > 50 ? "backdrop-blur-xl" : "backdrop-blur-xs",
        )}
        style={{
          backgroundColor: `color-mix(in srgb, var(${isDark ? "--color-dark" : "--color-light"}) ${opacity}%, transparent)`,
        }}
      >
        <div className="flex w-full justify-between gap-4 md:max-w-[1700px]">
          <Link
            to={PATHS.home}
            aria-label={`${BUSINESS.name} – početna`}
            className="flex items-center justify-center gap-4 md:w-max"
          >
            <Logo width={96} height={84} className="w-16 md:w-24" />
            <span className="hidden text-4xl font-bold md:flex">
              {BUSINESS.name}
            </span>
          </Link>

          <nav
            aria-label="Glavna navigacija"
            className="hidden items-center justify-center md:flex"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end className={linkClasses}>
                {label}
              </NavLink>
            ))}
          </nav>

          <Button
            variant="none"
            className="flex md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Otvori izbornik"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <FaBars className="text-2xl" aria-hidden="true" />
          </Button>
        </div>
      </header>

      {mounted && (
        <nav
          id="mobile-menu"
          ref={menuRef}
          tabIndex={-1}
          aria-label="Izbornik"
          className={cn(
            "fixed inset-0 z-50 flex origin-center flex-col items-center justify-center gap-3 bg-light transition-transform ease-in-out motion-reduce:transition-none! md:hidden dark:bg-dark",
            visible
              ? "scale-100 duration-250"
              : "scale-0 delay-150 duration-150",
          )}
        >
          <Wheel
            size={1000}
            speed={70}
            isDark={isDark}
            className="pointer-events-none absolute top-100 right-0 -z-50 translate-x-1/2 -translate-y-3/7 rotate-z-180 opacity-5"
          />

          <div
            className={cn(
              "fixed top-0 flex w-full items-center justify-end p-3 pt-5 transition-opacity motion-reduce:transition-none!",
              visible
                ? "opacity-100 delay-250 duration-700"
                : "opacity-0 duration-150",
            )}
          >
            <Button
              variant="none"
              onClick={closeMenu}
              aria-label="Zatvori izbornik"
            >
              <FaX className="text-2xl" aria-hidden="true" />
            </Button>
          </div>

          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={menuLinkClasses}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;

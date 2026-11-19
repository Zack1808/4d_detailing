import { useEffect, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

import MockBanner from "../components/MockBanner";
import { useAuth } from "../auth/AuthContext";
import { ADMIN_NAV } from "../paths";

import SEO from "../../components/seo/SEO";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";

import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTransitionMount } from "../../hooks/useTransitionMount";
import { cn } from "../../utils/cn";
import { notifyError } from "../../utils/toast";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-xs px-4 py-2 font-medium whitespace-nowrap transition-colors",
    isActive
      ? "bg-dark text-light dark:bg-light dark:text-dark"
      : "hover:bg-gray-light/20",
  );

const DRAWER_MS = 250;

type MobileNavProps = {
  open: boolean;
  email?: string | null;
  onClose: () => void;
  onSignOut: () => void;
};

const MobileNav = ({ open, email, onClose, onSignOut }: MobileNavProps) => {
  const { mounted, visible } = useTransitionMount(open, DRAWER_MS);
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(mounted);
  useFocusTrap(panelRef, mounted && open, onClose);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-gray-dark/40 backdrop-blur-sm transition-opacity duration-250 ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Izbornik"
        className={cn(
          "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-light p-4 shadow-2xl transition-transform duration-250 ease-out dark:bg-dark",
          visible ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo width={40} height={40} className="size-10" />
            <span className="text-lg font-semibold">Admin</span>
          </div>

          <button
            type="button"
            aria-label="Zatvori izbornik"
            onClick={onClose}
            className="cursor-pointer p-2 text-2xl"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Administracija" className="flex flex-col gap-1">
          {ADMIN_NAV.map(({ to, label, ...rest }) => (
            <NavLink
              key={to}
              to={to}
              end={"end" in rest ? rest.end : false}
              className={linkClasses}
              onClick={onClose}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <p className="text-sm font-light break-all text-gray-light">
            {email}
          </p>
          <Button variant="secondary" onClick={onSignOut}>
            Odjava
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  const handleSignOut = () =>
    signOut().catch(() =>
      notifyError("Odjava nije uspjela. Pokušajte ponovno"),
    );

  return (
    <div className="flex min-h-svh flex-col">
      <SEO title="Administracija | 4D Detailing" />

      <MockBanner className="lg:hidden" />

      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="sticky top-0 z-40 flex flex-col gap-3 border-b border-gray-light/20 bg-light p-3 dark:bg-dark lg:z-auto lg:bg-transparent lg:sticky lg:top-0 lg:h-svh lg:w-64 lg:shrink-0 lg:gap-9 lg:border-r lg:border-b-0 lg:p-6">
          <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
            <div className="flex items-center gap-3">
              <Logo width={40} height={40} className="size-10" />
              <span className="text-lg font-semibold">Admin</span>
            </div>

            <button
              type="button"
              aria-label="Otvori izbornik"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer p-2 text-2xl lg:hidden"
            >
              <FaBars aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Administracija"
            className="hidden gap-1 lg:flex lg:flex-col"
          >
            {ADMIN_NAV.map(({ to, label, ...rest }) => (
              <NavLink
                key={to}
                to={to}
                end={"end" in rest ? rest.end : false}
                className={linkClasses}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto hidden flex-col gap-3 lg:flex">
            <p className="text-sm font-light break-all text-gray-light">
              {user?.email}
            </p>
            <Button variant="secondary" onClick={handleSignOut}>
              Odjava
            </Button>
          </div>
        </aside>

        <MobileNav
          open={menuOpen}
          email={user?.email}
          onClose={() => setMenuOpen(false)}
          onSignOut={handleSignOut}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <MockBanner className="hidden lg:flex" />

          <main className="flex flex-1 flex-col gap-9 p-6 md:p-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

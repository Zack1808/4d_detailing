import { NavLink, Outlet } from "react-router-dom";

import MockBanner from "../components/MockBanner";
import { useAuth } from "../auth/AuthContext";
import { ADMIN_NAV } from "../paths";

import SEO from "../../components/seo/SEO";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";

import { cn } from "../../utils/cn";
import { notifyError } from "../../utils/toast";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-xs px-4 py-2 font-medium whitespace-nowrap transition-colors",
    isActive
      ? "bg-dark text-light dark:bg-light dark:text-dark"
      : "hover:bg-gray-light/20",
  );

const AdminLayout = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () =>
    signOut().catch(() =>
      notifyError("Odjava nije uspjela. Pokušajte ponovno"),
    );

  return (
    <div className="flex min-h-svh flex-col">
      <SEO title="Administracija | 4D Detailing" />

      <MockBanner className="lg:hidden" />

      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="flex flex-col gap-3 border-b border-gray-light/20 p-3 lg:sticky lg:top-0 lg:h-svh lg:w-64 lg:shrink-0 lg:gap-9 lg:border-r lg:border-b-0 lg:p-6">
          <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
            <div className="flex items-center gap-3">
              <Logo width={40} height={40} className="size-10" />
              <span className="text-lg font-semibold">Admin</span>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <Button
                variant="secondary"
                className="px-3 py-2 text-sm"
                onClick={handleSignOut}
              >
                Odjava
              </Button>
            </div>
          </div>

          <nav
            aria-label="Administracija"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
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

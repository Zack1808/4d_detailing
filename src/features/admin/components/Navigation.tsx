import React from "react";
import {
  FaServer,
  FaScroll,
  FaStar,
  FaCalendarCheck,
  FaPowerOff,
} from "react-icons/fa6";

import Button from "@/shared/components/Button";

import { useTheme } from "@/shared/context/ThemeContext";
import { useAdminAuth } from "@/features/auth/context/AuthContext";

const Navigation: React.FC = () => {
  const { isDark } = useTheme();
  const { signOut } = useAdminAuth();

  return (
    <header className="h-dvh p-6 bg-gray-light/15 dark:bg-gray-dark/40 text-dark dark:text-light flex flex-col gap-15">
      <Button to="/admin/dashboard" className="flex gap-6">
        <img
          src={isDark ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
          alt="4D Detailing"
          width={96}
          height={84}
          className="md:w-20 w-16"
        />
        <span className="text-3xl font-semibold">Admin</span>
      </Button>

      <nav className="flex-1 flex flex-col">
        <Button
          to="/admin/dashboard"
          className="max-w-none flex items-center gap-3"
        >
          <FaServer className="text-2xl" />
          Dashboard
        </Button>
        <Button
          to="/admin/usluge"
          className="max-w-none flex items-center gap-3"
        >
          <FaScroll className="text-2xl" />
          Usluge
        </Button>
        <Button
          to="/admin/reviews"
          className="max-w-none flex items-center gap-3"
        >
          <FaStar className="text-2xl" />
          Recenzije
        </Button>
        <Button
          to="/admin/termini"
          className="max-w-none flex items-center gap-3"
        >
          <FaCalendarCheck className="text-2xl" />
          Termini
        </Button>

        <Button className="mt-auto flex items-center gap-3" onClick={signOut}>
          <FaPowerOff className="text-2xl" />
          Odjava
        </Button>
      </nav>
    </header>
  );
};

export default Navigation;

import React from "react";
import {
  FaServer,
  FaScroll,
  FaStar,
  FaCalendarCheck,
  FaPowerOff,
} from "react-icons/fa6";

import Button from "@/shared/components/Button";

import { useAdminAuth } from "@/features/auth/context/AuthContext";

const Navigation: React.FC = () => {
  const { signOut } = useAdminAuth();

  return (
    <header className="h-dvh p-6 bg-gray-light/15 dark:bg-gray-dark/40 text-dark dark:text-light flex flex-col gap-15 min-w-74  sticky top-0">
      <Button to="/admin/dashboard" className="flex gap-6">
        <span className="text-3xl font-semibold">Admin</span>
      </Button>

      <nav className="flex-1 flex flex-col gap-3">
        <Button
          to="/admin/dashboard"
          className="max-w-none flex justify-start items-center gap-3"
        >
          <FaServer className="text-xl" />
          <span className="mt-1">Dashboard</span>
        </Button>
        <Button
          to="/admin/usluge"
          className="max-w-none flex justify-start items-center gap-3"
        >
          <FaScroll className="text-xl" />
          <span className="mt-0.5">Usluge</span>
        </Button>
        <Button
          to="/admin/recenzije"
          className="max-w-none flex justify-start items-center gap-3"
        >
          <FaStar className="text-xl" />
          <span className="mt-1">Recenzije</span>
        </Button>
        <Button
          to="/admin/termini"
          className="max-w-none flex justify-start items-center gap-3"
        >
          <FaCalendarCheck className="text-xl" />
          <span className="mt-1">Termini</span>
        </Button>

        <Button
          className="mt-auto flex justify-start items-center gap-3"
          onClick={signOut}
        >
          <FaPowerOff className="text-xl" />
          <span className="mt-1">Odjava</span>
        </Button>
      </nav>
    </header>
  );
};

export default Navigation;

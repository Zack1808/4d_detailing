import React from "react";
import { FaCopyright } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary px-4 py-4 border-t-thertiary border-t flex items-center justify-center">
      <div className="w-full md:max-w-[1700px] flex justify-center align-center gap-2 text-dark">
        <FaCopyright className="mt-1" /> JPN
      </div>
    </footer>
  );
};

export default Footer;

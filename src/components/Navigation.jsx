import React from "react";
import { Link } from "react-router-dom";

import "../css/components/Navigation.css";

const MobileNavigation = () => {
  return <div className="mobile-nav-container">Mobile Navigation</div>;
};

const DesktopNavigation = () => {
  return <div className="desktop-nav-container">Desktop Navigation</div>;
};

const Navigation = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <img
            className="navbar-logo"
            src="/logo.webp"
            alt="4D Detailing logo"
          />
        </Link>
        <MobileNavigation />
        <DesktopNavigation />
      </nav>
    </header>
  );
};

export default Navigation;

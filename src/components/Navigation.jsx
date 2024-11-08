import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "../css/components/Navigation.css";

const MobileNavigation = () => {
  return <div className="mobile-nav-container">Mobile Navigation</div>;
};

const Navigation = () => {
  return (
    <header>
      <Link to="/">
        <img className="navbar-logo" src="/logo.webp" alt="4D Detailing logo" />
      </Link>
      <nav></nav>
      <FaBars className="menu-icon" />
    </header>
  );
};

export default Navigation;

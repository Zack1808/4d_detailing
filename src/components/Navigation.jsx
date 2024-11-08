import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "../css/components/Navigation.css";

const Nav = ({ className }) => {
  <nav className={className}></nav>;
};

export const MobileNavigation = () => {
  return (
    <div className="mobile-nav-container">
      <Nav className="mobile-navigation"></Nav>
    </div>
  );
};

export const Navigation = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img
            className="navbar-logo"
            src="/logo.webp"
            alt="4D Detailing logo"
          />
        </Link>
        <Nav className="desktop-navigation"></Nav>
        <FaBars className="menu-icon" />
      </div>
    </header>
  );
};

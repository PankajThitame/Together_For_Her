import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import ThemeToggle from "./ThemeToggle";
import AuthDropdown from "../auth/AuthDropdown";

const NavLinks = ({ setMenuOpen }) => {
  return (
    <ul className="nav-links">
      <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
      <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
      <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
      <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      <li><Link to="/feedback" onClick={() => setMenuOpen(false)}>Feedback</Link></li>
      <li><Link to="/nearbyhelp" onClick={() => setMenuOpen(false)}>Help</Link></li>
     <AuthDropdown/>
    </ul>
  );
};

export default NavLinks;

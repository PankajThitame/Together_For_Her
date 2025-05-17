import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LoginTabs from "./LoginTabs";
import "../styles/navbar.css";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <section className="main-logo">
      <div className="logo">
          <img src="/images/logo.png" alt="Partner 1" />
         </div>
      </section>
      {/* Hamburger Menu */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navbar Links */}
      <div className={`menu-container ${menuOpen ? "active" : ""}`}>
        <NavLinks setMenuOpen={setMenuOpen} />
      </div>
    </nav>
  );
}

export default Navbar;

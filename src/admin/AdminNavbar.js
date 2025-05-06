import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavLinks from "./AdminNavLinks";
import "../styles/navbar.css";


function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <section className="main-logo">
        <div className="logo">
          <img src="/images/logo.png" alt="Together_for_Her Admin" />
        </div>
      </section>

      {/* Hamburger Menu */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Admin Links */}
      <div className={`menu-container ${menuOpen ? "active" : ""}`}>
        <AdminNavLinks setMenuOpen={setMenuOpen} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default AdminNavbar;

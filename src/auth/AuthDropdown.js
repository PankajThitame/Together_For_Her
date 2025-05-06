import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ChevronDown, User, LogOut, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import "../styles/authDropdown.css"; // Ensure you have styles

const AuthDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle Logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply theme on initial load
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <div className="auth-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {user ? (
          <img
            src={user.profilePic || "/images/pads.png"}
            alt="User Avatar"
            className="user-avatar"
          />
        ) : (
          <User className="icon" />
        )}
        <ChevronDown className="icon" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {user ? (
            <>
              {/* User Info */}
              <div className="dropdown-header">
                <img
                  src={user.profilePic || "/images/pads.png"}
                  alt="Profile"
                  className="user-avatar"
                />
                <div>
                  <p>{user.username}</p>
                  <small>{user.email}</small>
                </div>
              </div>

              {/* Profile Link */}
              <Link to="/userprofile" className="dropdown-item">
                <User className="icon" /> Profile
              </Link>

              {/* Theme Toggle */}
              <a className="dropdown-item" onClick={toggleTheme}>
                {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
                {darkMode ? " Light Mode" : " Dark Mode"}
              </a>

              {/* Logout */}
              <a className="dropdown-item" onClick={handleLogout}>
                <LogOut className="icon" /> Logout
              </a>
            </>
          ) : (
            <>
              {/* Login & Sign Up Links */}
              <Link to="/login" className="dropdown-item">
                <LogIn className="icon" /> Login
              </Link>
              <Link to="/sign-up" className="dropdown-item">
                <UserPlus className="icon" /> Sign Up
              </Link>

              {/* Theme Toggle for Guest Users */}
              <a className="dropdown-item" onClick={toggleTheme}>
                {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
                {darkMode ? " Light Mode" : " Dark Mode"}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;

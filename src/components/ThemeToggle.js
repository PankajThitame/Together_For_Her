import React, { useState } from "react";
import "../styles/themeToggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="toggle-btn-new">
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
    </div>
  );
};

export default ThemeToggle;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const LoginTabs = () => {
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = (role) => {
    setActiveTab(role);
    if (role === "user") {
      navigate("/user-login"); // Navigate to User Login
    } else {
      navigate("/admin-login"); // Navigate to Admin Login
    }
  };

  return (
    <div className="login-tabs">
      <button
        className={activeTab === "user" ? "active" : ""}
        onClick={() => handleLoginClick("user")}
      >
        User Login
      </button>
      <button
        className={activeTab === "admin" ? "active" : ""}
        onClick={() => handleLoginClick("admin")}
      >
        Admin Login
      </button>
    </div>
  );
};

export default LoginTabs;

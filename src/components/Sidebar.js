import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/users">👥 Users</Link></li>
        <li><Link to="/donations">💰 Donations</Link></li>
        <li><Link to="/content">📝 Content</Link></li>
        <li><Link to="/products">🛍 Products</Link></li>
        <li><Link to="/reports">📈 Reports</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

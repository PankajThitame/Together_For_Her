import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/navbar.css";
import AuthDropdown from "../auth/AuthDropdown";

const AdminNavLinks = ({ setMenuOpen, handleLogout }) => {
  return (
    <ul className="nav-links">
      {/* Admin Dashboard Links */}
      <li><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
      <li><Link to="/admin/users" onClick={() => setMenuOpen(false)}>User Management</Link></li>
      <li><Link to="/admin/requests" onClick={() => setMenuOpen(false)}>Request Management</Link></li>
      <li><Link to="/admin/analytics" onClick={() => setMenuOpen(false)}>Analytics</Link></li>
      <li><Link to="/admin/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link></li>

      {/* Profile Dropdown */}
      {/* <li className="profile-dropdown">
        <button className="profile-btn">Admin ⬇️</button>
        <div className="dropdown-content">
          <Link to="/admin/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/admin/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </li> */}
        <AuthDropdown/>
    </ul>
  );
};

export default AdminNavLinks;

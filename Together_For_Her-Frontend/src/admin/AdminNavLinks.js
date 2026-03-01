import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import AuthDropdown from "../auth/AuthDropdown";

const AdminNavLinks = ({ setMenuOpen, handleLogout }) => {
  return (
    <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 list-none text-gray-700 font-black text-[11px] uppercase tracking-[0.15em]">
      <li className="my-1 md:my-0">
        <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-pink-600 transition-colors">Dashboard</Link>
      </li>
      <li className="my-1 md:my-0">
        <Link to="/admin/users" onClick={() => setMenuOpen(false)} className="hover:text-pink-600 transition-colors">Users</Link>
      </li>
      <li className="my-1 md:my-0">
        <Link to="/admin/requests" onClick={() => setMenuOpen(false)} className="hover:text-pink-600 transition-colors">Requests</Link>
      </li>
      <li className="my-1 md:my-0">
        <Link to="/admin/fund-management" onClick={() => setMenuOpen(false)} className="hover:text-pink-600 transition-colors">Funds</Link>
      </li>
      <li className="my-1 md:my-0">
        <Link to="/admin/volunteer-management" onClick={() => setMenuOpen(false)} className="hover:text-pink-600 transition-colors">Volunteers</Link>
      </li>
      <li className="ml-0 md:ml-4 flex items-center gap-4 border-t md:border-t-0 md:border-l border-pink-100/50 pt-4 md:pt-0 md:pl-8">
        <ThemeToggle />
        <AuthDropdown />
      </li>
    </ul>
  );
};

export default AdminNavLinks;

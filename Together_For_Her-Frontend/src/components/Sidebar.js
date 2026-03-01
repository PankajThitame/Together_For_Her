// ✅ Tailwind CSS version of Sidebar component
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-green-600 fixed top-[60px] left-0 p-5 overflow-y-auto z-40 text-white">
      <h2 className="text-center text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-yellow-300 flex items-center text-lg">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/users" className="hover:text-yellow-300 flex items-center text-lg">
            👥 Users
          </Link>
        </li>
        <li>
          <Link to="/donations" className="hover:text-yellow-300 flex items-center text-lg">
            💰 Donations
          </Link>
        </li>
        <li>
          <Link to="/content" className="hover:text-yellow-300 flex items-center text-lg">
            📝 Content
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-yellow-300 flex items-center text-lg">
            🛍 Products
          </Link>
        </li>
        <li>
          <Link to="/reports" className="hover:text-yellow-300 flex items-center text-lg">
            📈 Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

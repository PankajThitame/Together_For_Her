import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers, FaChartPie, FaClipboardList, FaMapMarkedAlt,
  FaHandHoldingUsd, FaChartBar, FaShieldAlt, FaUserCheck, FaComments,
  FaArrowLeft, FaArrowRight, FaDatabase
} from "react-icons/fa";

const AdminSidePanel = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { to: "/admin/dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
    { to: "/admin/requests", icon: <FaClipboardList />, label: "Requests" },
    { to: "/admin/address-map", icon: <FaMapMarkedAlt />, label: "Address Map" },
    { to: "/admin/fund-management", icon: <FaHandHoldingUsd />, label: "Funds" },
    { to: "/admin/content-moderation", icon: <FaShieldAlt />, label: "Moderation" },
    { to: "/admin/manage-content", icon: <FaDatabase />, label: "Repository" },
    { to: "/admin/volunteer-management", icon: <FaUserCheck />, label: "Volunteers" },
    { to: "/admin/feedback-system", icon: <FaComments />, label: "Feedback" },
  ];

  return (
    <div
      className={`h-full transition-all duration-300 ease-in-out relative flex flex-col 
      ${isOpen ? "w-72" : "w-20"} bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl border-r border-pink-200/50 dark:border-slate-600 shadow-2xl overflow-hidden group`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-5 top-12 bg-white dark:bg-slate-800 text-pink-600 p-2 rounded-xl shadow-xl hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-50 dark:border-slate-500 transition-all z-[100] group/btn"
      >
        <div className="group-hover/btn:scale-125 transition-transform">
          {isOpen ? <FaArrowLeft size={12} /> : <FaArrowRight size={12} />}
        </div>
      </button>

      <div className="flex flex-col h-full py-8">
        <div className={`px-8 mb-6 ${!isOpen && "flex justify-center"}`}>
          {isOpen ? (
            <h2 className="text-gray-900 dark:text-slate-100 font-black text-xs uppercase tracking-[0.2em] italic">Control</h2>
          ) : (
            <div className="w-6 h-1 bg-pink-500 rounded-full" />
          )}
        </div>
        <ul className="flex-1 space-y-1.5 px-4 overflow-hidden">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group/item relative ${location.pathname === item.to
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                  : "text-gray-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800/50 hover:text-pink-600"
                  }`}
              >
                <span className="text-xl min-w-[24px]">
                  {item.icon}
                </span>
                {isOpen && (
                  <span className="font-black text-[11px] uppercase tracking-wider whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                {!isOpen && (
                  <div className="absolute left-16 bg-gray-900 text-white text-[10px] font-black px-3 py-2 rounded-xl opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all uppercase tracking-widest whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidePanel;

import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { getProfileImageUrl } from "../apiConfig";
import {
  FaUser, FaUsers, FaDonate, FaClipboardList, FaHandsHelping,
  FaStore, FaChartBar, FaShieldAlt, FaUserCheck, FaComments,
  FaChevronLeft, FaChevronRight, FaInfoCircle, FaHandHoldingHeart
} from "react-icons/fa";

const SidePanel = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : user?.username
      ? user.username.split(" ").map(n => n[0]).join("").toUpperCase()
      : "TH";

  const menuItems = [
    { label: "Awareness", to: "/awareness", icon: <FaInfoCircle /> },
    { label: "Donate", to: "/donate", icon: <FaHandHoldingHeart /> },
    { label: "Volunteer", to: "/join-volunteer", icon: <FaHandsHelping /> },
    { label: "Marketplace", to: "/marketplace", icon: <FaStore /> },
    { label: "Community", to: "/community", icon: <FaComments /> },
    { label: "Share Experiences", to: "/content", icon: <FaHandsHelping /> },
    { label: "Collective Wisdom", to: "/gallery", icon: <FaInfoCircle /> },
    { label: "My Stories", to: "/my-stories", icon: <FaUserCheck /> },
    { label: "Request Kit", to: "/request-kit", icon: <FaClipboardList /> },
  ];

  const adminItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: <FaChartBar /> },
    { label: "Users", to: "/admin/users", icon: <FaUsers /> },
  ];

  return (
    <div
      className={`h-full transition-all duration-500 ease-in-out relative flex flex-col ${isOpen ? "w-[250px]" : "w-24"
        } bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-r border-white/20 dark:border-slate-800/20 shadow-none group overflow-hidden`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-4 top-12 bg-white dark:bg-slate-800 text-pink-500 p-2 rounded-xl shadow-lg hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-100 dark:border-slate-700 transition-all z-[100] group/btn"
      >
        <div className="group-hover/btn:scale-125 transition-transform">
          {isOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
        </div>
      </button>

      {/* Brand Header */}
      <div className={`p-8 mb-4 ${!isOpen && "flex justify-center"}`}>
        {isOpen ? (
          <div className="space-y-1">
            <h2 className="text-slate-900 dark:text-slate-100 font-black text-xl tracking-tighter uppercase italic">Explore</h2>
            <div className="h-1 w-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${location.pathname === item.to
              ? "bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white shadow-lg shadow-pink-200/50"
              : "text-slate-500 dark:text-slate-400 hover:bg-[#fce7f3] dark:hover:bg-pink-900/20 hover:text-[#ec4899]"
              }`}
          >
            <span className={`text-lg transition-all duration-300 group-hover:scale-110 ${location.pathname === item.to ? "text-white" : "group-hover:text-[#ec4899]"
              }`}>
              {item.icon}
            </span>
            {isOpen && (
              <span className="font-bold text-[13px] tracking-wide uppercase">
                {item.label}
              </span>
            )}
            {!isOpen && (
              <div className="absolute left-24 bg-slate-900 text-white text-[10px] font-black px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all uppercase tracking-widest whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </Link>
        ))}

        <div className="my-6 mx-2 h-px bg-slate-200/50 dark:bg-slate-800/50" />

        {role === "admin" && (
          <div className="mt-4">
            {isOpen && (
              <p className="px-5 text-[10px] font-black text-pink-300 mb-4 tracking-[0.2em] uppercase">
                Admin Station
              </p>
            )}
            {adminItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${location.pathname === item.to
                  ? "bg-slate-900 text-white shadow-xl"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && (
                  <span className="font-bold text-[13px] tracking-wide uppercase">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* User Status Card */}
      <div className="p-6 mt-auto">
        <div className={`p-4 rounded-[1.5rem] ${isOpen ? "bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 shadow-sm" : "bg-transparent"
          } transition-all`}>
          {isOpen ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-pink-200 overflow-hidden">
                {user?.profilePhoto ? (
                  <img src={getProfileImageUrl(user.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
                ) : initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-900 dark:text-slate-100 leading-none truncate max-w-[120px]">{user?.name || "Her Community"}</span>
                <span className="text-[10px] text-pink-400 font-bold mt-1 uppercase tracking-tighter">{user?.role || "Verified Portal"}</span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-pink-100/50 dark:bg-slate-800/50 flex items-center justify-center text-pink-600 text-xs font-black mx-auto border border-pink-200/20 overflow-hidden">
              {user?.profilePhoto ? (
                <img src={getProfileImageUrl(user.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
              ) : initials}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;

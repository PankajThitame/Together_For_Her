import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaMapMarkedAlt,
    FaTasks,
    FaBoxOpen,
    FaHeadset,
    FaEnvelope,
    FaChartLine,
    FaTrophy,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

const VolunteerSidebar = ({ isOpen }) => {
    const { logout } = useAuth();

    const navItems = [
        { icon: <FaHome size={20} />, label: "Overview", path: "/volunteer/dashboard" },
        { icon: <FaMapMarkedAlt size={20} />, label: "Nearby Requests", path: "/volunteer/requests" },
        { icon: <FaTasks size={20} />, label: "Assigned Tasks", path: "/volunteer/tasks" },
        { icon: <FaBoxOpen size={20} />, label: "Kit Distribution", path: "/volunteer/kits" },
        { icon: <FaHeadset size={20} />, label: "Support Cases", path: "/volunteer/support" },
        { icon: <FaEnvelope size={20} />, label: "Messages", path: "/volunteer/messages" },
        { icon: <FaChartLine size={20} />, label: "Impact Report", path: "/volunteer/impact" },
        { icon: <FaTrophy size={20} />, label: "Achievements", path: "/volunteer/achievements" },
    ];

    return (
        <div className={`h-full flex flex-col bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-r border-pink-200/50 dark:border-slate-500/20 transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
            {/* Header */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 dark:border-slate-500/10">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[3rem] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-500/20">
                    V
                </div>
                {isOpen && (
                    <span className="ml-3 font-black text-slate-800 dark:text-white tracking-tight animate-fadeIn">
                        Volunteer<span className="text-pink-500">.</span>
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        end={item.path === "/volunteer/dashboard"}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3.5 rounded-[3rem] transition-all duration-300 group ${isActive
                                ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25"
                                : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-pink-600 dark:hover:text-pink-400"
                            }`
                        }
                    >
                        <span className="shrink-0 transition-transform group-hover:scale-110 duration-300">
                            {item.icon}
                        </span>
                        {isOpen && (
                            <span className="ml-4 font-bold text-sm tracking-wide animate-fadeIn">
                                {item.label}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Settings */}
            <div className="p-3 border-t border-white/10 dark:border-slate-500/10 space-y-2">
                <NavLink
                    to="/volunteer/settings"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-[3rem] transition-all duration-300 group ${isActive
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                            : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-200"
                        }`
                    }
                >
                    <FaCog size={20} className="shrink-0 group-hover:rotate-90 transition-transform duration-500" />
                    {isOpen && <span className="ml-4 font-bold text-sm">Settings</span>}
                </NavLink>

                <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-3.5 rounded-[3rem] text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-all duration-300 group"
                >
                    <FaSignOutAlt size={20} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
                    {isOpen && <span className="ml-4 font-bold text-sm">Sign Out</span>}
                </button>
            </div>
        </div>
    );
};

export default VolunteerSidebar;

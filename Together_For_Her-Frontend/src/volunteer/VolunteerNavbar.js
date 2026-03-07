import React from 'react';
import { useAuth } from '../auth/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import AuthDropdown from '../auth/AuthDropdown';
import { FaBars } from 'react-icons/fa';

const VolunteerNavbar = ({ isSidebarOpen, setSidebarOpen }) => {
    return (
        <nav className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-pink-200/50 dark:border-slate-600 px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-[3rem] hover:bg-pink-50 dark:hover:bg-slate-800 text-pink-600 transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    <FaBars size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="bg-pink-500 p-1.5 rounded-[3rem] rotate-3">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="w-5 h-5 object-contain brightness-200"
                        />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent hidden md:block">
                        Volunteer Dashboard
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <ThemeToggle />
                <div className="border-l border-pink-100/50 pl-6 dark:border-slate-500">
                    <AuthDropdown />
                </div>
            </div>
        </nav>
    );
};

export default VolunteerNavbar;

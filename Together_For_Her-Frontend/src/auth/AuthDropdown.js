import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { getProfileImageUrl } from "../apiConfig";
import {
  ChevronDown,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";

const AuthDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 p-1 rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none group"
        onClick={toggleDropdown}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500 rounded-full blur-[6px] opacity-0 group-hover:opacity-20 transition-opacity"></div>
          {user ? (
            <img
              src={getProfileImageUrl(user.profilePhoto || user.profilePic)}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-pink-200 dark:group-hover:border-pink-900 transition-all relative z-10"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-slate-800 flex items-center justify-center text-pink-500 relative z-10">
              <User size={20} />
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full z-20"></div>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 dark:text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-72 bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-pink-200/70 dark:border-slate-600/50 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] overflow-hidden animate-fadeIn origin-top-right">
          {/* Internal Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {user ? (
              <>
                <div className="p-6 border-b border-slate-100 dark:border-slate-600/50">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={getProfileImageUrl(user.profilePhoto || user.profilePic)}
                        alt="Profile"
                        className="w-12 h-12 rounded-[3rem] object-cover shadow-md"
                      />
                      <div className="absolute -top-1.5 -right-1.5 bg-pink-500 text-[8px] font-black text-white px-1.5 py-0.5 rounded-[3rem] uppercase tracking-wider">
                        {user.role}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 dark:text-white text-sm truncate tracking-tight">{user.username}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <Link
                    to={user.role === 'VOLUNTEER' ? "/volunteer/profile" : "/profile"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-bold text-[13px]"
                  >
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-[3rem] group-hover:bg-white transition-colors">
                      <User size={16} />
                    </div>
                    My Identity
                  </Link>

                  <button
                    className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-bold text-[13px] w-full text-left"
                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                  >
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-[3rem] group-hover:bg-white transition-colors">
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </div>
                    {darkMode ? "Sunlight Mode" : "Moonlit Mode"}
                  </button>

                  <div className="my-2 mx-4 h-px bg-slate-100 dark:bg-slate-800/50"></div>

                  <button
                    className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all font-black text-[11px] uppercase tracking-widest w-full text-left"
                    onClick={handleLogout}
                  >
                    <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-[3rem] transition-colors">
                      <LogOut size={16} />
                    </div>
                    End Session
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-bold text-[13px]"
                >
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-[3rem] transition-colors">
                    <LogIn size={16} />
                  </div>
                  Member Gateway
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-white bg-gradient-to-r from-pink-500 to-rose-600 shadow-lg shadow-pink-200/50 hover:shadow-xl hover:translate-y-[-2px] transition-all font-bold text-[13px] my-1"
                >
                  <div className="p-2 bg-white/20 rounded-[3rem] transition-colors">
                    <UserPlus size={16} />
                  </div>
                  Join Community
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-[3rem] text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-bold text-[13px] w-full text-left"
                  onClick={() => { toggleTheme(); setIsOpen(false); }}
                >
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-[3rem] transition-colors">
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                  Light / Dark
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;

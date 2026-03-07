import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthDropdown from "../auth/AuthDropdown";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = (role) => {
    navigate(role === "user" ? "/login" : "/admin/dashboard");
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Community", to: "/community" },
    { label: "Marketplace", to: "/marketplace" },
    { label: "Volunteer", to: "/join-volunteer" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-pink-100/30 dark:border-slate-600 px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-pink-500 p-2 rounded-[3rem] group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-pink-200">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain brightness-200"
            />
          </div>
          <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            TogetherForHer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`text-sm font-bold transition-all duration-300 relative py-1 hover:text-pink-600 ${location.pathname === to
                    ? "text-pink-600 after:w-full"
                    : "text-gray-500 dark:text-slate-400 after:w-0"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-pink-600 after:transition-all hover:after:w-full`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6 pl-8 border-l border-pink-100/50">
            <ThemeToggle />
            <AuthDropdown />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 text-pink-600 hover:bg-pink-50 rounded-[3rem] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-pink-100 dark:border-slate-600 shadow-2xl transition-all duration-500 ease-out transform ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
      >
        <div className="p-8 flex flex-col gap-8">
          <ul className="flex flex-col gap-6">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xl font-black transition-colors ${location.pathname === to ? "text-pink-600" : "text-gray-400 dark:text-slate-500 hover:text-pink-500"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 pt-8 border-t border-pink-50">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Interface Mode</span>
              <ThemeToggle />
            </div>
            <button
              onClick={() => handleLoginClick("admin")}
              className="w-full px-6 py-4 border-2 border-pink-100 dark:border-slate-600 text-pink-600 rounded-[3rem] text-sm font-black hover:bg-pink-50 dark:hover:bg-slate-800 transition-all"
            >
              Admin Gateway
            </button>
            <button
              onClick={() => handleLoginClick("user")}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[3rem] text-sm font-black shadow-xl shadow-pink-200"
            >
              Member Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

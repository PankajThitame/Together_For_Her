import React from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-root bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl text-slate-600 dark:text-slate-400 mt-20 border-t border-pink-100/50 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-10 py-[60px] box-border space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] gap-[60px] items-start">
          {/* COLUMN 1: Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2.5 rounded-2xl group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/20">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
              </div>
              <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter uppercase italic">
                Together<span className="text-pink-500">ForHer</span>
              </span>
            </Link>

            <p className="max-w-[280px] text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-semibold italic">
              "Providing the knowledge, safety, and community every woman deserves to thrive with dignity."
            </p>

            <div className="flex items-center gap-4 pt-4">
              {[Instagram, Twitter, Facebook, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Resources */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest mb-6">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Awareness", to: "/awareness" },
                { label: "Services", to: "/services" },
                { label: "Community", to: "/community" },
                { label: "Marketplace", to: "/marketplace" },
                { label: "Help Center", to: "/faq" }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold hover:text-pink-500 transition-colors italic">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Get Involved */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest mb-6">
              Get Involved
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Volunteer", to: "/join-volunteer" },
                { label: "Donate", to: "/donate" },
                { label: "Empowerment", to: "/empowerment" },
                { label: "Newsletter", to: "/newsletter" },
                { label: "Our Story", to: "/about" }
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-bold hover:text-pink-500 transition-colors italic">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEPARATE: Contact Us Section */}
        <div className="pt-16 border-t border-slate-100 dark:border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">
                Safe Sanctuary
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-pink-50 dark:bg-pink-900/20 text-pink-500 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin size={22} />
                </div>
                <p className="text-sm font-black italic tracking-tight leading-relaxed">
                  Pune Hub, MH 411045,<br />India
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">
                Digital Hive
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-sky-50 dark:bg-sky-900/20 text-sky-500 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail size={22} />
                </div>
                <p className="text-sm font-black italic tracking-tight break-all">
                  support@togetherforher.org
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">
                Guardian Line
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone size={22} />
                </div>
                <p className="text-sm font-black italic tracking-tight">
                  +91 7821 828 016
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-[60px] pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            © {new Date().getFullYear()} Together for Her. Crafted with <Heart size={10} className="inline text-rose-500 animate-pulse mx-1" /> for Change.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link to="/privacy-policy" className="hover:text-pink-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-pink-500 transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-pink-500 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminNavLinks from "./AdminNavLinks";

function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
        <div className="bg-pink-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto brightness-200" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Together_for_Her <span className="text-sm font-medium text-gray-400 dark:text-slate-500 ml-1">Admin</span>
        </h1>
      </div>

      {/* Hamburger Icon */}
      <div
        className="md:hidden p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-slate-800 text-pink-600 transition-colors cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="text-2xl">☰</span>
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute top-full left-0 w-full bg-white/90 dark:bg-slate-900/95 backdrop-blur-lg border-b border-pink-100 dark:border-slate-800 md:static md:w-auto md:bg-transparent md:border-none md:flex transition-all duration-300 ease-in-out z-50 ${menuOpen ? "block" : "hidden"
          }`}
      >
        <AdminNavLinks setMenuOpen={setMenuOpen} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default AdminNavbar;

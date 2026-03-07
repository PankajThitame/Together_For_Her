import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

import API_BASE_URL from "../apiConfig";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id); // Store raw ID
        localStorage.setItem("userid", data.user.id); // Support legacy lowercase key temporarily

        login(data.user, data.token);

        if (data.user.role === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else if (data.user.role === "VOLUNTEER") {
          navigate("/volunteer/dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(data.message || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Unable to connect to service. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-500 transition-all duration-300">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-4 rounded-3xl shadow-lg shadow-pink-200 dark:shadow-none mb-6">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent uppercase tracking-tighter">
            Welcome Back
          </h2>
          <p className="text-gray-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">
            Secure Member Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="group relative">
              <label className="block text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] pl-1 mb-2">Member Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 pl-12 pr-4 py-4 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm"
                  required
                />
              </div>
            </div>

            <div className="group relative">
              <label className="block text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] pl-1 mb-2">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 pl-12 pr-4 py-4 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-xs font-bold text-pink-500 hover:text-rose-600 transition-colors">
              Forgot security key?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-pink-200 dark:shadow-none hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Verifying...
              </>
            ) : (
              <>
                Authorize Access
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-pink-50 dark:border-slate-500">
          <p className="text-gray-400 dark:text-slate-500 text-xs font-bold">
            Not a member yet?{" "}
            <Link to="/sign-up" className="text-pink-600 dark:text-pink-400 hover:text-rose-700 transition-colors">
              Create Secure Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


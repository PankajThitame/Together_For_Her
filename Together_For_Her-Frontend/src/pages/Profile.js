import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { getProfileImageUrl } from "../apiConfig";
import CombinedUserForm from "../layouts/UserForm";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Briefcase,
  Languages,
  Heart,
  Edit3,
  LogOut,
  ChevronRight,
  Target,
  Clock,
  Award,
  Globe,
  Settings
} from "lucide-react";

/**
 * Premium Unified Profile Page - Vertical Alignment Edition
 * Refactored to align sections one after another for a cleaner flow.
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const userId = (localStorage.getItem("userId") || localStorage.getItem("userid") || "").toString().replace(/['"]+/g, '');
  const userObj = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userObj.role || "USER";

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!userId) {
        navigate("/login");
        return;
      }

      let apiUrl = `${API_BASE_URL}/auth/${userId}`;
      if (role === "VOLUNTEER") {
        apiUrl = `${API_BASE_URL}/volunteers/${userId}`;
      }

      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        setProfile(response.data);
        // Sync with local session
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...currentUser, ...response.data, name: response.data.firstName || response.data.name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId, role]);

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    fetchProfile();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-pink-500">
            <Heart size={32} className="animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Soul...</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <CombinedUserForm
            existingData={profile}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleUpdateSuccess}
          />
        </div>
      </div>
    );
  }

  // Volunteer Fields: experience, availability, volunteerType, reason, name
  // User Fields: firstName, age, socialStatus, preferredLanguage, healthConcerns, modeOfReachability, location
  const displayName = profile?.firstName || profile?.name || "Member";
  const displayRole = profile?.volunteerType ? `Elite Volunteer` : "Community Pillar";
  const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-transparent pb-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-rose-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12 relative z-10 space-y-8">

        {/* 1. Header Hero Card */}
        <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-pink-200/70 dark:border-slate-600/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="w-44 h-44 rounded-[2.5rem] border-4 border-white dark:border-slate-600 shadow-2xl relative z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
                {profile?.profilePhoto ? (
                  <img src={getProfileImageUrl(profile.profilePhoto)} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 font-extrabold text-5xl">
                    {initials}
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-3.5 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all z-20 border-4 border-white dark:border-slate-900"
              >
                <Edit3 size={20} />
              </button>
            </div>

            <div className="text-center md:text-left flex-1 py-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-widest mb-4">
                <ShieldCheck size={12} /> Account Verified
              </div>
              <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3 italic">
                {displayName}<span className="text-pink-500">.</span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                  <Briefcase size={16} className="text-pink-500" /> {displayRole}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2 border-l border-slate-200 dark:border-slate-600 pl-4">
                  <MapPin size={16} className="text-rose-500" /> {profile?.location || "Region Unset"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Tactical Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Clock size={22} />, label: "Tenure", val: profile?.experience || profile?.age || "0", unit: "yr" },
            { icon: <Award size={22} />, label: "Status", val: "Gold", unit: "" },
            { icon: <Heart size={22} />, label: "Vibe", val: "Glue", unit: "" },
            { icon: <Target size={22} />, label: "Impact", val: "9.8", unit: "" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-6 rounded-[2rem] border border-pink-200/70 dark:border-slate-600/50 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white italic">
                {stat.val}<span className="text-xs text-slate-400 ml-0.5">{stat.unit}</span>
              </h3>
            </div>
          ))}
        </section>

        {/* 3. Identity Breakdown */}
        <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-pink-200/70 dark:border-slate-600/50 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 dark:border-slate-600 pb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">Technical <span className="text-pink-500">Matrix.</span></h2>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 dark:hover:bg-pink-500 hover:text-white shadow-xl transition-all">Edit Details</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-pink-50 dark:bg-pink-900/20 rounded-2xl text-pink-500"><Mail size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Hash</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.email || "Encrypted"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-500"><Phone size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Secure Line</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.contactNumber || "Offline"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-500"><Globe size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lexicon</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.preferredLanguage || "Universal"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-500"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifecycle Age</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.age ? `${profile.age} Revolutions` : "Ageless"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-indigo-500"><Languages size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Social Rank</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.socialStatus || "Citizen"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-500"><ShieldCheck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{profile?.availability || "On Call"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Statement of Purpose */}
        <section className="bg-slate-900 dark:bg-slate-900/80 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-[80px]"></div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div> Core Narrative
          </h2>
          <p className="text-xl font-bold leading-relaxed italic text-slate-200">
            "{profile?.reason || profile?.healthConcerns || "A mission-driven individual dedicated to fostering safety, health, and empowerment within the Together For Her ecosystem."}"
          </p>
        </section>

        {/* 5. Terminal Operations */}
        <section className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 p-6 rounded-[2rem] bg-white/40 dark:bg-slate-800/40 border border-white dark:border-slate-500 flex items-center justify-center gap-4 group hover:bg-pink-50 dark:hover:bg-slate-800 transition-all font-black text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-400"
          >
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-600 text-slate-500 group-hover:text-pink-500"><Settings size={18} /></div>
            Access Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 p-6 rounded-[2rem] bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 flex items-center justify-center gap-4 transition-all font-black text-[11px] uppercase tracking-widest group shadow-lg shadow-rose-500/5"
          >
            <div className="p-2 bg-rose-500/10 group-hover:bg-white/20 rounded-lg"><LogOut size={18} /></div>
            Terminate Session
          </button>
        </section>

      </div>

      <style jsx>{`
        section {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        section:nth-child(1) { animation-delay: 0.1s; }
        section:nth-child(2) { animation-delay: 0.2s; }
        section:nth-child(3) { animation-delay: 0.3s; }
        section:nth-child(4) { animation-delay: 0.4s; }
        section:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default ProfilePage;

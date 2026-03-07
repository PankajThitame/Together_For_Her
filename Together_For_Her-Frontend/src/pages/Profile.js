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
  Award
} from "lucide-react";

/**
 * Premium Unified Profile Page
 * Handles both User and Volunteer roles with dynamic rendering.
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart size={32} className="text-pink-500 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Syncing Identity...</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
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
  const displayRole = profile?.volunteerType ? `Volunteer (${profile.volunteerType})` : "Community Member";
  const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-transparent dark:bg-slate-950 transition-all duration-700">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] bg-rose-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/40 dark:border-slate-800/50 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full blur-2xl opacity-20 scale-125 animate-pulse"></div>
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 overflow-hidden bg-slate-100 dark:bg-slate-950">
                    {profile?.profilePhoto ? (
                      <img
                        src={getProfileImageUrl(profile.profilePhoto)}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700 font-black text-4xl">
                        {initials}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-xl border border-pink-100 dark:border-slate-700 text-pink-500 hover:scale-110 transition-transform active:scale-95"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>

                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 italic">
                    {displayName}<span className="text-pink-500">.</span>
                  </h1>
                  <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{displayRole}</p>
                </div>

                <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 text-[10px] font-bold">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                      Verified
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">RoleID</p>
                    <p className="text-[10px] font-bold text-slate-900 dark:text-slate-300">#{userId.slice(-4)}</p>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-3 pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-pink-200/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Modify Identity <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 px-6 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    Disconnect <LogOut size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="bg-slate-900 dark:bg-slate-900/60 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                <Target size={14} className="text-pink-500" /> Secure Contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-pink-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-bold truncate">{profile?.email || "No Email"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-rose-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Contact</p>
                    <p className="text-sm font-bold">{profile?.contactNumber || "No Contact"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {['overview', 'details', 'impact'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-200 dark:shadow-none'
                      : 'bg-white/40 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border border-white/20 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/40 dark:border-slate-800/50 shadow-2xl relative min-h-[500px]">

              {activeTab === 'overview' && (
                <div className="space-y-10 animate-fadeIn">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-6">
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic">
                        Identity<br /><span className="text-pink-500 underline decoration-pink-500/20 underline-offset-8">Blueprint</span>.
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                        {profile?.reason || "A dedicated member of the Together For Her community, committed to collective growth and wellness."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                      <div className="bg-white/60 dark:bg-slate-950/40 p-6 rounded-3xl border border-white/40 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-pink-50 dark:bg-pink-900/20 text-pink-500">
                          <Award size={20} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Experience</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white italic">{profile?.experience || profile?.age || "0"}<span className="text-xs text-slate-400 ml-1">yrs</span></p>
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-950/40 p-6 rounded-3xl border border-white/40 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                          <Clock size={20} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Commitment</p>
                          <p className="text-xs font-black text-slate-900 dark:text-white uppercase truncate">{profile?.availability || "Active Member"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative group/card overflow-hidden">
                      <ShieldCheck className="absolute top-6 right-6 text-pink-500 group-hover:rotate-12 transition-transform" size={24} />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Tier</p>
                        <h4 className="text-xl font-black italic">Diamond Member</h4>
                      </div>
                      <p className="mt-4 text-xs font-medium text-slate-400 leading-relaxed">System level authorization granted. All community modules unlocked.</p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 ${i === 1 ? 'bg-pink-500' : i === 2 ? 'bg-rose-500' : 'bg-slate-700'}`}></div>)}
                        </div>
                        <p className="text-[10px] font-black uppercase text-pink-500">Privileged Account</p>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/20 group/card">
                      <Heart className="text-pink-500 mb-4" size={24} />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Member Vibe</p>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white italic">Community Glue</h4>
                      </div>
                      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">Always helpful, proactive in community mess, and a reliable connection point.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">Technical <span className="text-rose-500">Breakdown.</span></h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[
                      { icon: <MapPin />, label: "Geo-Location", value: profile?.location || "Not provided" },
                      { icon: <Languages />, label: "Native Lexicon", value: profile?.preferredLanguage || "English" },
                      { icon: <Briefcase />, label: "Social Tier", value: profile?.socialStatus || "Community Contributor" },
                      { icon: <Heart />, label: "Resilience", value: profile?.healthConcerns || "General Wellness" },
                      { icon: <Calendar />, label: "Temporal Age", value: profile?.age ? `${profile.age} Cycles` : "N/A" },
                      { icon: <ShieldCheck />, label: "Verification", value: profile?.verificationStatus || "Level 1" },
                    ].map((detail, idx) => (
                      <div key={idx} className="bg-white/60 dark:bg-slate-950/40 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-sm transition-all hover:-translate-y-1">
                        <div className="flex flex-col gap-4">
                          <div className="p-3 w-fit rounded-2xl bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 text-pink-500 shadow-inner">
                            {React.cloneElement(detail.icon, { size: 18 })}
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{detail.label}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate">{detail.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-8 rounded-[2.5rem] bg-white/60 dark:bg-slate-950/60 border border-white dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Bio-Technical Summary</h4>
                    </div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      Subject shows high engagement with community modules. Preferred language is {profile?.preferredLanguage || "English"}.
                      Located at terminal {profile?.location || "Unknown"}. Subject identifies as {profile?.socialStatus || "Member"}.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'impact' && (
                <div className="space-y-12 animate-fadeIn py-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full bg-pink-500/10 dark:bg-pink-900/10 flex items-center justify-center text-pink-500 relative mb-8 group">
                      <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping opacity-20"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-700"></div>
                      <Target size={80} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic mb-4">Total <span className="text-pink-500">Influence.</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">Your contributions are reshaping the community. Every action you take adds a pulse to our collective mission.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="bg-white/60 dark:bg-slate-950/40 p-10 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl transition-all hover:scale-[1.02]">
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">Ecosystem Projects</p>
                      <p className="text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter">12<span className="text-pink-500">+</span></p>
                      <div className="mt-6 flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-pink-500 rounded-full"></div>)}
                      </div>
                    </div>
                    <div className="bg-slate-900 dark:bg-slate-900/80 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl transition-all hover:scale-[1.02] text-white">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Influence Score</p>
                      <p className="text-6xl font-black text-white italic tracking-tighter">9.8</p>
                      <div className="mt-6 flex justify-center gap-2 items-center">
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden max-w-[120px]">
                          <div className="h-full w-[98%] bg-gradient-to-r from-pink-500 to-rose-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;

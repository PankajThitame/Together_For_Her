import React from "react";
import API_BASE_URL from "../apiConfig";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Languages,
  Heart,
  BadgeCheck,
  ArrowLeft,
  Edit2,
} from "lucide-react";

const UserProfile = ({ user, onEdit }) => {
  const navigate = useNavigate();

  if (!user) return (
    <div className="flex flex-col items-center justify-center py-24 bg-white/20 dark:bg-slate-800/10 backdrop-blur-sm rounded-[3rem] border border-white/20 dark:border-slate-800/50">
      <div className="w-20 h-20 rounded-full bg-pink-50 dark:bg-pink-900/10 flex items-center justify-center mx-auto mb-6">
        <User className="text-3xl text-pink-200 dark:text-pink-500/30" />
      </div>
      <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2">No Profile Yet</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Please complete your profile to connect with the community.</p>
      <button
        onClick={onEdit}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-black text-[13px] uppercase tracking-wider shadow-lg shadow-pink-200"
      >
        Create Profile
      </button>
    </div>
  );

  const {
    id,
    contactNumber,
    email,
    location,
    preferredLanguage,
    healthConcerns,
    socialStatus,
    volunteerType,
    availability,
    experience,
    reason,
    profilePhoto,
  } = user;

  const displayName = user.firstName || user.name || user.username || "Member";
  const displayRole = user.role || (volunteerType ? "Volunteer" : "User");
  const displayId = socialStatus || volunteerType || "Member";
  const displayBio = healthConcerns || reason || (volunteerType ? "Dedicated Volunteer" : "Member");

  const infoItems = [
    { icon: <Mail />, label: "Email Address", value: email, color: "blue" },
    { icon: <Phone />, label: "Contact Number", value: contactNumber, color: "green" },
    { icon: <MapPin />, label: "Current Location", value: location || "Assigned Remotely", color: "rose" },
    { icon: <Languages />, label: "Primary Language", value: preferredLanguage || "English", color: "purple" },
    { icon: <BadgeCheck />, label: "Identity", value: displayId, color: "amber" },
    { icon: <Heart />, label: "Details", value: displayBio, color: "pink" },
  ];

  if (volunteerType) {
    if (experience) infoItems.push({ icon: <BadgeCheck />, label: "Experience", value: `${experience} Years`, color: "blue" });
    if (availability) infoItems.push({ icon: <BadgeCheck />, label: "Availability", value: availability, color: "green" });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/20 dark:border-slate-700/20 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500 scale-110"></div>
            <div className="w-40 h-40 rounded-full border-[6px] border-white dark:border-slate-700 overflow-hidden shadow-2xl relative z-10 bg-slate-100 dark:bg-slate-900">
              <img
                src={user.profilePhoto ? `${API_BASE_URL}/upload/${user.profilePhoto}` : "/images/Pads.png"}
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-pink-100 dark:border-slate-700 z-20">
              <BadgeCheck className="text-pink-500" size={20} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-pink-100/50 dark:border-pink-900/30">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                Verified {displayRole}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2 capitalize">
                {displayName}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Global Member ID: #TFH-{String(id).padStart(4, '0')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={onEdit}
                className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-200/50 hover:translate-y-[-2px] hover:shadow-2xl transition-all active:scale-95 flex items-center gap-3"
              >
                <Edit2 size={16} /> Edit My Identity
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-600 dark:text-slate-300 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                Explore Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {infoItems.map((item, index) => (
          <div key={index} className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 dark:border-slate-700/20 shadow-sm hover:shadow-xl hover:shadow-pink-100/10 dark:hover:shadow-pink-900/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-50 dark:border-slate-800 text-pink-500 group-hover:scale-110 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-all duration-500`}>
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{item.label}</div>
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 dark:text-slate-100 font-bold text-base truncate tracking-tight">{item.value || "Not Set"}</p>
                <div className="h-1 w-0 group-hover:w-8 bg-pink-500 rounded-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats/Badge Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group/stats">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover/stats:scale-150 transition-transform duration-700"></div>
          <h4 className="font-black text-xl mb-6 flex items-center gap-3">
            <Heart size={20} className="text-pink-500" /> Member Status
          </h4>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Age Group</p>
                <p className="text-2xl font-black italic">{age || "N/A"} <span className="text-slate-500 text-sm font-bold ml-1">Years Young</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Reachability</p>
                <p className="text-sm font-bold text-pink-400">{modeOfReachability || "Email"}</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
            </div>
          </div>
        </div>

        <div className="bg-pink-500 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-pink-200/50 relative overflow-hidden group/badge">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10"></div>
          <div className="relative z-10 flex items-center gap-8 h-full">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-inner group-hover/badge:rotate-12 transition-transform duration-500">
              <BadgeCheck size={48} />
            </div>
            <div>
              <h4 className="font-black text-2xl mb-2 tracking-tighter">Impact Badge</h4>
              <p className="text-pink-100 font-medium leading-relaxed opacity-80 italic">Verified contributor making the community a safer place for all.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

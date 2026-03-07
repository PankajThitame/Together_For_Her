import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FaUserPlus, FaMapMarkerAlt, FaHandsHelping, FaBriefcase, FaCalendarAlt, FaBullseye } from "react-icons/fa";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    volunteerType: "",
    experience: "",
    availability: "",
    reason: "",
    location: "",
    latitude: "",
    longitude: "",
    profilePhoto: "", // Added
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const locationName = data.display_name || "Address not found";
          setAddress(locationName);
          setFormData((prev) => ({
            ...prev,
            location: locationName,
            latitude,
            longitude,
          }));
          setError("");
        } catch {
          setError("Failed to fetch address.");
        }
      },
      () => {
        setError("Please allow location access.");
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    localStorage.setItem("redirectPath", "/login");
    navigate("/set-password");
  };

  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn text-slate-900 dark:text-white">
      {/* Premium Header */}
      <div className="text-center space-y-6 relative py-12">
        <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
          Join the Elite
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none">
          Become a <span className="text-pink-500">Guardian.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
          "Your skills and heart are the architects of change. Stand with us in the mission of empowerment."
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full group/form">
        <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-16 rounded-[3.5rem] border border-pink-200/50 dark:border-slate-500/20 shadow-2xl space-y-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-6 rounded-r-2xl text-rose-700 dark:text-rose-400 text-sm font-black italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Identity</label>
                <input
                  name="name"
                  placeholder="Jane Doe"
                  required
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-sm italic"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Digital Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  required
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-sm italic"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Contact</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  required
                  onChange={handleChange}
                  className="w-full h-14 px-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-sm italic"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Specialisation</label>
                <select
                  name="volunteerType"
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-sm italic appearance-none"
                >
                  <option value="">Select your role</option>
                  <option value="PHARMACIST">Pharmacist</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="CONTENT_CREATOR">Content Creator</option>
                  <option value="LOCAL_AREA_HELPER">Helper</option>
                  <option value="EVENT_ORGANISER">Organizer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Motivation</label>
              <textarea
                name="reason"
                required
                onChange={handleChange}
                placeholder="What drives your spirit to join our sisterhood?"
                rows={4}
                className="w-full p-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-600 rounded-3xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-bold text-sm italic resize-none"
              />
            </div>

            <div className="pt-8 border-t border-slate-50 dark:border-slate-600/50 flex flex-col md:flex-row items-center gap-6">
              <button
                type="submit"
                className="flex-1 w-full h-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-pink-500/30 hover:translate-y-[-2px] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Engrave Membership <FaHandsHelping />
              </button>
              <button
                type="button"
                onClick={getLocation}
                className="h-16 px-8 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                📍 Anchor Location
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;

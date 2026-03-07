import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, MapPin, Loader2, Sparkles, Shield, User, Heart } from "lucide-react";
import axios from "axios";

/**
 * Premium Adaptive User/Volunteer Form
 * Handles data collection for all roles with role-specific fields.
 */
const CombinedUserForm = ({ existingData, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const userObj = JSON.parse(localStorage.getItem("user") || "{}");
  const role = userObj.role || "USER";
  const userId = (localStorage.getItem("userId") || localStorage.getItem("userid") || "").toString().replace(/['"]+/g, '');

  const [formData, setFormData] = useState({
    // Shared Fields
    email: existingData?.email || userObj.email || "",
    contactNumber: existingData?.contactNumber || "",
    profilePhoto: existingData?.profilePhoto || "",

    // User Specific
    firstName: existingData?.firstName || "",
    age: existingData?.age || "",
    location: existingData?.location || "",
    socialStatus: existingData?.socialStatus || "",
    preferredLanguage: existingData?.preferredLanguage || "",
    healthConcerns: existingData?.healthConcerns || "",
    modeOfReachability: existingData?.modeOfReachability || "",

    // Volunteer Specific
    name: existingData?.name || existingData?.firstName || "",
    experience: existingData?.experience || "",
    availability: existingData?.availability || "",
    volunteerType: existingData?.volunteerType || "",
    reason: existingData?.reason || "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData(prev => ({ ...prev, ...existingData }));
      if (existingData.profilePhoto) {
        // Construct preview URL if photo exists
        const base = API_BASE_URL.replace("/api", "");
        setPreview(`${base}/uploads/${existingData.profilePhoto}`);
      }
    }
  }, [existingData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setFormData(prev => ({ ...prev, location: data.display_name, latitude, longitude }));
        } catch (err) {
          setError("Failed to fetch location name.");
        }
      },
      () => setError("Location access denied.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    if (!userId) {
      // Registration Flow
      localStorage.setItem("userData", JSON.stringify(formData));
      localStorage.setItem("redirectPath", "/login");
      navigate("/set-password");
      setUploading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) data.append(key, value);
      });
      if (file) data.append("file", file);

      let url = `${API_BASE_URL}/auth/update/${userId}`;
      if (role === "VOLUNTEER") {
        url = `${API_BASE_URL}/volunteers/update/${userId}`;
      }

      const response = await axios.put(url, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Also handle profile photo specifically if backend expects separate endpoint
      if (file) {
        let photoUrl = `${API_BASE_URL}/auth/profile-photo/${userId}`;
        if (role === "VOLUNTEER") {
          photoUrl = `${API_BASE_URL}/volunteers/profile-photo/${userId}`;
        }
        const photoRes = await axios.post(photoUrl, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        // Update user in session with new photo
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...currentUser, profilePhoto: photoRes.data.profilePhoto }));
      }

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...formData }));

      if (onSuccess) onSuccess();
      else navigate("/profile");

    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update profile. Please check your network.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
      <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/40 dark:border-slate-800/50 shadow-2xl relative overflow-hidden group">

        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-pink-100/50 dark:border-pink-900/30">
              <Sparkles size={12} className="animate-pulse" />
              Secure Identity Console
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">
              {existingData ? "Reshape Identity" : "Forge Identity"}<span className="text-pink-500">.</span>
            </h2>
          </div>
          {onCancel && (
            <button type="button" onClick={onCancel} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Profile Photo Section */}
        <div className="mb-12 flex flex-col items-center sm:flex-row gap-8">
          <div className="relative group/avatar">
            <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl group-hover/avatar:scale-110 transition-transform"></div>
            <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-slate-300" />
              )}
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              accept="image/*"
            />
            <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-2.5 rounded-xl shadow-lg z-20 group-hover/avatar:scale-110 transition-transform pointer-events-none">
              <Upload size={14} />
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Aesthetic Capture</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">Upload a crisp portrait to personalize your presence in the community.</p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Shared Basic Info */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 flex items-center gap-2 mb-4">
              <Shield size={12} /> Core Credentials
            </h3>

            <div className="space-y-4">
              <InputField
                label={role === "VOLUNTEER" ? "Legal Name" : "Display Name"}
                name={role === "VOLUNTEER" ? "name" : "firstName"}
                value={role === "VOLUNTEER" ? formData.name : formData.firstName}
                onChange={handleChange}
                placeholder="How shall we address you?"
              />
              <InputField
                label="Digital Inbox"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@nexus.com"
                disabled={true} // Usually email is primary identifier
              />
              <InputField
                label="Secure Phone"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
              {role === "USER" && (
                <InputField
                  label="Temporal Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Solar cycles"
                  type="number"
                />
              )}
            </div>
          </div>

          {/* Role Specific Info */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 flex items-center gap-2 mb-4">
              <Heart size={12} /> Specialized Data
            </h3>

            <div className="space-y-4">
              {role === "VOLUNTEER" ? (
                <>
                  <SelectField
                    label="Vertical Focus"
                    name="volunteerType"
                    value={formData.volunteerType}
                    onChange={handleChange}
                    options={['Medical', 'Community', 'Logistics', 'Support']}
                  />
                  <InputField
                    label="Years of Impact"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    type="number"
                    placeholder="Total service years"
                  />
                  <SelectField
                    label="Temporal Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    options={['Full Time', 'Part Time', 'Weekend', 'Flexible']}
                  />
                </>
              ) : (
                <>
                  <SelectField
                    label="Social Identity"
                    name="socialStatus"
                    value={formData.socialStatus}
                    onChange={handleChange}
                    options={['Student', 'Employed', 'Business', 'Visionary', 'Other']}
                  />
                  <SelectField
                    label="Lexicon"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    options={['English', 'Marathi', 'Hindi', 'Other']}
                  />
                  <SelectField
                    label="Secure Reachability"
                    name="modeOfReachability"
                    value={formData.modeOfReachability}
                    onChange={handleChange}
                    options={['Direct Mail', 'Cellular', 'WhatsApp', 'Nexus Network']}
                  />
                </>
              )}

              <div className="space-y-1.5 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">Global Terminal</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Sector"
                    className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 px-5 py-3.5 rounded-2xl outline-none focus:border-pink-300 dark:focus:border-pink-900/50 transition-all font-bold text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300"
                  />
                  <button type="button" onClick={getLocation} className="p-3.5 bg-pink-500 text-white rounded-2xl shadow-lg border border-pink-400 active:scale-95 transition-all">
                    <MapPin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Text Area */}
        <div className="mt-8 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">
            {role === "VOLUNTEER" ? "Statement of Purpose" : "Vital Concerns"}
          </label>
          <textarea
            name={role === "VOLUNTEER" ? "reason" : "healthConcerns"}
            value={role === "VOLUNTEER" ? formData.reason : formData.healthConcerns}
            onChange={handleChange}
            rows={4}
            placeholder={role === "VOLUNTEER" ? "Why do you wish to join our mission?" : "Tell us about your wellness needs..."}
            className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 px-5 py-4 rounded-3xl outline-none focus:border-pink-300 dark:focus:border-pink-900/50 transition-all font-medium text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 resize-none"
          />
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold animate-shake">
            {error}
          </div>
        )}

        <div className="mt-12 flex gap-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-pink-200/50 hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
          >
            {uploading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Modification"}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

// Helper Components
const InputField = ({ label, name, value, onChange, placeholder, type = "text", disabled = false }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1 group-focus-within:text-pink-500 transition-colors">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 px-5 py-3.5 rounded-2xl outline-none focus:border-pink-300 dark:focus:border-pink-900/50 transition-all font-bold text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-200/20' : ''}`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1 group-focus-within:text-pink-500 transition-colors">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 px-5 py-3.5 rounded-2xl outline-none focus:border-pink-300 dark:focus:border-pink-900/50 transition-all font-bold text-sm text-slate-900 dark:text-slate-100 cursor-pointer appearance-none"
    >
      <option value="">Select Variant</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default CombinedUserForm;

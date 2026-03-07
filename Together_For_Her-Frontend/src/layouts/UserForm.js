import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Upload, MapPin, Loader2 } from "lucide-react";
import axios from "axios";

const CombinedUserForm = ({ existingData, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existingData?.profilePhoto || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    firstName: existingData?.firstName || "",
    age: existingData?.age || "",
    contactNumber: existingData?.contactNumber || "",
    email: existingData?.email || "",
    location: existingData?.location || "",
    socialStatus: existingData?.socialStatus || "",
    preferredLanguage: existingData?.preferredLanguage || "",
    healthConcerns: existingData?.healthConcerns || "",
    modeOfReachability: existingData?.modeOfReachability || "",
    verificationStatus: existingData?.verificationStatus || "PENDING",
    title: existingData?.title || "Profile Update",
    description: existingData?.description || "Updated profile information",
  });

  useEffect(() => {
    if (existingData) {
      setUserData({
        ...userData,
        ...existingData,
      });
      if (existingData.profilePhoto) {
        setPreview(`${API_BASE_URL}/upload/${existingData.profilePhoto}`);
      }
    }
  }, [existingData]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          setUserData((prev) => ({ ...prev, location: data.display_name }));
        } catch (err) {
          setError("Failed to fetch address.");
        }
      },
      () => {
        setError("Please allow location access.");
      }
    );
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.firstName || (!file && !existingData?.profilePhoto)) {
      alert("Please fill all required fields and upload a profile picture.");
      return;
    }

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append("file", file);
    }
    formData.append("uploadTime", new Date().toISOString());

    // Add userid to formData
    const userId = localStorage.getItem("userid");
    if (userId) formData.append("userId", userId);

    if (!existingData) {
      // Sign-up flow: Save photo as Base64 if exists
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem("tempProfilePhoto", reader.result);
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("redirectPath", "/sign-up");
          navigate("/set-password");
        };
        reader.readAsDataURL(file);
      } else {
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("redirectPath", "/sign-up");
        navigate("/set-password");
      }
      return;
    }

    try {
      setUploading(true);
      const url = `${API_BASE_URL}/auth/update/${userId}`;
      await axios.put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Operation failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-transparent py-10">
      <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-pink-100/50 dark:border-slate-700 space-y-6 transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent uppercase tracking-tighter">
            {existingData ? "Update Your Profile" : "Create Your Profile"}
          </h2>
          {onCancel && (
            <button type="button" onClick={onCancel} className="p-2 hover:bg-pink-50 dark:hover:bg-slate-700 rounded-full text-gray-400 dark:text-slate-500 transition-colors">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { label: "Full Name", name: "firstName", placeholder: "Enter your name" },
              { label: "Age", name: "age", type: "number", placeholder: "Your age" },
              { label: "Contact Number", name: "contactNumber", placeholder: "e.g. +91 98765 43210" },
              { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
            ].map(({ label, name, type = "text", placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={userData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm"
                  required
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">Social Status</label>
              <select name="socialStatus" value={userData.socialStatus} onChange={handleChange} className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm appearance-none cursor-pointer">
                <option value="" className="bg-white dark:bg-slate-800">Select Status</option>
                {['Student', 'Employed', 'Unemployed', 'Self-Employed', 'Other'].map(option => (
                  <option key={option} value={option} className="bg-white dark:bg-slate-800">{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">Languages</label>
              <select name="preferredLanguage" value={userData.preferredLanguage} onChange={handleChange} className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm appearance-none cursor-pointer">
                <option value="" className="bg-white dark:bg-slate-800">Select Language</option>
                {['English', 'Marathi', 'Hindi', 'Other'].map(option => (
                  <option key={option} value={option} className="bg-white dark:bg-slate-800">{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">Reachability</label>
              <select name="modeOfReachability" value={userData.modeOfReachability} onChange={handleChange} className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm appearance-none cursor-pointer">
                <option value="" className="bg-white dark:bg-slate-800">Select Mode</option>
                {['Email', 'Phone', 'WhatsApp', 'Social Media', 'Other'].map(option => (
                  <option key={option} value={option} className="bg-white dark:bg-slate-800">{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">Location</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  placeholder="City, Area"
                  className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm"
                />
                <button type="button" onClick={getLocation} className="bg-pink-500 text-white p-3 rounded-2xl shadow-lg shadow-pink-100 dark:shadow-none hover:-translate-y-0.5 transition-all active:scale-95">
                  <MapPin size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-1.5">Health Concerns</label>
          <textarea
            name="healthConcerns"
            value={userData.healthConcerns}
            onChange={handleChange}
            placeholder="Any health topics you care about or need support with..."
            className="w-full bg-pink-50/30 dark:bg-slate-900/40 border border-transparent focus:border-pink-300 dark:focus:border-slate-600 px-4 py-3 rounded-2xl outline-none transition-all text-gray-900 dark:text-slate-100 font-bold text-sm h-24 resize-none"
          ></textarea>
        </div>

        <div className="border-t border-pink-50 dark:border-slate-700 pt-6">
          <label className="block text-xs font-black text-pink-500 uppercase tracking-widest pl-1 mb-3">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="relative group/avatar">
              <div className="w-24 h-24 rounded-full bg-pink-50 dark:bg-slate-900 overflow-hidden border-2 border-pink-100 dark:border-slate-700 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={32} className="text-pink-300" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none">
                <Upload size={20} className="text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-900 dark:text-slate-200">Upload high-quality image</p>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">JPG, PNG or WEBP. Max 2MB.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-pink-200 dark:shadow-none hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 mt-8"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Processing...
            </>
          ) : (
            existingData ? "Save Changes" : "Secure My Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default CombinedUserForm;

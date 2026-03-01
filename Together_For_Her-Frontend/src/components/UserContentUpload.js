import API_BASE_URL from "../apiConfig";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { FaCloudUploadAlt, FaCheckCircle, FaArrowLeft, FaFileAlt, FaImage, FaVideo } from "react-icons/fa";

const UserContentUpload = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image") || selectedFile.type.startsWith("video")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !file) {
      alert("Please provide a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("uploadedBy", user?.name || user?.username || "Anonymous User");

    try {
      setUploading(true);
      await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadSuccess(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3.5rem] p-12 text-center max-w-lg w-full border border-white/20 dark:border-slate-700/20 shadow-2xl animate-fadeIn">
          <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
            <FaCheckCircle />
          </div>
          <h2 className="text-3xl font-black italic tracking-tight mb-4">Experience Shared<span className="text-emerald-500">.</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-10 leading-relaxed uppercase text-[10px] tracking-widest italic">
            Your voice strengthens the movement. Our moderators will review and publish your contribution shortly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => { setUploadSuccess(false); setFile(null); setTitle(""); setDescription(""); }}
              className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-500 transition-all active:scale-95 shadow-xl"
            >
              Share Another
            </button>
            <button
              onClick={() => navigate("/")}
              className="h-14 px-8 bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fadeIn">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/40 dark:bg-slate-800/40 rounded-2xl text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
          <FaArrowLeft size={14} />
        </button>
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter">Share Your Journey<span className="text-pink-500">.</span></h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2 italic">Empowering others through shared wisdom</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 text-black dark:text-white">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/20 dark:border-slate-700/20 shadow-2xl space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Experience Title</label>
              <input
                type="text"
                placeholder="A title for your story..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-16 px-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-sm font-bold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">The Details (Optional)</label>
              <textarea
                placeholder="Describe your thoughts or context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-40 p-6 bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-sm font-bold transition-all resize-none"
              />
            </div>

            <div className="relative group/upload">
              <input
                type="file"
                accept="*/*"
                onChange={handleFileChange}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover/upload:border-pink-300 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all bg-slate-50/30 dark:bg-slate-900/30">
                <FaCloudUploadAlt className="text-3xl text-slate-300 group-hover/upload:text-pink-400 transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover/upload:text-slate-600 transition-colors">
                  {file ? file.name : "Choose File or Media"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full h-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-pink-500/40 hover:scale-[1.02] transition-all transform active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
            >
              {uploading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Contribute to Collective"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-8 ">
          <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-xl">
            <h3 className="text-lg font-black italic tracking-tight mb-6 flex items-center gap-3">
              Media Preview<div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
            </h3>
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative border border-slate-100 dark:border-slate-800 shadow-inner">
              {preview ? (
                file?.type?.startsWith("image") ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : file?.type?.startsWith("video") ? (
                  <video controls className="w-full h-full object-cover">
                    <source src={preview} type={file.type} />
                  </video>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-8 text-center uppercase">
                    <FaFileAlt className="text-5xl text-pink-200" />
                    <span className="text-[10px] font-black tracking-widest text-slate-400">Document Ready</span>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center gap-6 p-8 text-center">
                  <div className="flex gap-4">
                    <FaImage className="text-3xl text-slate-200" />
                    <FaVideo className="text-3xl text-slate-200" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300 italic">Preview pending...</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-pink-500" /> Community Note
            </h4>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
              "Every shared experience helps another woman navigate her journey with more confidence. Thank you for being a light."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContentUpload;

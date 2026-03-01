import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentModeration = () => {
  const [contentList, setContentList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/content/pending`);
        setContentList(response.data);
      } catch (err) {
        setError("Error fetching content.");
        console.error(err);
      }
    };
    fetchContent();
  }, []);

  const getFileName = (path) => {
    if (!path) return "";
    return path.split(/[/\\]/).pop();
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/content/approve/${id}`);
      setContentList(contentList.filter((item) => item.id !== id));
      alert("Content approved successfully!");
    } catch (err) {
      alert("Failed to approve content.");
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/content/reject/${id}`);
      setContentList(contentList.filter((item) => item.id !== id));
      alert("Content rejected successfully!");
    } catch (err) {
      alert("Failed to reject content.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Content Moderation
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 animate-shake">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      {contentList.length === 0 ? (
        <div className="py-20 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-white/60 dark:border-slate-700 text-center transition-colors">
          <p className="text-gray-700 dark:text-slate-400 text-lg font-black italic">No pending content for moderation at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {contentList.map((item) => (
            <div
              key={item.id}
              className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/60 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-slate-100 mb-2 group-hover:text-pink-600 transition-colors uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 font-bold leading-relaxed italic border-l-4 border-pink-200 dark:border-slate-600 pl-4">
                  {item.description}
                </p>
              </div>

              {/* Media Preview */}
              <div className="relative rounded-2xl overflow-hidden shadow-inner bg-black/5 mb-8 aspect-video flex items-center justify-center">
                {item.fileType.startsWith("image/") && (
                  <img
                    src={`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/upload/${getFileName(item.filePath)}`}
                    alt="Uploaded Content"
                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  />
                )}
                {item.fileType.startsWith("video/") && (
                  <video controls className="w-full h-full">
                    <source src={`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/upload/${getFileName(item.filePath)}`} type={item.fileType} />
                    Your browser does not support video.
                  </video>
                )}
                {item.fileType === "application/pdf" && (
                  <iframe
                    src={`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/upload/${getFileName(item.filePath)}`}
                    className="w-full h-full"
                    title="PDF Preview"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="mt-auto grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 translate-y-0 hover:-translate-y-1"
                >
                  <span className="text-xl">✅</span> Approve
                </button>
                <button
                  onClick={() => handleReject(item.id)}
                  className="flex items-center justify-center gap-2 py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 translate-y-0 hover:-translate-y-1"
                >
                  <span className="text-xl">❌</span> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentModeration;


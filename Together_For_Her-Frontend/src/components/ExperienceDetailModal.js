import API_BASE_URL from "../apiConfig";
import React from "react";
import { FaTimes, FaQuoteLeft, FaPlay, FaFileAlt, FaUser, FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";

const ExperienceDetailModal = ({ item, onClose }) => {
    if (!item) return null;

    const getFileName = (path) => {
        if (!path) return "";
        return path.split(/[/\\]/).pop();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-slideUp border border-white/20 dark:border-slate-800">
                {/* Media Section */}
                <div className="md:w-1/2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-0 relative">
                    {item.fileType?.startsWith("image/") && (
                        <img
                            src={`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/upload/${getFileName(item.filePath)}`}
                            alt={item.title}
                            className="w-full h-full object-contain"
                        />
                    )}
                    {item.fileType?.startsWith("video/") && (
                        <video controls className="w-full h-full bg-black">
                            <source src={`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/upload/${getFileName(item.filePath)}`} type={item.fileType} />
                        </video>
                    )}
                    {!item.fileType?.startsWith("image/") && !item.fileType?.startsWith("video/") && (
                        <div className="flex flex-col items-center gap-6 py-20 text-slate-300 w-full h-full justify-center">
                            <FaFileAlt className="text-8xl opacity-20" />
                            <div className="text-center px-8">
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 italic block mb-6">Wisdom Document</span>
                                {item.fileType === "application/pdf" && (
                                    <div className="space-y-6 flex flex-col items-center">
                                        <iframe
                                            src={`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/upload/${getFileName(item.filePath)}#toolbar=0`}
                                            className="w-full h-[250px] rounded-xl border border-white/20 shadow-lg"
                                            title="PDF Preview"
                                        />
                                        <a
                                            href={`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/upload/${getFileName(item.filePath)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl shadow-pink-200"
                                        >
                                            View Full Document
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-6 left-6 md:hidden w-10 h-10 bg-black/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 flex flex-col h-full overflow-y-auto custom-scrollbar p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                        <div className="inline-block px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full text-[9px] font-black uppercase tracking-widest italic">
                            Experience Detail
                        </div>
                        <button
                            onClick={onClose}
                            className="hidden md:flex w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl items-center justify-center hover:bg-pink-500 hover:text-white transition-all transform hover:rotate-90"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaQuoteLeft className="text-pink-500 text-4xl opacity-20 shrink-0 mt-1" />
                            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-tight">
                                {item.title}
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-slate-800 flex items-center justify-center text-pink-500 text-xs">
                                    <FaUser />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Shared By</p>
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.uploadedBy || "Anonymous"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-slate-800 flex items-center justify-center text-rose-500 text-xs">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Date</p>
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{formatDate(item.uploadTime)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">The Narrative</p>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed italic whitespace-pre-wrap">
                                {item.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-12">
                        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl">
                            <p className="text-xs font-bold opacity-90 italic">
                                "Your stories are the threads that weave our community together. Thank you for sharing your light."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceDetailModal;

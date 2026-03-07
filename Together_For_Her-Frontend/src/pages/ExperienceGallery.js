import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaQuoteLeft, FaPlay, FaFileAlt, FaInfoCircle, FaCalendarAlt, FaUser } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";
import ExperienceDetailModal from "../components/ExperienceDetailModal";

const ExperienceGallery = () => {
    const [contentList, setContentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchApprovedContent = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/content/approved`);
                setContentList(response.data);
            } catch (err) {
                console.error("Error fetching gallery content:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedContent();
    }, []);

    const getFileName = (path) => {
        if (!path) return "";
        return path.split(/[/\\]/).pop();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 animate-fadeIn">
            {/* Header Section */}
            <div className="text-center mb-16 relative">
                <div className="inline-block p-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-[3rem] mb-6 shadow-xl shadow-pink-200/50">
                    <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-[0.9rem]">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500 italic">Collective Wisdom</span>
                    </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4 text-slate-900 dark:text-white">
                    Voices of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Movement.</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-[0.3em] max-w-2xl mx-auto italic leading-relaxed">
                    Real stories, real strength. Explore the shared journeys that empower our community every day.
                </p>
            </div>

            {contentList.length === 0 ? (
                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3.5rem] p-20 text-center border border-pink-200/50 dark:border-slate-500/20 shadow-2xl">
                    <FaInfoCircle className="text-5xl text-pink-200 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest italic">The gallery is getting ready. Check back soon for new stories.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3rem] p-6 border border-pink-200/50 dark:border-slate-500/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden cursor-pointer flex flex-col h-full"
                        >
                            {/* Uniform Media Section */}
                            <div className="rounded-[3rem] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-950 aspect-video relative shadow-inner shrink-0">
                                {item.fileType?.startsWith("image/") && (
                                    <img
                                        src={`${API_BASE_URL}/upload/${getFileName(item.filePath)}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                {item.fileType?.startsWith("video/") && (
                                    <div className="relative w-full h-full bg-black">
                                        <video className="w-full h-full object-cover opacity-60">
                                            <source src={`${API_BASE_URL}/upload/${getFileName(item.filePath)}`} type={item.fileType} />
                                        </video>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:bg-black/40 transition-all">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg border border-pink-200/60 transform group-hover:scale-110 transition-transform">
                                                <FaPlay className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!item.fileType?.startsWith("image/") && !item.fileType?.startsWith("video/") && (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                                        <FaFileAlt className="text-5xl opacity-20" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Wisdom Document</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 flex flex-col space-y-4">
                                <h3 className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white leading-tight line-clamp-2">
                                    {item.title}
                                </h3>

                                {item.description && (
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed italic line-clamp-3">
                                        {item.description}
                                    </p>
                                )}

                                <div className="mt-auto pt-6 border-t border-pink-200/50 dark:border-slate-500/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-[3rem] bg-pink-100 dark:bg-slate-800 flex items-center justify-center text-pink-500">
                                            <FaUser size={10} />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">
                                            {item.uploadedBy || "Community Member"}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-black text-pink-400 uppercase tracking-widest italic">
                                        {formatDate(item.uploadTime)}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/5 transition-colors pointer-events-none" />
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedItem && (
                <ExperienceDetailModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {/* Footer Note */}
            <div className="mt-20 text-center">
                <div className="max-w-xl mx-auto p-8 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
                    <p className="text-sm font-bold opacity-80 italic leading-relaxed relative z-10">
                        "Your story is your strength. By sharing, you light the way for someone else."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExperienceGallery;

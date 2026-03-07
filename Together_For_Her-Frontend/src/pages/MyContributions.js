import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { FaTrash, FaClock, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaPlay, FaFileAlt, FaUser } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";
import ExperienceDetailModal from "../components/ExperienceDetailModal";

const MyContributions = () => {
    const { user } = useContext(AuthContext);
    const [contentList, setContentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchMyContent = async () => {
            if (!user?.username) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/content/user/${user.username}`);
                setContentList(response.data);
            } catch (err) {
                console.error("Error fetching my contributions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyContent();
    }, [user]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to remove this experience? This action cannot be undone.")) {
            try {
                await axios.delete(`${API_BASE_URL}/content/${id}`);
                setContentList(contentList.filter((item) => item.id !== id));
            } catch (err) {
                console.error("Error deleting content:", err);
                alert("Failed to delete content. Please try again.");
            }
        }
    };

    const getFileName = (path) => {
        if (!path) return "";
        return path.split(/[/\\]/).pop();
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "APPROVED":
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest italic"><FaCheckCircle /> Approved</span>;
            case "REJECTED":
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-500 rounded-full text-[9px] font-black uppercase tracking-widest italic"><FaTimesCircle /> Declined</span>;
            default:
                return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black uppercase tracking-widest italic"><FaClock /> Pending Review</span>;
        }
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-2">
                        My <span className="text-pink-500">Stories.</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Manage your contributions to the collective wisdom</p>
                </div>
            </div>

            {contentList.length === 0 ? (
                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3.5rem] p-20 text-center border border-pink-200/50 dark:border-slate-500/20 shadow-2xl">
                    <FaInfoCircle className="text-5xl text-pink-200 mx-auto mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest italic mb-8">You haven't shared any experiences yet.</p>
                    <button
                        onClick={() => window.location.href = '/content'}
                        className="h-14 px-10 bg-slate-900 text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-500 transition-all shadow-xl"
                    >
                        Share My First Story
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contentList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3rem] p-6 border border-pink-200/50 dark:border-slate-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col cursor-pointer"
                        >
                            {/* Status Header */}
                            <div className="flex items-center justify-between mb-6">
                                {getStatusBadge(item.status)}
                                <button
                                    onClick={(e) => handleDelete(e, item.id)}
                                    className="w-10 h-10 bg-rose-500/10 text-rose-500 rounded-[3rem] flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                    title="Remove Experience"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>

                            {/* Uniform Media Preview */}
                            <div className="rounded-[3rem] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-950 aspect-video relative shadow-inner shrink-0">
                                {item.fileType?.startsWith("image/") && (
                                    <img
                                        src={`${API_BASE_URL}/upload/${getFileName(item.filePath)}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {item.fileType?.startsWith("video/") && (
                                    <div className="relative w-full h-full bg-black">
                                        <video className="w-full h-full object-cover opacity-60">
                                            <source src={`${API_BASE_URL}/upload/${getFileName(item.filePath)}`} type={item.fileType} />
                                        </video>
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <FaPlay className="text-xl" />
                                        </div>
                                    </div>
                                )}
                                {!item.fileType?.startsWith("image/") && !item.fileType?.startsWith("video/") && (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-300">
                                        <FaFileAlt className="text-4xl opacity-20" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Document</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-4 flex flex-col">
                                <h3 className="text-xl font-black italic tracking-tight text-slate-900 dark:text-white leading-tight line-clamp-2">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold leading-relaxed italic line-clamp-3">
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-auto pt-6 border-t border-pink-200/50 dark:border-slate-500/20 flex items-center justify-between text-slate-400">
                                <span className="text-[9px] font-black uppercase tracking-widest italic">
                                    ID: #{item.id}
                                </span>
                                <span className="text-[9px] font-black text-pink-400 uppercase tracking-widest italic">
                                    {formatDate(item.uploadTime)}
                                </span>
                            </div>
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
        </div>
    );
};

export default MyContributions;

import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheckCircle, FaTimesCircle, FaClock, FaSearch, FaFilter, FaInfoCircle, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { formatDate } from "../utils/dateUtils";

const ManageContent = () => {
    const [contentList, setContentList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        fetchContent();
    }, []);

    useEffect(() => {
        let result = contentList;
        if (searchTerm) {
            result = result.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.uploadedBy?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== "ALL") {
            result = result.filter(item => item.status === statusFilter);
        }
        setFilteredList(result);
    }, [searchTerm, statusFilter, contentList]);

    const fetchContent = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/content/all`);
            setContentList(response.data);
            setFilteredList(response.data);
        } catch (err) {
            console.error("Error fetching content:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this content? This cannot be undone.")) {
            try {
                await axios.delete(`${API_BASE_URL}/content/${id}`);
                setContentList(contentList.filter(item => item.id !== id));
            } catch (err) {
                alert("Failed to delete content.");
                console.error(err);
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "APPROVED": return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase italic tracking-widest flex items-center gap-1.5"><FaCheckCircle /> Approved</span>;
            case "REJECTED": return <span className="px-3 py-1 bg-rose-500/10 text-rose-500 rounded-full text-[10px] font-black uppercase italic tracking-widest flex items-center gap-1.5"><FaTimesCircle /> Rejected</span>;
            default: return <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase italic tracking-widest flex items-center gap-1.5"><FaClock /> Pending</span>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">
                        Manage <span className="text-pink-500">Repository.</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic mt-2">Oversee all community contributions</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            className="pl-11 pr-6 py-3 bg-white dark:bg-slate-800 border-none rounded-2xl text-xs font-bold outline-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-pink-500 transition-all w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <select
                            className="appearance-none pl-6 pr-10 py-3 bg-white dark:bg-slate-800 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-700/50">
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Preview</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Content Info</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
                        {filteredList.map((item) => (
                            <tr key={item.id} className="group hover:bg-white/50 dark:hover:bg-slate-700/20 transition-all">
                                <td className="px-8 py-6">
                                    <div className="w-20 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                                        {item.fileType?.startsWith("image/") ? (
                                            <img src={`${API_BASE_URL}/upload/${item.filePath.split(/[/\\]/).pop()}`} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaFileAlt className="text-slate-300" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-black text-slate-900 dark:text-white text-sm mb-1 italic line-clamp-1">{item.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400 italic flex items-center gap-2">
                                        by {item.uploadedBy || "Anonymous"} • {formatDate(item.uploadTime)}
                                    </p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-center">
                                        {getStatusBadge(item.status)}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => window.open(`${API_BASE_URL}/upload/${item.filePath.split(/[/\\]/).pop()}`, '_blank')}
                                            className="w-10 h-10 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-sm"
                                            title="View File"
                                        >
                                            <FaExternalLinkAlt size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="w-10 h-10 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                            title="Delete Content"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredList.length === 0 && (
                    <div className="py-20 text-center">
                        <FaInfoCircle className="text-4xl text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold italic">No matching content found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContent;

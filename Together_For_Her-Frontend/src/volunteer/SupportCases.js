import React, { useState } from "react";
import { FaHeadset, FaExclamationCircle, FaCheck, FaReply, FaSearch } from "react-icons/fa";

const SupportCases = () => {
    const [activeTab, setActiveTab] = useState("Open");

    // Mock Data
    const cases = [
        { id: 201, user: "Kavita M.", issue: "Incorrect kit received", priority: "High", status: "Open", date: "2 hours ago" },
        { id: 202, user: "Siya R.", issue: "Request update needed", priority: "Medium", status: "Open", date: "5 hours ago" },
        { id: 203, user: "Meenal T.", issue: "Address change request", priority: "Low", status: "Resolved", date: "1 day ago" },
        { id: 204, user: "Pooja S.", issue: "Medical assistance inquiry", priority: "High", status: "Resolved", date: "2 days ago" },
    ];

    const filteredCases = cases.filter(c => activeTab === "Open" ? c.status === "Open" : c.status === "Resolved");

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Support Cases</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Assist users with their inquiries and issues.</p>
                </div>

                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search cases..."
                        className="pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-white dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all w-64"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-white/40 dark:bg-slate-800/40 p-1.5 rounded-2xl w-fit backdrop-blur-md">
                {["Open", "Resolved"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === tab
                                ? "bg-white dark:bg-slate-700 text-pink-600 shadow-lg"
                                : "text-slate-500 dark:text-slate-400 hover:text-pink-500"
                            }`}
                    >
                        {tab} Cases
                    </button>
                ))}
            </div>

            {/* Case List */}
            <div className="grid gap-4">
                {filteredCases.length === 0 ? (
                    <div className="text-center py-20 opacity-50 font-bold text-slate-500">No {activeTab.toLowerCase()} cases found.</div>
                ) : (
                    filteredCases.map(ticket => (
                        <div key={ticket.id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 
                   ${ticket.priority === 'High' ? 'bg-red-100 text-red-500' :
                                        ticket.priority === 'Medium' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'}`}>
                                    <FaHeadset />
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white">#{ticket.id} • {ticket.user}</h3>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest 
                       ${ticket.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                            {ticket.priority} Priority
                                        </span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">{ticket.issue}</p>
                                    <p className="text-xs text-slate-400 font-bold">{ticket.date}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                {ticket.status === 'Open' ? (
                                    <>
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-slate-600 dark:text-slate-200 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                                            <FaReply /> Reply
                                        </button>
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all">
                                            <FaCheck /> Resolve
                                        </button>
                                    </>
                                ) : (
                                    <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl font-bold text-xs uppercase tracking-widest cursor-default">
                                        Resolved
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SupportCases;

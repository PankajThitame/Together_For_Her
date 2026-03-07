import React, { useState } from "react";
import { FaBox, FaCheckCircle, FaClock, FaDirections, FaUpload } from "react-icons/fa";

const AssignedTasks = () => {
    // Mock Data for now
    const [tasks, setTasks] = useState([
        { id: 101, user: "Anjali D.", address: "Sector 4, Pune", status: "In Progress", type: "Kit Delivery", due: "Today, 5 PM" },
        { id: 102, user: "Meera K.", address: "Shivaji Nagar", status: "In Progress", type: "Support Visit", due: "Tomorrow, 10 AM" },
        { id: 103, user: "Priya S.", address: "Kothrud Depot", status: "Pending Proof", type: "Kit Delivery", due: "Yesterday" },
    ]);

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Assigned Tasks</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold">Manage your active deliveries and support missions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Tasks Column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" /> In Progress
                    </h2>

                    {tasks.filter(t => t.status === "In Progress").map(task => (
                        <div key={task.id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-pink-300/70 dark:border-slate-500/50 shadow-xl relative group hover:border-blue-300 transition-all">
                            <div className="absolute top-6 right-6 text-blue-500">
                                <FaClock className="text-xl" />
                            </div>

                            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
                                {task.type}
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">{task.user}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">{task.address}</p>

                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl font-bold text-slate-600 dark:text-slate-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                                    <FaDirections /> Navigate
                                </button>
                                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/30 transition-all">
                                    Complete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pending Proof / Verification Column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" /> Pending Verification
                    </h2>

                    {tasks.filter(t => t.status === "Pending Proof").map(task => (
                        <div key={task.id} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2rem] border border-pink-300/70 dark:border-slate-500/50 shadow-xl relative group hover:border-amber-300 transition-all">
                            <div className="absolute top-6 right-6 text-amber-500">
                                <FaBox className="text-xl" />
                            </div>

                            <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">
                                Action Required
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">{task.user}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Delivery completed {task.due}</p>

                            <div className="p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/20 text-center">
                                <p className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-3">Upload visual proof of delivery to close this task.</p>
                                <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2">
                                    <FaUpload /> Upload Photo
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Completed History Teaser */}
                    <div className="p-6 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-500 text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                        <FaCheckCircle className="text-3xl text-emerald-500 mx-auto mb-2" />
                        <span className="font-bold text-slate-400 text-sm uppercase tracking-wide">View 124 Completed Tasks</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignedTasks;

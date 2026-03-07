import React, { useState } from "react";
import { FaBoxOpen, FaBarcode, FaCheckCircle, FaUser, FaClipboardList } from "react-icons/fa";

const KitDistribution = () => {
    const [formData, setFormData] = useState({
        recipientName: "",
        kitId: "",
        location: "",
        notes: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log("Distributing Kit:", formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ recipientName: "", kitId: "", location: "", notes: "" });
        }, 3000);
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Kit Distribution Log</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold">Record every kit you deliver to track your impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="md:col-span-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-8 rounded-[3rem] border border-pink-300/70 dark:border-slate-500/50 shadow-xl relative overflow-hidden">
                    {submitted && (
                        <div className="absolute inset-0 z-10 bg-emerald-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white animate-fadeIn">
                            <FaCheckCircle className="text-6xl mb-4 drop-shadow-lg" />
                            <h2 className="text-3xl font-black">Logged Successfully!</h2>
                            <p className="font-bold opacity-90">Thank you for your service.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Recipient Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={formData.recipientName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-600 rounded-[3rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Kit ID / QR Code</label>
                                <div className="relative">
                                    <FaBarcode className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        name="kitId"
                                        value={formData.kitId}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-600 rounded-[3rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                        placeholder="KIT-2024-XXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Delivery Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-600 rounded-[3rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                                placeholder="Sector 4, Community Center"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Notes / Observations</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-white dark:border-slate-600 rounded-[3rem] font-medium text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
                                placeholder="Recipient requested follow-up..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-[3rem] font-black uppercase tracking-widest shadow-lg shadow-pink-500/30 transition-all transform hover:scale-[1.02]"
                        >
                            Log Distribution
                        </button>
                    </form>
                </div>

                {/* Stats / Info Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-6 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
                        <FaBoxOpen className="absolute -bottom-5 -right-5 text-9xl opacity-20 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h3 className="text-lg font-black uppercase tracking-wide opacity-90 mb-2">Total Distributed</h3>
                            <div className="text-6xl font-black tracking-tighter mb-2">128</div>
                            <p className="font-bold text-sm bg-white/20 inline-block px-3 py-1 rounded-[3rem] backdrop-blur-md">
                                +12 this week
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[3rem] border border-pink-300/70 dark:border-slate-500/50 shadow-xl">
                        <h3 className="text-slate-800 dark:text-white font-black text-lg mb-4 flex items-center gap-2">
                            <FaClipboardList className="text-pink-500" /> Recent Logs
                        </h3>
                        <ul className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <li key={i} className="flex items-start gap-3 pb-3 border-b border-dashed border-slate-200 dark:border-slate-500 last:border-0 last:pb-0">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Hygiene Kit #882{i}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Delivered to Anita R. • 2h ago</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KitDistribution;

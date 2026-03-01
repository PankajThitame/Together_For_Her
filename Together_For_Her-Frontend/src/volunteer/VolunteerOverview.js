import React from "react";
import { useAuth } from "../auth/AuthContext";
import {
    FaHandsHelping,
    FaBox,
    FaMapMarkerAlt,
    FaStar,
    FaArrowRight,
    FaCheckCircle,
    FaTasks
} from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

const VolunteerOverview = () => {
    const { user } = useAuth();

    // Mock Data
    const impactData = [
        { name: "Mon", kits: 4, hours: 2 },
        { name: "Tue", kits: 3, hours: 1.5 },
        { name: "Wed", kits: 7, hours: 4 },
        { name: "Thu", kits: 5, hours: 3 },
        { name: "Fri", kits: 8, hours: 5 },
        { name: "Sat", kits: 12, hours: 6 },
        { name: "Sun", kits: 10, hours: 4 },
    ];

    const recentActivities = [
        { type: "distribution", desc: "Delivered Hygiene Kit #4920", time: "2 hours ago", status: "Verified" },
        { type: "task", desc: "Accepted Request from Sarah M.", time: "5 hours ago", status: "In Progress" },
        { type: "achievement", desc: "Earned 'Guardian' Badge", time: "1 day ago", status: "New" },
    ];

    return (
        <div className="space-y-10 animate-fadeIn">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-pink-500 to-rose-600 p-10 text-white shadow-2xl shadow-pink-500/20 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                            <FaStar className="text-yellow-300" /> Volunteer Level 3
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">
                            Welcome back, {user?.name?.split(" ")[0] || "Guardian"}!
                        </h1>
                        <p className="text-pink-100 font-medium text-lg max-w-xl leading-relaxed">
                            You've impacted <strong>42 lives</strong> this month. There are <strong>5 new requests</strong> in your area waiting for a hero.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[100px]">
                            <div className="text-3xl font-black">128</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Total Kits</div>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[100px]">
                            <div className="text-3xl font-black">4.9</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <FaMapMarkerAlt />, label: "Nearby Requests", value: "12", sub: "3 Urgent", color: "text-blue-500", bg: "bg-blue-500" },
                    { icon: <FaTasks />, label: "Active Tasks", value: "4", sub: "2 Due Today", color: "text-amber-500", bg: "bg-amber-500" },
                    { icon: <FaBox />, label: "Kits Available", value: "25", sub: "Restock in 4d", color: "text-emerald-500", bg: "bg-emerald-500" },
                    { icon: <FaHandsHelping />, label: "Community Hours", value: "18h", sub: "This Week", color: "text-purple-500", bg: "bg-purple-500" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg}/10 flex items-center justify-center ${stat.color} text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.bg}/10 ${stat.color}`}>
                                {stat.sub}
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-1">{stat.value}</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Analytics & Timeline Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Impact Chart */}
                <div className="lg:col-span-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Weekly Impact</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">Kits Distributed vs Hours Spent</p>
                        </div>
                        <button className="px-5 py-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors">
                            View Report
                        </button>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={impactData}>
                                <defs>
                                    <linearGradient id="colorKits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '5 5' }}
                                />
                                <Area type="monotone" dataKey="kits" stroke="#ec4899" strokeWidth={4} fillOpacity={1} fill="url(#colorKits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Timeline */}
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-xl">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-8">Recent Activity</h2>

                    <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                        {recentActivities.map((act, idx) => (
                            <div key={idx} className="relative pl-10">
                                <div className={`absolute left-0 top-1 w-7 h-7 rounded-full border-4 border-[#fff1f5] dark:border-slate-900 flex items-center justify-center shrink-0 z-10 
                  ${act.type === 'distribution' ? 'bg-emerald-500' : act.type === 'task' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                                    {act.type === 'distribution' && <FaBox className="text-white text-[10px]" />}
                                    {act.type === 'task' && <FaMapMarkerAlt className="text-white text-[10px]" />}
                                    {act.type === 'achievement' && <FaStar className="text-white text-[10px]" />}
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight mb-1">{act.desc}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</span>
                                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest
                      ${act.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' :
                                                act.status === 'New' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {act.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 font-bold uppercase text-xs tracking-widest hover:border-pink-500 hover:text-pink-500 transition-all">
                        Load More History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VolunteerOverview;

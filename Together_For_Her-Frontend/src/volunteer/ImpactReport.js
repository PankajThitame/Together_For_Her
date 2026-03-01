import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

const ImpactReport = () => {
    const monthlyData = [
        { name: "Jan", kits: 45, support: 30 },
        { name: "Feb", kits: 55, support: 40 },
        { name: "Mar", kits: 40, support: 35 },
        { name: "Apr", kits: 70, support: 50 },
        { name: "May", kits: 65, support: 45 },
        { name: "Jun", kits: 85, support: 60 },
    ];

    const categoryData = [
        { name: "Hygiene Kits", value: 360, color: "#ec4899" },
        { name: "Medical Aid", value: 120, color: "#8b5cf6" },
        { name: "Counseling", value: 80, color: "#f59e0b" },
        { name: "Education", value: 60, color: "#10b981" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Impact Report</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold">Visualizing your contribution to the community.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Activity Chart */}
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-xl">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6">Monthly Activity</h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="kits" name="Kits Distributed" fill="#ec4899" radius={[10, 10, 10, 10]} />
                                <Bar dataKey="support" name="Support Cases" fill="#8b5cf6" radius={[10, 10, 10, 10]} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '12px' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Impact Distribution Pie Chart */}
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-700/50 shadow-xl">
                    <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6">Impact Distribution</h2>
                    <div className="h-[350px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Highlights */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Total Hours Volunteered", value: "342h", color: "from-blue-500 to-indigo-600" },
                        { label: "Lives Impacted", value: "850+", color: "from-pink-500 to-rose-600" },
                        { label: "Communities Served", value: "12", color: "from-emerald-500 to-teal-600" }
                    ].map((stat, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${stat.color} p-6 rounded-[2rem] text-white shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300`}>
                            <h3 className="text-4xl font-black tracking-tighter mb-1">{stat.value}</h3>
                            <p className="font-bold uppercase text-xs tracking-widest opacity-80">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImpactReport;

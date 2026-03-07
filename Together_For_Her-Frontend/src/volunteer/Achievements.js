import React from "react";
import { FaMedal, FaTrophy, FaStar, FaLock } from "react-icons/fa";

const Achievements = () => {
    const badges = [
        { id: 1, name: "First Step", desc: "Complete your first delivery", icon: <FaStar />, color: "text-amber-400", bg: "from-amber-100 to-amber-50", unlocked: true },
        { id: 2, name: "Guardian", desc: "Deliver 10+ Hygiene Kits", icon: <FaMedal />, color: "text-blue-500", bg: "from-blue-100 to-blue-50", unlocked: true },
        { id: 3, name: "Super Hero", desc: "Complete 50 tasks", icon: <FaTrophy />, color: "text-purple-500", bg: "from-purple-100 to-purple-50", unlocked: false },
        { id: 4, name: "Community Star", desc: "Receive 5-star ratings", icon: <FaStar />, color: "text-rose-500", bg: "from-rose-100 to-rose-50", unlocked: false },
    ];

    return (
        <div className="space-y-10 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4">Your Achievements</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">Unlock badges and earn rewards as you make a difference.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {badges.map(badge => (
                    <div key={badge.id} className={`relative p-8 rounded-[3rem] overflow-hidden group transition-all duration-300 hover:-translate-y-2
            ${badge.unlocked
                            ? "bg-white dark:bg-slate-800 shadow-xl border border-pink-300/70 dark:border-slate-500"
                            : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 opacity-70 grayscale"}`}
                    >
                        {/* Background Gradient Blob */}
                        {badge.unlocked && (
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${badge.bg} rounded-full blur-3xl opacity-50`} />
                        )}

                        <div className={`w-20 h-20 mx-auto rounded-[3rem] flex items-center justify-center text-4xl mb-6 shadow-lg 
              ${badge.unlocked ? `bg-white ${badge.color}` : "bg-slate-200 text-slate-400"}`}>
                            {badge.unlocked ? badge.icon : <FaLock className="text-2xl" />}
                        </div>

                        <div className="text-center relative z-10">
                            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{badge.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{badge.desc}</p>

                            {badge.unlocked ? (
                                <div className="mt-6 inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                    Unlocked
                                </div>
                            ) : (
                                <div className="mt-6 inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    Locked
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Section */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter mb-2">Next Milestone: Super Hero</h2>
                        <p className="font-medium text-pink-100">You need 38 more tasks to unlock this badge.</p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 opacity-90">
                            <span>Progress</span>
                            <span>12 / 50</span>
                        </div>
                        <div className="h-4 bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[24%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievements;

import React from "react";

const HygieneTips = () => {
  const tips = [
    { title: "Timed Changes", subtitle: "Change pads every 4-6 hours", icon: "🩸" },
    { title: "Sterile Hands", subtitle: "Wash before and after care", icon: "👐" },
    { title: "Breathable Fibers", subtitle: "Opt for cotton materials", icon: "👗" },
    { title: "Deep Hydration", subtitle: "Internal wellness first", icon: "💧" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="group bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/40 dark:border-slate-800/40 hover:bg-pink-500/5 transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shrink-0">
              {tip.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight">{tip.title}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 truncate">{tip.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HygieneTips;

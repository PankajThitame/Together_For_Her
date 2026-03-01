import React from "react";

const MythFactCard = ({ type, title, content }) => {
  const isMyth = type === "myth";

  return (
    <div className="group relative w-full max-w-sm">
      <div className={`absolute -inset-1 bg-gradient-to-r ${isMyth ? 'from-rose-500 to-red-600' : 'from-emerald-500 to-teal-600'} rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition duration-500`}></div>
      <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-xl space-y-6 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className={`${isMyth ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>
            {isMyth ? '❌ The Myth' : '✅ The Reality'}
          </div>
          <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-700/50 flex items-center justify-center">
            <div className={`w-1.5 h-1.5 rounded-full ${isMyth ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm leading-relaxed italic">
            "{content}"
          </p>
        </div>

        <div className="pt-4 flex items-center gap-2 group/btn">
          <span className={`text-[9px] font-black uppercase tracking-widest ${isMyth ? 'text-rose-500' : 'text-emerald-500'}`}>
            Explore Science
          </span>
          <div className={`h-[1px] flex-1 ${isMyth ? 'bg-rose-500/20' : 'bg-emerald-500/20'} group-hover/btn:flex-grow-0 transition-all`}></div>
        </div>
      </div>
    </div>
  );
};

export default MythFactCard;

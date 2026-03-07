import React from "react";
import Card, { CardBody } from "../components/ui/Card";
import { FaRocket, FaEye, FaUsers } from "react-icons/fa";

const About = () => {
  const teamMembers = [
    { name: "Omkar", role: "Visionary CEO", img: "pankaj.jpg" },
    { name: "Pankaj", role: "Technical Architect", img: "pankaj.jpg" },
    { name: "Pankaj", role: "Growth Strategist", img: "pankaj.jpg" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn">
      {/* Premium Hero Header */}
      <header className="relative min-h-[450px] flex items-center justify-center overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-pink-200/50 dark:border-slate-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.03)] group/hero">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
            Our Heart & Soul
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
            Empowering <span className="text-pink-500">Every</span> Woman.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
            "To provide the knowledge, safety, and community every woman deserves to thrive with dignity."
          </p>
        </div>
      </header>

      {/* Story & Vision - Glass Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Our Genesis",
            icon: <FaRocket />,
            text: "Together For Her started as a silent promise to break the stigmata surrounding menstrual health. Today, we are a global haven for empowerment and safety.",
            accent: "from-pink-500/10 to-rose-500/10"
          },
          {
            title: "The Horizon",
            icon: <FaEye />,
            text: "We envision a world where gender is never a barrier. Through technology and empathy, we build a future where every woman feels secure and heard.",
            accent: "from-purple-500/10 to-pink-500/10"
          }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 rounded-[3rem] bg-gradient-to-br ${item.accent} backdrop-blur-xl border border-pink-200/50 dark:border-slate-500/20 shadow-sm hover:shadow-xl transition-all duration-500 group`}>
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-[3rem] flex items-center justify-center text-pink-500 mb-8 shadow-lg shadow-pink-100/50 group-hover:scale-110 transition-transform">
              {React.cloneElement(item.icon, { size: 24 })}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">{item.title}<span className="text-pink-500">.</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed text-lg italic">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Team Section Redesign */}
      <section className="py-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">The Guardians<span className="text-pink-500">.</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Architects of the mission</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-56 h-56 object-cover rounded-full border-8 border-white dark:border-slate-600 shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic">{member.name}</h3>
              <p className="text-pink-500 font-black text-[11px] uppercase tracking-widest mt-2">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

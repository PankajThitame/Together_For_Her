import React from "react";
import Card, { CardBody } from "../components/ui/Card";
import { FaBullhorn, FaShieldAlt, FaHeartbeat, FaHandsHelping, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const servicesData = [
  {
    title: "Awareness Campaigns",
    description: "Workshops and events to educate women on menstrual hygiene and safety during periods.",
    icon: <FaBullhorn />,
    color: "bg-pink-100 text-pink-600",
    link: "/awareness"
  },
  {
    title: "Safety Support",
    description: "Helpline and resources to ensure women's safety during emergencies and daily life.",
    icon: <FaShieldAlt />,
    color: "bg-rose-100 text-rose-600",
    link: "/nearbyhelp"
  },
  {
    title: "Health Resources",
    description: "Providing access to affordable sanitary products and reliable healthcare information.",
    icon: <FaHeartbeat />,
    color: "bg-purple-100 text-purple-600",
    link: "/marketplace"
  },
  {
    title: "Community Growth",
    description: "Building a supportive, stigma-free community to empower women everywhere.",
    icon: <FaHandsHelping />,
    color: "bg-pink-100 text-pink-600",
    link: "/community"
  },
];

const Services = () => {
  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn">
      {/* Refined Header */}
      <div className="text-center space-y-6 relative py-12">
        <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
          Our Offerings
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
          Empowering through <span className="text-pink-500">Action.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
          "A comprehensive support ecosystem designed to protect, educate, and uplift every woman."
        </p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-[120px] -z-10" />
      </div>

      {/* Services Grid Redesign */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {servicesData.map((service, index) => (
          <div key={index} className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 rounded-[3rem] border border-pink-200/50 dark:border-slate-500/20 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center">
            <div className={`${service.color} w-20 h-20 rounded-[3rem] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-pink-100/30`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight italic group-hover:text-pink-600 transition-colors">
              {service.title}<span className="text-pink-500">.</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm leading-relaxed mb-8 flex-grow italic">
              {service.description}
            </p>
            <Link to={service.link} className="inline-flex items-center gap-2 text-pink-500 font-black text-[11px] uppercase tracking-widest group/btn bg-pink-50 dark:bg-pink-900/20 px-6 py-3 rounded-[3rem] hover:bg-pink-500 hover:text-white transition-all">
              Explore Now
              <FaArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </section>

      {/* Impact Movement CTA */}
      <section className="relative p-12 md:p-24 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl overflow-hidden group/movement">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]"></div>
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none">
            Join our <span className="text-pink-500">Growing</span> Movement
          </h2>
          <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto italic leading-relaxed">
            Your support scales our reach and impact. Every contribution sparks a tangible difference in the lives of sisters everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/donate">
              <button className="bg-gradient-to-r from-pink-500 to-rose-600 border-none text-white px-10 py-4 rounded-[3rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-pink-200/20 hover:translate-y-[-2px] hover:shadow-pink-300/30 transition-all active:scale-95">
                Support Cause
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-[3rem] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Connect With Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card, { CardBody } from "../components/ui/Card";
import { FaHeart, FaShieldAlt, FaUsers, FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn">
      {/* Hero Header */}
      <header className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[3.5rem] p-12 lg:p-20 border border-white/20 dark:border-slate-700/20 shadow-[0_20px_80px_rgba(0,0,0,0.03)] group/hero">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover/hero:scale-110 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full -ml-32 -mb-32 blur-3xl group-hover/hero:scale-110 transition-transform duration-1000"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30 shadow-sm animate-slideUp">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            Join the Sisterhood
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-[0.95] animate-slideUp">
            Empowering Herself.<br />
            <span className="text-pink-500">Transforming.</span> Together.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-slideUp delay-100">
            A sanctuary built for women, by women. We provide the essential tools, unwavering community, and safe spaces needed to thrive in wellness and safety.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-6 animate-slideUp delay-200">
            <Link to="/empowerment">
              <button className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-pink-200/50 hover:translate-y-[-2px] hover:shadow-pink-300/60 transition-all active:scale-95 flex items-center gap-3 group/btn">
                Our Mission <FaArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/community">
              <button className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-600 dark:text-slate-300 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-95">
                Join Circle
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Feature Circle */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Vital Awareness",
            desc: "Critical education on menstrual health and safety for every woman.",
            img: "/images/awareness.png",
            link: "/awareness",
            accent: "rose"
          },
          {
            title: "Safe Haven",
            desc: "Direct support and sanctuary for sisters in need of immediate care.",
            img: "/images/safety.png",
            link: "/nearbyhelp",
            accent: "pink"
          },
          {
            title: "Empowered Circle",
            desc: "A collective of strength where every story finds its safe home.",
            img: "/images/community1.png",
            link: "/community",
            accent: "purple"
          }
        ].map((item, idx) => (
          <div key={idx} className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-sm hover:shadow-2xl hover:shadow-pink-100/10 dark:hover:shadow-pink-900/5 transition-all duration-500 hover:-translate-y-2">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-pink-100 dark:bg-pink-900/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <img src={item.img} alt={item.title} className="w-20 h-20 mx-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-3 text-center italic">
              {item.title}<span className="text-pink-500">.</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm leading-relaxed mb-8 text-center">
              {item.desc}
            </p>

            <Link to={item.link}>
              <button className="w-full bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:group-hover:text-pink-400 group-hover:text-pink-500 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-transparent group-hover:border-pink-100/50 dark:group-hover:border-pink-900/40 transition-all">
                Explore Portal
              </button>
            </Link>
          </div>
        ))}
      </section>

      {/* Social Proof / Testimonials */}
      <section className="bg-slate-900 p-12 lg:p-20 rounded-[3.5rem] relative overflow-hidden shadow-2xl group/testimonials">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight italic">
              Shared Strength.<br />
              <span className="text-pink-500">Verified Impact.</span>
            </h2>
            <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-lg">
              Voices from our community that define our mission and the impact we create every single day.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { text: "This sanctuary redefined my health journey. The community support is unparalleled.", author: "Aradhya S.", role: "Member Since 2023" },
              { text: "Together For Her provides the safety and resources I've searched for years.", author: "Meera K.", role: "Verified Volunteer" }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors group/quote">
                <FaHeart size={20} className="text-pink-500 mb-6 group-hover/quote:scale-125 transition-transform" />
                <p className="text-slate-200 font-semibold italic text-lg leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest">-- {t.author}</h4>
                  <p className="text-pink-400/60 text-[10px] uppercase font-black mt-1 tracking-tighter">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA */}
      <section className="relative p-12 lg:p-24 rounded-[3.5rem] bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white shadow-2xl shadow-pink-200/50 overflow-hidden group/cta">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-white/10 rotate-12 blur-3xl group-hover/cta:translate-x-[10%] transition-transform duration-1000"></div>

        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none">
            Ready to make an <br />
            Impact Together?
          </h2>
          <p className="text-pink-50 font-semibold text-lg max-w-xl mx-auto opacity-90 leading-relaxed">
            Every contribution sparks a movement. Every volunteer creates a ripple. Join our mission today.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/donate">
              <button className="bg-white text-pink-600 px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:translate-y-[-2px] hover:shadow-2xl transition-all active:scale-95">
                Support Cause
              </button>
            </Link>
            <Link to="/join-volunteer">
              <button className="bg-transparent text-white border-2 border-white/30 px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                Start Impact
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-brand-500/10 text-brand-500 border border-brand-500/20 ${className}`}>
    {children}
  </span>
);

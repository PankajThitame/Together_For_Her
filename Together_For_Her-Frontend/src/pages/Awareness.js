import React, { useState } from "react";
import FAQAccordion from "../components/FAQAccordion";
import HygieneTips from "../components/HygieneTips";
import MotivationalQuotes from "../components/MotivationalQuotes";
import MythFactCard from "../components/MythFactCard";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";

const mythsFactsData = [
  {
    type: "myth",
    title: "Women shouldn’t exercise during periods.",
    content: "Exercising can actually reduce cramps and boost mood.",
  },
  {
    type: "myth",
    title: "Menstruation is dirty and impure.",
    content: "It is a natural biological process, not impure.",
  },
  {
    type: "myth",
    title: "Using tampons can break virginity.",
    content: "Tampons do not affect virginity; they are just absorbent materials.",
  },
];

const Awareness = () => {
  const [showMoreMyths, setShowMoreMyths] = useState(false);

  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn">
      {/* Premium Awareness Hero */}
      <header className="relative min-h-[450px] flex items-center justify-center overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-pink-200/50 dark:border-slate-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.03)] group/hero">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full -mr-32 -mb-32 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
            Truth & Wisdom
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
            Awareness<span className="text-pink-500">.</span> Education<span className="text-pink-500">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-3xl mx-auto italic">
            "Knowledge is the spark that ignites empowerment. Let's break the silence and replace stigma with science."
          </p>
        </div>
      </header>

      {/* Motivational & Hygiene Flow */}
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-pink-200/50 dark:border-slate-500/20 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-colors"></div>
          <MotivationalQuotes />
        </div>
        <div className="lg:col-span-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-pink-200/50 dark:border-slate-500/20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black italic tracking-tight">Hygiene Rituals<span className="text-pink-500">.</span></h3>
            <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 dark:border-slate-600">
              Safe & Proven
            </div>
          </div>
          <HygieneTips />
        </div>
      </div>

      {/* Myths & Facts Redesign */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">Breaking Myths<span className="text-pink-500">.</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Unveiling the truth together</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {mythsFactsData
            .slice(0, showMoreMyths ? mythsFactsData.length : 3)
            .map((item, index) => (
              <MythFactCard
                key={index}
                type={item.type}
                title={item.title}
                content={item.content}
              />
            ))}
        </div>

        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowMoreMyths(!showMoreMyths)}
            className="border-pink-200 text-pink-500 font-black text-xs uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-pink-500 hover:text-white transition-all shadow-xl shadow-pink-100/30"
          >
            {showMoreMyths ? "Show Less" : "Explore More Myths"}
          </Button>
        </div>
      </section>

      {/* FAQ Overlay Section */}
      <div className="bg-slate-900 p-12 lg:p-20 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white tracking-tighter italic leading-none">Curious Hearts<span className="text-pink-500">.</span></h2>
            <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.2em] text-[10px]">Answers to your most frequent questions</p>
          </div>
          <FAQAccordion />
        </div>
      </div>

      {/* Video Portal */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">Cinema of Care<span className="text-pink-500">.</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Visual journeys toward wellness</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { id: "zcvo9VLVHWc", title: "Hygiene Essentials" },
            { id: "c72EmEwZ5Qk", title: "Myths & Realities" }
          ].map((video, idx) => (
            <div key={idx} className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-4 rounded-[2.5rem] border border-pink-200/50 dark:border-slate-500/20 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-video relative rounded-[1.5rem] overflow-hidden shadow-lg mb-6">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white px-4 pb-2 italic tracking-tight group-hover:text-pink-600 transition-colors">
                {video.title}<span className="text-pink-500">.</span>
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Awareness;

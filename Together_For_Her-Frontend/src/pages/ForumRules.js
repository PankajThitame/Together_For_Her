import React, { useState } from "react";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaCheckCircle, FaTimesCircle, FaBan, FaLightbulb, FaShieldAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ForumRules = () => {
  const [expanded, setExpanded] = useState(false);

  const primaryRules = [
    { text: "Be respectful and kind to others.", icon: <FaCheckCircle className="text-emerald-500" /> },
    { text: "No misinformation or harmful content.", icon: <FaBan className="text-rose-500" /> },
    { text: "No spamming or self-promotion.", icon: <FaTimesCircle className="text-rose-500" /> },
    { text: "Keep discussions relevant.", icon: <FaLightbulb className="text-amber-500" /> }
  ];

  const secondaryRules = [
    "Report any inappropriate behavior to moderators.",
    "Use respectful language, no hate speech.",
    "Avoid sharing personal details in public forums."
  ];

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Safe Space</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Forum <span className="text-pink-600">Guidelines</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light italic max-w-2xl mx-auto">
            "We foster a community of support, education, and safety. These rules help us maintain a respectful environment for everyone."
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm p-4 animate-scaleIn">
          <CardBody className="p-8 md:p-14 space-y-12">

            <div className="grid sm:grid-cols-2 gap-6">
              {primaryRules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 bg-pink-50/30 rounded-2xl border border-pink-50/50 group hover:bg-white transition-all cursor-default">
                  <div className="text-xl shrink-0 transform group-hover:scale-110 transition-transform">
                    {rule.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-700 tracking-tight">{rule.text}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setExpanded(!expanded)}
                className="rounded-full border-pink-200 text-pink-600 hover:bg-pink-50 gap-2 pr-6"
              >
                {expanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                {expanded ? "Hide Additional Rules" : "Explore Full Guidelines"}
              </Button>
            </div>

            {expanded && (
              <div className="animate-slideUp bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <FaShieldAlt className="text-slate-400" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Enhanced Protections</h3>
                </div>
                <div className="space-y-4">
                  {secondaryRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-bold group-hover:bg-slate-900 group-hover:text-white transition-all">
                        {idx + 5}
                      </div>
                      <p className="text-sm text-gray-600 font-medium italic opacity-80 leading-relaxed">"{rule}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-12 border-t border-pink-50 space-y-6 text-center">
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-100" />)}
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Together for Her Community Governance</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-[10px]">
                <p className="text-gray-400 font-medium italic">&copy; {new Date().getFullYear()} All Rights Reserved</p>
                <span className="hidden sm:block text-pink-100">|</span>
                <a href="/contact" className="text-pink-600 font-black hover:underline uppercase tracking-widest">Support Center</a>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ForumRules;

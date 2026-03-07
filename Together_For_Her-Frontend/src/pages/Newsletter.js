import React, { useState } from "react";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FaPaperPlane, FaBell, FaHeart, FaGift, FaRegEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "" || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(`Thank you for joining our inner circle, ${email}! ✨`);
    setEmail("");

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-transparent py-20 px-6 animate-fadeIn relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
            Exclusive Insights
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">
            The Shared <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Wisdom.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-bold italic max-w-2xl mx-auto leading-relaxed">
            "Your weekly bridge to wellness, community triumphs, and the collective strength of our global sisterhood."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Form Side */}
          <div className="relative group/form">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-[3.5rem] blur-3xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700" />
            <Card className="border-none shadow-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[3rem] p-2 relative z-10 border border-pink-200/50">
              <CardBody className="p-8 md:p-10 space-y-8">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[3rem] flex items-center justify-center text-white shadow-xl shadow-pink-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <FaRegEnvelope size={32} />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Digital Mail</label>
                    <Input
                      type="email"
                      placeholder="guardian@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 bg-white/80 dark:bg-slate-900/50 border-none rounded-[3rem] text-lg font-bold"
                    />
                  </div>
                  <Button
                    onClick={handleSubscribe}
                    className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-500 text-white rounded-[3rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-pink-500/20 transform hover:-translate-y-1 active:scale-95 transition-all"
                  >
                    Join the Circle <FaPaperPlane className="ml-3 text-xs" />
                  </Button>
                </div>

                {message && (
                  <div className={`p-5 rounded-[3rem] text-sm font-black italic tracking-tight animate-slideUp border ${message.includes("Thank you") ? "bg-emerald-50/50 text-emerald-600 border-emerald-100" : "bg-rose-50/50 text-rose-600 border-rose-100"}`}>
                    {message}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Benefits Side */}
          <div className="space-y-12 pl-4">
            <h3 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white">Why Anchor Here?</h3>
            <div className="space-y-10">
              {[
                { icon: <FaBell />, title: "Live Updates", desc: "Instant intelligence on safety campaigns and new community modules.", color: "bg-blue-500" },
                { icon: <FaHeart />, title: "Curated Care", desc: "Premium menstrual health rituals and mental wellness architecture.", color: "bg-pink-500" },
                { icon: <FaGift />, title: "Resource Vault", desc: "Unlock exclusive educational blueprints and member-only treasures.", color: "bg-amber-500" }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-6 group/item">
                  <div className={`w-14 h-14 shrink-0 bg-white dark:bg-slate-800 shadow-xl rounded-[3rem] flex items-center justify-center text-white scale-100 group-hover/item:scale-110 transition-all duration-500 ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <div className="py-1">
                    <h4 className="font-black text-lg text-slate-800 dark:text-slate-100 mb-1 italic uppercase tracking-tight">{benefit.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed italic opacity-80">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-600 text-center">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Integrated with over 5,000 global guardians</p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

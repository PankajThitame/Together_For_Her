import React from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaHeadset } from 'react-icons/fa';

function Contact() {
  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn text-slate-900 dark:text-white">
      {/* Premium Contact Header */}
      <div className="text-center space-y-6 relative py-12">
        <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
          The Connection
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none">
          Let's <span className="text-pink-500">Connect.</span> Listen<span className="text-pink-500">.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
          "Your voice is our compass. Whether it's a whisper of feedback or a shout of courage, we are here."
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start max-w-7xl mx-auto px-4">
        {/* Contact Form Portal */}
        <div className="lg:col-span-3">
          <Card className="p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-pink-200/50 dark:border-slate-500/20 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
            <form className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <Input
                  label="Full Signature"
                  placeholder="Jane Doe"
                  required
                  className="font-bold text-sm italic"
                />
                <Input
                  label="Secure Mail"
                  type="email"
                  placeholder="jane@example.com"
                  required
                  className="font-bold text-sm italic"
                />
              </div>
              <Input
                label="Topic Concern"
                placeholder="The nature of your outreach..."
                className="font-bold text-sm italic"
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">The Narrative</label>
                <textarea
                  rows="6"
                  placeholder="Share your thoughts with the community guardians..."
                  className="w-full p-4 bg-white/60 dark:bg-slate-900/60 border border-pink-300 dark:border-slate-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none font-medium italic"
                  required
                ></textarea>
              </div>
              <Button
                className="w-full md:w-auto h-14 px-10 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:translate-y-[-2px] gap-3 bg-gradient-to-r from-pink-500 to-rose-600 border-none"
              >
                Send Message <FaPaperPlane size={14} className="opacity-80" />
              </Button>
            </form>
          </Card>
        </div>

        {/* Info Grid Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-10 rounded-[2.5rem] space-y-10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-pink-200/50 dark:border-slate-500/20 shadow-xl">
            <h3 className="text-2xl font-black italic tracking-tight border-b border-slate-100 dark:border-slate-600/50 pb-6">Direct Channels<span className="text-pink-500">.</span></h3>

            <div className="space-y-8">
              {[
                { icon: <FaEnvelope />, title: "Digital Hive", detail: "support@togetherforher.org", color: "text-pink-600 bg-pink-100 dark:bg-pink-900/20" },
                { icon: <FaPhone />, title: "Safe Line", detail: "+91 7821 828 016", color: "text-rose-600 bg-rose-100 dark:bg-rose-900/20" },
                { icon: <FaMapMarkerAlt />, title: "The Sanctuary", detail: "Pune Hub, MH 411045", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 group items-start">
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.title}</h4>
                    <p className="font-bold italic tracking-tight text-lg break-all">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group/sos">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                <FaHeadset size={24} />
              </div>
              <h3 className="text-2xl font-black italic mb-3">SOS Support?</h3>
              <p className="text-slate-400 font-medium mb-8 leading-relaxed text-sm">
                Our sanctuary helpline is active 24/7 for critical emergencies. You are never alone.
              </p>
              <button className="w-full h-12 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-pink-50 transition-all shadow-lg flex items-center justify-center gap-2">
                Call Guardians Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

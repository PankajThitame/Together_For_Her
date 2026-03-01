import React from "react";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaBalanceScale, FaUserCheck, FaShieldAlt, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Legal Hub</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Terms & <span className="text-pink-600">Conditions</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light italic max-w-2xl mx-auto">
            "Transparency is the foundation of our community. Please review our guidelines for a safe and respectful environment."
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white overflow-hidden animate-scaleIn">
          <div className="h-3 bg-gradient-to-r from-pink-500 to-rose-600 w-full" />
          <CardBody className="p-8 md:p-14 space-y-12">

            <div className="grid gap-12">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FaUserCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight uppercase tracking-widest text-xs font-black text-pink-600">1. User Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed font-medium italic">
                    All members of our community are expected to interact with kindness and integrity. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FaShieldAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight uppercase tracking-widest text-xs font-black text-rose-600">2. Privacy Commitment</h3>
                  <p className="text-gray-600 leading-relaxed font-medium italic">
                    We guard your personal data as if it were our own. Your information will never be sold or shared with external parties without your explicit, written consent.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FaExclamationTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight uppercase tracking-widest text-xs font-black text-slate-600">3. Prohibited Conduct</h3>
                  <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                    {["Spamming & Hacking", "Misinformation", "Harassment", "Illegal Activities"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 bg-slate-50 px-4 py-2 rounded-lg font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FaSyncAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight uppercase tracking-widest text-xs font-black text-purple-600">4. Policy Iterations</h3>
                  <p className="text-gray-600 leading-relaxed font-medium italic">
                    We evolve our terms to better serve you. Any significant updates will be communicated clearly through our official notification channels.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-pink-50 flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="px-12 bg-gray-900 border-none hover:bg-black shadow-xl">
                I Agree
              </Button>
              <Button variant="outline" size="lg" className="px-12 border-rose-100 text-rose-600 hover:bg-rose-50">
                Cancel
              </Button>
            </div>

            <div className="text-center pt-8 border-t border-pink-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Together for Her &bull; Platform Governance</p>
              <p className="text-[10px] text-gray-400 italic font-medium">&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Terms;

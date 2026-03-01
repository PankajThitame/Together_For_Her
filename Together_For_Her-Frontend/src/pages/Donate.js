import API_BASE_URL from "../apiConfig";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FaHeart, FaChevronLeft, FaShieldAlt, FaHandHoldingHeart } from "react-icons/fa";

const Donate = () => {
  const [customAmount, setCustomAmount] = useState("");
  const navigate = useNavigate();

  const handleRazorpayDonate = async (amount) => {
    try {
      if (amount === 0) {
        if (!customAmount || isNaN(customAmount) || customAmount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
        amount = parseInt(customAmount) * 100;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/payments/create`, { amount });
      const { id: orderId, amount: razorAmount, currency } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: razorAmount,
        currency,
        order_id: orderId,
        name: "Together for Her",
        description: "Support Women's Safety",
        handler: function (response) {
          navigate("/donationsuccess");
        },
        prefill: {
          name: "Supporter",
          email: "supporter@example.com",
          contact: "7821828016",
        },
        theme: {
          color: "#db2777",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in Razorpay payment:", error);
      alert("Payment failed. Please try again!");
    }
  };

  const presetAmounts = [
    { label: "₹500", raw: 50000 },
    { label: "₹1k", raw: 100000 },
    { label: "₹2k", raw: 200000 },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn">
      {/* Back Flow Navigation */}
      <div className="flex items-center gap-4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-pink-500 transition-colors group"
        >
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg group-hover:bg-pink-50 transition-colors">
            <FaChevronLeft size={10} />
          </div>
          Portal Retreat
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Narrative Side */}
        <div className="lg:col-span-3 space-y-10 py-6">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
              Fuel the Movement
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-[0.95]">
              Your Spark <span className="text-pink-500">Saves</span> Lives<span className="text-pink-500">.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl italic">
              "Every rupee is a beacon of hope, ensuring dignity, safety, and hygiene for every woman in our sanctuary."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {[
              { icon: <FaShieldAlt />, title: "Fortified Support", desc: "100% encrypted and secure processing." },
              { icon: <FaHandHoldingHeart />, title: "Direct Impact", desc: "Straight to grassroots empowerment kits." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/20 shadow-sm flex items-start gap-4">
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 text-pink-500 rounded-2xl">
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm italic tracking-tight">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactional Side */}
        <div className="lg:col-span-2 group/donation">
          <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-white/20 dark:border-slate-700/20 shadow-2xl space-y-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl group-hover/donation:scale-125 transition-transform duration-1000"></div>

            <div className="text-center space-y-6 relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-pink-200/50">
                <FaHeart size={36} className="animate-pulse" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">Giving Pulse<span className="text-pink-500">.</span></h3>
            </div>

            <div className="grid grid-cols-3 gap-3 relative z-10">
              {presetAmounts.map((amt) => (
                <button
                  key={amt.label}
                  onClick={() => handleRazorpayDonate(amt.raw)}
                  className="py-4 border-2 border-slate-100 dark:border-slate-700 rounded-[1.5rem] text-slate-600 dark:text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all active:scale-95 shadow-sm"
                >
                  {amt.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 relative z-10">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Bespoke Amount (₹)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-900 border border-transparent rounded-[1.5rem] text-slate-900 dark:text-white text-sm font-bold focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none placeholder-slate-300 dark:placeholder-slate-600 transition-all font-poppins"
                />
              </div>
              <button
                onClick={() => handleRazorpayDonate(0)}
                className="w-full h-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-pink-500/30 hover:translate-y-[-2px] transition-all active:scale-95"
              >
                Spark Impact Now
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 text-center relative z-10">
              <Link to="/join-volunteer" className="text-[10px] text-slate-400 hover:text-pink-500 font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                Giving Time Instead? <span className="underline italic">Join as Volunteer</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;

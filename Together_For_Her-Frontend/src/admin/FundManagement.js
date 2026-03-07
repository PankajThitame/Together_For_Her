import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FundManagement = () => {
  const [funds, setFunds] = useState({
    totalDonations: 0,
    recentDonors: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/funds`);
        setFunds(response.data);
      } catch (err) {
        setError("Error fetching fund data.");
        console.error(err);
      }
    };
    fetchFundData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-pink-300/80 dark:border-slate-600 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Fund Management
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-[3rem] mb-8 flex items-center gap-3 animate-shake">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero Stats */}
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 p-10 rounded-[3rem] shadow-2xl text-white">
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-xl font-medium opacity-90 mb-2">Total Donations Received</h3>
            <p className="text-6xl font-black tracking-tighter mb-4 animate-slideUp">
              ₹ {funds.totalDonations.toLocaleString()}
            </p>
            <div className="h-1 w-20 bg-white/30 rounded-full" />
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        </div>

        {/* Recent Donors */}
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[3rem] p-8 shadow-xl border border-pink-300/80 dark:border-slate-500">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 flex items-center gap-3">
            Recent Benefactors
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </h3>

          {funds.recentDonors.length === 0 ? (
            <div className="py-12 text-center text-gray-700 dark:text-slate-400 font-bold italic">
              No recent donations recorded.
            </div>
          ) : (
            <div className="space-y-4">
              {funds.recentDonors.map((donor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/60 dark:bg-slate-700/60 hover:bg-white dark:hover:bg-slate-700 p-5 rounded-[3rem] shadow-sm border border-pink-200/70 dark:border-slate-600 transition-all hover:shadow-md group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold group-hover:bg-pink-500 group-hover:text-white transition-colors">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-slate-100">{donor.name}</p>
                      <p className="text-xs text-gray-600 dark:text-slate-400 font-black uppercase tracking-tighter">{new Date(donor.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-emerald-600">
                      +₹{donor.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundManagement;

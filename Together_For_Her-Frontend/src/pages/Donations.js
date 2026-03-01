import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/donations`).then((response) => {
      setDonations(response.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900/40 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800/40 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-white/60 dark:border-slate-800 transition-all duration-300">
        <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-10 text-center uppercase tracking-tighter">
          Donation Management
        </h2>

        <div className="overflow-hidden rounded-[2rem] border border-pink-100/50 dark:border-slate-700 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                <th className="px-8 py-6 font-bold uppercase tracking-wider text-xs">Donor Name</th>
                <th className="px-8 py-6 font-bold uppercase tracking-wider text-xs">Email</th>
                <th className="px-8 py-6 font-bold uppercase tracking-wider text-xs">Amount</th>
                <th className="px-8 py-6 font-bold uppercase tracking-wider text-xs">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 dark:divide-slate-700">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-pink-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-pink-600 transition-colors uppercase tracking-tight">{donation.donorName}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-700 dark:text-slate-400 italic">{donation.email}</td>
                  <td className="px-8 py-5 text-lg font-black text-emerald-600 dark:text-emerald-400">₹{donation.amount.toLocaleString()}</td>
                  <td className="px-8 py-5 text-xs font-black text-gray-500 dark:text-slate-500 uppercase tracking-[0.15em]">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donations;

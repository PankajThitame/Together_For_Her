import React, { useEffect, useState } from "react";
import axios from "axios";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/volunteers/`);
        setVolunteers(response.data);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      }
    };
    fetchVolunteers();
  }, []);

  const updateVolunteerStatus = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/volunteers/${id}`, { status });
      setVolunteers((prev) =>
        prev.map((volunteer) =>
          volunteer.id === id ? { ...volunteer, status } : volunteer
        )
      );
    } catch (error) {
      console.error("Error updating volunteer status:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Volunteer Management
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-white/60 dark:border-slate-700 shadow-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
        <div className="overflow-x-auto">
          {volunteers.length === 0 ? (
            <div className="py-20 text-center text-gray-700 dark:text-slate-400 font-bold italic transition-colors">
              No volunteer applications available.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Volunteer Name</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Contact Information</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Specialized Skills</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm text-center">Status</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm text-center">Management Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100/30 dark:divide-slate-700">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-pink-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-6 font-bold text-gray-900 dark:text-slate-100 group-hover:text-pink-600 transition-colors">
                      {volunteer.name}
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-gray-800 dark:text-slate-200 font-bold">{volunteer.email}</p>
                        <p className="text-xs text-gray-600 dark:text-slate-500 font-black tracking-widest">{volunteer.contactNumber}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-tighter shadow-sm border border-pink-200/50">
                        {volunteer.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${getStatusBadgeColor(
                          volunteer.status
                        )}`}
                      >
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-4">
                        {volunteer.status === "PENDING" ? (
                          <>
                            <button
                              onClick={() => updateVolunteerStatus(volunteer.id, "Approved")}
                              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-200 hover:-translate-y-1 active:scale-95"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateVolunteerStatus(volunteer.id, "Rejected")}
                              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-rose-200 hover:-translate-y-1 active:scale-95"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-300 italic text-sm">Decision Handled</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerManagement;


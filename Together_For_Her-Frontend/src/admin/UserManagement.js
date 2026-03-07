import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaEnvelope } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setUpdatingId(userId);
      // Get the full user object to send in the PUT request as required by the backend DTO
      const userToUpdate = users.find(u => u.id === userId);
      const updatedData = { ...userToUpdate, status: newStatus };

      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/auth/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          User Management
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
          <p className="text-pink-600 font-medium animate-pulse">Loading users...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.length === 0 ? (
            <div className="col-span-full py-20 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-white/60 dark:border-slate-700 text-center">
              <p className="text-gray-700 dark:text-slate-400 text-lg font-bold italic">No users found in the system.</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/60 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6">
                  {user.status === "APPROVED" || user.verificationStatus?.toLowerCase() === "verified" ? (
                    <div className="bg-green-100 text-green-600 p-2 rounded-full shadow-inner" title="Verified">
                      <FaCheckCircle size={20} />
                    </div>
                  ) : (
                    <div className="bg-red-100 text-red-600 p-2 rounded-full shadow-inner" title="Unverified">
                      <FaTimesCircle size={20} />
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 mb-1 group-hover:text-pink-600 transition-colors">
                    {user.firstName}
                  </h2>
                  <p className="text-gray-700 dark:text-slate-400 font-bold">Age: {user.age} • {user.socialStatus}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                    href={`mailto:${user.email}`}
                    className="flex items-center gap-3 text-gray-700 dark:text-slate-400 hover:text-pink-600 transition-colors group/item"
                  >
                    <div className="p-2 bg-pink-50 dark:bg-slate-700 rounded-xl group-hover/item:bg-pink-500 group-hover/item:text-white transition-all">
                      <FaEnvelope size={14} />
                    </div>
                    <span className="font-bold truncate text-gray-800 dark:text-slate-200">{user.email}</span>
                  </a>

                  <div className="flex gap-4">
                    <a
                      href={`tel:${user.contactNumber}`}
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition-all font-bold shadow-lg shadow-pink-200"
                    >
                      <FaPhone size={14} /> Call
                    </a>
                    <a
                      href={`https://wa.me/${user.contactNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all font-bold shadow-lg shadow-emerald-200"
                    >
                      <FaWhatsapp size={18} /> WhatsApp
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-pink-100/30 dark:border-slate-700">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-slate-500 font-black">Location</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1 text-ellipsis overflow-hidden">
                      <FaMapMarkerAlt className="text-pink-500 shrink-0" /> {user.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-slate-500 font-black">Language</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-slate-300">{user.preferredLanguage}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-slate-500 font-black">Health Concerns</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-slate-300 truncate">{user.healthConcerns}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-slate-500 font-black">User Status</p>
                    <div className="relative">
                      {updatingId === user.id ? (
                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          className={`text-xs font-black uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer transition-colors ${user.status === "APPROVED" ? "text-emerald-500" :
                              user.status === "REJECTED" ? "text-rose-500" : "text-amber-500"
                            }`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;

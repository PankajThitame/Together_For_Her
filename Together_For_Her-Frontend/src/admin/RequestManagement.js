import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress, Box
} from "@mui/material";

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/requests`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      console.log(`Updating request ID: ${id} with status: ${status}`);
      await axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/requests/${id}/status`, { status });

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.request_id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Request Management
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
          <p className="text-pink-600 font-medium animate-pulse">Loading requests...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
          <span className="text-xl">⚠️</span> {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2.5rem] border border-white/60 dark:border-slate-700 shadow-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">ID</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">User</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Contact</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Address</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Reason</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm text-center">Status</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100/30 dark:divide-slate-700">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-gray-700 dark:text-slate-400 font-bold italic">
                      No requests found in the system.
                    </td>
                  </tr>
                ) : (
                  requests.map((request, idx) => (
                    <tr
                      key={request.request_id}
                      className="hover:bg-pink-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-slate-500 font-bold">#{request.request_id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 dark:text-slate-100">{request.user.firstName}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-slate-300 font-black">{request.contact}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-slate-400 font-bold truncate max-w-[200px]" title={request.address}>
                        {request.address}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-slate-400 font-bold italic">"{request.reason}"</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest ${request.status === "APPROVED" ? "bg-emerald-100 text-emerald-600" :
                          request.status === "REJECTED" ? "bg-red-100 text-red-600" :
                            "bg-amber-100 text-amber-600"
                          }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => updateRequestStatus(request.request_id, "APPROVED")}
                            disabled={request.status === "APPROVED"}
                            className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 disabled:opacity-30 disabled:shadow-none translate-y-0 hover:-translate-y-1"
                            title="Approve"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => updateRequestStatus(request.request_id, "REJECTED")}
                            disabled={request.status === "REJECTED"}
                            className="p-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 disabled:opacity-30 disabled:shadow-none translate-y-0 hover:-translate-y-1"
                            title="Reject"
                          >
                            ❌
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestManagement;

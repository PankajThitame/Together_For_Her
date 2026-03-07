import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackSystem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [response, setResponse] = useState({});
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/reviews/get/all`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  const handleResponseChange = (id, value) => {
    setResponse((prev) => ({ ...prev, [id]: value }));
  };

  const submitResponse = async (id) => {
    try {
      const updatedResponse = response[id] || "";
      await axios.put(`${API_BASE_URL}/response/${id}`, {
        response: updatedResponse,
        status: "RESPONDED",
      });
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === id ? { ...fb, response: updatedResponse, status: "RESPONDED" } : fb
        )
      );
      setResponse((prev) => ({ ...prev, [id]: "" }));
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const editResponse = (id, currentResponse) => {
    setEditingId(id);
    setResponse((prev) => ({ ...prev, [id]: currentResponse || "" }));
  };

  const filteredFeedbacks =
    filter === "All" ? feedbacks : feedbacks.filter((fb) => fb.status === filter);

  return (
    <div className="min-h-screen bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-pink-300/80 dark:border-slate-600 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Feedback Management
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-6 mb-10 px-6">
        <label htmlFor="statusFilter" className="font-bold text-gray-700 uppercase tracking-widest text-xs">
          Filter Status
        </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[3rem] border border-pink-100/50 dark:border-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none text-gray-800 dark:text-slate-200 font-medium transition-all shadow-inner"
        >
          <option value="All" className="dark:bg-slate-800">All Feedbacks</option>
          <option value="PENDING" className="dark:bg-slate-800">Pending</option>
          <option value="RESPONDED" className="dark:bg-slate-800">Responded</option>
        </select>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="py-20 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-[3rem] border border-pink-300/80 dark:border-slate-500 text-center transition-colors">
          <p className="text-gray-700 dark:text-slate-400 text-lg font-bold italic">No feedback entries found matching your criteria.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[3rem] border border-pink-300/80 dark:border-slate-500 shadow-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Contributer</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Feedback Content</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm text-center">Status</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Official Response</th>
                  <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100/30 dark:divide-slate-700">
                {filteredFeedbacks.map((fb) => (
                  <tr key={fb.id} className="hover:bg-pink-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 dark:text-slate-100 group-hover:text-pink-600 transition-colors">
                        {fb.user?.firstName || "Anonymous"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-gray-800 dark:text-slate-300 text-sm font-bold leading-relaxed max-w-xs">{fb.text || "—"}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${fb.status === "PENDING" ? "bg-amber-100 text-amber-600" :
                        fb.status === "RESPONDED" ? "bg-emerald-100 text-emerald-600" :
                          "bg-gray-100 text-gray-400"
                        }`}>
                        {fb.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {editingId === fb.id ? (
                        <textarea
                          value={response[fb.id] !== undefined ? response[fb.id] : ""}
                          onChange={(e) => handleResponseChange(fb.id, e.target.value)}
                          className="w-full p-4 bg-white/80 dark:bg-slate-800 border border-pink-100 dark:border-slate-500 rounded-[3rem] text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none min-h-[100px] text-gray-800 dark:text-slate-200"
                          placeholder="Craft your response..."
                        />
                      ) : fb.status === "RESPONDED" ? (
                        <p className="text-gray-700 dark:text-slate-400 text-sm font-bold italic">"{fb.response}"</p>
                      ) : (
                        <textarea
                          value={response[fb.id] !== undefined ? response[fb.id] : ""}
                          onChange={(e) => handleResponseChange(fb.id, e.target.value)}
                          className="w-full p-4 bg-white/20 dark:bg-slate-800/40 border border-pink-100/30 dark:border-slate-500 rounded-[3rem] text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none min-h-[100px] placeholder:italic text-gray-800 dark:text-slate-200"
                          placeholder="Type your response here..."
                        />
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        {fb.status === "PENDING" ? (
                          <button
                            onClick={() => submitResponse(fb.id)}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold p-3 rounded-[3rem] shadow-lg shadow-pink-200 transition-all hover:-translate-y-1 active:scale-95"
                            title="Submit Response"
                          >
                            📤 Respond
                          </button>
                        ) : editingId === fb.id ? (
                          <button
                            onClick={() => submitResponse(fb.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-3 rounded-[3rem] shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-95"
                            title="Save Changes"
                          >
                            ✅ Save
                          </button>
                        ) : (
                          <button
                            onClick={() => editResponse(fb.id, fb.response)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-3 rounded-[3rem] shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95"
                            title="Edit Response"
                          >
                            ✏️ Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSystem;

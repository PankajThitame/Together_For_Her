import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [userStats, setUserStats] = useState({});
  const [requestStats, setRequestStats] = useState({});
  const [donationStats, setDonationStats] = useState({});
  const [contentStats, setContentStats] = useState({});
  const [volunteerStats, setVolunteerStats] = useState({});
  const [feedbackStats, setFeedbackStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          requestResponse,
          userResponse,
          volunteerResponse,
          feedbackResponse,
          contentResponse,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/requests/count`),
          axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/auth/count`),
          axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/volunteers/count`),
          axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/count`),
          axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/content/stats`),
        ]);

        setUserStats(userResponse.data);
        setRequestStats(requestResponse.data);
        setVolunteerStats(volunteerResponse.data);
        setFeedbackStats(feedbackResponse.data);
        setContentStats(contentResponse.data);
      } catch (err) {
        setError("Error fetching data.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-pink-50/20 dark:bg-slate-900/40 p-8 rounded-[3rem] shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-sm animate-fadeIn transition-colors duration-300">
      <div className="mb-10 text-center relative">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent inline-block">
          Admin Overview
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-4 rounded-full opacity-50 dark:opacity-30" />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 animate-shake">
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Stats */}
        <StatCard
          title="Users"
          stats={[
            { label: "Total", value: userStats.totalUsers || 0 },
            { label: "Active", value: userStats.activeUsers || 0, color: "text-green-500" },
            { label: "Pending", value: userStats.pendingApprovals || 0, color: "text-amber-500" }
          ]}
          gradient="from-blue-500 to-indigo-600"
        />

        {/* Requests */}
        <StatCard
          title="Requests"
          stats={[
            { label: "Total", value: requestStats.totalRequests || 0 },
            { label: "Pending", value: requestStats.pendingRequests || 0, color: "text-amber-500" },
            { label: "Done", value: requestStats.completedRequests || 0, color: "text-green-500" }
          ]}
          gradient="from-pink-500 to-rose-600"
        />

        {/* Funds */}
        <StatCard
          title="Donations"
          stats={[
            { label: "Total", value: `₹${donationStats.totalDonations || 0}` },
            { label: "Recent", value: donationStats.recentDonation || "N/A", sub: true }
          ]}
          gradient="from-emerald-500 to-teal-600"
        />

        {/* Content */}
        <StatCard
          title="Content Moderation"
          stats={[
            { label: "Pending", value: contentStats.pendingPosts || 0, color: "text-amber-500" },
            { label: "Approved", value: contentStats.approvedPosts || 0, color: "text-green-500" }
          ]}
          gradient="from-purple-500 to-violet-600"
        />

        {/* Volunteers */}
        <StatCard
          title="Volunteers"
          stats={[
            { label: "Total", value: volunteerStats.totalVolunteers || 0 },
            { label: "Applied", value: volunteerStats.pendingApplications || 0, color: "text-blue-500" }
          ]}
          gradient="from-orange-500 to-amber-600"
        />

        {/* Feedback */}
        <StatCard
          title="Feedback"
          stats={[
            { label: "Total", value: feedbackStats.feedbackCount || 0 },
            { label: "Pending", value: feedbackStats.pendingtoreply || 0, color: "text-red-500" }
          ]}
          gradient="from-cyan-500 to-blue-600"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, stats, gradient }) => (
  <div className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/60 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />

    <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-6 flex items-center justify-between">
      {title}
      <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${gradient}`} />
    </h2>

    <div className="space-y-4">
      {stats.map((s, idx) => (
        <div key={idx} className="flex justify-between items-end border-b border-pink-100/30 dark:border-slate-700 pb-2">
          <span className="text-gray-700 dark:text-slate-400 font-bold tracking-tight">{s.label}</span>
          <span className={`text-2xl font-black ${s.color || "text-gray-900 dark:text-slate-100"} ${s.sub ? "text-[11px] uppercase italic font-black text-pink-400 dark:text-pink-500" : ""}`}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default AdminPanel;


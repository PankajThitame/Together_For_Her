import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    donations: [],
    userActivity: [],
    volunteerApplications: [],
    serviceRequests: [],
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/analytics`);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  const COLORS = ["#4CAF50", "#2196F3", "#FF5722", "#FFC107"];

  return (
    <div className="p-6 m-6 bg-white rounded-[3rem] shadow-md">
      <h2 className="text-3xl text-center text-slate-800 font-bold mb-8">
        📊 Analytics Dashboard
      </h2>

      <div className="grid gap-6 md:grid-cols-2 auto-rows-fr">
        {/* Total Donations Chart */}
        <div className="bg-gray-100 border border-pink-300 rounded-[3rem] shadow-sm p-6 transition-transform hover:-translate-y-1 duration-300">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">
            Total Donations (Monthly)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.donations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity Chart */}
        <div className="bg-gray-100 border border-pink-300 rounded-[3rem] shadow-sm p-6 transition-transform hover:-translate-y-1 duration-300">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">
            User Activity (Daily)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.userActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#2196F3" />
              <Line type="monotone" dataKey="newUsers" stroke="#FF5722" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volunteer Applications Pie Chart */}
        <div className="bg-gray-100 border border-pink-300 rounded-[3rem] shadow-sm p-6 transition-transform hover:-translate-y-1 duration-300">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">
            Volunteer Applications
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.volunteerApplications}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analyticsData.volunteerApplications.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Requests Chart */}
        <div className="bg-gray-100 border border-pink-300 rounded-[3rem] shadow-sm p-6 transition-transform hover:-translate-y-1 duration-300">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">
            Service Requests (By Type)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.serviceRequests}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

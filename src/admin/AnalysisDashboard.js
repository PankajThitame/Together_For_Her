import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/analysisDashboard.css";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

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
        const response = await axios.get("http://localhost:9090/api/admin/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  const COLORS = ["#4CAF50", "#2196F3", "#FF5722", "#FFC107"];

  return (
    <div className="dashboard-container">
      <h2>📊 Analytics Dashboard</h2>

      <div className="chart-grid">
        {/* Total Donations Chart */}
        <div className="chart-card">
          <h3>Total Donations (Monthly)</h3>
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
        <div className="chart-card">
          <h3>User Activity (Daily)</h3>
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
        <div className="chart-card">
          <h3>Volunteer Applications</h3>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Requests Chart */}
        <div className="chart-card">
          <h3>Service Requests (By Type)</h3>
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

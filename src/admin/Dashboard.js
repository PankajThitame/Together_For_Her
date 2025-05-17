import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const AdminPanel = () => {
  const [userStats, setUserStats] = useState({});
  const [requestStats, setRequestStats] = useState({});
  const [donationStats, setDonationStats] = useState({});
  const [contentStats, setContentStats] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [volunteerStats, setVolunteerStats] = useState({});
  const [feedbackStats, setFeedbackStats] = useState({});
  const [roleStats, setRoleStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const [
          requestResponse,
          userResponse,
         
          // donationResponse,
          // contentResponse,
          // analyticsResponse,
          volunteerResponse,
          feedbackResponse,
          // roleResponse,
        ] = await Promise.all([
          axios.get("http://localhost:9090/api/requests/count"),
          axios.get("http://localhost:9090/api/auth/count"),      // User stats
          //    // Requests stats
          // axios.get("http://localhost:9090/api/admin/donations"),  // Donation stats
          // axios.get("http://localhost:9090/api/admin/content"),    // Content moderation
          // axios.get("http://localhost:9090/api/admin/analytics"),  // Analytics
          axios.get("http://localhost:9090/api/volunteers/count"),      // Volunteer stats
          axios.get("http://localhost:9090/api/count"),  // Feedback stats
          // axios.get("http://localhost:9090/api/get/roles"),        // User roles
        ]);

        // Log the data from each API response for debugging

        // // Set the fetched data to state
        setUserStats(userResponse.data);
        setRequestStats(requestResponse.data);
        // setDonationStats(donationResponse.data);
        // setContentStats(contentResponse.data);
        // setAnalytics(analyticsResponse.data);
        setVolunteerStats(volunteerResponse.data);
        setFeedbackStats(feedbackResponse.data);
        // setRoleStats(roleResponse.data);
      } catch (err) {
        setError("Error fetching data.");
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array, meaning this effect will run once when the component mounts.

  return (
    <div className="admin-panel">
      <h1 className="title">Admin Dashboard</h1>

      {error && <p className="error">{error}</p>}

      <div className="admin-section">
        <h2>User Management</h2>
        <p>Total Users: <strong>{userStats.totalUsers || 0}</strong></p>
        <p>Active Users: <strong>{userStats.activeUsers || 0}</strong></p>
        <p>Pending Approvals: <strong>{userStats.pendingApprovals || 0}</strong></p>
      </div>

      <div className="admin-section">
        <h2>Request Management</h2>
        <p>Total Service Requests: <strong>{requestStats.totalRequests || 0}</strong></p>
        <p>Pending Requests: <strong>{requestStats.pendingRequests || 0}</strong></p>
        <p>Completed Requests: <strong>{requestStats.completedRequests || 0}</strong></p>
      </div>

      <div className="admin-section">
        <h2>Fund Management</h2>
        <p>Total Donations: <strong>₹{donationStats.totalDonations || 0}</strong></p>
        <p>Recent Donation: <strong>{donationStats.recentDonation || "N/A"}</strong></p>
      </div>

      <div className="admin-section">
        <h2>Content Moderation</h2>
        <p>Posts Pending Review: <strong>{contentStats.pendingPosts || 0}</strong></p>
        <p>Approved Posts: <strong>{contentStats.approvedPosts || 0}</strong></p>
      </div>

      <div className="admin-section">
        <h2>Volunteer Management</h2>
        <p>Total Volunteers: <strong>{volunteerStats.totalVolunteers || 0}</strong></p>
        <p>Pending Applications: <strong>{volunteerStats.pendingApplications || 0}</strong></p>
      </div>

      <div className="admin-section">
        <h2>Feedback System</h2>
        <p>Total Feedback Received: <strong>{feedbackStats.feedbackCount || 0}</strong></p>
        <p>Replied Feedback: <strong>{feedbackStats.replied || 0}</strong></p>
        <p>Pending to Reply: <strong>{feedbackStats.pendingtoreply || 0}</strong></p>
      </div>
    </div>
  );
};

export default AdminPanel;

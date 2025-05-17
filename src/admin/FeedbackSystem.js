import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/feedbackSystem.css";

const FeedbackSystem = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [response, setResponse] = useState({});
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null); // Track which response is being edited

  // Fetch feedback from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/reviews/get/all");
        console.log("Fetched Feedback Data:", response.data);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  // Handle response input
  const handleResponseChange = (id, value) => {
    setResponse((prev) => ({
      ...prev,
      [id]: value, // Ensure only this field is updated
    }));
  };

  // Submit admin response (new or edited)
  const submitResponse = async (id) => {
    try {
      const updatedResponse = response[id] || "";

      console.log("Submitting response for ID:", id, "Response:", updatedResponse);

      await axios.put(`http://localhost:9090/api/response/${id}`, {
        response: updatedResponse,
        status: "RESPONDED",
      });

      // Update feedback list correctly
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb.id === id ? { ...fb, response: updatedResponse, status: "RESPONDED" } : fb
        )
      );

      // Clear only the submitted response input field
      setResponse((prev) => ({
        ...prev,
        [id]: "",
      }));

      // Exit editing mode
      setEditingId(null);

    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  // Enable response editing
  const editResponse = (id, currentResponse) => {
    setEditingId(id);
    setResponse((prev) => ({
      ...prev,
      [id]: currentResponse || "", // Pre-fill textarea with current response
    }));
  };

  // Filter feedback by status
  const filteredFeedbacks =
    filter === "All" ? feedbacks : feedbacks.filter((fb) => fb.status === filter);

  return (
    <div className="feedback-system-container">
      <h2>💬 Feedback Management</h2>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="PENDING">Pending</option>
          <option value="RESPONDED">Responded</option>
        </select>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Response</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.user?.firstName || "Unknown User"}</td>
                <td>{fb.text || "No feedback provided"}</td>
                <td>
                  <span className={`status-badge ${fb.status ? fb.status.toLowerCase() : "unknown"}`}>
                    {fb.status || "Unknown"}
                  </span>
                </td>
                <td>
                  {editingId === fb.id ? (
                    <textarea
                      value={response[fb.id] !== undefined ? response[fb.id] : ""}
                      onChange={(e) => handleResponseChange(fb.id, e.target.value)}
                      placeholder="Edit your response..."
                    />
                  ) : fb.status === "RESPONDED" ? (
                    <span>{fb.response || "No response yet"}</span>
                  ) : (
                    <textarea
                      value={response[fb.id] !== undefined ? response[fb.id] : ""}
                      onChange={(e) => handleResponseChange(fb.id, e.target.value)}
                      placeholder="Type your response..."
                    />
                  )}
                </td>
                <td>
                  {fb.status === "PENDING" ? (
                    <button className="respond-btn" onClick={() => submitResponse(fb.id)}>
                      📤 Respond
                    </button>
                  ) : editingId === fb.id ? (
                    <button className="update-btn" onClick={() => submitResponse(fb.id)}>
                      ✅ Save
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => editResponse(fb.id, fb.response)}>
                      ✏️ Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackSystem;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/volunteerManagement.css";

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);

  // Fetch volunteer applications
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/volunteers/");
        console.log(response);
        setVolunteers(response.data);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      }
    };
    fetchVolunteers();
  }, []);

  // Handle status update (Approve/Reject)
  const updateVolunteerStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:9090/api/volunteers/${id}`, { status });
      setVolunteers((prev) =>
        prev.map((volunteer) =>
          volunteer.id === id ? { ...volunteer, status } : volunteer
        )
      );
    } catch (error) {
      console.error("Error updating volunteer status:", error);
    }
  };

  return (
    <div className="volunteer-management-container">
      <h2>👥 Volunteer Management</h2>

      <div className="table-container">
        {volunteers.length === 0 ? (
          <p>No volunteer applications available.</p>
        ) : (
          <table className="volunteer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.contactNumber}</td>
                  <td>{volunteer.type}</td>
                  <td>
                    <span className={`status-badge ${volunteer.status.toLowerCase()}`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="action-column">
                    {volunteer.status === "PENDING" && (
                      <div className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() => updateVolunteerStatus(volunteer.id, "Approved")}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateVolunteerStatus(volunteer.id, "Rejected")}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerManagement;

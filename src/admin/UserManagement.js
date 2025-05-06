import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaEnvelope } from "react-icons/fa";
import "../styles/userManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/auth/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-management">
      <Typography variant="h5" className="user-management-title">User Management</Typography>

      {loading ? (
        <Typography variant="body2">Loading users...</Typography>
      ) : (
        <div className="user-list">
          {users.length === 0 ? (
            <Typography variant="body1">No users found.</Typography>
          ) : (
            users.map((user) => (
              <Card key={user.id} className="colorful-user-card">
                <CardContent>
                  <Typography variant="h6" className="user-info-name">{user.firstName} ({user.age})</Typography>

                  <Typography className="user-info-email">
                    <a href={`mailto:${user.email}`} className="email-link">
                      <FaEnvelope style={{ marginRight: 5 }} />
                      {user.email}
                    </a>
                  </Typography>

                  <div className="user-info-contact">
                    <Tooltip title="Call">
                      <IconButton color="primary" href={`tel:${user.contactNumber}`}>
                        <FaPhone />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="WhatsApp">
                      <IconButton
                        color="success"
                        onClick={() => window.open(`https://wa.me/${user.contactNumber}`, "_blank")}
                      >
                        <FaWhatsapp />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <Typography><strong>Contact:</strong> {user.contactNumber}</Typography>
                  <Typography><strong>Location:</strong> {user.location} <FaMapMarkerAlt /></Typography>
                  <Typography><strong>Social Status:</strong> {user.socialStatus}</Typography>
                  <Typography><strong>Language:</strong> {user.preferredLanguage}</Typography>
                  <Typography><strong>Health Concerns:</strong> {user.healthConcerns}</Typography>
                  <Typography><strong>Reachability:</strong> {user.modeOfReachability}</Typography>
                  <Typography>
                    <strong>Verification:</strong>{" "}
                    {user.verificationStatus?.toLowerCase() === "verified" ? (
                      <FaCheckCircle style={{ color: "green" }} />
                    ) : (
                      <FaTimesCircle style={{ color: "red" }} />
                    )}
                  </Typography>
                  <Typography><strong>Latitude:</strong> {user.latitude}</Typography>
                  <Typography><strong>Longitude:</strong> {user.longitude}</Typography>
                  <Typography><strong>Status:</strong> {user.status}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;

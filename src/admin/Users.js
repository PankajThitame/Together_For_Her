import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      });
  }, []);

  const handleBanUser = (id) => {
    alert(`Ban user with ID: ${id}`);
    // TODO: Call backend API to ban user
  };

  const handleUnbanUser = (id) => {
    alert(`Unban user with ID: ${id}`);
    // TODO: Call backend API to unban user
  };

  return (
    <div className="users-page">
      <div className="admin-container">
        <div className="users-container">
          <h2>Manage Users</h2>
          {error && <p className="error-message">{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="ban-btn" onClick={() => handleBanUser(user.id)}>Ban</button>
                      <button className="unban-btn" onClick={() => handleUnbanUser(user.id)}>Unban</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/setPassword.css";

const SetPassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");
  
  const [passwordData, setPasswordData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN", // Default role
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const storedPath = localStorage.getItem("redirectPath");
    console.log("Retrieved storedData:", storedData);
    console.log("Retrieved redirectPath:", storedPath);

    if (storedData) {
      setUserData(storedData);
      setPasswordData((prevData) => ({
        ...prevData,
        username: storedData.username || "",
      }));
    } else {
      alert("No user data found! Please register first.");
      navigate(storedPath || "/request-kit");
    }

    setRedirectPath(storedPath || "/");

    // Dynamically set role based on where the user came from
    if (storedPath?.includes("volunteer")) {
      setPasswordData((prev) => ({ ...prev, role: "VOLUNTEER" }));
    } else if (storedPath?.includes("admin")) {
      setPasswordData((prev) => ({ ...prev, role: "ADMIN" }));
    } else {
      setPasswordData((prev) => ({ ...prev, role: "USER" }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting with passwordData:", passwordData);
    console.log("Current userData:", userData);

    if (!passwordData.username.trim()) {
      setError("Username is required!");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    // Construct final data object ensuring one of the objects is null
    const finalData = {
      user: passwordData.role === "VOLUNTEER" ? null : userData, // User data only for normal users
      credentials: {
        username: passwordData.username,
        password: passwordData.password,
        role: passwordData.role,
      },
      volunteer: passwordData.role === "VOLUNTEER" ? userData : null, // Volunteer data only for volunteers
    };

    console.log("Final data sent to API:", finalData);

    // Determine API endpoint based on user role
    let apiUrl = "http://localhost:9090/api/auth/register"; // Default for normal users
    if (passwordData.role === "VOLUNTEER") {
      apiUrl = "http://localhost:9090/api/volunteers/register";
    } else if (passwordData.role === "ADMIN") {
      apiUrl = "http://localhost:9090/api/admin/register";
    }

    console.log("API Endpoint:", apiUrl);

    try {
      const response = await axios.post(apiUrl, finalData);
      console.log("API Response:", response.data);
      alert(`${passwordData.role} Registered Successfully!`);
      localStorage.removeItem("userData"); // Clear stored data after registration
      localStorage.removeItem("redirectPath"); // Clear stored redirect path
      navigate(redirectPath); // Redirect to the stored path
    } catch (error) {
      console.error("Error sending data:", error.response?.data || error.message);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="set-password-container">
      <h2 className="form-title">Set Your Username & Password</h2>
      <form onSubmit={handleSubmit} className="set-password-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={passwordData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default SetPassword;

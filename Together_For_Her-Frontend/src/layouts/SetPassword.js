import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");

  const [passwordData, setPasswordData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const storedPath = localStorage.getItem("redirectPath");

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

    // Determine role based on data or path
    if (storedData?.volunteerType) {
      setPasswordData((prev) => ({ ...prev, role: "VOLUNTEER" }));
    } else if (storedPath?.includes("admin")) {
      setPasswordData((prev) => ({ ...prev, role: "ADMIN" }));
    } else if (storedPath?.includes("volunteer")) {
      setPasswordData((prev) => ({ ...prev, role: "VOLUNTEER" }));
    } else {
      setPasswordData((prev) => ({ ...prev, role: "USER" }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.username.trim()) {
      setError("Username is required!");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    const finalData = {
      user: passwordData.role === "VOLUNTEER" ? null : userData,
      credentials: {
        username: passwordData.username,
        password: passwordData.password,
        role: passwordData.role,
      },
      volunteer: passwordData.role === "VOLUNTEER" ? userData : null,
    };

    let apiUrl = `${API_BASE_URL}/auth/register`;
    if (passwordData.role === "VOLUNTEER") {
      apiUrl = `${API_BASE_URL}/volunteers/register`;
    } else if (passwordData.role === "ADMIN") {
      apiUrl = `${API_BASE_URL}/admin/register`;
    }

    try {
      const response = await axios.post(apiUrl, finalData);
      alert(`${passwordData.role} Registered Successfully!`);
      localStorage.removeItem("userData");
      localStorage.removeItem("redirectPath");
      navigate(redirectPath);
    } catch (error) {
      console.error("Error sending data:", error.response?.data || error.message);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Set Your Username & Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="text-left">
          <label className="block text-sm text-gray-600 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={passwordData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <div className="text-left">
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        <div className="text-left">
          <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SetPassword;

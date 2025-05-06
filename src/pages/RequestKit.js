import React, { useState } from "react";
import axios from "axios";
import "../styles/requestKit.css";

const RequestKit = () => {
  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    reason: "",
  });

  const userId = localStorage.getItem("userid"); // Ensure userId is stored after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:9090/api/requests/${userId}`, formData);
      alert("Kit request submitted successfully!");

      // Reset form
      setFormData({
        address: "",
        contact: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting kit request:", error);
      alert("Error submitting kit request. Please try again.");
    }
  };

  return (
    <div>
      <h2>Request a Free Hygiene Kit</h2>
      <form onSubmit={handleRequest}>
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          name="reason" className="textarea-req"
          placeholder="Why do you need this kit?"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Request Kit</button>
      </form>
    </div>
  );
};

export default RequestKit;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userForm.css";

const UserForm = () => {
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Get user's live location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });

        // ✅ Reverse Geocode using OpenStreetMap API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          setAddress(data.display_name || "Address not found");
          // Auto-fill the location in the form
          setUserData((prev) => ({ ...prev, location: data.display_name }));
        } catch (err) {
          setError("Failed to fetch address.");
        }
      },
      (err) => {
        setError("Please allow location access.");
      }
    );
  };

  // ✅ User form data
  const [userData, setUserData] = useState({
    firstName: "",
    age: "",
    contactNumber: "",
    email: "",
    location: "",
    socialStatus: "",
    preferredLanguage: "",
    healthConcerns: "",
    modeOfReachability: "",
    verificationStatus: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData)); // Save to localStorage
    navigate("/set-password"); // Navigate to the next step
  };

  return (
    <div className="user-form-container">
      <h2 className="form-title">User Registration</h2>

      <form onSubmit={handleNext} className="user-form">
        {/* Input: Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>

        {/* Input: Age */}
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={handleChange}
            required
          />
        </div>

        {/* Input: Contact Number */}
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Enter your contact number"
            onChange={handleChange}
            required
          />
        </div>

        {/* Input: Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>

        {/* Location: Manual or Live */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            value={address || userData.location}
            onChange={handleChange}
          />
          <button type="button" className="location-button" onClick={getLocation}>
            📍 Get Live Location
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        {/* Dropdown: Social Status */}
        <div className="form-group">
          <label>Social Status</label>
          <select name="socialStatus" onChange={handleChange}>
            <option value="">Select your social status</option>
            <option value="Student">Student</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Dropdown: Preferred Language */}
        <div className="form-group">
          <label>Preferred Language</label>
          <select name="preferredLanguage" onChange={handleChange}>
            <option value="">Select your preferred language</option>
            <option value="English">English</option>
            <option value="Marathi">Marathi</option>
            <option value="Hindi">Hindi</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Textarea: Health Concerns */}
        <div className="form-group">
          <label>Health Concerns</label>
          <textarea
            name="healthConcerns"
            placeholder="Mention any health concerns"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Dropdown: Mode of Reachability */}
        <div className="form-group">
          <label>Mode of Reachability</label>
          <select name="modeOfReachability" onChange={handleChange}>
            <option value="">Select preferred mode of reachability</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Social Media">Social Media</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Input: Verification Status */}
        <div className="form-group">
          <label>Verification</label>
          <input
            type="text"
            name="verificationStatus"
            placeholder="Verification Status"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VolunteerForm.css";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");

  // ✅ Volunteer form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    volunteerType: "",
    experience: "",
    availability: "",
    reason: "",
    location: "",
    latitude: "",
    longitude: ""
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Get user's live location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });

        // ✅ Reverse Geocode using OpenStreetMap API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const locationName = data.display_name || "Address not found";
          setAddress(locationName);
          setFormData((prev) => ({ ...prev, location: locationName, latitude, longitude }));
        } catch (err) {
          setError("Failed to fetch address.");
        }
      },
      () => {
        setError("Please allow location access.");
      }
    );
  };

  // ✅ Handle form submission (Stores data in localStorage)
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    localStorage.setItem("redirectPath", "/volunteer-form"); // Store path for SetPassword.js
    navigate("/set-password");
  };

  return (
    <div className="volunteer-form-container">
      <h2 className="form-title">Join Us - Together for Her</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="volunteer-form">
        {/* Input: Name */}
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
        </div>

        {/* Input: Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        </div>

        {/* Input: Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} required />
        </div>

        {/* Dropdown: Volunteer Type */}
        <div className="form-group">
          <label>Volunteer Type</label>
          <select name="volunteerType" onChange={handleChange} required>
            <option value="">Select your role</option>
            <option value="PHARMACIST">Pharmacist</option>
            <option value="DOCTOR">Doctor</option>
            <option value="CONTENT_CREATOR">Content Creator</option>
            <option value="LOCAL_AREA_HELPER">Local Area Helper</option>
            <option value="EVENT_ORGANISER">Event Organizer</option>
            <option value="SOCIAL_MEDIA_PROMOTER">Social Media Promoter</option>
            <option value="TEACHER">Teacher</option>
            <option value="COUNSELOR">Counselor</option>
            <option value="FUNDRAISER">Fundraiser</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Input: Experience */}
        <div className="form-group">
          <label>Experience</label>
          <input type="text" name="experience" placeholder="Enter your experience (if any)" onChange={handleChange} />
        </div>

        {/* Input: Availability */}
        <div className="form-group">
          <label>Availability</label>
          <input type="text" name="availability" placeholder="Days or hours per week" onChange={handleChange} required />
        </div>

        {/* Textarea: Reason */}
        <div className="form-group">
          <label>Why do you want to volunteer?</label>
          <textarea name="reason" placeholder="Share your motivation" onChange={handleChange} required></textarea>
        </div>

        {/* Location: Manual or Live */}
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" placeholder="Enter your location" value={address || formData.location} onChange={handleChange} />
          <button type="button" className="location-button" onClick={getLocation}>📍 Get Live Location</button>
        </div>

        {/* Hidden fields for latitude and longitude */}
        <input type="hidden" name="latitude" value={formData.latitude} />
        <input type="hidden" name="longitude" value={formData.longitude} />

        {/* Submit Button */}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default VolunteerForm;

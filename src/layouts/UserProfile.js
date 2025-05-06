import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Languages,
  Heart,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import "../styles/userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch user profile dynamically using stored userId
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userid"); // Get userId dynamically
      if (!userId) throw new Error("User ID not found. Please log in.");

      const response = await fetch(`http://localhost:9090/api/auth/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include token if required
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      console.log(data);
      setUser(data); // Set user data in state
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading user profile...</p>;
  if (!user) return <p>No profile found. Please log in.</p>;

  // ✅ Destructure user data safely
  const {
    age,
    contactNumber,
    firstName,
    email,
    healthConcerns,
    location,
    modeOfReachability,
    preferredLanguage,
    socialStatus,
    profile_pic,
  } = user;

  return (
    <div className="user-profile">
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft /> Back to Home
      </button>

      <div className="profile-header">
        <img
          src={profile_pic || "/images/default-avatar.png"}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{firstName}</h2>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <User className="icon" />
          <strong>Username:</strong> {firstName}
        </div>
        <div className="detail-item">
          <Mail className="icon" />
          <strong>Email:</strong> {email}
        </div>
        <div className="detail-item">
          <Phone className="icon" />
          <strong>Contact:</strong> {contactNumber}
        </div>
        <div className="detail-item">
          <MapPin className="icon" />
          <strong>Location:</strong> {location}
        </div>
        <div className="detail-item">
          <Heart className="icon" />
          <strong>Health Concerns:</strong> {healthConcerns || "None"}
        </div>
        <div className="detail-item">
          <Languages className="icon" />
          <strong>Preferred Language:</strong> {preferredLanguage}
        </div>
        <div className="detail-item">
          <BadgeCheck className="icon" />
          <strong>Social Status:</strong> {socialStatus || "N/A"}
        </div>
        <div className="detail-item">
          <User className="icon" />
          <strong>Age:</strong> {age}
        </div>
        <div className="detail-item">
          <User className="icon" />
          <strong>Mode of Reachability:</strong> {modeOfReachability}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

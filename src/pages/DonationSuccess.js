import React from "react";
import { Link } from "react-router-dom";
import "../styles/donationSuccess.css";

const DonationSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <h2>🎉 Thank You for Your Donation! ❤️</h2>
        <p>Your generosity is making a real impact on women's health and hygiene.</p>
        
        <div className="donation-details">
          <h3>What's Next?</h3>
          <ul>
            <li>✔ Receive a confirmation email soon.</li>
            <li>✔ Track how your donation is making a difference.</li>
            <li>✔ Join our volunteer community for more engagement.</li>
          </ul>
        </div>

        <div className="success-buttons">
          <Link to="/volunteer" className="btn-primary">Become a Volunteer</Link>
          <Link to="/donate" className="btn-secondary">Donate Again</Link>
          <Link to="/" className="btn-home">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;

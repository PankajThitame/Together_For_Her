import React, { useState } from "react";
import "../styles/privacyPolicy.css";

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="privacy-container">
      <h2>Privacy Policy</h2>
      <p>
        We value your privacy and ensure that your personal data is protected and not shared with third parties.
      </p>

      <div className="privacy-section">
        <div className="accordion">
          <div className="accordion-item" onClick={() => toggleSection(1)}>
            <h3>1. Information We Collect</h3>
            <span>{openSection === 1 ? "▲" : "▼"}</span>
          </div>
          {openSection === 1 && (
            <p className="accordion-content">
              We collect personal information like name, email, and donation details to enhance your experience.
            </p>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-item" onClick={() => toggleSection(2)}>
            <h3>2. How We Use Your Information</h3>
            <span>{openSection === 2 ? "▲" : "▼"}</span>
          </div>
          {openSection === 2 && (
            <p className="accordion-content">
              Your data is used to provide services, process donations, and send important updates.
            </p>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-item" onClick={() => toggleSection(3)}>
            <h3>3. Data Protection</h3>
            <span>{openSection === 3 ? "▲" : "▼"}</span>
          </div>
          {openSection === 3 && (
            <p className="accordion-content">
              We implement security measures to protect your information from unauthorized access.
            </p>
          )}
        </div>

        <div className="accordion">
          <div className="accordion-item" onClick={() => toggleSection(4)}>
            <h3>4. Your Rights</h3>
            <span>{openSection === 4 ? "▲" : "▼"}</span>
          </div>
          {openSection === 4 && (
            <p className="accordion-content">
              You have the right to access, update, or delete your personal information.
            </p>
          )}
        </div>
      </div>

      <div className="privacy-buttons">
        <button className="accept-btn">Accept</button>
        <button className="decline-btn">Decline</button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import "../styles/terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      {/* Header Section */}
      <header className="terms-header">
        <h1>Terms & Conditions</h1>
        <p>By using this website, you agree to abide by our policies and guidelines.</p>
      </header>

      {/* Main Content Section */}
      <section className="terms-content">
        <h2>1. User Responsibilities</h2>
        <p>Users must respect others and use the platform ethically.</p>

        <h2>2. Privacy Policy</h2>
        <p>Your data is protected and will not be shared without your consent.</p>

        <h2>3. Prohibited Activities</h2>
        <ul>
          <li>Spamming, hacking, or any form of abuse.</li>
          <li>Posting misleading information.</li>
          <li>Violating any applicable laws or regulations.</li>
        </ul>

        <h2>4. Changes to Terms</h2>
        <p>We may update these terms, and users will be notified of any major changes.</p>
      </section>

      {/* CTA Buttons */}
      <div className="terms-buttons">
        <button className="accept-btn">Accept</button>
        <button className="decline-btn">Decline</button>
      </div>

      {/* Footer */}
      <footer className="terms-footer">
        <p>&copy; 2024 Together for Her. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Terms;

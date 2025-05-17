import React, { useState } from "react";
import "../styles/newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="newsletter-container">
      <h2>Stay Updated with Our Newsletter</h2>
      <p>Subscribe to receive the latest updates on women's safety and health awareness.</p>
      
      <div className="input-container">
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="newsletter-info">
        <h3>Why Subscribe?</h3>
        <ul>
          <li>🔔 Get important updates and tips.</li>
          <li>❤️ Be part of a supportive community.</li>
          <li>🎁 Access exclusive content and resources.</li>
        </ul>
      </div>
    </div>
  );
};

export default Newsletter;

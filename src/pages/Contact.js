import React from 'react';
import '../styles//Contact.css';

function Contact() {
  return (
    <div className="contact-page">
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Reach out to us with any questions, feedback, or ideas.</p>

      <form className="contact-form">
        <div className="form-group">
          Your Name
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          Your Email
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          Your Message
          <textarea id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>
        </div>

        <button type="submit" className="btn-submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h3>Other Ways to Reach Us:</h3>
        <p>Email: support@togetherforher.org</p>
        <p>Phone: +91 7821828016</p>
        <p>Address: Gurudatta nagar, Pune 411 045</p>
      </div>
    </div>
    </div>
  );
}

export default Contact;

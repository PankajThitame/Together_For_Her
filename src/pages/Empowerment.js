import React from "react";
import { Link } from "react-router-dom";
import "../styles/empowerment.css";

const Empowerment = () => {
  return (
    <div className="empowerment-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Empowering Women, Together</h1>
        <p>Join us in creating a world where women feel safe, healthy, and empowered.</p>
        <Link to="/donate" className="btn-primary">Support Our Mission</Link>
      </section>

      {/* Why Women's Empowerment Matters */}
      <section className="why-empowerment">
        <h2>Why Women's Empowerment Matters</h2>
        <p>Millions of women face challenges in education, health, and safety. Together, we can bring change.</p>
        <div className="stats">
          <div className="stat">
            <h3>1 in 3</h3>
            <p>Women experience gender-based violence</p>
          </div>
          <div className="stat">
            <h3>500M+</h3>
            <p>Lack proper menstrual hygiene resources</p>
          </div>
          <div className="stat">
            <h3>Only 24%</h3>
            <p>Of leadership positions worldwide are held by women</p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="focus-areas">
        <h2>Our Key Focus Areas</h2>
        <div className="areas">
          <div className="area">
            <img src="/images/menstrual health.jpg" alt="Menstrual Health" />
            <h3>Menstrual Health</h3>
            <p>Breaking myths and spreading awareness about menstrual hygiene.</p>
          </div>
          <div className="area">
            <img src="/images/safetyandsupport.jpg" alt="Safety and Support" />
            <h3>Safety & Support</h3>
            <p>Providing resources and support for women’s safety.</p>
          </div>
          <div className="area">
            <img src="/images/leadership.jpg" alt="Education and Leadership" />
            <h3>Education & Leadership</h3>
            <p>Empowering women through education and career support.</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories</h2>
        <div className="story">
          <p>"I started my own business after joining this initiative. It changed my life!"</p>
          <h4>- Priya Sharma</h4>
        </div>
        <div className="story">
          <p>"Together for Her gave me confidence and support when I needed it the most."</p>
          <h4>- Ananya Verma</h4>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="help">
        <h2>How You Can Help</h2>
        <div className="cta-buttons">
          <Link to="/volunteer" className="btn-secondary">Become a Volunteer</Link>
          <Link to="/donate" className="btn-secondary">Donate Now</Link>
          <Link to="/community" className="btn-secondary">Join Our Community</Link>
        </div>
      </section>

      {/* Resources & Helplines */}
      <section className="resources">
        <h2>Resources & Helplines</h2>
        <ul>
          <li><strong>Women’s Helpline:</strong> 1091</li>
          <li><strong>Domestic Violence Helpline:</strong> 181</li>
          <li><strong>Legal Aid:</strong> www.legalaidwomen.org</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>What is menstrual hygiene awareness?</summary>
          <p>It includes education on menstrual health, proper hygiene, and breaking myths.</p>
        </details>
        <details>
          <summary>How can I volunteer?</summary>
          <p>You can join our mission by signing up on the Volunteer page.</p>
        </details>
      </section>

      {/* Contact & Social Media */}
      <footer className="footer">
        <p>Follow us on social media for updates:</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Empowerment;

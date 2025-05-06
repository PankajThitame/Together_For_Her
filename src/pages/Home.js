import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-header">
        <h1>Empowering Women, Together</h1>
        <p>Join our mission to ensure safety and health for all women.</p>
        <Link to="/empowerment" className="btn-primary">Learn More</Link>
      </header>

      {/* Features Section */}
      <section className="home-features">
        <div className="feature">
          <img src="/images/awareness1.png" alt="Awareness" />
          <Link to="/content" className="btn-primary-home">Raise Awareness</Link>
          <p>Spread education on menstrual health and women's safety.</p>
        </div>
        <div className="feature">
          <img src="/images/safety.png" alt="Safety" />
          <Link to="/donate" className="btn-primary-home">Build a Community</Link>
          <p>Providing resources to help women feel secure and supported.</p>
        </div>
        <div className="feature">
          <img src="/images/community1.png" alt="Community" />
          <Link to="/donate" className="btn-primary-home">Build a Community</Link>
          <p>Join hands with people making a real difference.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonial-card">
          <p>"This platform changed my perspective on menstrual health. I'm more informed than ever!"</p>
          <h4>- Priya Sharma</h4>
        </div>
        <div className="testimonial-card">
          <p>"Together for Her helped me find a community that truly cares about women's safety."</p>
          <h4>- Ananya Verma</h4>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="home-call-to-action">
        <h2>Get Involved</h2>
        <p>Support our mission by donating or volunteering today.</p>
        <div className="cta-buttons">
          <Link to="/donate" className="btn-secondary-home">Donate</Link>
          <Link to="/volunteer" className="btn-secondary-home">Volunteer</Link>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners">
        <h2>Our Supporters</h2>
        <div className="partners-logos">
          <img src="/images/partener1.jpg" alt="Partner 1" />
          <img src="/images/partener2.jpg" alt="Pankaj 2" />
          <img src="/images/partener3.jpg" alt="Partner 3" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>&copy; 2024 Together for Her. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;

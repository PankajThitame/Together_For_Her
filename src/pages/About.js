import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-new">
     

      <main>
        <section className="about-hero">
          <h1>About Us</h1>
          <p>We are passionate about creating solutions that make a difference.</p>
        </section>

        <section className="about">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>Founded in 2010, we have grown into a company that values innovation, quality, and trust. Our mission is to deliver top-notch services to clients worldwide.</p>
          </div>
          <div className="about-content">
            <h2>Our Vision</h2>
            <p>To become a global leader in our industry, shaping the future with our innovative and sustainable solutions.</p>
          </div>
        </section>

        <section className="team">
          <h2>Meet the Team</h2>
          <div className="team-members">
            {[
              { name: "Pankaj", role: "CEO", img: "pankaj.jpg" },
              { name: "Pankaj", role: "CTO", img: "pankaj.jpg" },
              { name: "Pankaj", role: "Marketing Head", img: "pankaj.jpg" },
            ].map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.img} alt={`${member.name}`} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;

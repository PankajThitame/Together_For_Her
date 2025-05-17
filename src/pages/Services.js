import React from "react";
import "../styles/Services.css";

const servicesData = [
  {
    title: "Awareness Campaigns",
    description: "Workshops and events to educate women on menstrual hygiene and safety during periods.",
    icon: "📢",
  },
  {
    title: "Safety Support",
    description: "Helpline and resources to ensure women's safety during emergencies.",
    icon: "🛡️",
  },
  {
    title: "Health Resources",
    description: "Providing access to affordable sanitary products and healthcare information.",
    icon: "💊",
  },
  {
    title: "Community Support",
    description: "Building a supportive community to break the stigma around menstruation.",
    icon: "🤝",
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Together_for_Her</h1>
        <p>Empowering Women Through Awareness and Support</p>
      </header>

      <main>
        <section className="services-intro">
          <h2>Our Services</h2>
          <p>We are dedicated to ensuring safety and awareness for women during their periods. Explore how we support women and build a better future together.</p>
        </section>

        <section className="services-list">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="services-footer">
        <p>&copy; 2024 Together_for_Her. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;

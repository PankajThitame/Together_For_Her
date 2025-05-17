import React from "react";
import "../styles/awareness.css";

const HygieneTips = () => {
  const tips = [
    { title: "Change Pads Regularly", icon: "🩸" },
    { title: "Wash Hands Before & After", icon: "👐" },
    { title: "Wear Breathable Clothing", icon: "👗" },
    { title: "Stay Hydrated", icon: "💧" },
  ];

  return (
    <section className="tips-section">
      <h2>Menstrual Hygiene Tips</h2>
      <div className="tips-container">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <span className="tip-icon">{tip.icon}</span>
            <p>{tip.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HygieneTips;

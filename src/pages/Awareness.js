import React, { useState } from "react";
import "../styles/awareness.css";
import FAQAccordion from "../components/FAQAccordion";
import HygieneTips from "../components/HygieneTips";
import MotivationalQuotes from "../components/MotivationalQuotes";
import MythFactCard from "../components/MythFactCard";

const mythsFactsData = [
  { type: "myth", title: "Women shouldn’t exercise during periods.", content: "Exercising can actually reduce cramps and boost mood." },
  { type: "myth", title: "Menstruation is dirty and impure.", content: "It is a natural biological process, not impure." },
  { type: "myth", title: "Using tampons can break virginity.", content: "Tampons do not affect virginity; they are just absorbent materials." },
];

const Awareness = () => {
  const [showMoreMyths, setShowMoreMyths] = useState(false);

  return (
    <div className="awareness-container">
      {/* Theme Toggle */}

      {/* Hero Section */}
      <section className="hero">
        <h1>Awareness & Education</h1>
        <p>Empowering women with knowledge about menstrual hygiene, health, and safety.</p>
      </section>

      {/* Motivational Quotes Carousel */}
      <MotivationalQuotes />

      {/* Hygiene Tips */}
      <HygieneTips />

      {/* Myths & Facts Section */}
      <section className="myths-section">
        <h2>Breaking Myths & Facts</h2>
        <div className="myths-container">
          {mythsFactsData.slice(0, showMoreMyths ? mythsFactsData.length : 2).map((item, index) => (
            <MythFactCard key={index} type={item.type} title={item.title} content={item.content} />
          ))}
        </div>
        <button className="toggle-btn" onClick={() => setShowMoreMyths(!showMoreMyths)}>
          {showMoreMyths ? "Show Less" : "Show More"}
        </button>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Awareness Videos */}
      <section className="video-section">
  <h2>Watch & Learn</h2>
  <iframe 
    className="awareness-video" 
    src="https://www.youtube.com/embed/zcvo9VLVHWc" 
    title="Menstrual Hygiene Video" 
    allowFullScreen>
  </iframe>

  <iframe 
    className="awareness-video" 
    src="https://www.youtube.com/embed/c72EmEwZ5Qk" 
    title="Myths & Facts About Periods" 
    allowFullScreen>
  </iframe>
</section>


      {/* Donation Section */}
    </div>
  );
};

export default Awareness;

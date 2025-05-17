import React from "react";
import "../styles/mythFactCard.css";

const MythFactCard = ({ type, title, content }) => {
  return (
    <div className={`myth-fact-card ${type === "myth" ? "myth" : "fact"}`}>
      <h3>{type === "myth" ? "❌ Myth:" : "✅ Fact:"}</h3>
      <p>{title}</p>
      <span>{content}</span>
    </div>
  );
};

export default MythFactCard;

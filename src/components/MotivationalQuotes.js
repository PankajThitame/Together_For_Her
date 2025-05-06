import React, { useState, useEffect } from "react";
import "../styles/quotes.css";

const quotesList = [
  "Empowered women empower the world!",
  "Periods are power, not shame.",
  "Knowledge is the key to change!",
  "Let's break the taboos, one step at a time."
];

const MotivationalQuotes = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotesList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <p className="motivational-quote">"{quotesList[quoteIndex]}"</p>;
};

export default MotivationalQuotes;

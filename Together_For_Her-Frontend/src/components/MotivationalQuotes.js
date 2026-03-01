import React, { useState, useEffect } from "react";

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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6 px-4 text-center">
      <div className="bg-pink-500/10 p-3 rounded-2xl mb-2">
        <span className="text-2xl italic font-black text-pink-500 font-serif">"</span>
      </div>
      <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white italic tracking-tight leading-tight max-w-sm">
        {quotesList[quoteIndex]}
      </p>
      <div className="flex gap-1 justify-center">
        {quotesList.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === quoteIndex ? 'w-8 bg-pink-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MotivationalQuotes;

import React from "react";
import "../styles/global.css";


const FAQ = () => {
  const faqs = [
    { question: "What is menstrual hygiene?", answer: "Menstrual hygiene refers to practices used to ensure cleanliness and good health during menstruation." },
    { question: "How can I donate?", answer: "You can donate through our secure online portal using PayPal, Stripe, or UPI." },
  ];

  return (
    <div className="container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index}>
          <p><strong>{faq.question}</strong></p>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;

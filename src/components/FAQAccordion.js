import React, { useState } from "react";
import "../styles/awareness.css";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How often should I change a pad?", answer: "Change it every 4-6 hours to prevent infections." },
    { question: "Are menstrual cups safe?", answer: "Yes, they are eco-friendly and safe when cleaned properly." },
    { question: "What food should I eat during periods?", answer: "Eat iron-rich foods like spinach, nuts, and fruits." },
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;

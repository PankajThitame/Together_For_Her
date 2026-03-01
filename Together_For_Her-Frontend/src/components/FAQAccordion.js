import React, { useState } from "react";

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How often should I change a pad?",
      answer: "Change it every 4-6 hours to prevent infections.",
    },
    {
      question: "Are menstrual cups safe?",
      answer: "Yes, they are eco-friendly and safe when cleaned properly.",
    },
    {
      question: "What food should I eat during periods?",
      answer: "Eat iron-rich foods like spinach, nuts, and fruits.",
    },
  ];

  return (
    <section className="mt-10 px-4">
      <h2 className="text-2xl font-bold text-center text-pink-800 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-pink-300 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <div
              className="cursor-pointer px-4 py-3 font-medium bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-t-lg"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
            </div>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white text-gray-700 rounded-b-lg border-t border-pink-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;

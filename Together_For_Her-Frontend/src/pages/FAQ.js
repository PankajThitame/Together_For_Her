import React from "react";
import Card, { CardBody } from "../components/ui/Card";
import { FaQuestionCircle, FaLightbulb, FaInfoCircle, FaChevronRight } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "What is menstrual hygiene?",
      answer:
        "Menstrual hygiene refers to the foundational practices used to ensure cleanliness, comfort, and overall vaginal health during menstruation. It encompasses everything from the use of safe sanitary products to proper disposal and personal washing techniques.",
    },
    {
      question: "How can I donate?",
      answer:
        "We've made supporting our mission seamless. You can donate through our secure portal using major credit cards, UPI, or international payment gateways. Every contribution directly funds hygiene kits for women in underserved areas.",
    },
    {
      question: "How do I join the community?",
      answer: "Becoming a member is as simple as registering for a free account. Once joined, you can participate in our forum, access exclusive educational resources, and even apply to become a local volunteer.",
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Support Desk</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Frequently Asked <span className="text-pink-600">Questions</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light italic max-w-2xl mx-auto">
            "We believe transparency and education are the cornerstones of empowerment. Find answers to common queries here."
          </p>
        </div>

        <div className="grid gap-8">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-none shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-500 overflow-hidden group">
              <CardBody className="p-0">
                <div className="flex">
                  {/* Decorative Side */}
                  <div className="w-1.5 bg-pink-600 group-hover:w-3 transition-all duration-500 shrink-0" />

                  <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                    <div className="w-12 h-12 shrink-0 bg-pink-50 rounded-[3rem] flex items-center justify-center text-pink-500 shadow-inner group-hover:scale-110 transition-transform">
                      <FaQuestionCircle size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-pink-600 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex gap-4">
                        <div className="hidden md:block w-px bg-pink-100 shrink-0 h-10 mt-1" />
                        <p className="text-gray-600 text-sm leading-relaxed font-medium italic opacity-80">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-20 text-center bg-white p-10 rounded-[3rem] shadow-2xl border-none animate-slideUp">
          <FaInfoCircle className="text-pink-600 text-3xl mx-auto mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-8 font-light italic leading-relaxed">Our support team is always here to provide detailed guidance.</p>
          <a href="/contact">
            <button className="flex items-center gap-2 bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-pink-700 transition-all mx-auto shadow-xl shadow-pink-600/20">
              Contact Support <FaChevronRight className="text-[10px]" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

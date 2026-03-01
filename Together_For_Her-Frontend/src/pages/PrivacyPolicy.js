import React, { useState } from "react";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaLock, FaUserShield, FaHandshake } from "react-icons/fa";

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect personal information like name, email, and donation details to enhance your experience and ensure secure transactions.",
      icon: <FaUserShield className="text-pink-400" />
    },
    {
      title: "2. How We Use Your Information",
      content: "Your data is used to provide services, process donations, and send important updates regarding our community's impact.",
      icon: <FaHandshake className="text-pink-400" />
    },
    {
      title: "3. Data Protection",
      content: "We implement industry-standard security measures and encryption to protect your information from unauthorized access.",
      icon: <FaLock className="text-pink-400" />
    },
    {
      title: "4. Your Rights",
      content: "You have the absolute right to access, update, or delete your personal information at any time through your profile settings.",
      icon: <FaShieldAlt className="text-pink-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Security First</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Privacy <span className="text-pink-600">Policy</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light italic max-w-2xl mx-auto">
            "Your trust is our most valuable asset. We are committed to protecting your data with transparency and integrity."
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm p-4 animate-scaleIn">
          <CardBody className="p-8 md:p-12 space-y-10">
            <div className="space-y-4">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`border border-pink-50 rounded-2xl overflow-hidden transition-all duration-300 ${openSection === idx ? "bg-pink-50/30 ring-1 ring-pink-100" : "bg-white hover:bg-pink-50/10"}`}
                >
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-pink-50 flex items-center justify-center shadow-sm">
                        {section.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 tracking-tight">{section.title}</h3>
                    </div>
                    <div className="text-pink-400 transition-transform duration-300">
                      {openSection === idx ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-6 pt-0 ml-14 text-sm text-gray-600 leading-relaxed font-medium italic">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-pink-50">
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button variant="primary" size="lg" className="px-12 bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-600/20">
                  Accept Policy
                </Button>
                <Button variant="outline" size="lg" className="px-12 border-rose-100 text-rose-600 hover:bg-rose-50">
                  Decline
                </Button>
              </div>
              <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Last Updated: January 2024
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

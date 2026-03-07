import React from "react";
import { Link } from "react-router-dom";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaHeart, FaCheckCircle, FaUsers, FaHandsHelping, FaHome } from "react-icons/fa";

const DonationSuccess = () => {
  return (
    <div className="min-h-screen bg-pink-50/20 flex items-center justify-center py-20 px-6 animate-fadeIn">
      <Card className="max-w-xl w-full border-none shadow-2xl bg-white/90 backdrop-blur-md p-4 animate-scaleIn text-center">
        <CardBody className="p-10 space-y-8">
          {/* Celebratory Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white relative z-10 shadow-xl shadow-pink-600/20">
              <FaCheckCircle size={48} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Thank You <span className="text-pink-600">Generous</span> Soul! ❤️
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light italic">
              "Your contribution has just made a real difference in the life of a woman. You are part of the change."
            </p>
          </div>

          <div className="bg-pink-50/50 rounded-[3rem] p-8 border border-pink-100 text-left space-y-6">
            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-widest text-center">Your Impact</h3>
            <div className="space-y-4">
              {[
                { icon: <FaCheckCircle />, text: "Hygiene kit procurement started" },
                { icon: <FaCheckCircle />, text: "Confirmation email sent to you" },
                { icon: <FaCheckCircle />, text: "Community awareness credits added" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <span className="text-pink-500">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 pt-4">
            <Link to="/community">
              <Button size="lg" className="w-full bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-600/20">
                Join our Community <FaUsers className="ml-2" />
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/donate">
                <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                  <FaHandsHelping className="mr-2" /> Give Again
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" className="w-full text-gray-500 hover:text-pink-600">
                  <FaHome className="mr-2" /> Home
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DonationSuccess;

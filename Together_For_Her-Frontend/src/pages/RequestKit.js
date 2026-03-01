import React, { useState } from "react";
import axios from "axios";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt, FaCommentAlt, FaPaperPlane } from "react-icons/fa";

const RequestKit = () => {
  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = localStorage.getItem("userid");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/requests/${userId}`, formData);
      alert("Kit request submitted successfully!");

      setFormData({
        address: "",
        contact: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting kit request:", error);
      alert("Error submitting kit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Support Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Request a <span className="text-pink-600">Hygiene Kit</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed font-light italic">
            "Your health and dignity are our top priority. We're here to provide assistance whenever you need it."
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm p-4 animate-scaleIn">
          <CardBody className="p-8 md:p-12">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mx-auto mb-10 shadow-lg">
              <FaBoxOpen size={32} />
            </div>

            <form onSubmit={handleRequest} className="space-y-8">
              <Input
                label="Delivery Address"
                name="address"
                placeholder="Full address where the kit should be sent"
                value={formData.address}
                onChange={handleChange}
                required
                icon={<FaMapMarkerAlt className="text-pink-400" />}
              />

              <Input
                label="Contact Number"
                name="contact"
                placeholder="+91 00000 00000"
                value={formData.contact}
                onChange={handleChange}
                required
                icon={<FaPhoneAlt className="text-pink-400" />}
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 ml-1">Reason for Request</label>
                <div className="relative">
                  <div className="absolute top-4 left-4 text-pink-400">
                    <FaCommentAlt size={14} />
                  </div>
                  <textarea
                    name="reason"
                    placeholder="Tell us why you need this kit (optional)..."
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-600/20 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"} <FaPaperPlane className="text-xs" />
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Info Box */}
        <div className="mt-12 text-center text-gray-500 text-sm italic">
          <p>Each kit contains essential sanitary products, soap, and educational materials. All requests are confidential.</p>
        </div>
      </div>
    </div>
  );
};

export default RequestKit;

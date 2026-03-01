import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card, { CardBody } from "../components/ui/Card";
import { FaUserMd, FaHandsHelping, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaIdBadge } from "react-icons/fa";

const NearbyHelp = () => {
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/volunteers/`);
      setHelpers(response.data);
    } catch (error) {
      console.error("Error fetching helpers:", error);
    } finally {
      setLoading(false);
    }
  };

  const HelperCard = ({ helper }) => (
    <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group overflow-hidden">
      <CardBody className="p-0">
        <div className="flex h-full flex-col sm:flex-row">
          {/* Accent Side */}
          <div className={`sm:w-20 ${helper.type === "DOCTOR" ? "bg-pink-600" : "bg-rose-500"} flex items-center justify-center py-6 sm:py-0`}>
            <div className="text-white transform group-hover:scale-110 transition-transform text-2xl">
              {helper.type === "DOCTOR" ? <FaUserMd /> : <FaHandsHelping />}
            </div>
          </div>

          {/* Main Info Side */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors uppercase tracking-tight">{helper.name}</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1">
                  <FaIdBadge className="text-pink-300" /> {helper.type.replaceAll("_", " ")}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaEnvelope className="text-pink-400 shrink-0" />
                <a href={`mailto:${helper.email}`} className="hover:text-pink-600 hover:underline break-all transition-colors">
                  {helper.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-pink-400 shrink-0" />
                <span className="italic font-light">Available in your local area</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${helper.contactNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px]"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all ring-1 ring-emerald-100 hover:ring-0">
                  <FaWhatsapp size={14} /> WhatsApp
                </button>
              </a>
              <a href={`tel:${helper.contactNumber}`} className="flex-1 min-w-[140px]">
                <button className="w-full flex items-center justify-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all ring-1 ring-pink-100 hover:ring-0">
                  Call Support
                </button>
              </a>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  const filterByType = (type) => helpers.filter((h) => h.type === type);

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Local Support</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Nearby <span className="text-pink-600">Help & Support</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
            "Connect with verified health professionals and community volunteers who are ready to assist you in your local area."
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 italic">Finding supporters near you...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Doctors Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Expert Medical Consultants</h2>
                <div className="h-px flex-1 bg-pink-100" />
              </div>
              {filterByType("DOCTOR").length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filterByType("DOCTOR").map((helper) => (
                    <HelperCard key={helper.id} helper={helper} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/60">
                  <p className="text-gray-500 italic">No specialist doctors currently available in this range.</p>
                </div>
              )}
            </div>

            {/* Volunteers Section */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dedicated Community Support</h2>
                <div className="h-px flex-1 bg-pink-100" />
              </div>
              {helpers.filter((h) => h.type !== "DOCTOR").length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {helpers.filter((h) => h.type !== "DOCTOR").map((helper) => (
                    <HelperCard key={helper.id} helper={helper} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white/40 rounded-3xl border border-white/60">
                  <p className="text-gray-500 italic">Searching for more volunteers to assist you...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHelp;

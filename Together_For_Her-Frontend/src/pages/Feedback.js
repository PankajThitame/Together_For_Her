import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Card, { CardBody } from "../components/ui/Card";
import { FaUserCircle, FaClock, FaFileDownload, FaInfoCircle, FaCheckCircle, FaChevronRight } from "react-icons/fa";

import { formatDate } from "../utils/dateUtils";

const Reviews = () => {

  const renderFile = (filePath, fileType) => {
    const fileName = filePath.split("\\").pop().split("/").pop();
    const fullPath = `${API_BASE_URL}/files/${encodeURIComponent(fileName)}`;

    if (fileType.startsWith("image/")) {
      return (
        <div className="rounded-2xl overflow-hidden border border-pink-50 shadow-inner bg-pink-50/30 mb-6">
          <img src={fullPath} alt="Contribution" className="w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-700" />
        </div>
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <div className="rounded-2xl overflow-hidden border border-pink-50 shadow-inner bg-black mb-6">
          <video controls className="w-full h-auto max-h-[500px]">
            <source src={fullPath} type={fileType} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="rounded-2xl overflow-hidden border border-pink-50 bg-white mb-6 h-[400px]">
          <iframe src={fullPath} title="PDF Preview" className="w-full h-full">
            <a href={fullPath} download className="text-pink-600 font-bold p-4 block">Download PDF Document</a>
          </iframe>
        </div>
      );
    }

    return (
      <a href={fullPath} download className="inline-flex items-center gap-2 bg-pink-100/50 text-pink-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-pink-600 hover:text-white transition-all mb-6">
        <FaFileDownload /> Download Resource File
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-pink-50/20 py-20 px-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <span className="text-pink-600 font-bold text-xs uppercase tracking-widest bg-pink-100 px-4 py-2 rounded-full mb-6 inline-block">Voices of Impact</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            User <span className="text-pink-600">Contributions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
            "A transparent gallery of resources, stories, and feedback from our incredible global community."
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 italic">Streaming contributions...</p>
          </div>
        ) : userContent.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-pink-300/80">
            <FaInfoCircle className="text-4xl text-pink-200 mx-auto mb-4" />
            <p className="text-gray-500 italic">No contributions have been shared yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {userContent.map((item) => (
              <Card key={item.id} className="border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden animate-slideUp">
                <CardBody className="p-0">
                  <div className="grid md:grid-cols-5">
                    {/* Info Side */}
                    <div className="md:col-span-2 p-8 md:p-10 bg-pink-50/30 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-pink-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                          <FaCheckCircle /> Verified Contribution
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight leading-snug">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium italic opacity-80">"{item.description}"</p>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-pink-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                            <FaUserCircle />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Shared By</p>
                            <p className="text-xs font-extrabold text-gray-800">{item.uploadedBy}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-sm">
                            <FaClock />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Uploaded On</p>
                            <p className="text-xs font-extrabold text-gray-800">{formatDate(item.uploadTime)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:col-span-3 p-8 md:p-10 bg-white">
                      {renderFile(item.filePath, item.fileType)}
                      <div className="flex justify-end">
                        <button className="text-[10px] font-bold text-gray-400 hover:text-pink-600 flex items-center gap-1 transition-colors">
                          View details <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;

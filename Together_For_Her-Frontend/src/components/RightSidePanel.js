import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { FaNewspaper, FaRegClock, FaExternalLinkAlt } from "react-icons/fa";
import Card, { CardBody } from "./ui/Button"; // Reusing Card styles if possible or standardizing

import API_BASE_URL from "../apiConfig";

const RightSidePanel = () => {
  const [news, setNews] = useState([]);
  const newsRef = useRef(null);

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/news`
        );
        setNews(response.data.articles.slice(0, 5)); // Limit to top 5
      } catch (error) {
        console.error("Error fetching health news:", error);
      }
    };

    fetchHealthNews();
  }, []);

  const formatDate = (dateInput) => {
    try {
      const dateTime = DateTime.fromISO(dateInput);
      return dateTime.isValid
        ? dateTime.toRelative()
        : "Recent";
    } catch (error) {
      return "Recent";
    }
  };

  return (
    <div className="flex flex-col h-full gap-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center text-pink-500 shadow-sm border border-pink-100/50">
          <FaNewspaper size={18} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-none text-base tracking-tight">Wellness Updates</h3>
          <p className="text-[9px] text-pink-500 font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-pink-500 rounded-full animate-pulse" />
            Live Insights
          </p>
        </div>
      </div>

      {/* News Feed */}
      <div
        className="flex-1 space-y-4"
        ref={newsRef}
      >
        {news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white/40 dark:bg-slate-800/20 rounded-3xl border border-pink-200/50 dark:border-slate-500/20">
            <div className="w-8 h-8 rounded-full border-2 border-pink-100 border-t-pink-500 animate-spin mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Syncing Intelligence...</p>
          </div>
        ) : (
          news.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-pink-100/50 dark:border-pink-900/30 p-4 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-pink-200/40 dark:hover:shadow-pink-500/10 hover:border-pink-300/50 hover:-translate-y-1 flex gap-4 group/card">
                {article.urlToImage ? (
                  <div className="relative shrink-0">
                    <img
                      src={article.urlToImage}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover transition-transform duration-700 group-hover/card:scale-110 shadow-md"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/40 dark:to-rose-900/40 flex items-center justify-center text-pink-300 shrink-0 border border-pink-100 dark:border-pink-800">
                    <FaNewspaper size={20} />
                  </div>
                )}
                <div className="flex flex-col min-w-0 py-1">
                  <h4 className="font-bold text-[13px] text-slate-900 dark:text-slate-100 leading-snug mb-1 group-hover:text-pink-600 transition-colors line-clamp-2 italic">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 font-semibold leading-relaxed">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-pink-50 dark:bg-pink-900/30 rounded-full border border-pink-100/50 dark:border-pink-800/50">
                      <FaRegClock size={9} className="text-pink-500" />
                      <span className="text-[9px] text-pink-600 dark:text-pink-400 font-black uppercase tracking-widest">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>

    </div>
  );
};

export default RightSidePanel;

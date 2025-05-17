import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import "../styles/rightSidePanel.css";

const RightSidePanel = () => {
  const [userContent, setUserContent] = useState([]);
  const [news, setNews] = useState([]);

  const userContentRef = useRef(null);
  const newsRef = useRef(null);

  // Fetch user content from your backend (all users' uploads)
  // useEffect(() => {
  //   const fetchUserContent = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:9090/api/upload/all-content");
  //       setUserContent(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user content:", error);
  //     }
  //   };

  //   fetchUserContent();
  // }, []);

  // Fetch real-time women's health news from a third-party API
  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=menstrual%20health&apiKey=f12d4c76b52748d9a51079701b97d49a"
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching health news:", error);
      }
    };

    fetchHealthNews();
  }, []);

  // Auto-scroll to the top when new content arrives
  useEffect(() => {
    if (userContentRef.current) {
      userContentRef.current.scrollTop = 0;
    }
  }, [userContent]);

  useEffect(() => {
    if (newsRef.current) {
      newsRef.current.scrollTop = 0;
    }
  }, [news]);

  // Format Date (Handles array input [YYYY, MM, DD, HH, mm, ss, ms])
  const formatDate = (dateInput) => {
    try {
      let dateTime;

      // Check if the input is an array (e.g., [2025, 3, 24, 21, 24, 52, 872529000])
      if (Array.isArray(dateInput)) {
        dateTime = DateTime.fromObject({
          year: dateInput[0],
          month: dateInput[1],
          day: dateInput[2],
          hour: dateInput[3],
          minute: dateInput[4],
          second: dateInput[5],
          millisecond: Math.floor(dateInput[6] / 1000000),
        });
      } else {
        dateTime = DateTime.fromISO(dateInput); // Handle ISO strings
      }

      // If invalid, log and return a fallback
      if (!dateTime.isValid) {
        console.error("Invalid date format:", dateInput);
        return "Invalid Date";
      }

      // Return formatted date
      return dateTime.toFormat("dd MMMM yyyy, hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="right-side-panel">
      {/* User Content Section */}
      {/* <div className="section user-content" ref={userContentRef}>
        <h3>📝 User Contributions</h3>
        {userContent.length === 0 ? (
          <p>No content available yet.</p>
        ) : (
          userContent.map((item) => (
            <div key={item.id} className="content-item">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <small>📄 File Type: {item.fileType}</small>
              <small>📂 File Path: {item.filePath}</small>
              <small>📅 Uploaded At: {formatDate(item.uploadTime)}</small>
              <small>👤 Uploaded By: {item.uploadedBy}</small>
            </div>
          ))
        )}
      </div> */}

      {/* Women's Health News Section */}
      <div className="section news-section" ref={newsRef}>
        <h3>📰 Women's Health News</h3>
        {news.length === 0 ? (
          <p>No recent news available.</p>
        ) : (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h4>{article.title}</h4>
              </a>
              <p>{article.description}</p>
              <small>🗓️ {formatDate(article.publishedAt)}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RightSidePanel;

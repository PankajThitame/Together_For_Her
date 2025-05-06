import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import "../styles/Review.css";

const Reviews = () => {
  const [userContent, setUserContent] = useState([]);

  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/upload/all-content");
        setUserContent(response.data);
      } catch (error) {
        console.error("Error fetching user content:", error);
      }
    };

    fetchUserContent();
  }, []);

  // Format date from array or ISO string
  const formatDate = (dateInput) => {
    try {
      let dateTime;

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
        dateTime = DateTime.fromISO(dateInput);
      }

      if (!dateTime.isValid) {
        console.error("Invalid date format:", dateInput);
        return "Invalid Date";
      }

      return dateTime.toFormat("dd MMMM yyyy, hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Render content based on file type
  const renderFile = (filePath, fileType) => {
    const fileName = filePath.split("\\").pop().split("/").pop(); // gets just the file name
    fetch(`/api/files/${fileName}`);
    const fullPath = `http://localhost:9090/api/files/${encodeURIComponent(fileName)}`;

    if (fileType.startsWith("image/")) {
      return <img src={fullPath} alt="Uploaded Content" className="uploaded-file" />;
    }

    if (fileType.startsWith("video/")) {
      return (
        <video controls className="uploaded-file">
          <source src={fullPath} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <iframe src={fullPath} title="PDF Preview" className="pdf-preview">
          This browser does not support PDFs.
          <a href={fullPath} download>Download PDF</a>
        </iframe>
      );
    }

    return (
      <a href={fullPath} download className="file-download">
        📄 Download File
      </a>
    );
  };

  return (
    <div className="reviews-container">
      <h3>📝 User Contributions</h3>
      {userContent.length === 0 ? (
        <p>No content available yet.</p>
      ) : (
        userContent.map((item) => (
          <div key={item.id} className="content-item">
            <h4>{item.title}</h4>
            <p>{item.description}</p>

            {/* Dynamically render content */}
            {renderFile(item.filePath, item.fileType)}

            <small>📅 Uploaded At: {formatDate(item.uploadTime)}</small>
            <small>👤 Uploaded By: {item.uploadedBy}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
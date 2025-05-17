import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/contentModeration.css";

const ContentModeration = () => {
  const [contentList, setContentList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch pending content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/content/pending");
        setContentList(response.data);
      } catch (err) {
        setError("Error fetching content.");
        console.error(err);
      }
    };
    fetchContent();
  }, []);

  // Approve content
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:9090/api/content/approve/${id}`);
      setContentList(contentList.filter((item) => item.id !== id));
      alert("Content approved successfully!");
    } catch (err) {
      alert("Failed to approve content.");
      console.error(err);
    }
  };

  // Reject content
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:9090/api/content/reject/${id}`);
      setContentList(contentList.filter((item) => item.id !== id));
      alert("Content rejected successfully!");
    } catch (err) {
      alert("Failed to reject content.");
      console.error(err);
    }
  };

  return (
    <div className="moderation-container">
      <h2>🛡️ Content Moderation</h2>
      {error && <p className="error">{error}</p>}

      {contentList.length === 0 ? (
        <p>No pending content for moderation.</p>
      ) : (
        <div className="moderation-list">
          {contentList.map((item) => (
            <div key={item.id} className="content-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {/* Display media based on content type */}
              {item.fileType.startsWith("image/") && (
                <img src={`http://localhost:9090${item.filePath}`} alt="Uploaded Content" />
              )}
              {item.fileType.startsWith("video/") && (
                <video controls>
                  <source src={`http://localhost:9090${item.filePath}`} type={item.fileType} />
                  Your browser does not support video.
                </video>
              )}
              {item.fileType === "application/pdf" && (
                <iframe src={`http://localhost:9090${item.filePath}`} title="PDF Preview">
                  <a href={`http://localhost:9090${item.filePath}`}>Download PDF</a>
                </iframe>
              )}

              <div className="action-buttons">
                <button onClick={() => handleApprove(item.id)} className="approve-btn">✅ Approve</button>
                <button onClick={() => handleReject(item.id)} className="reject-btn">❌ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentModeration;

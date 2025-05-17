import React, { useState, useEffect } from "react";
import "../styles/community.css";
import axios from "axios";

const categories = [
  "Period Talk",
  "Mental Health & Support",
  "Ask the Expert",
  "Stories of Strength",
  "Awareness & Campaigns",
  "Tips & Advice",
  "Volunteer Connect",
];

const profanityList = ["badword1", "badword2"]; // Replace with real offensive terms

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleLike = async (id, index) => {
    try {
      await fetch(`http://localhost:9090/api/community/like/${id}`, { method: "PUT" });

      const updatedMessages = [...messages];
      updatedMessages[index].likes += 1;
      setMessages(updatedMessages);
    } catch (err) {
      console.error("Error liking the post:", err);
    }
  };

  const handlePost = async () => {
    if (!newMessage.trim()) return;

    const containsProfanity = profanityList.some((word) =>
      newMessage.toLowerCase().includes(word)
    );
    if (containsProfanity) {
      alert("Your post contains inappropriate content.");
      return;
    }

    const newPost = {
      text: newMessage,
      category: selectedCategory,
      timestamp: new Date().toLocaleString(),
      likes: 0,
    };

    try {
      const response = await axios.post("http://localhost:9090/api/community/post", {
        message: newPost.text,
        category: newPost.category,
        timestamp: newPost.timestamp,
        likes: newPost.likes,
      });

      // ✅ Include the returned `id` from backend
      const postWithId = {
        ...newPost,
        id: response.data.id,
      };

      setMessages([postWithId, ...messages]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to post message:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/community/all");
        const data = response.data.map((item) => ({
          id: item.id, // ✅ Include ID here
          text: item.message,
          category: item.category,
          timestamp: item.timestamp,
          likes: item.likes,
        }));
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="c-container">
      <div className="container-community">
        <h2>🌸 Community Forum</h2>

        <div className="forum-rules">
          <h4>📜 Forum Guidelines:</h4>
          <ul>
            <li>Be respectful and supportive.</li>
            <li>No hate speech or bullying.</li>
            <li>Use inclusive language.</li>
            <li>Avoid sharing personal information.</li>
            <li>Posts with inappropriate content will be removed.</li>
          </ul>
        </div>

        <div className="post-box">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message here..."
          ></textarea>
          <div className="post-controls">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button onClick={handlePost}>Post</button>
          </div>
        </div>

        <div className="posts-section">
          {messages.length === 0 ? (
            <p>No posts yet. Be the first to share!</p>
          ) : (
            messages.map((msg, index) => (
              <div className="post-card" key={msg.id}>
                <div className="post-header">
                  <span className="post-category">#{msg.category}</span>
                  <span className="post-time">{msg.timestamp}</span>
                </div>
                <p className="post-text">{msg.text}</p>
                <button onClick={() => handleLike(msg.id, index)}>
                  ❤️ {msg.likes}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;

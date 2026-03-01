import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FaHeart, FaPaperPlane, FaShieldAlt, FaInfoCircle, FaRegCommentDots, FaLayerGroup, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { formatDate } from "../utils/dateUtils";

const categories = [
  "Period Talk",
  "Mental Health & Support",
  "Ask the Expert",
  "Stories of Strength",
  "Awareness & Campaigns",
  "Tips & Advice",
  "Volunteer Connect",
];

const profanityList = ["badword1", "badword2"];

const Community = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isPosting, setIsPosting] = useState(false);

  const handleLike = async (id, index) => {
    try {
      await fetch(`${API_BASE_URL}/community/like/${id}`, { method: "PUT" });
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

    setIsPosting(true);
    const newPost = {
      text: newMessage,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      senderName: user?.name || user?.username || "Anonymous Sister",
      likes: 0,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/community/post`, {
        message: newMessage,
        category: selectedCategory,
        timestamp: newPost.timestamp,
        senderName: newPost.senderName,
        likes: 0
      });
      const postWithId = { ...newPost, id: response.data.id };
      setMessages([postWithId, ...messages]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to post message:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/community/all`);
        const data = response.data.map((item) => ({
          id: item.id,
          text: item.message,
          category: item.category,
          timestamp: item.timestamp,
          senderName: item.senderName,
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
    <div className="min-h-screen bg-transparent animate-fadeIn">
      <div className="max-w-4xl mx-auto py-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
            <span className="text-pink-500">🌸</span> Community Space
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
            A safe place to share, support and connect.
          </p>
        </div>

        {/* Post Creation Area */}
        <div className="bg-white dark:bg-slate-800/60 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(236,72,153,0.05)] border border-white/20 dark:border-slate-700/20 mb-10 group/post transition-all hover:shadow-[0_20px_60px_rgba(236,72,153,0.1)]">
          <div className="flex gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg font-black shrink-0 shadow-lg shadow-pink-200/50">
              {(user?.name || user?.username || "Anonymous").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                className="w-full h-24 p-5 bg-[#fff1f5] dark:bg-slate-900/50 border-none rounded-[1.5rem] text-slate-800 dark:text-slate-200 placeholder-slate-400 text-base font-medium transition-all duration-300 outline-none ring-2 ring-transparent focus:ring-pink-100 dark:focus:ring-pink-900/20 resize-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share something on your heart today..."
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-full">
                  <FaShieldAlt className="text-pink-400" /> Safe Space Active
                </div>
                <button
                  onClick={handlePost}
                  disabled={isPosting || !newMessage.trim()}
                  className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white px-8 py-3 rounded-full font-black text-[13px] uppercase tracking-wider shadow-[0_8px_25px_rgba(236,72,153,0.3)] hover:translate-y-[-2px] hover:shadow-[0_12px_30px_rgba(236,72,153,0.4)] transition-all active:scale-[0.97] flex items-center gap-3 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                >
                  {isPosting ? "Posting..." : "Share Post"} <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Row */}
        <div className="mb-10 overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-3 whitespace-nowrap px-1">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-[13px] font-bold transition-all duration-300 border shadow-sm ${selectedCategory === cat
                  ? "bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white border-transparent shadow-pink-200/50"
                  : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-white/20 dark:border-slate-700/20 hover:bg-[#fce7f3] dark:hover:bg-pink-900/20 hover:text-[#ec4899]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Feed */}
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-24 bg-white/20 dark:bg-slate-800/10 backdrop-blur-sm rounded-[3rem] border border-white/20 dark:border-slate-800/50">
              <div className="w-20 h-20 rounded-full bg-pink-50 dark:bg-pink-900/10 flex items-center justify-center mx-auto mb-6">
                <FaRegCommentDots className="text-3xl text-pink-200 dark:text-pink-500/30" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2">Be the First</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">No stories shared in this circle yet.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg.id}
                className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-[2rem] p-8 border border-white/40 dark:border-slate-700/30 shadow-[0_10px_30px_rgba(236,72,153,0.03)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.08)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 group-hover:text-pink-500 transition-colors">
                      <FaUser size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-800 dark:text-slate-200 uppercase tracking-[0.15em] mb-1">
                        {msg.senderName || "Anonymous Sister"}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="bg-pink-50 dark:bg-pink-900/20 text-pink-500 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-pink-100/50 dark:border-pink-900/30">
                          {msg.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{formatDate(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaShieldAlt size={14} />
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 font-semibold italic">
                  "{msg.text}"
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleLike(msg.id, index)}
                    className="flex items-center gap-4 group/like px-6 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all border border-transparent hover:border-pink-100 dark:hover:border-pink-900/30"
                  >
                    <div className="text-pink-400 group-hover/like:scale-125 transition-transform">
                      <FaHeart size={18} />
                    </div>
                    <span className="text-xs font-black text-slate-500 group-hover/like:text-pink-600 transition-colors uppercase tracking-widest">
                      {msg.likes} Supports
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;

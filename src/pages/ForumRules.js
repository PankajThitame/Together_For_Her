import React, { useState } from "react";
import "../styles/forumRules.css";

const ForumRules = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="forum-container">
      <h2>Community Guidelines</h2>
      <p>Follow these rules to maintain a safe and respectful community.</p>

      <div className="rules-list">
        <div className="rule">
          <span>✅ Be respectful and kind to others.</span>
        </div>
        <div className="rule">
          <span>🚫 No misinformation or harmful content.</span>
        </div>
        <div className="rule">
          <span>❌ No spamming or self-promotion.</span>
        </div>
        <div className="rule">
          <span>💬 Keep discussions relevant to hygiene & well-being.</span>
        </div>
      </div>

      <button className="toggle-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide More Rules" : "View More Rules"}
      </button>

      {expanded && (
        <div className="extra-rules">
          <p>5️⃣ Report any inappropriate behavior to moderators.</p>
          <p>6️⃣ Use respectful language, no hate speech.</p>
          <p>7️⃣ Avoid sharing personal details in public forums.</p>
        </div>
      )}

      <footer className="forum-footer">
        <p>&copy; 2024 Together for Her. All rights reserved.</p>
        <p>For support, contact <a href="/contact">here</a>.</p>
      </footer>
    </div>
  );
};

export default ForumRules;

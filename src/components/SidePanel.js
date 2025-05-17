import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaUser, FaHome, FaHandsHelping, FaStore, 
  FaComments, FaClipboardList, FaDonate, FaUsers, FaChartBar 
} from "react-icons/fa";
import "../styles/sidepanel.css";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [role] = useState("user");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   let storedUser = localStorage.getItem("user");

  //   // If no token, redirect to login
  //   if (!token) {
  //     navigate("/login");
  //     console.log("🟡 Sending request to API...side panel");
  //     return;
  //   }

  //   // Parse user safely
  //   try {
  //     if (storedUser) {
  //       const parsedUser = JSON.parse(storedUser);
  //       setRole(parsedUser.role || "user"); // Set role from storage
  //       console.log("🟡 Sending request to API...side panel stored user");
  //     }
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     localStorage.removeItem("user"); // Remove corrupted user data
  //     console.log("🟡 Sending request to API...side panel stored user 1");
  //     navigate("/login"); // Redirect to login if data is invalid
  //   }
  // }, [navigate]);

  return (
       <div className={`side-panel ${isOpen ? "open" : "closed"}`}>
    {/* //   <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
    //     {isOpen ? "◀" : "▶"}
    //   </button> */}

      <ul className="side-menu">
        {/* <li><Link to="/"><FaHome className="icon" /> {isOpen && "Home"}</Link></li> */}
        <li><Link to="/awareness"><FaUser className="icon" /> {isOpen && "Awareness"}</Link></li>
        <li><Link to="/donate"><FaDonate className="icon" /> {isOpen && "Donate"}</Link></li>
        <li><Link to="/volunteer"><FaHandsHelping className="icon" /> {isOpen && "Volunteer"}</Link></li>
        <li><Link to="/marketplace"><FaStore className="icon" /> {isOpen && "Marketplace"}</Link></li>
        <li><Link to="/community"><FaComments className="icon" /> {isOpen && "Community"}</Link></li>
        <li><Link to="/request-kit"><FaClipboardList className="icon" /> {isOpen && "Request Kit"}</Link></li>

        {/* Admin-Only Links */}
        {role === "admin" && (
          <>
            <li><Link to="/admin/dashboard"><FaChartBar className="icon" /> {isOpen && "Dashboard"}</Link></li>
            <li><Link to="/admin/users"><FaUsers className="icon" /> {isOpen && "Users"}</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SidePanel;

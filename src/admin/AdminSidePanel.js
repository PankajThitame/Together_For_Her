import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaChartPie, FaClipboardList, FaMapMarkedAlt,
  FaHandHoldingUsd, FaChartBar, FaShieldAlt, FaUserCheck, FaComments,
  FaArrowLeft, FaArrowRight
} from "react-icons/fa";

import "../styles/sidepanel.css";

const AdminSidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`side-panel ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      <ul className="side-menu">
        {/* <li>
          <Link to="/admin/dashboard">
            <FaChartPie className="icon" /> {isOpen && "Dashboard"}
          </Link>
        </li> */}

        <li>
          <Link to="/admin/users">
            <FaUsers className="icon" /> {isOpen && "User Management"}
          </Link>
        </li>

        <li>
          <Link to="/admin/requests">
            <FaClipboardList className="icon" /> {isOpen && "Request Management"}
          </Link>
        </li>

        <li>
          <Link to="/admin/address-map">
            <FaMapMarkedAlt className="icon" /> {isOpen && "Address Map"}
          </Link>
        </li>

        <li>
          <Link to="/admin/fund-management">
            <FaHandHoldingUsd className="icon" /> {isOpen && "Fund Management"}
          </Link>
        </li>

        {/* <li>
          <Link to="/admin/analytics-dashboard">
            <FaChartBar className="icon" /> {isOpen && "Analytics Dashboard"}
          </Link>
        </li> */}

        <li>
          <Link to="/admin/content-moderation">
            <FaShieldAlt className="icon" /> {isOpen && "Content Moderation"}
          </Link>
        </li>

        <li>
          <Link to="/admin/volunteer-management">
            <FaUserCheck className="icon" /> {isOpen && "Volunteer Management"}
          </Link>
        </li>

        <li>
          <Link to="/admin/feedback-system">
            <FaComments className="icon" /> {isOpen && "Feedback System"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidePanel;

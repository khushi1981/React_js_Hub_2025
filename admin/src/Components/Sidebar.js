import React from "react";
import { FaTachometerAlt, FaVideo, FaUserShield, FaUsers, FaTags, FaInfoCircle, FaClipboardList } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src="https://i.pinimg.com/736x/27/41/3b/27413bfe1b86f02a6bb1b5f73673f6db.jpg"
          alt="Profile"
          className="profile-img"
        />
        <h3 className="profile-name">Shraddha Tiwari</h3>
      </div>
      <ul className="sidebar-menu">
        <li><FaTachometerAlt /> Dashboard</li>
        <li><FaClipboardList /> Explore</li>
        <li><FaVideo /> Media</li>
        <li><FaUserShield /> New Admin</li>
        <li><FaInfoCircle /> Admin Information</li>
        <li><FaUsers /> User Information</li>
        <li><FaTags /> Subscription Plans</li>
        <li><FaClipboardList /> Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;

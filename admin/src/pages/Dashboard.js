import React from "react";
import DashboardCard from "../Components/DashboardCard";
import {
  FaFileAlt,
  FaBook,
  FaVideo,
  FaUserShield,
  FaUsers,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const cards = [
    { title: "Format Count", count: 3, color: "#28a745", icon: <FaFileAlt /> },
    { title: "Subject Count", count: 7, color: "#007bff", icon: <FaBook /> },
    { title: "Media Count", count: 10, color: "#fd7e14", icon: <FaVideo /> },
    { title: "Admin Users", count: 4, color: "#6f42c1", icon: <FaUserShield /> },
    { title: "Total Users", count: 4, color: "#fd7e14", icon: <FaUsers /> },
    { title: "Subscription Plans", count: 3, color: "#007bff", icon: <FaTags /> },
    { title: "Users Subscribed", count: 3, color: "#28a745", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// src/Components/DashboardCard.js
import React from "react";

const DashboardCard = ({ title, count, color, icon }) => {
  return (
    <div
      className="dashboard-card"
      style={{
        backgroundColor: color,
        borderRadius: "12px",
        padding: "20px",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        flex: "1 1 calc(33.33% - 20px)",
        margin: "10px",
        minWidth: "250px",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>{icon}</div>
      <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{title}</h3>
      <p style={{ fontSize: "26px", fontWeight: "bold" }}>{count}</p>
    </div>
  );
};

export default DashboardCard;

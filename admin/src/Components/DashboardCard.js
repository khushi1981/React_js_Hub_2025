// src/components/DashboardCard.js
import React from "react";
import "./DashboardCard.css";

export default function DashboardCard({ title, value, icon, bgColor }) {
  return (
    <div className="dashboard-card fade-in" style={{ background: bgColor }}>
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
}

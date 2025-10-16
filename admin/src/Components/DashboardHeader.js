// src/components/DashboardHeader.js
import React from "react";
import "./DashboardHeader.css";

export default function DashboardHeader({ user }) {
  return (
    <header className="dashboard-header fade-in">
      <h1 className="dashboard-title">Welcome, {user || "Admin"}!</h1>
      <div className="dashboard-actions">
        <button className="action-btn">Notifications</button>
        <button className="action-btn">Profile</button>
      </div>
    </header>
  );
}

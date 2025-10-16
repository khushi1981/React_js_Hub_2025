// src/pages/AdminDashboard.js
import React from "react";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardCard from "../Components/DashboardCard";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="dashboard-content">
        <DashboardHeader user="Admin" />

        <div className="dashboard-cards">
          <DashboardCard
            title="Users"
            value="1,250"
            icon="👤"
            bgColor="linear-gradient(135deg, #ff6a00, #ee0979)"
          />
          <DashboardCard
            title="Sales"
            value="$12,400"
            icon="💰"
            bgColor="linear-gradient(135deg, #1d976c, #93f9b9)"
          />
          <DashboardCard
            title="Orders"
            value="320"
            icon="📦"
            bgColor="linear-gradient(135deg, #667eea, #764ba2)"
          />
          <DashboardCard
            title="Visitors"
            value="4,890"
            icon="👀"
            bgColor="linear-gradient(135deg, #f7971e, #ffd200)"
          />
        </div>
      </div>
    </div>
  );
}

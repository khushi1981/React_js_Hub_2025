// src/components/Sidebar.js
import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar fade-in">
      <h2 className="sidebar-logo">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Users</li>
        <li className="sidebar-item">Settings</li>
        <li className="sidebar-item">Reports</li>
        <li className="sidebar-item">Logout</li>
      </ul>
    </div>
  );
}

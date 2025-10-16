import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardHeader.css";

export default function DashboardHeader({ user }) {
  return (
    <header className="dashboard-header">
      {/* ---------- Logo Section ---------- */}
      <div className="dash-logo">
        <img
          src="/images/dashboardlogo.png" // Logo image path
          alt="User Dashboard Logo"
          className="dash-logo-img"
        />
        <h2 className="dash-logo-text">User Dashboard</h2>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="dash-nav">
        <ul>
          <li>
            <NavLink
              to="/userdashboard"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/media"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Media
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Subscription
            </NavLink>
          </li>
          {/* ✅ Replaced "Profile" with "UserProfile" */}
          <li>
            <NavLink
              to="/userprofile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              UserProfile
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className="logout-link">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ---------- User Info ---------- */}
      <div className="dash-user">
        <span className="user-name">Hi, {user?.name || "User"} 👋</span>
      </div>
    </header>
  );
}

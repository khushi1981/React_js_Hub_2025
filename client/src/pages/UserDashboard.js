// UserDashboard.js
import React from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* ---------- Dashboard Hero Section ---------- */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-left">
          <img
            src="/images/Welcome.png" // same image as Home page
            alt="Welcome"
            className="dashboard-welcome-img"
          />
        </div>

        <div className="dashboard-hero-right">
          <h1 className="dashboard-title">Welcome to the Resource Hub</h1>
          <p className="dashboard-desc">
            Resource Hub is a centralized collection of curated guides, templates, tools, and learning materials designed to help professionals and learners move faster. We organize high-quality resources by topic so you spend less time searching and more time doing.
          </p>
          <p className="dashboard-desc">
            Resource Hub gathers the best tutorials, templates, and tools across categories—design, development, marketing, and productivity—so teams and individuals can learn quickly and ship confidently. Every item is hand-picked and categorized for fast discovery, with practical how-tos, downloadable assets, and clear next steps. Whether you’re upskilling, planning a project, or solving a one-off problem, Resource Hub helps you find the right resource in seconds.
          </p>
        </div>
      </section>

      {/* ---------- Dashboard Widgets ---------- */}
      <section className="dashboard-widgets">
        <div className="widget">
          <h3>My Courses</h3>
          <p>View and manage your enrolled subjects.</p>
          <button className="dashboard-btn">View</button>
        </div>

        <div className="widget">
          <h3>Recent Activity</h3>
          <p>Check your latest progress and submissions.</p>
          <button className="dashboard-btn">Open</button>
        </div>

        <div className="widget">
          <h3>Profile Settings</h3>
          <p>Update your personal details and password.</p>
          <button className="dashboard-btn">Edit</button>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;

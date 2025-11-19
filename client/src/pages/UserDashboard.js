// UserDashboard.js
import React from "react";
import "./UserDashboard.css";

const formats = [
  { id: 1, name: "Books", logo: "/images/bookCover.jpg", description: "Read and learn from books" },
  { id: 2, name: "Videos", logo: "/images/videoCover.webp", description: "Watch educational videos" },
  { id: 3, name: "Audio", logo: "/images/audioCover.webp", description: "Listen to audio lessons" },
];

const subjects = [
  { id: 1, name: "Mathematics", logo: "/images/mathCover.webp", description: "Explore numbers and formulas" },
  { id: 2, name: "Science", logo: "/images/scienceCover.webp", description: "Learn about the world around you" },
  { id: 3, name: "History", logo: "/images/historyCover.jpg", description: "Understand past events" },
];

const UserDashboard = () => {
  const renderCards = (items) =>
    items.map((item) => (
      <div key={item.id} className="ud-card">
        <img src={item.logo} alt={item.name} className="ud-card-img" />
        <h4 className="ud-card-title">{item.name}</h4>
        <p className="ud-card-desc">{item.description}</p>
      </div>
    ));

  return (
    <div className="user-dashboard">

      {/* ---------- Dashboard Hero Section ---------- */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-left">
          <img
            src="/images/Welcome.png"
            alt="Welcome"
            className="dashboard-welcome-img"
          />
        </div>

        <div className="dashboard-hero-right">
          <h1 className="dashboard-title">Welcome to the Resource Hub</h1>
          <p className="dashboard-desc">
            Resource Hub is a centralized collection of curated guides, templates, tools,
            and learning materials designed to help professionals and learners move faster.
          </p>
          <p className="dashboard-desc">
            Resource Hub gathers the best tutorials, templates, and tools across categories—
            design, development, marketing, and productivity—so teams and individuals can learn
            quickly and ship confidently.
          </p>
        </div>
      </section>

      {/* ---------- NEW: Formats + Subjects Section (Side-by-side row) ---------- */}
      <section className="dashboard-cards-section">
        <div className="dashboard-row">

          {/* Formats */}
          <div className="dashboard-column">
            <h2 className="ud-section-title">Available Formats</h2>
            <div className="ud-card-grid">
              {renderCards(formats)}
            </div>
          </div>

          {/* Subjects */}
          <div className="dashboard-column">
            <h2 className="ud-section-title">Subjects</h2>
            <div className="ud-card-grid">
              {renderCards(subjects)}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default UserDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subjects.css";

const subjects = [
  { name: "Science", description: "Dive into physics, chemistry, and biology.", image: "/images/science.png", path: "science" },
  { name: "Technology", description: "Stay updated with latest innovations and coding.", image: "/images/technology.png", path: "technology" },
  { name: "Mathematics", description: "Master logic, problem-solving, and numbers.", image: "/images/mathematics.png", path: "mathematics" },
  { name: "History", description: "Explore civilizations and cultures.", image: "/images/history.png", path: "history" },
  { name: "Arts & Literature", description: "Discover art, stories, and creativity.", image: "/images/Art.jpg", path: "arts-literature" },
  { name: "Business & Economics", description: "Understand markets, leadership, and finance.", image: "/images/business.png", path: "business-economics" },
  { name: "Music", description: "Explore melodies, rhythms, and instruments.", image: "/images/music.png", path: "music" },
  { name: "Philosophy", description: "Delve into ethics, logic, and human thought.", image: "/images/philosophy.png", path: "philosophy" },
  { name: "Geography", description: "Study Earth's landscapes, environments, and people.", image: "/images/geography.png", path: "geography" },
  { name: "Health & Wellness", description: "Learn about fitness, nutrition, and mental health.", image: "/images/health.png", path: "health-wellness" },
];

export default function Subjects() {
  const navigate = useNavigate();

  const handleExplore = (path) => {
    navigate(`/subjects/${path}`);
  };

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">
        Explore Subjects — <span>Resource Hub (Knowledge Nexus)</span>
      </h2>

      <p className="subjects-subtitle">
        Learn, grow, and connect with diverse fields of knowledge — all in one hub of wisdom.
      </p>

      <div className="subjects-grid">
        {subjects.map((subject, index) => (
          <div className="subject-card" key={index}>
            <div className="subject-img">
              <img src={subject.image} alt={subject.name} />
            </div>
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
            <button className="explore-btn" onClick={() => handleExplore(subject.path)}>
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaVideo, FaMusic, FaInfoCircle } from "react-icons/fa";
import "./Subjects.css";

const subjectDetails = {
  science: { title: "Science", description: "Dive into physics, chemistry, and biology — explore how the world works.", image: "/images/science.png", video: "/videos/science.mp4", audio: "/audio/science.mp3", info: "Science explains the natural world through experiments and observation." },
  technology: { title: "Technology", description: "Stay updated with the latest innovations, coding, and digital trends.", image: "/images/technology.png", video: "/videos/technology.mp4", audio: "/audio/technology.mp3", info: "Technology drives modern life with AI, computing, and gadgets." },
  mathematics: { title: "Mathematics", description: "Master logic, problem-solving, and the universal language of numbers.", image: "/images/mathematics.png", video: "/videos/mathematics.mp4", audio: "/audio/mathematics.mp3", info: "Mathematics is the foundation of science, engineering, and problem-solving." },
  history: { title: "History", description: "Travel through time and uncover the lessons of civilizations and cultures.", image: "/images/history.png", video: "/videos/history.mp4", audio: "/audio/history.mp3", info: "History helps us learn from the past to shape a better future." },
  "arts-literature": { title: "Arts & Literature", description: "Discover the beauty of creativity through art, stories, and imagination.", image: "/images/Art.jpg", video: "/videos/arts.mp4", audio: "/audio/arts.mp3", info: "Arts and literature enrich human experience and imagination." },
  "business-economics": { title: "Business & Economics", description: "Understand markets, leadership, and global financial systems.", image: "/images/business.png", video: "/videos/business.mp4", audio: "/audio/business.mp3", info: "Learn business strategies, economics, and financial decision-making." },
  music: { title: "Music", description: "Explore melodies, rhythms, instruments, and musical theory.", image: "/images/music.png", video: "/videos/music.mp4", audio: "/audio/music.mp3", info: "Music nurtures creativity and emotional expression." },
  philosophy: { title: "Philosophy", description: "Delve into ethics, logic, and existential questions that shape human thought.", image: "/images/philosophy.png", video: "/videos/philosophy.mp4", audio: "/audio/philosophy.mp3", info: "Philosophy explores life, knowledge, and the nature of reality." },
  geography: { title: "Geography", description: "Study the Earth's landscapes, environments, and human interaction.", image: "/images/geography.png", video: "/videos/geography.mp4", audio: "/audio/geography.mp3", info: "Geography connects us with Earth and human-environment interaction." },
  "health-wellness": { title: "Health & Wellness", description: "Learn about fitness, nutrition, mental health, and well-being.", image: "/images/health.png", video: "/videos/health.mp4", audio: "/audio/health.mp3", info: "Maintaining physical and mental health is key to a fulfilling life." },
};

export default function SubjectPage() {
  const { subjectId } = useParams();
  const data = subjectDetails[subjectId];

  if (!data) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Subject Not Found</h2>
        <Link to="/subjects">
          <button className="explore-btn">Back to Subjects</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="subjects-container">
      <h2 className="subjects-title">{data.title}</h2>

      <div className="subject-card" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="subject-img">
          <img src={data.image} alt={data.title} />
        </div>

        <div className="subject-info">
          <p><FaInfoCircle style={{ color: "#2575fc", marginRight: "8px" }} /> {data.info}</p>
        </div>

        {data.video && (
          <div className="media-box">
            <p><FaVideo style={{ color: "#6a11cb", marginRight: "8px" }} /> Video Resource:</p>
            <video width="100%" controls>
              <source src={data.video} type="video/mp4" />
            </video>
          </div>
        )}

        {data.audio && (
          <div className="media-box">
            <p><FaMusic style={{ color: "#43e97b", marginRight: "8px" }} /> Audio Resource:</p>
            <audio controls style={{ width: "100%" }}>
              <source src={data.audio} type="audio/mpeg" />
            </audio>
          </div>
        )}

        <Link to="/subjects">
          <button className="explore-btn">Back to Subjects</button>
        </Link>
      </div>
    </div>
  );
}

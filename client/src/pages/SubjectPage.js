import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaVideo, FaMusic, FaInfoCircle } from "react-icons/fa";
import "./Subjects.css";

const subjectDetails = {
  science: { 
    title: "Science", 
    description: "Dive into physics, chemistry, and biology — explore how the world works.", 
    image: "/images/science.png", 
    iframe: "https://youtu.be/MEIXRLcC6RA?si=ojQYHo8sESHK22Ys",  
    info: "Science explains the natural world through experiments and observation." 
  },
  technology: { 
    title: "Technology", 
    description: "Stay updated with the latest innovations, coding, and digital trends.", 
    image: "/images/technology.png", 
    iframe: "https://youtu.be/KvN3JXICzdM?si=DJFWFEjugn4_PDf_",  
    info: "Technology drives modern life with AI, computing, and gadgets." 
  },
  mathematics: { 
    title: "Mathematics", 
    description: "Master logic, problem-solving, and the universal language of numbers.", 
    image: "/images/mathematics.png", 
    iframe: "https://youtu.be/sb_FI7nt4yk?si=2b4iCrppP91IYIcV",  
    info: "Mathematics is the foundation of science, engineering, and problem-solving." 
  },
  history: { 
    title: "History", 
    description: "Travel through time and uncover the lessons of civilizations and cultures.", 
    image: "/images/history.png", 
    iframe: "https://youtu.be/wX6J0Gd2EC8?si=UZK20U9CDoIQsEzA", 
    info: "History helps us learn from the past to shape a better future." 
  },
  "arts-literature": { 
    title: "Arts & Literature", 
    description: "Discover the beauty of creativity through art, stories, and imagination.", 
    image: "/images/Art.jpg", 
    iframe: "https://youtu.be/FbBvN-4G2qk?si=lp5b_uRzEGdB2rzY", 
    info: "Arts and literature enrich human experience and imagination." 
  },
  "business-economics": { 
    title: "Business & Economics", 
    description: "Understand markets, leadership, and global financial systems.", 
    image: "/images/business.png", 
    iframe: "https://youtu.be/A9Xq3FGjpZA?si=AzNlKq_TxYQoir5f", 
    info: "Learn business strategies, economics, and financial decision-making." 
  },
  music: { 
    title: "Music", 
    description: "Explore melodies, rhythms, instruments, and musical theory.", 
    image: "/images/music.png", 
    iframe: "https://youtu.be/rUPjsHD5cTw?si=W5CCquiuCbOdzi_x", 
    info: "Music nurtures creativity and emotional expression." 
  },
  philosophy: { 
    title: "Philosophy", 
    description: "Delve into ethics, logic, and existential questions that shape human thought.", 
    image: "/images/philosophy.png", 
    iframe: "https://youtu.be/IuHbOJjnhLc?si=bNGrCJa4HH7f3DRF",  
    info: "Philosophy explores life, knowledge, and the nature of reality." 
  },
  geography: { 
    title: "Geography", 
    description: "Study the Earth's landscapes, environments, and human interaction.", 
    image: "/images/geography.png", 
    iframe: "https://youtu.be/3SsK-cxlj_w?si=N8Qs7xhrYb74cmle", 
    info: "Geography connects us with Earth and human-environment interaction." 
  },
  "health-wellness": { 
    title: "Health & Wellness", 
    description: "Learn about fitness, nutrition, mental health, and well-being.", 
    image: "/images/health.png", 
    iframe: "https://youtu.be/Cg_GW7yhq20?si=5F2vhSn04plDsZHZ", 
    info: "Maintaining physical and mental health is key to a fulfilling life." 
  },
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

        {data.iframe && (
          <div className="media-box">
            <p><FaVideo style={{ color: "#6a11cb", marginRight: "8px" }} /> Video Resource:</p>
            <iframe
              width="100%"
              height="400"
              src={data.iframe.includes("youtu.be")
                ? `https://www.youtube.com/embed/${data.iframe.split("/").pop()}`
                : data.iframe.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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

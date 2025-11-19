import React, { useState, useEffect } from "react";
import "./Media.css";

export default function Media() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const mediaItems = [
    {
      id: 1,
      title: "Introduction to AI",
      description:
        "A beginner-friendly guide to Artificial Intelligence concepts and applications.",
      type: "eBook (PDF)",
      size: "3.2 MB",
      uploaded: "2025-10-10",
      logo: "/images/Introduction_AI.jpg",
      link: "/files/AI_Introduction.pdf",
    },
    {
      id: 2,
      title: "Web Development Basics",
      description:
        "Learn HTML, CSS, and JavaScript fundamentals for modern web development.",
      type: "eBook (PDF)",
      size: "5.6 MB",
      uploaded: "2025-09-25",
      logo: "/images/Web-Devlopment-Design.png",
      link: "/files/Web-Devlopment.pdf",
    },
    {
      id: 3,
      title: "React Essentials",
      description:
        "Understand React components, hooks, and state management in this complete handbook.",
      type: "Guide (PDF)",
      size: "4.1 MB",
      uploaded: "2025-08-18",
      logo: "/images/React.jpg",
      link: "/files/React_Essentials.pdf",
    },
    {
      id: 4,
      title: "Data Science Handbook",
      description:
        "Explore data analytics, machine learning, and visualization using Python.",
      type: "eBook (PDF)",
      size: "7.5 MB",
      uploaded: "2025-07-30",
      logo: "/images/Data_Science.webp",
      link: "/files/Data_Science_handbook.pdf",
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      description:
        "Learn essential practices to protect systems, data, and networks from threats.",
      type: "Article",
      size: "2.7 MB",
      uploaded: "2025-06-12",
      logo: "/images/Cybersecurity-Fundamentals.png",
      link: "/files/Cybersecurity_Fundamentals.pdf",
    },
    {
      id: 6,
      title: "UX/UI Design Principles",
      description:
        "A visual guide to designing user-friendly and accessible digital interfaces.",
      type: "Resource Pack",
      size: "3.9 MB",
      uploaded: "2025-05-22",
      logo: "/images/UX-UI-Design.jpg",
      link: "/files/UX_UI_Design.pdf",
    },
    {
      id: 7,
      title: "Digital Marketing 101",
      description:
        "Master SEO, content strategy, and social media marketing with practical insights.",
      type: "eBook (PDF)",
      size: "6.8 MB",
      uploaded: "2025-04-10",
      logo: "/images/Digital-Marketing-101.webp",
      link: "/files/Digital_Marketing.pdf",
    },
    {
      id: 8,
      title: "Cloud Computing Overview",
      description:
        "Understand cloud services, architectures, and deployment models with examples.",
      type: "Presentation",
      size: "9.3 MB",
      uploaded: "2025-03-19",
      logo: "/images/Cloud-Computing.jpg",
      link: "/files/Cloud_Computing.pdf",
    },
    {
      id: 9,
      title: "Programming with Python",
      description:
        "A full Python programming course covering syntax, data types, and OOP.",
      type: "Tutorial (PDF)",
      size: "8.5 MB",
      uploaded: "2025-02-08",
      logo: "/images/Python_programming.jpg",
      link: "/files/Programming.pdf",
    },
    {
      id: 10,
      title: "Startup Business Guide",
      description:
        "Step-by-step strategies for launching and scaling your startup successfully.",
      type: "Guide (PDF)",
      size: "4.9 MB",
      uploaded: "2025-01-22",
      logo: "/images/business_guide.webp",
      link: "/files/business.pdf",
    },
  ];

  return (
    <div className={`media-container ${visible ? "fade-in" : ""}`}>
      <h2 className="media-title">📚 Resource Hub</h2>
      <p className="media-subtitle">
        Explore our curated digital library — books, PDFs, guides, and learning resources.
      </p>

      <div className="media-grid">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className="media-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* FIXED: logo display */}
            <img
              src={item.logo}
              alt={item.title}
              className="media-thumbnail"
            />

            <div className="media-info">
              <h3 className="media-name">{item.title}</h3>
              <p className="media-desc">{item.description}</p>
              <div className="media-meta">
                <span>📘 {item.type}</span>
                <span>💾 {item.size}</span>
              </div>
              <p className="media-date">Uploaded: {item.uploaded}</p>

              <button
                className="media-btn"
                onClick={() => setSelectedMedia(item)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div
          className="media-modal-overlay"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="media-modal" onClick={(e) => e.stopPropagation()}>
            {/* FIXED: correct logo in modal */}
            <img
              src={selectedMedia.logo}
              alt={selectedMedia.title}
              className="modal-thumbnail"
            />

            <h2>{selectedMedia.title}</h2>
            <p>{selectedMedia.description}</p>

            <div className="modal-details">
              <p><strong>Type:</strong> {selectedMedia.type}</p>
              <p><strong>Size:</strong> {selectedMedia.size}</p>
              <p><strong>Uploaded:</strong> {selectedMedia.uploaded}</p>
            </div>

            <a
              href={selectedMedia.link}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              🔗 Open or Download
            </a>

            <button
              className="close-btn"
              onClick={() => setSelectedMedia(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

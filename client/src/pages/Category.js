import React, { useState, useEffect } from "react";
import "./Category.css";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const categoryItems = [
    {
      id: 1,
      title: "Artificial Intelligence",
      description:
        "Explore the world of AI, machine learning, and deep learning with real-world projects.",
      type: "Technology",
      courses: 25,
      created: "2025-10-10",
      logo: "/images/AI.webp",
      link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    },
    {
      id: 2,
      title: "Web Development",
      description:
        "Learn HTML, CSS, React, and full-stack web development to build modern websites.",
      type: "Programming",
      courses: 32,
      created: "2025-09-20",
      logo: "/images/Web-Devlopment.jpg",
      link: "https://developer.mozilla.org/en-US/docs/Learn",
    },
    {
      id: 3,
      title: "Data Science",
      description:
        "Master data analysis, visualization, and predictive modeling with Python.",
      type: "Analytics",
      courses: 18,
      created: "2025-08-15",
      logo: "/images/Data_Science.webp",
      link: "https://en.wikipedia.org/wiki/Data_science",
    },
    {
      id: 4,
      title: "UI/UX Design",
      description:
        "Learn to design stunning, user-friendly, and accessible digital interfaces.",
      type: "Design",
      courses: 20,
      created: "2025-07-10",
      logo: "/images/UI-UX.jpg",
      link: "https://www.interaction-design.org/literature/topics/ui-design",
    },
    {
      id: 5,
      title: "Cybersecurity",
      description:
        "Understand network security, ethical hacking, and data protection fundamentals.",
      type: "Security",
      courses: 15,
      created: "2025-06-01",
      logo: "/images/Security.jpg",
      link: "https://en.wikipedia.org/wiki/Computer_security",
    },
    {
      id: 6,
      title: "Cloud Computing",
      description:
        "Explore AWS, Azure, and Google Cloud to deploy and scale cloud applications.",
      type: "Infrastructure",
      courses: 22,
      created: "2025-05-12",
      logo: "/images/Cloud.jpg",
      link: "https://en.wikipedia.org/wiki/Cloud_computing",
    },
    {
      id: 7,
      title: "Mobile App Development",
      description:
        "Build apps for Android and iOS using React Native and Flutter.",
      type: "Development",
      courses: 19,
      created: "2025-04-22",
      logo: "/images/Mobile.jpg",
      link: "https://reactnative.dev/",
    },
    {
      id: 8,
      title: "Digital Marketing",
      description:
        "Master SEO, social media, and branding to promote digital products effectively.",
      type: "Marketing",
      courses: 17,
      created: "2025-03-15",
      logo: "/images/digital-marketing.jpg",
      link: "https://en.wikipedia.org/wiki/Digital_marketing",
    },
  ];

  return (
    <div className={`media-container ${visible ? "fade-in" : ""}`}>
      <h2 className="media-title">📂 Categories</h2>
      <p className="media-subtitle">
        Browse through our wide range of learning categories and start exploring.
      </p>

      <div className="media-grid">
        {categoryItems.map((item, index) => (
          <div
            key={item.id}
            className="media-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={item.logo}  // 🔥 FIXED HERE
              alt={item.title}
              className="media-thumbnail"
            />
            <div className="media-info">
              <h3 className="media-name">{item.title}</h3>
              <p className="media-desc">{item.description}</p>
              <div className="media-meta">
                <span>📘 {item.type}</span>
                <span>📚 {item.courses} Courses</span>
              </div>
              <p className="media-date">Created: {item.created}</p>

              <button
                className="media-btn"
                onClick={() => setSelectedCategory(item)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div
          className="media-modal-overlay"
          onClick={() => setSelectedCategory(null)}
        >
          <div className="media-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedCategory.logo}  // 🔥 FIXED HERE
              alt={selectedCategory.title}
              className="modal-thumbnail"
            />
            <h2>{selectedCategory.title}</h2>
            <p>{selectedCategory.description}</p>
            <div className="modal-details">
              <p>
                <strong>Type:</strong> {selectedCategory.type}
              </p>
              <p>
                <strong>Courses:</strong> {selectedCategory.courses}
              </p>
              <p>
                <strong>Created:</strong> {selectedCategory.created}
              </p>
            </div>

            <a
              href={selectedCategory.link}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              🔗 Explore Category
            </a>

            <button
              className="close-btn"
              onClick={() => setSelectedCategory(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect } from "react";
import "./Home.css";

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

export default function Home() {
  // 👇 Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".hidden");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderCards = (items) =>
    items.map((item) => (
      <div key={item.id} className="card hidden">
        <img src={item.logo} alt={item.name} className="card-img" />
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
    ));

  return (
    <div className="home-container">
      <main>
        {/* Welcome Section */}
        <section id="home" className="box-section hidden">
          <h2>
            Welcome to <span>Knowledge Nexus</span>
          </h2>
          <img
            src="/images/Home.png"
            alt="Knowledge Nexus Welcome"
            className="welcome-img"
          />
          <p>
            In Today’s Knowledge-Driven World, The Way We Access and Absorb
            Information Has Transformed Dramatically...
          </p>
          <p>
            Knowledge Nexus aims to provide an extensive repository of knowledge...
          </p>
        </section>

        {/* Formats Section */}
        <section id="formats" className="box-section hidden">
          <h3>Available Formats</h3>
          <div className="card-grid">{renderCards(formats)}</div>
        </section>

        {/* Subjects Section */}
        <section id="subjects" className="box-section hidden">
          <h3>Subjects</h3>
          <div className="card-grid">{renderCards(subjects)}</div>
        </section>
      </main>
    </div>
  );
}

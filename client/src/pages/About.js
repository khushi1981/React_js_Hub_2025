import React from "react";
import { useInView } from "react-intersection-observer";
import "./About.css";

function About() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="about-page">
      {/* ---------- Header ---------- */}
      <section className="about-header">
        <h1 className="about-title">
          <span className="highlight">Resource Hub</span> & Knowledge Nexus
        </h1>
        <p className="about-subtitle">
          Empowering minds through organized knowledge and seamless discovery.
        </p>
      </section>

      {/* ---------- Resource Hub ---------- */}
      <section
        ref={ref1}
        className={`about-section ${inView1 ? "animate" : ""}`}
      >
        <div className="about-image parallax">
          <img
            src={`${process.env.PUBLIC_URL}/images/resource-hub.png`}
            alt="Resource Hub"
            className="about-image-content"
          />
        </div>
        <div className="about-content">
          <h2>🌐 What is Resource Hub?</h2>
          <p>
            <b>Resource Hub</b> is your intelligent learning companion — a
            digital library where knowledge meets simplicity. It brings together
            <b> students, professionals, and educators</b> on a single platform
            that fuels curiosity and creativity.
          </p>
          <ul>
            <li>🎓 Explore learning materials, tutorials, and visual content.</li>
            <li>💡 Personalized recommendations based on your interest areas.</li>
            <li>📚 Categorized by subject, format, and learning level.</li>
            <li>⚡ Fast, responsive, and accessible — from any device.</li>
          </ul>
        </div>
      </section>

      {/* ---------- Knowledge Nexus ---------- */}
      <section
        ref={ref2}
        className={`about-section reverse ${inView2 ? "animate" : ""}`}
      >
        <div className="about-image parallax">
          <img
            src={`${process.env.PUBLIC_URL}/images/knowledge-nexus.png`}
            alt="Knowledge Nexus"
            className="about-image-content"
          />
        </div>
        <div className="about-content">
          <h2>🔗 What is Knowledge Nexus?</h2>
          <p>
            <b>Knowledge Nexus</b> represents the collaborative heart of this
            ecosystem — connecting passionate learners and creators globally.
            It’s not just about learning resources — it’s about building a
            <b> community that shares, collaborates, and innovates together.</b>
          </p>
          <ul>
            <li>🤝 Join discussion circles and knowledge-sharing groups.</li>
            <li>🧠 Get inspired by expert-curated insights and live sessions.</li>
            <li>🌱 Grow through mentorship and real-world challenges.</li>
            <li>🚀 Be part of an evolving space where ideas turn into innovation.</li>
          </ul>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <section className="about-footer">
        <p className="about-quote">
          “Together, <b>Resource Hub</b> and <b>Knowledge Nexus</b> redefine how
          we learn, connect, and innovate.”
        </p>
        <p className="about-tagline">Discover. Learn. Share. Grow. 🌿</p>
      </section>
    </div>
  );
}

export default About;

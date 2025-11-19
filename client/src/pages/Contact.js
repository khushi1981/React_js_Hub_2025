import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          Have a question, suggestion, or collaboration idea? We’d love to hear
          from you! Reach out to the <span>Knowledge Nexus</span> team below.
        </p>

        <div className="contact-info">
          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <h4>Email Us</h4>
            <p>support@knowledgenexus.com</p>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon" />
            <h4>Call Us</h4>
            <p>+91 87805 37330</p>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h4>Visit Us</h4>
            <p>Knowledge Nexus HQ, Valsad, India</p>
          </div>
        </div>

        {/* SAME UI — only added values + onChange + onSubmit */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message
          </button>

          {status && <p className="status-text">{status}</p>}
        </form>
      </div>
    </div>
  );
}

import React from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        {/* Header Section */}
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          Have a question, suggestion, or collaboration idea? We’d love to hear
          from you! Reach out to the <span>Knowledge Nexus</span> team below.
        </p>

        {/* Contact Info Cards */}
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

        {/* Contact Form */}
        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}


import React from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const goToLogin = () => (window.location.href = "/login");
  const goToRegister = () => (window.location.href = "/register");

  return (
    <div className="auth-home-container">
      {/* ---------- Auth Box ---------- */}
      <div className="auth-box-section" id="home">
        {/* Welcome Title */}
        <h2>
          Welcome to <span>Knowledge Nexus</span>
        </h2>

        {/* Welcome Image */}
        <img
          src="/images/Welcome.png"
          alt="Knowledge Nexus Welcome"
          className="auth-welcome-img"
        />

        {/* Buttons */}
        <div className="auth-button-container">
          <button className="auth-btn login-btn" onClick={goToLogin}>
            Login
          </button>
          <button className="auth-btn register-btn" onClick={goToRegister}>
            Register
          </button>
        </div>
        <p class="motivational-text">
            Unlock your potential — Learn, grow, and connect with a world of knowledge at your fingertips.
        </p>
      </div>
    </div>
  );
}

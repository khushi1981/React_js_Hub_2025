// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

// Global Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

// Global CSS
import "./App.css";

function App() {
  return (
    <Router>
      {/* ---------- Global Header ---------- */}
      <Header />

      

      {/* ---------- Main App Content ---------- */}
      <main className="admin-app">
        <Routes>
          {/* Default Route → Admin Login */}
          <Route path="/" element={<AdminLogin />} />

          {/* Protected/Admin Route → Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* ---------- Global Footer ---------- */}
      <Footer />
    </Router>
  );
}

export default App;

// App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import DashboardHeader from "./Components/DashboardHeader";
import DashboardFooter from "./Components/DashboardFooter";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import Explore from "./pages/Explore";
import Subjects from "./pages/Subjects";
import SubjectPage from "./pages/SubjectPage";

function App() {
  const location = useLocation();

  // Detect dashboard routes
  const isDashboardPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/userdashboard") ||
    location.pathname.startsWith("/userprofile");

  return (
    <>
      {/* ---------- Conditional Header ---------- */}
      {isDashboardPage ? <DashboardHeader /> : <Header />}

      {/* ---------- Main Content ---------- */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authpage" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />

          {/* Other Pages */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<SubjectPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* ---------- Conditional Footer ---------- */}
      {isDashboardPage ? <DashboardFooter /> : <Footer />}
    </>
  );
}

export default App;

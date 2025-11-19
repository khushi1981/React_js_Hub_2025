import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Subject from "./pages/Subject";
import UserInfo from "./pages/UserInfo";
import Plans from "./pages/Plans";
import UserSubscriptions from "./pages/UserSubscriptions";


// Components
import SidebarLayout from "./Components/SidebarLayout";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN PAGE → Only this page shows Header + Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <AdminLogin />
              <Footer />
            </>
          }
        />

        {/* DASHBOARD + OTHER PAGES → Sidebar only */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/Subject" element={<Subject/>} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/subscriptions" element={<UserSubscriptions />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

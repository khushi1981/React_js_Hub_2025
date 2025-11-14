import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Media from "./pages/Media";
import NewAdmin from "./pages/NewAdmin";
import AdminInfo from "./pages/AdminInfo";
import UserInfo from "./pages/UserInfo";
import Plans from "./pages/Plans";
import UserSubscriptions from "./pages/UserSubscriptions";
import Reports from "./pages/Reports";

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
          <Route path="/media" element={<Media />} />
          <Route path="/new-admin" element={<NewAdmin />} />
          <Route path="/admin-info" element={<AdminInfo />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/subscriptions" element={<UserSubscriptions />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

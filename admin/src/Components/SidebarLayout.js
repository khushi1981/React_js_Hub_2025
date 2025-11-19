import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCompass,
  FaPhotoVideo,
  FaUsers,
  FaTags,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const SidebarLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear authentication/session data
    localStorage.removeItem("authToken"); // Example: remove token
    // Redirect to admin login (home page)
    navigate("/"); // "/" is your AdminLogin page
  };

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Explore", path: "/explore", icon: <FaCompass /> },
    { label: "Subject", path: "/Subject", icon: <FaPhotoVideo /> },
    { label: "User Information", path: "/user-info", icon: <FaUsers /> },
    { label: "Subscription Plans", path: "/plans", icon: <FaTags /> },
    { label: "User Subscription Details", path: "/subscriptions", icon: <FaListAlt /> },
    {
      label: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt  />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="layout-container">
      <aside className="SidebarLayout">

        <div className="profile-section">
          <img
            src="/Profile.jpg"
            className="profile-img"
            alt="profile"
          />
          <h3 className="profile-name">Khushi Patel</h3>
        </div>

        <ul className="menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={pathname === item.path ? "active" : ""}
            >
              {item.onClick ? (
                <button
                  className="menu-link logout-button"
                  onClick={item.onClick}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {item.label}
                </button>
              ) : (
                <Link to={item.path} className="menu-link">
                  <span className="menu-icon">{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;

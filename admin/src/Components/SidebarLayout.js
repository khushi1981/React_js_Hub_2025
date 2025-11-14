import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCompass,
  FaPhotoVideo,
  FaUserPlus,
  FaUserShield,
  FaUsers,
  FaTags,
  FaListAlt,
  FaChartBar
} from "react-icons/fa";
import "./Sidebar.css";

const SidebarLayout = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Explore", path: "/explore", icon: <FaCompass /> },
    { label: "Media", path: "/media", icon: <FaPhotoVideo /> },
    { label: "New Admin", path: "/new-admin", icon: <FaUserPlus /> },
    { label: "Admin Information", path: "/admin-info", icon: <FaUserShield /> },
    { label: "User Information", path: "/user-info", icon: <FaUsers /> },
    { label: "Subscription Plans", path: "/plans", icon: <FaTags /> },
    { label: "User Subscription Details", path: "/subscriptions", icon: <FaListAlt /> },
    { label: "Reports", path: "/reports", icon: <FaChartBar /> },
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
              <Link to={item.path}>
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </Link>
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

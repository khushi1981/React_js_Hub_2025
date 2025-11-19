import React from "react";
import "./Dashboard.css";
import {
  FaFileAlt,
  FaBook,
  FaVideo,
  FaUserShield,
  FaUsers,
  FaTags
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="content">

      <div className="cards-grid">

        <div className="card green">
          <FaFileAlt className="icon" />
          <h2>Format Count</h2>
          <h1>4</h1>
          <p>Total number of content formats available.</p>
        </div>

        <div className="card blue">
          <FaBook className="icon" />
          <h2>Subject Count</h2>
          <h1>7</h1>
          <p>Total subjects offered.</p>
        </div>

        <div className="card orange">
          <FaVideo className="icon" />
          <h2>Media Count</h2>
          <h1>10</h1>
          <p>Total media files available.</p>
        </div>

        <div className="card red">
          <FaUsers className="icon" />
          <h2>Users</h2>
          <h1>22</h1>
          <p>Total registered users.</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

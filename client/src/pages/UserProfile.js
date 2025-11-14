import React, { useState, useEffect, useCallback } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Load userId automatically from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // ✅ Fetch user data from backend
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId, fetchUser]);

  // Don’t show “Loading...” — just blank until data loads
  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="user-card">
        <div className="profile-container">
          {user.pic ? (
            <img src={user.pic} alt="Profile" className="profilepic" />
          ) : (
            <div className="placeholder-pic">No Image</div>
          )}
        </div>

        <h2>{user.name || "N/A"}</h2>
        <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>User ID:</strong> {user.userId || "N/A"}</p>
        <p><strong>Password:</strong> *******</p>
        <p><strong>Security Question:</strong> {user.securityQuestion || "N/A"}</p>
        <p><strong>Security Answer:</strong> {user.securityAnswer || "N/A"}</p>
        <p><strong>Date of Joining:</strong> {user.dateOfJoining || "N/A"}</p>
      </div>
    </div>
  );
}

export default UserProfile;

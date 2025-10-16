import React, { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  // Fetch user data from Node.js backend
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('Error fetching user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("New passwords don't match");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setModalOpen(false);
        setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        fetchUser(); // Refresh user data
      }
    } catch (err) {
      console.error(err);
      setMessage('Error changing password');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className="dash">
      <div className="dashboard">
        <div className="user-card">
          <div className="profile-container">
            {user.pic ? (
              <img src={user.pic} alt="Profile" className="profilepic" />
            ) : (
              <div className="placeholder-pic">No Image</div>
            )}
          </div>

          <h2>{user.name || 'N/A'}</h2>

          {/* Ordered fields */}
          <p><strong>Date of Birth:</strong> {user.dob || 'N/A'}</p>
          <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>User ID:</strong> {user._id || 'N/A'}</p>
          <p><strong>Password:</strong> *******</p>
          <p><strong>City:</strong> {user.city || 'N/A'}</p>
          <p><strong>Contact Number:</strong> {user.contact || 'N/A'}</p>

          <button onClick={() => { setModalOpen(true); setMessage(''); }}>
            Change Password
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h3>Change Password</h3>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                required
                value={formData.currentPassword}
                onChange={handleChange}
              /><br /><br />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                required
                value={formData.newPassword}
                onChange={handleChange}
              /><br /><br />
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                required
                value={formData.confirmNewPassword}
                onChange={handleChange}
              /><br /><br />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

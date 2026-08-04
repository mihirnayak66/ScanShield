import React from "react";

function UserDashboard({ profile, logout }) {
  return (
    <div className="container">
      <div className="card">

        <h1>👤 User Dashboard</h1>

        <h3>Welcome, {profile.username}</h3>

        <hr />

        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>

        <button
          className="logout-btn"
          style={{marginTop:"20px"}}
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default UserDashboard;
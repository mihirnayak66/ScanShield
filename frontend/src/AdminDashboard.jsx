import React from "react";

function AdminDashboard({ profile, logout }) {
  return (
    <div className="container">
      <div className="card">
        <h1>🛡️ Admin Dashboard</h1>

        <h3>Welcome Admin, {profile.username}</h3>

        <hr />

        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>

        <br />

        <button
          className="main-btn"
          onClick={() => alert("Manage Users")}
        >
          Manage Users
        </button>

        <button
          className="main-btn"
          style={{marginTop:"10px"}}
          onClick={() => alert("View Reports")}
        >
          Reports
        </button>

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

export default AdminDashboard;
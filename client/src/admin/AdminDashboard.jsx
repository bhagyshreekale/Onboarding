import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';

const AdminDashboard = () => {
  const [showUsers, setShowUsers] = useState(true);
  const navigate = useNavigate(); // for navigation

  const handleLogout = () => {
    // Optional: Clear auth data here if needed
    navigate('/'); // Redirect to home
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-danger">Welcome, Admin</h2>
          <p className="text-muted mb-0">Here's a quick overview of your system data</p>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Total Registered Clients</h4>
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowUsers(!showUsers)}>
          {showUsers ? 'Hide List' : 'Show List'}
        </button>
      </div>

      {showUsers && <UserList />}
    </div>
  );
};

export default AdminDashboard;

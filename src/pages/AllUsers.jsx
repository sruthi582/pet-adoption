import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminProfile.css'; // You can reuse styles or create a new CSS file

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Replace with your backend API route
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-profile-container">
      <h1 className="admin-title">All Registered Users</h1>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="user-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Pets Donated:</strong> {user.petCount || 0}</p>
          </div>
        ))
      ) : !loading && (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AllUsers;

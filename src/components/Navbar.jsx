import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import pawPrint from "../assets/paw-print.png"; // Adjust the path if needed

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src={pawPrint} alt="Paw Print" className="paw-icon" />
            <span className="logo-text">PetFinder</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/pets" className="navbar-link">Find Pets</Link>
          <Link to="/shelters" className="navbar-link">Shelters</Link>

          {/* If not logged in */}
          {!user && !isAdmin && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/admin-login" className="navbar-link">Admin</Link>
            </>
          )}

          {/* If admin is logged in */}
          {isAdmin && (
            <>
              <Link to="/admin-profile" className="navbar-link">Admin Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}

          {/* If normal user is logged in */}
          {user && !isAdmin && (
            <>
              <Link to="/donate-pet" className="navbar-link">Donate a Pet</Link>
              <Link to="/user-profile" className="navbar-link">User Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

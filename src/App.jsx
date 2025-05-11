import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Pets from './pages/Pets';
import Shelters from './pages/Shelters';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import UserProfile from './pages/UserProfile';
import DonatePet from './pages/DonatePet';
import AdminProfile from './pages/AdminProfile';
import AllUsers from './pages/AllUsers'; // ✅ Imported here

import Navbar from './components/Navbar';
import { UserContextProvider } from './context/UserContext.jsx';

// 🔐 Admin Route Guard
const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

// 🔐 User Route Guard
const ProtectedUserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && localStorage.getItem('isAdmin') !== 'true' ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    // Optional: You could clear localStorage here or check token expiry
  }, []);

  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 🔐 Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedAdminRoute>
                <AdminProfile />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedAdminRoute>
                <AllUsers />
              </ProtectedAdminRoute>
            }
          />

          {/* 🔐 Protected User Routes */}
          <Route
            path="/user-profile"
            element={
              <ProtectedUserRoute>
                <UserProfile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/donate-pet"
            element={
              <ProtectedUserRoute>
                <DonatePet />
              </ProtectedUserRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

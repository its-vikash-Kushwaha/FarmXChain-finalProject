import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthService from './services/AuthService';
import AuthGuard from './utils/AuthGuard';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmerProfile from './pages/FarmerProfile';
import UserManagement from './pages/UserManagement';
import FarmerVerification from './pages/FarmerVerification';
import AdminDashboard from './pages/AdminDashboard';
import FarmerList from './pages/FarmerList';
import Statistics from './pages/Statistics';
import Logo from './components/Logo';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setCurrentUser(AuthService.getCurrentUser());
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for auth changes within the same tab
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && (
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Logo className="h-8 w-auto" />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {currentUser?.role !== 'ADMIN' && (
                      <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Dashboard
                      </Link>
                    )}
                    {currentUser?.role === 'FARMER' && (
                      <Link to="/farmer-profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        My Profile
                      </Link>
                    )}
                    {currentUser?.role === 'ADMIN' && (
                      <>
                        <Link to="/admin-dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Admin Dashboard
                        </Link>
                        <Link to="/user-management" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          User Management
                        </Link>
                        <Link to="/farmer-verification" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Farmer Verification
                        </Link>
                        <Link to="/statistics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Statistics
                        </Link>
                      </>
                    )}
                    {(currentUser?.role === 'DISTRIBUTOR' || currentUser?.role === 'RETAILER' || currentUser?.role === 'CONSUMER') && (
                      <Link to="/farmer-list" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Farmers
                      </Link>
                    )}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <span className="text-sm text-gray-700 mr-4">
                    Welcome, {currentUser?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/farmer-profile" element={
            <AuthGuard requiredRole="FARMER">
              <FarmerProfile />
            </AuthGuard>
          } />
          <Route path="/admin-dashboard" element={
            <AuthGuard requiredRole="ADMIN">
              <AdminDashboard />
            </AuthGuard>
          } />
          <Route path="/user-management" element={
            <AuthGuard requiredRole="ADMIN">
              <UserManagement />
            </AuthGuard>
          } />
          <Route path="/farmer-verification" element={
            <AuthGuard requiredRole="ADMIN">
              <FarmerVerification />
            </AuthGuard>
          } />
          <Route path="/statistics" element={
            <AuthGuard requiredRole="ADMIN">
              <Statistics />
            </AuthGuard>
          } />
          <Route path="/farmer-list" element={
            <AuthGuard>
              <FarmerList />
            </AuthGuard>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

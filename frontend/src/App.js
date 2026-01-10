import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

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
                    <a href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Dashboard
                    </a>
                    {currentUser?.role === 'FARMER' && (
                      <a href="/farmer-profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        My Profile
                      </a>
                    )}
                    {currentUser?.role === 'ADMIN' && (
                      <>
                        <a href="/admin-dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Admin Dashboard
                        </a>
                        <a href="/user-management" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          User Management
                        </a>
                        <a href="/farmer-verification" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Farmer Verification
                        </a>
                        <a href="/statistics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                          Statistics
                        </a>
                      </>
                    )}
                    {(currentUser?.role === 'DISTRIBUTOR' || currentUser?.role === 'RETAILER' || currentUser?.role === 'CONSUMER') && (
                      <a href="/farmer-list" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Farmers
                      </a>
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

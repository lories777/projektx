import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/auth/LoginPage';
import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </BaseLayout>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </BaseLayout>
    );
  }

  return isAuthenticated && user?.role === 'admin' ? 
    <>{children}</> : 
    <Navigate to="/" />;
};

function App() {
  const { initialize, isLoading } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout><LandingPage /></BaseLayout>} />
        <Route path="/login" element={<BaseLayout><LoginPage /></BaseLayout>} />
        
        {/* Protected Routes */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <BaseLayout><ChatPage /></BaseLayout>
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminRoute>
            <BaseLayout><AdminPanel /></BaseLayout>
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

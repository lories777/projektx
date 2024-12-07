import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home', public: true },
    { path: '/chat', label: 'AI Chat', public: false },
    { path: '/admin', label: 'Admin Panel', admin: true },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
              PROJEKT X
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.admin && (!isAuthenticated || user?.role !== 'admin')) return null;
              if (!item.public && !isAuthenticated) return null;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 text-sm transition-colors ${
                    isActive(item.path) ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-pink" />
                  )}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <Button variant="glass" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            ) : (
              <Button variant="glass" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => {
              if (item.admin && (!isAuthenticated || user?.role !== 'admin')) return null;
              if (!item.public && !isAuthenticated) return null;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base transition-colors ${
                    isActive(item.path)
                      ? 'bg-accent-purple/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <Button
                variant="glass"
                size="sm"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="glass"
                size="sm"
                className="w-full"
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

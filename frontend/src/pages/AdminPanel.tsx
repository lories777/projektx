import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import Settings from '../components/admin/Settings';

const AdminPanel: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', exact: true },
    { path: '/admin/users', label: 'Users' },
    { path: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-4">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent-purple/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Content */}
      <div className="relative">
        <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-3xl opacity-30" />
        
        <div className="relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

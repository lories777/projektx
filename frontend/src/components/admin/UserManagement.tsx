import React, { useState } from 'react';
import Button from '../common/Button';

// Mock data
const mockUsers = [
  { id: '1', email: 'user', role: 'user', lastActive: '2024-01-20', status: 'active', apiCalls: 150, conversations: 12, storageUsed: '1.2GB' },
  { id: '2', email: 'admin', role: 'admin', lastActive: '2024-01-20', status: 'active', apiCalls: 300, conversations: 25, storageUsed: '2.5GB' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: '',
  });
  const [newUser, setNewUser] = useState({ email: '', role: 'user', password: '' });

  const handleAddUser = () => {
    const user = {
      id: (users.length + 1).toString(),
      email: newUser.email,
      role: newUser.role,
      lastActive: new Date().toISOString().split('T')[0],
      status: 'active',
      apiCalls: 0,
      conversations: 0,
      storageUsed: '0GB',
    };
    setUsers([...users, user]);
    setShowAddUser(false);
    setNewUser({ email: '', role: 'user', password: '' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => {
    if (filters.role !== 'all' && user.role !== filters.role) return false;
    if (filters.status !== 'all' && user.status !== filters.status) return false;
    if (filters.search && !user.email.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex space-x-4">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm"
          >
            Filters
          </Button>
          <Button variant="primary" onClick={() => setShowAddUser(true)}>
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search users..."
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Active</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">API Calls</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Conversations</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Storage</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 text-white">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-accent-purple/20 text-accent-purple' : 'bg-accent-blue/20 text-accent-blue'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.apiCalls}</td>
                  <td className="px-6 py-4 text-gray-400">{user.conversations}</td>
                  <td className="px-6 py-4 text-gray-400">{user.storageUsed}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="secondary"
                      className="text-sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 rounded-xl border border-white/5 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="secondary" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

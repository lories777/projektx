import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      navigate('/chat');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        {/* Background Effects */}
        <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-3xl opacity-30" />
        
        {/* Card */}
        <div className="relative bg-dark-800/50 backdrop-blur-xl rounded-xl border border-white/5 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
              Sign In
            </h2>
            <p className="text-gray-400 mt-2">
              Access your PROJEKT X account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
                placeholder="Enter your username"
                required
                autoComplete="username"
                name="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                name="password"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Use <span className="font-mono">admin:admin</span> for admin access<br/>
            or <span className="font-mono">user:user</span> for user access
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

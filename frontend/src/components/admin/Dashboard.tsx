import React from 'react';
import Button from '../common/Button';

// Mock data
const mockApiStats = {
  hourly: [
    { timestamp: '10:00', calls: 50, errors: 2, latency: 250 },
    { timestamp: '11:00', calls: 75, errors: 1, latency: 220 },
    { timestamp: '12:00', calls: 100, errors: 3, latency: 280 },
    { timestamp: '13:00', calls: 85, errors: 0, latency: 200 },
    { timestamp: '14:00', calls: 120, errors: 4, latency: 300 },
  ],
};

const mockLogs = [
  { id: '1', type: 'login', user: 'admin', timestamp: '2024-01-20 10:00:00', details: 'Admin login successful', severity: 'info', ip: '192.168.1.1' },
  { id: '2', type: 'chat', user: 'user', timestamp: '2024-01-20 10:05:00', details: 'Chat session started', severity: 'info', ip: '192.168.1.2' },
  { id: '3', type: 'error', user: 'system', timestamp: '2024-01-20 10:10:00', details: 'API rate limit exceeded', severity: 'error', ip: '192.168.1.3' },
  { id: '4', type: 'settings', user: 'admin', timestamp: '2024-01-20 10:15:00', details: 'System settings updated', severity: 'warning', ip: '192.168.1.1' },
];

const mockChatHistory = [
  { id: '1', user: 'user', message: 'Hello', timestamp: '2024-01-20 10:05:00', type: 'user', model: 'gpt-3.5-turbo', tokens: 10, cost: '$0.002' },
  { id: '2', user: 'AI', message: 'Hi! How can I help you?', timestamp: '2024-01-20 10:05:01', type: 'assistant', tokens: 15, cost: '$0.003' },
];

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2', color: 'from-accent-purple/20 to-accent-pink/20', change: '+50%' },
    { label: 'Active Sessions', value: '1', color: 'from-accent-pink/20 to-accent-blue/20', change: '+20%' },
    { label: 'API Calls Today', value: '324', color: 'from-accent-blue/20 to-accent-purple/20', change: '+15%' },
    { label: 'Total Storage', value: '3.7GB', color: 'from-accent-purple/20 to-accent-blue/20', change: '+25%' },
    { label: 'Avg Response Time', value: '0.8s', color: 'from-accent-blue/20 to-accent-pink/20', change: '-10%' },
    { label: 'Error Rate', value: '0.5%', color: 'from-accent-pink/20 to-accent-purple/20', change: '-5%' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl opacity-50`} />
            <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 className="text-gray-400 mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last week
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Usage Chart */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">API Usage</h3>
          <div className="h-64 bg-dark-700/50 rounded-lg p-4">
            {/* Chart placeholder */}
            <div className="h-full flex items-end space-x-2">
              {mockApiStats.hourly.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-accent-purple/50 rounded-t"
                    style={{ height: `${(stat.calls / 120) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400 mt-2">{stat.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error Rate Chart */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">Error Rate</h3>
          <div className="h-64 bg-dark-700/50 rounded-lg p-4">
            {/* Chart placeholder */}
            <div className="h-full flex items-end space-x-2">
              {mockApiStats.hourly.map((stat, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-red-500/50 rounded-t"
                    style={{ height: `${(stat.errors / 4) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400 mt-2">{stat.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <Button variant="secondary" className="text-sm">View All</Button>
          </div>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  log.severity === 'error' ? 'bg-red-500' :
                  log.severity === 'warning' ? 'bg-yellow-500' :
                  'bg-accent-purple/50'
                }`} />
                <div>
                  <p className="text-white">{log.details}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span>{log.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Chat History</h3>
            <Button variant="secondary" className="text-sm">View All</Button>
          </div>
          <div className="space-y-4">
            {mockChatHistory.map((chat, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  chat.type === 'user' ? 'bg-accent-pink/50' : 'bg-accent-blue/50'
                }`} />
                <div>
                  <p className="text-white">{chat.message}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{chat.user}</span>
                    <span>•</span>
                    <span>{chat.model}</span>
                    <span>•</span>
                    <span>{chat.tokens} tokens</span>
                    <span>•</span>
                    <span>{chat.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

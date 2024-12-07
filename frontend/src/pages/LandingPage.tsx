import React from 'react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="py-20 md:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-3xl opacity-50 animate-glow" />
            <h1 className="relative text-5xl md:text-7xl font-bold text-white mb-4 animate-slide-up">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                PROJEKT X
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A universal AI platform for rapid development of specialized AI applications
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-6 pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" variant="primary" onClick={() => navigate('/chat')}>
              Try AI Chat
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '1,000+', gradient: 'from-accent-purple to-accent-pink' },
            { label: 'AI Conversations', value: '50,000+', gradient: 'from-accent-pink to-accent-blue' },
            { label: 'Processing Power', value: '100 TFLOPS', gradient: 'from-accent-blue to-accent-purple' },
            { label: 'Response Time', value: '<100ms', gradient: 'from-accent-purple to-accent-blue' },
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-xl`} />
              <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Advanced Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built with cutting-edge technology to power your AI applications
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              title: 'AI Chat Interface',
              description: 'Engage with our advanced AI models through an intuitive chat interface with customizable prompts and real-time responses',
              icon: (
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              ),
              delay: '0.3s',
              gradient: 'from-accent-purple/20 to-accent-pink/20'
            },
            {
              title: 'File Processing',
              description: 'Upload and process files with AI-powered analysis, OCR capabilities, and intelligent data extraction',
              icon: (
                <svg className="w-6 h-6 text-accent-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              ),
              delay: '0.4s',
              gradient: 'from-accent-pink/20 to-accent-blue/20'
            },
            {
              title: 'Real-time Updates',
              description: 'Get instant responses and live updates with WebSocket integration and streaming responses',
              icon: (
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              delay: '0.5s',
              gradient: 'from-accent-blue/20 to-accent-purple/20'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group relative animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl" />
              <div className="absolute inset-[1px] bg-dark-800/90 rounded-xl backdrop-blur-xl" />
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
              <div className="relative p-8">
                <div className="w-12 h-12 bg-dark-700/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-accent-pink transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Cutting-edge Technology
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built with the latest and most powerful technologies
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'React', description: 'Frontend Framework' },
            { name: 'TypeScript', description: 'Type Safety' },
            { name: 'Node.js', description: 'Backend Runtime' },
            { name: 'OpenAI', description: 'AI Integration' },
            { name: 'TailwindCSS', description: 'Styling' },
            { name: 'WebSocket', description: 'Real-time Updates' },
            { name: 'JWT', description: 'Authentication' },
            { name: 'REST API', description: 'Communication' },
          ].map((tech, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 md:py-32 text-center">
        <div className="relative">
          <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-3xl opacity-30" />
          <h2 className="relative text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join us in building the next generation of AI-powered applications. Experience the future of AI development today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="primary" onClick={() => navigate('/login')}>
              Start Building Now
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/chat')}>
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

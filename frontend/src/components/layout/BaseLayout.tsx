import React from 'react';
import Navigation from './Navigation';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise" />
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float bg-gradient-to-r from-accent-purple to-accent-pink"
        style={{ animationDuration: '15s' }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float bg-gradient-to-r from-accent-pink to-accent-blue"
        style={{ animationDuration: '25s', animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-float bg-gradient-to-r from-accent-blue to-accent-purple"
        style={{ animationDuration: '20s', animationDelay: '4s' }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 pt-20">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="mt-32 relative">
          {/* Footer Gradient Line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />
          
          <div className="relative bg-dark-800/50 backdrop-blur-sm border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-dark-900/80" />
            <div className="container mx-auto px-4 py-8 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">
                    PROJEKT X
                  </h3>
                  <p className="text-gray-400">
                    A universal AI platform for rapid development of specialized AI applications
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">Documentation</a></li>
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">API Reference</a></li>
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">Examples</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">GitHub</a></li>
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors hover-underline">Discord</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-400">
                <p>© {new Date().getFullYear()} PROJEKT X - Powered by OpenAI</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BaseLayout;

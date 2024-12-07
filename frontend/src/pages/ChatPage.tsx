import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/common/Button';
import { chatService } from '../services/chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Only scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100); // Small delay to ensure content is rendered
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(userMessage.content, customPrompt);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 blur-3xl opacity-30" />
        
        <div className="relative bg-dark-800/50 backdrop-blur-xl rounded-xl border border-white/5 h-[70vh] flex flex-col">
          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Start a conversation with the AI assistant.</p>
                <p className="text-sm mt-2">Ask anything! The AI will respond naturally.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-accent-purple/20 text-white'
                        : 'bg-dark-700/50 text-gray-300'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-700/50 rounded-lg px-4 py-2 text-gray-300">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-white/5">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="secondary"
                onClick={() => setShowPromptModal(true)}
                className="text-sm px-4 py-2 bg-accent-purple/20 hover:bg-accent-purple/30"
              >
                {customPrompt ? 'Custom Prompt Active' : 'Set Custom Prompt'}
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading || !input.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Prompt Customization Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-dark-800 rounded-xl border border-white/5 p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Customize AI Prompt</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom prompt here... (Leave empty for default conversation)"
              className="w-full h-32 bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 mb-4 resize-none"
            />
            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setCustomPrompt('');
                  setShowPromptModal(false);
                }}
              >
                Reset to Default
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowPromptModal(false)}
              >
                Save Prompt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

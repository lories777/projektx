import { config } from '../config';
import { authService } from './auth';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const chatService = {
  sendMessage: async (message: string, customPrompt?: string): Promise<Message> => {
    const response = await fetch(`${config.apiUrl}/chat`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({ 
        message,
        customPrompt 
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Please sign in to continue');
      }
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return {
      ...data,
      timestamp: new Date(data.timestamp),
    };
  },

  // In a real app, this would fetch chat history from the backend
  getChatHistory: async (): Promise<Message[]> => {
    // For now, return empty array as we don't have chat history persistence
    return [];
  },
};

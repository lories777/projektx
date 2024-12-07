import { config } from '../config';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${config.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // In a real app, you would validate the token with your backend
      // For now, we'll decode the mock token
      const [id, email, timestamp] = atob(token).split(':');
      
      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - Number(timestamp);
      if (tokenAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('token');
        return null;
      }

      // Mock user data - in a real app, you would fetch this from the backend
      const users = [
        { id: '1', email: 'test@example.com', role: 'user' as const },
        { id: '2', email: 'admin@example.com', role: 'admin' as const },
      ];

      const user = users.find(u => u.id === id && u.email === email);
      return user || null;
    } catch {
      localStorage.removeItem('token');
      return null;
    }
  },

  getAuthHeaders: (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },
};

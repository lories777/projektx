import { create } from 'zustand';
import { authService } from '../services/auth';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const user = await authService.getCurrentUser();
      set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to initialize authentication'
      });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { user, token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      set({ 
        user, 
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login'
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authService.logout();
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: 'Failed to logout'
      });
      throw error;
    }
  },
}));

import { config } from '../config';
import { authService } from './auth';

export interface SettingsState {
  // AI Settings
  chatModel: string;
  maxTokens: string;
  temperature: string;
  defaultPrompt: string;
  
  // System Settings
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  
  // Security Settings
  sessionTimeout: string;
  maxLoginAttempts: string;
  passwordPolicy: string;
  twoFactorAuth: boolean;
  
  // API Settings
  rateLimit: string;
  maxConcurrentRequests: string;
  timeout: string;
  retryAttempts: string;
  
  // Storage Settings
  maxUploadSize: string;
  allowedFileTypes: string;
  storageQuota: string;
  compressionEnabled: boolean;
  
  // Notification Settings
  emailNotifications: boolean;
  errorAlerts: boolean;
  usageAlerts: boolean;
  updateNotifications: boolean;
}

export const settingsService = {
  getSettings: async (): Promise<SettingsState> => {
    const response = await fetch(`${config.apiUrl}/settings`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    return response.json();
  },

  updateSettings: async (settings: SettingsState): Promise<SettingsState> => {
    const response = await fetch(`${config.apiUrl}/settings`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error('Failed to update settings');
    }

    return response.json();
  },
};

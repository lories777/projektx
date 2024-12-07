import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { settingsService, SettingsState } from '../../services/settings';

interface NotificationItem {
  key: keyof Pick<SettingsState, 'emailNotifications' | 'errorAlerts' | 'usageAlerts' | 'updateNotifications'>;
  label: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    // AI Settings
    chatModel: 'gpt-3.5-turbo',
    maxTokens: '2048',
    temperature: '0.7',
    defaultPrompt: '',
    
    // System Settings
    theme: 'dark',
    language: 'pl',
    timezone: 'Europe/Warsaw',
    dateFormat: 'DD/MM/YYYY',
    
    // Security Settings
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordPolicy: 'strong',
    twoFactorAuth: false,
    
    // API Settings
    rateLimit: '100',
    maxConcurrentRequests: '10',
    timeout: '30',
    retryAttempts: '3',
    
    // Storage Settings
    maxUploadSize: '10',
    allowedFileTypes: '.pdf,.doc,.txt',
    storageQuota: '5',
    compressionEnabled: true,
    
    // Notification Settings
    emailNotifications: true,
    errorAlerts: true,
    usageAlerts: true,
    updateNotifications: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await settingsService.getSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await settingsService.updateSettings(settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const notificationItems: NotificationItem[] = [
    { key: 'emailNotifications', label: 'Email Notifications' },
    { key: 'errorAlerts', label: 'Error Alerts' },
    { key: 'usageAlerts', label: 'Usage Alerts' },
    { key: 'updateNotifications', label: 'Update Notifications' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-accent-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <div className="flex items-center space-x-4">
          {saveStatus === 'success' && (
            <span className="text-green-500">Settings saved successfully!</span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-500">Failed to save settings</span>
          )}
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">AI Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Chat Model
              </label>
              <select
                value={settings.chatModel}
                onChange={(e) => setSettings({ ...settings, chatModel: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings({ ...settings, maxTokens: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Temperature
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={settings.temperature}
                onChange={(e) => setSettings({ ...settings, temperature: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Prompt
              </label>
              <textarea
                value={settings.defaultPrompt}
                onChange={(e) => setSettings({ ...settings, defaultPrompt: e.target.value })}
                className="w-full h-32 bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white resize-none"
                placeholder="Enter default AI prompt..."
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">System Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="Europe/Warsaw">Europe/Warsaw</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date Format
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password Policy
              </label>
              <select
                value={settings.passwordPolicy}
                onChange={(e) => setSettings({ ...settings, passwordPolicy: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              >
                <option value="weak">Basic</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Two-Factor Authentication
              </label>
              <div
                className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  settings.twoFactorAuth ? 'bg-accent-purple' : 'bg-dark-700'
                } cursor-pointer`}
                onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                    settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                  }`}
                  style={{ marginTop: '4px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">API Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rate Limit (requests/minute)
              </label>
              <input
                type="number"
                value={settings.rateLimit}
                onChange={(e) => setSettings({ ...settings, rateLimit: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Concurrent Requests
              </label>
              <input
                type="number"
                value={settings.maxConcurrentRequests}
                onChange={(e) => setSettings({ ...settings, maxConcurrentRequests: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timeout (seconds)
              </label>
              <input
                type="number"
                value={settings.timeout}
                onChange={(e) => setSettings({ ...settings, timeout: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Retry Attempts
              </label>
              <input
                type="number"
                value={settings.retryAttempts}
                onChange={(e) => setSettings({ ...settings, retryAttempts: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">Storage Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Upload Size (MB)
              </label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Allowed File Types
              </label>
              <input
                type="text"
                value={settings.allowedFileTypes}
                onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Storage Quota (GB)
              </label>
              <input
                type="number"
                value={settings.storageQuota}
                onChange={(e) => setSettings({ ...settings, storageQuota: e.target.value })}
                className="w-full bg-dark-700/50 border border-white/5 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Enable Compression
              </label>
              <div
                className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  settings.compressionEnabled ? 'bg-accent-purple' : 'bg-dark-700'
                } cursor-pointer`}
                onClick={() => setSettings({ ...settings, compressionEnabled: !settings.compressionEnabled })}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                    settings.compressionEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                  style={{ marginTop: '4px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  {item.label}
                </label>
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                    settings[item.key] ? 'bg-accent-purple' : 'bg-dark-700'
                  } cursor-pointer`}
                  onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                      settings[item.key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                    style={{ marginTop: '4px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

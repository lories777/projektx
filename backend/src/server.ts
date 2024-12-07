import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Types
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Settings file path
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// Initialize settings storage
const initializeSettings = () => {
  if (!fs.existsSync(SETTINGS_FILE)) {
    const defaultSettings = {
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
    };

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
    return defaultSettings;
  }

  return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
};

let settings = initializeSettings();

// Auth middleware
const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // TODO: Implement proper JWT verification
  // For now, just check if token exists
  next();
};

// Routes
app.post('/api/chat', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message, customPrompt } = req.body;
    console.log('Chat message received:', message);
    console.log('Custom prompt:', customPrompt);

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
    
    // Add custom prompt as system message if provided
    if (customPrompt) {
      messages.push({
        role: 'system',
        content: customPrompt
      });
    }

    // Add user message
    messages.push({
      role: 'user',
      content: message
    });

    const completion = await openai.chat.completions.create({
      messages,
      model: settings.chatModel,
      max_tokens: parseInt(settings.maxTokens),
      temperature: parseFloat(settings.temperature),
    });

    const response = completion.choices[0]?.message?.content || 'No response generated';

    res.json({
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Settings endpoints
app.get('/api/settings', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.post('/api/settings', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newSettings = req.body;
    settings = { ...settings, ...newSettings };
    
    // Save settings to file
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    console.log('Settings updated:', settings);
    
    res.json(settings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Mock auth endpoints
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email });

  // Mock user data - replace with database lookup
  const users = [
    { id: '1', email: 'user', password: 'user', role: 'user' },
    { id: '2', email: 'admin', password: 'admin', role: 'admin' },
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    console.log('Login failed: Invalid credentials');
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Generate a mock token - replace with proper JWT
  const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');
  console.log('Login successful:', { email, role: user.role });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URLs: http://localhost:5173, http://localhost:5174`);
});

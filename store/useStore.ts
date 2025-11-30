import { create } from 'zustand';
import { AssistantMode, Message, MCPServer, APIIntegration, AgenticDesignImprovement } from '@/types';

interface AppState {
  // Voice & Recording
  isRecording: boolean;
  isPlaying: boolean;
  audioLevel: number;

  // Modes
  currentMode: AssistantMode;
  modes: AssistantMode[];

  // Chat
  messages: Message[];

  // Integrations
  mcpServers: MCPServer[];
  apiIntegrations: APIIntegration[];

  // Agentic Design
  improvements: AgenticDesignImprovement[];

  // Settings
  geminiApiKey: string;

  // Actions
  setRecording: (recording: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setAudioLevel: (level: number) => void;
  setCurrentMode: (mode: AssistantMode) => void;
  addMode: (mode: AssistantMode) => void;
  updateMode: (id: string, updates: Partial<AssistantMode>) => void;
  deleteMode: (id: string) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  addMCPServer: (server: MCPServer) => void;
  updateMCPServer: (id: string, updates: Partial<MCPServer>) => void;
  addAPIIntegration: (integration: APIIntegration) => void;
  updateAPIIntegration: (id: string, updates: Partial<APIIntegration>) => void;
  addImprovement: (improvement: AgenticDesignImprovement) => void;
  updateImprovement: (id: string, updates: Partial<AgenticDesignImprovement>) => void;
  setGeminiApiKey: (key: string) => void;
}

const defaultModes: AssistantMode[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'General purpose AI assistant',
    icon: '🤖',
    color: '#6366f1',
    systemPrompt: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.',
  },
  {
    id: 'creative',
    name: 'Creative Writer',
    description: 'Creative writing and storytelling',
    icon: '✍️',
    color: '#8b5cf6',
    systemPrompt: 'You are a creative writing assistant. Help with storytelling, poetry, and creative content.',
    features: ['story generation', 'poetry', 'character development'],
  },
  {
    id: 'code',
    name: 'Code Helper',
    description: 'Programming and debugging assistance',
    icon: '💻',
    color: '#3b82f6',
    systemPrompt: 'You are a programming assistant. Help with code, debugging, and technical explanations.',
    features: ['code generation', 'debugging', 'explanations'],
  },
  {
    id: 'learning',
    name: 'Learning Tutor',
    description: 'Educational support and teaching',
    icon: '📚',
    color: '#10b981',
    systemPrompt: 'You are a patient tutor. Explain concepts clearly and help users learn effectively.',
    features: ['explanations', 'examples', 'quizzes'],
  },
  {
    id: 'business',
    name: 'Business Advisor',
    description: 'Business strategy and analysis',
    icon: '💼',
    color: '#f59e0b',
    systemPrompt: 'You are a business consultant. Provide strategic advice and business insights.',
    features: ['strategy', 'analysis', 'planning'],
  },
];

export const useStore = create<AppState>((set) => ({
  // Initial state
  isRecording: false,
  isPlaying: false,
  audioLevel: 0,
  currentMode: defaultModes[0],
  modes: defaultModes,
  messages: [],
  mcpServers: [],
  apiIntegrations: [],
  improvements: [],
  geminiApiKey: '',

  // Actions
  setRecording: (recording) => set({ isRecording: recording }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setAudioLevel: (level) => set({ audioLevel: level }),

  setCurrentMode: (mode) => set({ currentMode: mode }),

  addMode: (mode) => set((state) => ({
    modes: [...state.modes, mode]
  })),

  updateMode: (id, updates) => set((state) => ({
    modes: state.modes.map(m => m.id === id ? { ...m, ...updates } : m),
    currentMode: state.currentMode.id === id ? { ...state.currentMode, ...updates } : state.currentMode,
  })),

  deleteMode: (id) => set((state) => ({
    modes: state.modes.filter(m => m.id !== id),
    currentMode: state.currentMode.id === id ? state.modes[0] : state.currentMode,
  })),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  clearMessages: () => set({ messages: [] }),

  addMCPServer: (server) => set((state) => ({
    mcpServers: [...state.mcpServers, server]
  })),

  updateMCPServer: (id, updates) => set((state) => ({
    mcpServers: state.mcpServers.map(s => s.id === id ? { ...s, ...updates } : s),
  })),

  addAPIIntegration: (integration) => set((state) => ({
    apiIntegrations: [...state.apiIntegrations, integration]
  })),

  updateAPIIntegration: (id, updates) => set((state) => ({
    apiIntegrations: state.apiIntegrations.map(i => i.id === id ? { ...i, ...updates } : i),
  })),

  addImprovement: (improvement) => set((state) => ({
    improvements: [...state.improvements, improvement]
  })),

  updateImprovement: (id, updates) => set((state) => ({
    improvements: state.improvements.map(i => i.id === id ? { ...i, ...updates } : i),
  })),

  setGeminiApiKey: (key) => set({ geminiApiKey: key }),
}));

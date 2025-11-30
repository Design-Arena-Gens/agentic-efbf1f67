export interface AssistantMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
  color: string;
  features?: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  mode?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  endpoint: string;
  enabled: boolean;
  capabilities: string[];
}

export interface APIIntegration {
  id: string;
  name: string;
  type: string;
  apiKey?: string;
  enabled: boolean;
}

export interface AgenticDesignImprovement {
  id: string;
  type: 'mode' | 'feature' | 'integration' | 'ui';
  description: string;
  status: 'pending' | 'approved' | 'implemented';
  timestamp: number;
}

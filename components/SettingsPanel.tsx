'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Server, Sparkles, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  geminiApiKey: string;
  onSaveApiKey: (key: string) => void;
  onRequestImprovements: () => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  geminiApiKey,
  onSaveApiKey,
  onRequestImprovements,
}: SettingsPanelProps) {
  const [apiKey, setApiKey] = useState(geminiApiKey);

  const handleSave = () => {
    onSaveApiKey(apiKey);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-darker border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* API Key Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Gemini API Key</h3>
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSave}
                  className="mt-3 w-full px-4 py-3 bg-primary rounded-xl font-semibold hover:bg-primary/80 transition-colors"
                >
                  Save API Key
                </button>
                <p className="mt-2 text-xs text-gray-400">
                  Get your API key from{' '}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              {/* Agentic Design Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold">Agentic Design</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Let the AI analyze your usage and suggest improvements to modes, features, and integrations.
                </p>
                <button
                  onClick={onRequestImprovements}
                  disabled={!geminiApiKey}
                  className="w-full px-4 py-3 bg-secondary rounded-xl font-semibold hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Request AI Improvements
                </button>
              </div>

              {/* MCP Servers Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold">MCP Servers</h3>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="glass-dark rounded-xl p-4">
                    <p className="text-sm text-gray-400">
                      Add MCP servers to extend assistant capabilities
                    </p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="glass-dark rounded-xl p-4 text-sm">
                <p className="text-gray-400">
                  This is an agentic voice assistant that can self-improve. Configure your settings above to get started.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

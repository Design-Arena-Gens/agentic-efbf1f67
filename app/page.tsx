'use client';

import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { GeminiVoiceClient } from '@/lib/gemini';
import VoiceButton from '@/components/VoiceButton';
import ModeSelector from '@/components/ModeSelector';
import ChatHistory from '@/components/ChatHistory';
import SettingsPanel from '@/components/SettingsPanel';
import ImprovementsPanel from '@/components/ImprovementsPanel';
import { Settings, Lightbulb, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    isRecording,
    audioLevel,
    currentMode,
    modes,
    messages,
    improvements,
    geminiApiKey,
    setRecording,
    setAudioLevel,
    setCurrentMode,
    addMessage,
    clearMessages,
    addImprovement,
    updateImprovement,
    setGeminiApiKey,
    addMode,
  } = useStore();

  const [geminiClient, setGeminiClient] = useState<GeminiVoiceClient | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [improvementsOpen, setImprovementsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (geminiApiKey) {
      setGeminiClient(new GeminiVoiceClient(geminiApiKey));
    }
  }, [geminiApiKey]);

  const handleToggleRecording = useCallback(async () => {
    if (!geminiClient) {
      alert('Please set your Gemini API key in settings first');
      setSettingsOpen(true);
      return;
    }

    if (!isRecording) {
      try {
        setRecording(true);
        await geminiClient.startRecording((level) => {
          setAudioLevel(level);
        });
      } catch (error) {
        console.error('Failed to start recording:', error);
        setRecording(false);
        alert('Failed to start recording. Please check microphone permissions.');
      }
    } else {
      try {
        setRecording(false);
        setIsProcessing(true);

        const audioBlob = await geminiClient.stopRecording();

        // Simulate transcription (add user message)
        const userMessage = {
          id: Date.now().toString(),
          role: 'user' as const,
          content: '🎤 Voice message',
          timestamp: Date.now(),
          mode: currentMode.id,
        };
        addMessage(userMessage);

        // Send to Gemini
        const response = await geminiClient.sendAudioToGemini(
          audioBlob,
          currentMode.systemPrompt
        );

        // Add assistant response
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: response,
          timestamp: Date.now() + 1,
          mode: currentMode.id,
        };
        addMessage(assistantMessage);

        // Text-to-speech response
        await geminiClient.textToSpeech(response);
      } catch (error) {
        console.error('Failed to process audio:', error);
        alert('Failed to process audio. Please check your API key and try again.');
      } finally {
        setIsProcessing(false);
        setAudioLevel(0);
      }
    }
  }, [geminiClient, isRecording, currentMode, setRecording, setAudioLevel, addMessage]);

  const handleSaveApiKey = useCallback(
    (key: string) => {
      setGeminiApiKey(key);
      setSettingsOpen(false);
      alert('API key saved successfully!');
    },
    [setGeminiApiKey]
  );

  const handleRequestImprovements = useCallback(async () => {
    if (!geminiClient) return;

    setSettingsOpen(false);
    setIsProcessing(true);

    try {
      const context = `
Current modes: ${modes.map((m) => m.name).join(', ')}
Message count: ${messages.length}
Current mode usage: ${currentMode.name}
      `;

      const result = await geminiClient.analyzeAndSuggestImprovements(context);

      if (result.improvements && result.improvements.length > 0) {
        result.improvements.forEach((imp: any) => {
          addImprovement({
            id: Date.now().toString() + Math.random(),
            type: imp.type || 'feature',
            description: imp.description,
            status: 'pending',
            timestamp: Date.now(),
          });
        });

        setImprovementsOpen(true);
      } else {
        alert('No improvements suggested at this time.');
      }
    } catch (error) {
      console.error('Failed to get improvements:', error);
      alert('Failed to analyze improvements.');
    } finally {
      setIsProcessing(false);
    }
  }, [geminiClient, modes, messages, currentMode, addImprovement]);

  const handleApproveImprovement = useCallback(
    (id: string) => {
      updateImprovement(id, { status: 'approved' });
    },
    [updateImprovement]
  );

  const handleImplementImprovement = useCallback(
    (id: string) => {
      const improvement = improvements.find((i) => i.id === id);
      if (!improvement) return;

      // Auto-implement based on type
      if (improvement.type === 'mode') {
        // Create a new mode
        const newMode = {
          id: 'mode-' + Date.now(),
          name: 'New AI Mode',
          description: improvement.description,
          icon: '🌟',
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          systemPrompt: improvement.description,
        };
        addMode(newMode);
      }

      updateImprovement(id, { status: 'implemented' });
      alert('Improvement implemented!');
    },
    [improvements, updateImprovement, addMode]
  );

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 glass-dark border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Voice Assistant</h1>
            <p className="text-sm text-gray-400">Powered by Gemini AI</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setImprovementsOpen(true)}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors relative"
              whileTap={{ scale: 0.95 }}
            >
              <Lightbulb className="w-6 h-6" />
              {improvements.filter((i) => i.status === 'pending').length > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-yellow-500 rounded-full" />
              )}
            </motion.button>
            <motion.button
              onClick={() => setSettingsOpen(true)}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex-shrink-0 py-4 border-b border-white/10">
        <ModeSelector
          modes={modes}
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
        />
      </div>

      {/* Chat History */}
      <ChatHistory messages={messages} />

      {/* Voice Control */}
      <div className="flex-shrink-0 glass-dark border-t border-white/10 px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <VoiceButton
            isRecording={isRecording}
            audioLevel={audioLevel}
            onToggleRecording={handleToggleRecording}
          />

          {isProcessing && (
            <motion.div
              className="text-sm text-gray-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Processing...
            </motion.div>
          )}

          {messages.length > 0 && (
            <motion.button
              onClick={clearMessages}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </motion.button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        geminiApiKey={geminiApiKey}
        onSaveApiKey={handleSaveApiKey}
        onRequestImprovements={handleRequestImprovements}
      />

      {/* Improvements Panel */}
      <ImprovementsPanel
        isOpen={improvementsOpen}
        onClose={() => setImprovementsOpen(false)}
        improvements={improvements}
        onApprove={handleApproveImprovement}
        onImplement={handleImplementImprovement}
      />
    </div>
  );
}

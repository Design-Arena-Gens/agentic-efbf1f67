'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types';
import { User, Bot } from 'lucide-react';

interface ChatHistoryProps {
  messages: Message[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'glass-dark text-white'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="text-xs opacity-50 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <Bot className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Start a conversation by tapping the microphone</p>
          </div>
        </div>
      )}
    </div>
  );
}

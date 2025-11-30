'use client';

import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  isRecording: boolean;
  audioLevel: number;
  onToggleRecording: () => void;
}

export default function VoiceButton({ isRecording, audioLevel, onToggleRecording }: VoiceButtonProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Audio level indicator */}
      {isRecording && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-30"
          animate={{
            scale: [1, 1.5 + audioLevel * 0.5, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        />
      )}

      {/* Main button */}
      <motion.button
        onClick={onToggleRecording}
        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all ${
          isRecording
            ? 'bg-red-500 shadow-lg shadow-red-500/50'
            : 'bg-primary shadow-lg shadow-primary/50'
        }`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {isRecording ? (
          <MicOff className="w-10 h-10 text-white" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}
      </motion.button>

      {/* Recording indicator */}
      {isRecording && (
        <motion.div
          className="absolute -bottom-8 text-red-500 text-sm font-semibold"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Recording...
        </motion.div>
      )}
    </div>
  );
}

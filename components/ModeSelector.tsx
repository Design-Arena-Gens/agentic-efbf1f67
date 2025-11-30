'use client';

import { motion } from 'framer-motion';
import { AssistantMode } from '@/types';

interface ModeSelectorProps {
  modes: AssistantMode[];
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
}

export default function ModeSelector({ modes, currentMode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-3 px-4 min-w-min">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => onSelectMode(mode)}
            className={`flex-shrink-0 px-6 py-3 rounded-2xl glass transition-all ${
              currentMode.id === mode.id
                ? 'ring-2 ring-white shadow-lg'
                : 'hover:bg-white/10'
            }`}
            style={{
              background: currentMode.id === mode.id
                ? `linear-gradient(135deg, ${mode.color}88, ${mode.color}44)`
                : undefined,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mode.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-sm whitespace-nowrap">{mode.name}</div>
                <div className="text-xs opacity-70 whitespace-nowrap">{mode.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

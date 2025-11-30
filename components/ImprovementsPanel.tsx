'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, Lightbulb, Plus } from 'lucide-react';
import { AgenticDesignImprovement } from '@/types';

interface ImprovementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  improvements: AgenticDesignImprovement[];
  onApprove: (id: string) => void;
  onImplement: (id: string) => void;
}

export default function ImprovementsPanel({
  isOpen,
  onClose,
  improvements,
  onApprove,
  onImplement,
}: ImprovementsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'mode':
        return '🎭';
      case 'feature':
        return '✨';
      case 'integration':
        return '🔌';
      case 'ui':
        return '🎨';
      default:
        return '💡';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'approved':
        return 'text-blue-500';
      case 'implemented':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 right-0 bottom-0 max-h-[80vh] bg-darker border-t border-white/10 z-50 overflow-y-auto rounded-t-3xl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold">AI Improvements</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Improvements List */}
              <div className="space-y-4">
                {improvements.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No improvements yet</p>
                    <p className="text-sm mt-2">
                      Use the AI to analyze and suggest improvements
                    </p>
                  </div>
                ) : (
                  improvements.map((improvement) => (
                    <motion.div
                      key={improvement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-dark rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{getIcon(improvement.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold capitalize">
                              {improvement.type}
                            </span>
                            <span className={`text-xs ${getStatusColor(improvement.status)}`}>
                              {improvement.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">
                            {improvement.description}
                          </p>
                          <div className="flex gap-2">
                            {improvement.status === 'pending' && (
                              <button
                                onClick={() => onApprove(improvement.id)}
                                className="px-4 py-2 bg-blue-500 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {improvement.status === 'approved' && (
                              <button
                                onClick={() => onImplement(improvement.id)}
                                className="px-4 py-2 bg-green-500 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                              >
                                Implement
                              </button>
                            )}
                            {improvement.status === 'implemented' && (
                              <div className="flex items-center gap-2 text-green-500 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                Implemented
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

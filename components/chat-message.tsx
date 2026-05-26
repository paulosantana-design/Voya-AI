'use client';

import { motion } from 'framer-motion';
import type { ChatMessage } from '@/lib/types';

interface ChatMessageProps {
  message: ChatMessage;
  onSuggestionClick?: (suggestion: string) => void;
}

export function ChatMessageItem({ message, onSuggestionClick }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[85%] ${isAssistant ? 'order-2' : 'order-1'}`}>
        {isAssistant && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="text-sm font-medium text-foreground">Voya</span>
          </div>
        )}
        
        <div
          className={`px-4 py-3 rounded-2xl ${
            isAssistant
              ? 'bg-card border border-border text-foreground'
              : 'bg-primary text-white'
          }`}
        >
          <p className="text-[15px] leading-relaxed">{message.content}</p>
        </div>

        {isAssistant && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="px-3 py-1.5 text-sm bg-muted hover:bg-border text-foreground-secondary hover:text-foreground rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <p className={`text-xs text-foreground-muted mt-2 ${isAssistant ? 'text-left' : 'text-right'}`}>
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

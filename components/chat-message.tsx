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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {isAssistant ? (
        // Assistant message - plain text, no container
        <div className="max-w-[90%]">
          <p className="text-[13px] leading-relaxed text-foreground">
            {message.content}
          </p>

          {message.suggestions && message.suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="px-2.5 py-1 text-[11px] bg-muted hover:bg-border text-foreground-muted hover:text-foreground rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        // User message - with container/bubble
        <div className="max-w-[85%]">
          <div className="px-3 py-2 rounded-2xl bg-foreground text-background">
            <p className="text-[13px] leading-relaxed">{message.content}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

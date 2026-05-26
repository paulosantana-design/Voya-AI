'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  large?: boolean;
}

export function ChatInput({ onSend, placeholder = "Digite sua mensagem...", large = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)' 
            : '0 4px 24px rgba(0, 0, 0, 0.06)',
        }}
        style={{ borderWidth: '0.5px' }}
        className={`flex items-center gap-1.5 bg-card border border-border rounded-full transition-all ${
          large ? 'py-2.5 pl-3.5 pr-2.5' : 'py-2 pl-3 pr-2'
        }`}
      >
        <button
          type="button"
          className="flex items-center justify-center w-7 h-7 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <Paperclip className="w-3.5 h-3.5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted ${
            large ? 'text-sm' : 'text-xs'
          }`}
        />

        <button
          type="button"
          className="flex items-center justify-center w-7 h-7 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <Mic className="w-3.5 h-3.5" />
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`flex items-center justify-center rounded-full bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-30 disabled:cursor-not-allowed ${
            large ? 'w-8 h-8' : 'w-7 h-7'
          }`}
        >
          <Send className={large ? 'w-3.5 h-3.5' : 'w-3 h-3'} />
        </button>
      </motion.div>
    </form>
  );
}

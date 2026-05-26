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
            ? '0 0 0 2px var(--primary), 0 4px 12px rgba(0, 0, 0, 0.1)' 
            : '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        className={`flex items-center gap-3 bg-card border border-border rounded-2xl transition-all ${
          large ? 'p-4' : 'p-3'
        }`}
      >
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground-muted ${
            large ? 'text-lg' : 'text-base'
          }`}
        />

        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className={`flex items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed ${
            large ? 'w-12 h-12' : 'w-10 h-10'
          }`}
        >
          <Send className={large ? 'w-5 h-5' : 'w-4 h-4'} />
        </button>
      </motion.div>
    </form>
  );
}

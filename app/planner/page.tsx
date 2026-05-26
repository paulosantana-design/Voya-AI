'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Download, Share2, Users, MapPin, Plane } from 'lucide-react';
import { ChatInput } from '@/components/chat-input';
import { ChatMessageItem } from '@/components/chat-message';
import { Timeline } from '@/components/timeline';
import { chatMessages as initialMessages, itineraryDays, currentTrip } from '@/lib/mock-data';
import type { ChatMessage } from '@/lib/types';

function PlannerContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [activeTab, setActiveTab] = useState<'chat' | 'itinerary'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && messages.length === initialMessages.length) {
      // Simulate user sending the starter message
      const userMessage: ChatMessage = {
        id: `m-user-${Date.now()}`,
        role: 'user',
        content: initialQuery,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `m-ai-${Date.now()}`,
          role: 'assistant',
          content: `Ótima escolha! "${initialQuery}" é uma experiência incrível. Estou preparando um roteiro personalizado baseado nas suas preferências. Você pode ver o roteiro tomando forma no painel ao lado. Enquanto isso, me conta: qual é a data aproximada da viagem e quantas pessoas vão?`,
          timestamp: new Date().toISOString(),
          suggestions: ['Junho 2025', 'Somos 2 pessoas', 'Ainda não sei a data', 'Quero ver opções'],
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  }, [initialQuery, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `m-ai-${Date.now()}`,
        role: 'assistant',
        content: 'Perfeito! Atualizei o roteiro com suas preferências. Você pode ver as mudanças no painel ao lado. O que mais gostaria de ajustar?',
        timestamp: new Date().toISOString(),
        suggestions: ['Adicionar mais restaurantes', 'Ver opções de hotéis', 'Incluir atividades culturais', 'Está ótimo assim!'],
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Trip Header */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img 
                  src={currentTrip.coverImage} 
                  alt={currentTrip.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{currentTrip.title}</h1>
                <div className="flex items-center gap-3 mt-1 text-sm text-foreground-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentTrip.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {currentTrip.totalDays} dias
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {currentTrip.travelers} viajantes
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/30 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/30 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar PDF</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Adicionar à agenda</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-border bg-background-secondary">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground-secondary'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'itinerary'
              ? 'text-primary border-b-2 border-primary'
              : 'text-foreground-secondary'
          }`}
        >
          Roteiro
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-12rem)]">
          {/* Chat Panel */}
          <div className={`lg:w-1/2 lg:border-r border-border flex flex-col ${
            activeTab === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessageItem 
                  key={message.id} 
                  message={message}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-border bg-background-secondary">
              <ChatInput onSend={handleSendMessage} placeholder="Digite sua mensagem..." />
            </div>
          </div>

          {/* Itinerary Panel */}
          <div className={`lg:w-1/2 flex flex-col ${
            activeTab === 'itinerary' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Seu Roteiro</h2>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Plane className="w-4 h-4" />
                  <span>+12.000 milhas estimadas</span>
                </div>
              </div>
              <Timeline 
                days={itineraryDays}
                onEditActivity={(dayId, activityId) => {
                  console.log('Edit activity:', dayId, activityId);
                }}
                onAddActivity={(dayId, period) => {
                  console.log('Add activity:', dayId, period);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-foreground-muted">Carregando...</div>
      </div>
    }>
      <PlannerContent />
    </Suspense>
  );
}

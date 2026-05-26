'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Download, Share2, Users, MapPin, Plane, ChevronDown, ChevronUp } from 'lucide-react';
import { ChatInput } from '@/components/chat-input';
import { ChatMessageItem } from '@/components/chat-message';
import { chatMessages as initialMessages, itineraryDays, routeTemplates } from '@/lib/mock-data';
import type { ChatMessage, ItineraryDay } from '@/lib/types';

// Mock user profile (would come from onboarding/auth)
const userProfile = {
  name: 'Paulo',
  preferences: {
    travelStyle: 'comfort',
    budget: 'medium-high',
    interests: ['gastronomia', 'cultura', 'fotografia'],
    pace: 'moderate',
    accommodation: 'boutique-hotels',
  },
  family: {
    adults: 2,
    children: 0,
  },
};

function PlannerContent() {
  const searchParams = useSearchParams();
  const routeId = searchParams.get('route');
  const starterLabel = searchParams.get('starter');
  const initialQuery = searchParams.get('q');
  
  const selectedRoute = routeId ? routeTemplates.find(r => r.id === routeId) : null;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'itinerary'>('chat');
  const [expandedDay, setExpandedDay] = useState<string | null>('d1');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat based on how user arrived
  useEffect(() => {
    if (messages.length === 0) {
      if (selectedRoute && starterLabel) {
        // User clicked a starter - show personalized welcome with route ready
        const welcomeMessage: ChatMessage = {
          id: 'm-welcome',
          role: 'assistant',
          content: `Ola ${userProfile.name}! Vi que voce quer "${starterLabel}". Baseado no seu perfil - voce gosta de ${userProfile.preferences.interests.join(', ')} e prefere um ritmo ${userProfile.preferences.pace === 'moderate' ? 'moderado' : 'intenso'} - ja montei o roteiro "${selectedRoute.title}" perfeito para voce${userProfile.family.adults > 1 ? ' e sua companhia' : ''}. O itinerario esta ao lado, pronto para personalizar. O que gostaria de ajustar?`,
          timestamp: new Date().toISOString(),
          suggestions: ['Adicionar mais gastronomia', 'Incluir tempo livre', 'Ver opcoes de hotel', 'Esta perfeito!'],
        };
        setMessages([welcomeMessage]);
      } else if (selectedRoute) {
        // User came from route detail page
        const welcomeMessage: ChatMessage = {
          id: 'm-welcome',
          role: 'assistant',
          content: `Ola ${userProfile.name}! Voce escolheu o roteiro "${selectedRoute.title}" para ${selectedRoute.destination}. Ja personalizei algumas sugestoes baseadas no seu perfil. O itinerario completo esta ao lado. Posso ajustar qualquer detalhe - e so pedir!`,
          timestamp: new Date().toISOString(),
          suggestions: ['Ajustar datas', 'Mudar hotel', 'Adicionar experiencias', 'Ver orcamento'],
        };
        setMessages([welcomeMessage]);
      } else if (initialQuery) {
        // User typed in search
        const welcomeMessage: ChatMessage = {
          id: 'm-welcome',
          role: 'assistant',
          content: `Ola ${userProfile.name}! Vou criar um roteiro baseado em "${initialQuery}" e suas preferencias. Me conta mais: quando voce pretende viajar e por quantos dias?`,
          timestamp: new Date().toISOString(),
          suggestions: ['Proximo mes', '7 dias', 'Ainda estou decidindo', 'Me surpreenda'],
        };
        setMessages([welcomeMessage]);
      } else {
        // Default welcome
        const welcomeMessage: ChatMessage = {
          id: 'm-welcome',
          role: 'assistant',
          content: `Ola ${userProfile.name}! Sou a Voya, sua assistente de viagens. Sei que voce gosta de ${userProfile.preferences.interests.slice(0, 2).join(' e ')}. Para onde vamos dessa vez?`,
          timestamp: new Date().toISOString(),
          suggestions: ['Europa romantica', 'Praia paradisiaca', 'Aventura na natureza', 'City break'],
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [selectedRoute, starterLabel, initialQuery, messages.length]);

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
        content: 'Perfeito! Atualizei o roteiro com suas preferencias. Voce pode ver as mudancas no painel ao lado. O que mais gostaria de ajustar?',
        timestamp: new Date().toISOString(),
        suggestions: ['Adicionar mais restaurantes', 'Ver opcoes de hoteis', 'Incluir atividades culturais', 'Esta otimo assim!'],
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const currentRoute = selectedRoute || routeTemplates[0];
  const currentDays = itineraryDays;

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-background">
      {/* Mobile Tabs */}
      <div className="lg:hidden flex border-b border-border/60 bg-background" style={{ borderBottomWidth: '0.5px' }}>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 text-[11px] font-medium transition-colors ${
            activeTab === 'chat'
              ? 'text-foreground border-b-2 border-foreground'
              : 'text-foreground-muted'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-2.5 text-[11px] font-medium transition-colors ${
            activeTab === 'itinerary'
              ? 'text-foreground border-b-2 border-foreground'
              : 'text-foreground-muted'
          }`}
        >
          Roteiro
        </button>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-3rem)]">
        
        {/* LEFT: Chat Panel */}
        <div className={`lg:w-5/12 flex flex-col bg-background ${
          activeTab === 'chat' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Chat Area */}
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
          
          {/* Chat Input */}
          <div className="p-4 border-t border-border/60" style={{ borderTopWidth: '0.5px' }}>
            <ChatInput onSend={handleSendMessage} placeholder="Digite sua mensagem..." />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-border/60" />

        {/* RIGHT: Route + Itinerary Panel */}
        <div className={`lg:w-7/12 flex flex-col bg-background-secondary ${
          activeTab === 'itinerary' ? 'flex' : 'hidden lg:flex'
        }`}>
          
          {/* Route Header - Only on Right Side */}
          <div className="p-4 border-b border-border/60" style={{ borderBottomWidth: '0.5px' }}>
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={currentRoute.coverImage} 
                  alt={currentRoute.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-semibold text-foreground">{currentRoute.title}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-foreground-muted">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {currentRoute.destination}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3" />
                    {currentRoute.duration}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    {userProfile.family.adults} viajantes
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-foreground text-background rounded-full text-[11px] font-medium hover:bg-foreground/90 transition-colors">
                <Calendar className="w-3.5 h-3.5" />
                Reservar agora
              </button>
              <button className="flex items-center justify-center w-8 h-8 bg-card border border-border/60 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted transition-colors" style={{ borderWidth: '0.5px' }}>
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center justify-center w-8 h-8 bg-card border border-border/60 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted transition-colors" style={{ borderWidth: '0.5px' }}>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Itinerary Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-foreground">Roteiro dia a dia</h2>
              <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                <Plane className="w-3 h-3" />
                <span>+12.000 milhas</span>
              </div>
            </div>
            
            {/* Itinerary Days */}
            <div className="space-y-2">
              {currentDays.map((day) => (
                <div 
                  key={day.id}
                  className="bg-card border border-border/60 rounded-lg overflow-hidden"
                  style={{ borderWidth: '0.5px' }}
                >
                  <button
                    onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 bg-foreground text-background text-[10px] font-medium rounded-full">
                        {day.dayNumber}
                      </span>
                      <div className="text-left">
                        <p className="text-[11px] font-medium text-foreground">{day.title}</p>
                        <p className="text-[10px] text-foreground-muted">{day.activities.length} atividades</p>
                      </div>
                    </div>
                    {expandedDay === day.id ? (
                      <ChevronUp className="w-3.5 h-3.5 text-foreground-muted" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
                    )}
                  </button>
                  
                  {expandedDay === day.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/60"
                      style={{ borderTopWidth: '0.5px' }}
                    >
                      <div className="p-2.5 space-y-2">
                        {day.activities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-2">
                            <span className="text-[10px] text-foreground-muted w-10 shrink-0">{activity.time}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-medium text-foreground">{activity.title}</p>
                              <p className="text-[10px] text-foreground-muted truncate">{activity.location}</p>
                            </div>
                            {activity.price && (
                              <span className="text-[10px] text-foreground-muted shrink-0">{activity.price}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="mt-4 p-3 bg-card rounded-lg border border-border/60" style={{ borderWidth: '0.5px' }}>
              <h3 className="text-[11px] font-semibold text-foreground mb-2">Resumo</h3>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground-muted">Orcamento estimado</span>
                  <span className="font-medium text-foreground">{currentRoute.price}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground-muted">Melhor epoca</span>
                  <span className="font-medium text-foreground">Mar - Mai / Set - Nov</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-foreground-muted">Duracao</span>
                  <span className="font-medium text-foreground">{currentRoute.duration}</span>
                </div>
              </div>
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
        <div className="animate-pulse text-foreground-muted text-xs">Carregando...</div>
      </div>
    }>
      <PlannerContent />
    </Suspense>
  );
}

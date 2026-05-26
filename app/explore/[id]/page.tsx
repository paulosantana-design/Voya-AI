'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Star, 
  Share2, 
  Heart,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { routeTemplates, itineraryDays, chatMessages } from '@/lib/mock-data';
import { ChatInput } from '@/components/chat-input';
import { ChatMessageItem } from '@/components/chat-message';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function RouteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const route = routeTemplates.find(r => r.id === id);
  const [expandedDay, setExpandedDay] = useState<string | null>('d1');

  if (!route) {
    notFound();
  }

  // Get related routes based on destination or tags
  const relatedRoutes = routeTemplates
    .filter(r => r.id !== id && (
      r.destination.toLowerCase().includes(route.destination.split(',')[0].toLowerCase()) ||
      r.tags.some(tag => route.tags.includes(tag))
    ))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header - Back only */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/60" style={{ borderBottomWidth: '0.5px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-11">
            <Link
              href="/explore"
              className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0">
          
          {/* Left - Chat (5 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-5 lg:border-r lg:border-border/60 lg:pr-4" style={{ borderRightWidth: '0.5px' }}>
            <div className="sticky top-16" style={{ height: 'calc(100vh - 80px)' }}>
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="px-3 py-2.5 border-b border-border/60" style={{ borderBottomWidth: '0.5px' }}>
                  <div className="flex items-center gap-2">
                    {route.expert && (
                      <img
                        src={route.expert.avatar}
                        alt={route.expert.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate">
                        {route.expert?.name || 'Voya AI'}
                      </p>
                      <p className="text-[10px] text-foreground-muted">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  <ChatMessageItem
                    message={{
                      id: 'intro',
                      role: 'assistant',
                      content: `Ola! Este e o roteiro "${route.title}" para ${route.destination}. Posso te ajudar a personalizar cada detalhe. O que gostaria de saber?`,
                      timestamp: new Date().toISOString(),
                      suggestions: ['Ver atracoes', 'Dicas de restaurantes', 'Melhor epoca', 'Orcamento detalhado']
                    }}
                  />
                  {chatMessages.slice(1, 3).map((msg) => (
                    <ChatMessageItem key={msg.id} message={msg} />
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-border/60" style={{ borderTopWidth: '0.5px' }}>
                  <ChatInput placeholder="Pergunte sobre o roteiro..." />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Itinerary (7 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-4">
            {/* Route Header */}
            <div className="mb-4">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-xl mb-3" style={{ aspectRatio: '16/7' }}>
                <img
                  src={route.coverImage}
                  alt={route.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Actions */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button className="flex items-center justify-center w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
                    <Heart className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button className="flex items-center justify-center w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
                    <Share2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {route.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i}
                        className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[9px] font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h1 className="text-base font-semibold text-white">{route.title}</h1>
                      <div className="flex items-center gap-2 mt-0.5 text-white/80 text-[10px]">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {route.destination}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {route.duration}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          {route.rating}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-white text-foreground text-[10px] font-semibold rounded-md">
                      {route.price.replace('A partir de ', '')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-foreground-secondary leading-relaxed mb-3">
                {route.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <p className="text-sm font-semibold text-foreground">{route.duration.split(' ')[0]}</p>
                  <p className="text-[10px] text-foreground-muted">Dias</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <p className="text-sm font-semibold text-foreground">{route.reviews}</p>
                  <p className="text-[10px] text-foreground-muted">Avaliacoes</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <p className="text-sm font-semibold text-foreground">1.2k</p>
                  <p className="text-[10px] text-foreground-muted">Viajantes</p>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/planner?route=${route.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-foreground text-background text-xs font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                Usar este roteiro
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-border/60 mb-4" style={{ borderTopWidth: '0.5px' }} />

            {/* Itinerary */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-foreground mb-2">Roteiro dia a dia</h3>
              <div className="space-y-2">
                {itineraryDays.slice(0, 3).map((day) => (
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
                          {day.activities.slice(0, 4).map((activity) => (
                            <div key={activity.id} className="flex items-start gap-2">
                              <span className="text-[10px] text-foreground-muted w-10 shrink-0">{activity.time}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-foreground">{activity.title}</p>
                                <p className="text-[10px] text-foreground-muted truncate">{activity.location}</p>
                              </div>
                            </div>
                          ))}
                          {day.activities.length > 4 && (
                            <p className="text-[10px] text-foreground-muted text-center pt-1">
                              +{day.activities.length - 4} mais atividades
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Card */}
            {route.expert && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-foreground mb-2">Criado por</h3>
                <Link 
                  href={`/experts/${route.expert.id}`} 
                  className="flex items-center gap-2.5 p-2.5 bg-card border border-border/60 rounded-lg hover:border-foreground/10 transition-colors" 
                  style={{ borderWidth: '0.5px' }}
                >
                  <img
                    src={route.expert.avatar}
                    alt={route.expert.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-foreground">{route.expert.name}</p>
                    <p className="text-[10px] text-foreground-muted">{route.expert.specialty}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-[11px] font-medium text-foreground">{route.expert.rating}</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Related Routes */}
            {relatedRoutes.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-foreground mb-2">Roteiros relacionados</h3>
                <div className="grid grid-cols-2 gap-2">
                  {relatedRoutes.map((related) => (
                    <Link 
                      key={related.id}
                      href={`/explore/${related.id}`}
                      className="group relative overflow-hidden rounded-lg"
                      style={{ aspectRatio: '16/10' }}
                    >
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[10px] font-medium text-white truncate">{related.title}</p>
                        <p className="text-[9px] text-white/70">{related.duration}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

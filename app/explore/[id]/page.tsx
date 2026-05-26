'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Star, 
  Share2, 
  Heart,
  Calendar,
  Users,
  MessageSquare
} from 'lucide-react';
import { routeTemplates, itineraryDays } from '@/lib/mock-data';
import { Timeline } from '@/components/timeline';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function RouteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const route = routeTemplates.find(r => r.id === id);

  if (!route) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-72 sm:h-96">
        <img
          src={route.coverImage}
          alt={route.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {route.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">{route.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {route.destination}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {route.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              {route.rating} ({route.reviews} avaliações)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {route.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">O que está incluído</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Roteiro dia a dia detalhado',
                  'Dicas de restaurantes',
                  'Sugestões de hospedagem',
                  'Mapa interativo',
                  'Lista de atrações',
                  'Dicas de economia',
                  'Contatos úteis',
                  'Checklist de viagem',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-success" />
                    </div>
                    <span className="text-sm text-foreground-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Timeline */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Preview do roteiro</h2>
              <Timeline days={itineraryDays.slice(0, 2)} />
              <div className="mt-4 p-4 bg-muted rounded-xl text-center">
                <p className="text-foreground-secondary mb-2">
                  Este é um preview. Use este roteiro para ver todos os {route.duration} completos.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-foreground-secondary">A partir de</p>
                  <p className="text-3xl font-bold text-foreground">{route.price.replace('A partir de ', '')}</p>
                  <p className="text-sm text-foreground-muted">por pessoa</p>
                </div>

                <Link
                  href={`/planner?route=${route.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors mb-3"
                >
                  <Calendar className="w-5 h-5" />
                  Usar este roteiro
                </Link>

                <button className="w-full flex items-center justify-center gap-2 py-3 bg-card border border-border text-foreground font-medium rounded-xl hover:border-primary/30 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  Falar com expert
                </button>
              </div>

              {/* Expert Card */}
              {route.expert && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-sm font-medium text-foreground-secondary mb-4">Criado por</h3>
                  <Link href={`/experts/${route.expert.id}`} className="flex items-center gap-3">
                    <img
                      src={route.expert.avatar}
                      alt={route.expert.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{route.expert.name}</p>
                      <p className="text-sm text-foreground-secondary">{route.expert.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        <span className="text-sm text-foreground-secondary">{route.expert.rating}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Stats */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{route.reviews}</p>
                    <p className="text-sm text-foreground-secondary">Avaliações</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">1.2k</p>
                    <p className="text-sm text-foreground-secondary">Viajantes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

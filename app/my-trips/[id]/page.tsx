'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Share2, 
  Download, 
  Edit3,
  Plane,
  Hotel,
  Utensils
} from 'lucide-react';
import { Timeline } from '@/components/timeline';
import { myTrips, itineraryDays } from '@/lib/mock-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const trip = myTrips.find(t => t.id === id);

  if (!trip) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 sm:h-80">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/my-trips"
            className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {trip.destination}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(trip.startDate).toLocaleDateString('pt-BR')} - {new Date(trip.endDate).toLocaleDateString('pt-BR')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {trip.travelers} viajantes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{trip.totalDays}</p>
            <p className="text-sm text-foreground-secondary">Dias</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-sm text-foreground-secondary">Voos</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
              <Hotel className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">1</p>
            <p className="text-sm text-foreground-secondary">Hotel</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-2">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-sm text-foreground-secondary">Experiências</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/planner"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Editar roteiro
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:border-primary/30 transition-colors">
            <Calendar className="w-4 h-4" />
            Adicionar à agenda
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:border-primary/30 transition-colors">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:border-primary/30 transition-colors">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>

        {/* Budget */}
        {trip.budget && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Orçamento estimado</h2>
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Total da viagem</span>
              <span className="text-2xl font-bold text-foreground">{trip.budget}</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">Voos</span>
                <span className="text-foreground">R$ 9.700</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">Hospedagem</span>
                <span className="text-foreground">R$ 8.400</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">Experiências</span>
                <span className="text-foreground">R$ 3.500</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-secondary">Alimentação (estimado)</span>
                <span className="text-foreground">R$ 3.400</span>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Roteiro completo</h2>
          <Timeline days={itineraryDays} />
        </div>
      </div>
    </div>
  );
}

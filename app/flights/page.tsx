'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FlightCard } from '@/components/flight-card';
import { flights } from '@/lib/mock-data';

export default function FlightsPage() {
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') {
      return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
    }
    if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    }
    return a.departure.time.localeCompare(b.departure.time);
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Voos</h1>
          <p className="text-foreground-secondary mt-1">Encontre as melhores opções para sua viagem</p>
        </div>

        {/* Search Box */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Origem</label>
              <input
                type="text"
                defaultValue="São Paulo (GRU)"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Destino</label>
              <input
                type="text"
                defaultValue="Roma (FCO)"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Data de ida</label>
              <input
                type="date"
                defaultValue="2025-06-15"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Passageiros</label>
              <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors">
                <option>1 adulto</option>
                <option>2 adultos</option>
                <option>3 adultos</option>
                <option>4 adultos</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" />
              Buscar voos
            </button>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-foreground-secondary">
            <span className="font-semibold text-foreground">{flights.length}</span> voos encontrados
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/30 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="price">Menor preço</option>
              <option value="duration">Menor duração</option>
              <option value="departure">Horário de saída</option>
            </select>
          </div>
        </div>

        {/* Flight List */}
        <div className="space-y-4">
          {sortedFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlightCard 
                flight={flight} 
                onSelect={() => console.log('Selected flight:', flight.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

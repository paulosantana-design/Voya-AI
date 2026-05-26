'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { HotelCard } from '@/components/hotel-card';
import { hotels } from '@/lib/mock-data';

export default function HotelsPage() {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stars'>('rating');

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === 'price') {
      return parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, ''));
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return b.stars - a.stars;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Hotéis</h1>
          <p className="text-foreground-secondary mt-1">Encontre a hospedagem perfeita para sua viagem</p>
        </div>

        {/* Search Box */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Destino</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  defaultValue="Florença, Itália"
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Check-in</label>
              <input
                type="date"
                defaultValue="2025-06-15"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Check-out</label>
              <input
                type="date"
                defaultValue="2025-06-22"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">Hóspedes</label>
              <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors">
                <option>2 hóspedes, 1 quarto</option>
                <option>3 hóspedes, 1 quarto</option>
                <option>4 hóspedes, 2 quartos</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" />
              Buscar hotéis
            </button>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-foreground-secondary">
            <span className="font-semibold text-foreground">{hotels.length}</span> hotéis encontrados
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
              <option value="rating">Melhor avaliação</option>
              <option value="price">Menor preço</option>
              <option value="stars">Mais estrelas</option>
            </select>
          </div>
        </div>

        {/* Hotel List */}
        <div className="space-y-4">
          {sortedHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <HotelCard 
                hotel={hotel} 
                onSelect={() => console.log('Selected hotel:', hotel.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

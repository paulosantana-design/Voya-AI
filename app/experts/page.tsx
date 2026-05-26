'use client';

import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ExpertCard } from '@/components/expert-card';
import { experts } from '@/lib/mock-data';
import { useState } from 'react';

const specialties = [
  { id: 'all', label: 'Todos' },
  { id: 'europa', label: 'Europa' },
  { id: 'disney', label: 'Disney & Parques' },
  { id: 'asia', label: 'Ásia' },
  { id: 'lua-de-mel', label: 'Lua de Mel' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'economico', label: 'Econômico' },
];

export default function ExpertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('all');

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeSpecialty === 'all') return matchesSearch;
    
    return matchesSearch && (
      expert.specialty.toLowerCase().includes(activeSpecialty.toLowerCase()) ||
      expert.destinations.some(d => d.toLowerCase().includes(activeSpecialty.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Experts de Viagem</h1>
          <p className="text-foreground-secondary mt-1">Conecte-se com especialistas que conhecem cada detalhe do seu destino</p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar experts por nome, especialidade ou destino..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl text-foreground hover:border-primary/30 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Specialties */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => setActiveSpecialty(specialty.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSpecialty === specialty.id
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground-secondary hover:text-foreground hover:border-primary/30'
              }`}
            >
              {specialty.label}
            </button>
          ))}
        </div>

        {/* Expert Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExpertCard expert={expert} featured={expert.featured} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum expert encontrado</h3>
            <p className="text-foreground-secondary">Tente buscar por outro nome ou especialidade</p>
          </div>
        )}
      </div>
    </div>
  );
}

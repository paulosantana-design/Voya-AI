'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ExperienceCard } from '@/components/experience-card';
import { experiences } from '@/lib/mock-data';

const categories = [
  { id: 'all', label: 'Todas' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'arte', label: 'Arte & Cultura' },
  { id: 'vinho', label: 'Vinho' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'natureza', label: 'Natureza' },
];

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    
    return matchesSearch && exp.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Experiências</h1>
          <p className="text-foreground-secondary mt-1">Descubra atividades únicas para tornar sua viagem inesquecível</p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar experiências..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl text-foreground hover:border-primary/30 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground-secondary hover:text-foreground hover:border-primary/30'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExperienceCard 
                experience={experience} 
                onSelect={() => console.log('Selected experience:', experience.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma experiência encontrada</h3>
            <p className="text-foreground-secondary">Tente buscar por outra atividade ou categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}

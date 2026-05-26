'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { RouteCard } from '@/components/route-card';
import { routeTemplates } from '@/lib/mock-data';

const categories = [
  { id: 'all', label: 'Todos', keywords: [] },
  { id: 'disney', label: 'Disney', keywords: ['disney', 'orlando', 'parques', 'família'] },
  { id: 'europe', label: 'Europa', keywords: ['europa', 'itália', 'frança', 'portugal', 'espanha', 'toscana'] },
  { id: 'asia', label: 'Asia', keywords: ['japão', 'asia', 'coreia', 'tailândia'] },
  { id: 'beach', label: 'Praias', keywords: ['praia', 'maldivas', 'caribe', 'bora bora'] },
  { id: 'romantic', label: 'Romantico', keywords: ['romântico', 'lua de mel', 'casal'] },
  { id: 'adventure', label: 'Aventura', keywords: ['aventura', 'trekking', 'natureza', 'patagônia'] },
  { id: 'economic', label: 'Economico', keywords: ['econômico', 'barato', 'orçamento'] },
  { id: 'gastronomy', label: 'Gastronomia', keywords: ['gastronomia', 'vinhos', 'culinária'] },
];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredRoutes = routeTemplates.filter(route => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      route.title.toLowerCase().includes(searchLower) ||
      route.destination.toLowerCase().includes(searchLower) ||
      route.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      route.description.toLowerCase().includes(searchLower);
    
    if (activeCategory === 'all') return matchesSearch;
    
    const category = categories.find(c => c.id === activeCategory);
    if (!category) return matchesSearch;
    
    const matchesCategory = category.keywords.some(keyword =>
      route.title.toLowerCase().includes(keyword) ||
      route.destination.toLowerCase().includes(keyword) ||
      route.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
      route.description.toLowerCase().includes(keyword)
    );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-base font-semibold text-foreground">Explorar Roteiros</h1>
          <p className="text-foreground-muted text-xs mt-0.5">Descubra roteiros criados por experts</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar destinos, roteiros..."
              className="w-full pl-9 pr-3 py-2 bg-card border border-border/60 rounded-full text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground/20 transition-colors"
              style={{ borderWidth: '0.5px' }}
            />
          </div>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-card border border-border/60 rounded-full text-xs text-foreground-secondary hover:text-foreground hover:border-foreground/20 transition-colors" style={{ borderWidth: '0.5px' }}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-foreground text-background'
                  : 'bg-card border border-border/60 text-foreground-muted hover:text-foreground hover:border-foreground/20'
              }`}
              style={{ borderWidth: activeCategory === category.id ? undefined : '0.5px' }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-[11px] text-foreground-muted mb-3">
          {filteredRoutes.length} roteiro{filteredRoutes.length !== 1 ? 's' : ''} encontrado{filteredRoutes.length !== 1 ? 's' : ''}
        </p>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredRoutes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <RouteCard route={route} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-foreground-muted" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">Nenhum roteiro encontrado</h3>
            <p className="text-xs text-foreground-muted">Tente buscar por outro destino ou categoria</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 px-3 py-1.5 text-xs text-foreground-secondary hover:text-foreground transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChevronRight, User } from 'lucide-react';
import type { RouteTemplate } from '@/lib/types';
import Link from 'next/link';

interface RouteCardProps {
  route: RouteTemplate;
  size?: 'default' | 'large';
}

export function RouteCard({ route, size = 'default' }: RouteCardProps) {
  const isLarge = size === 'large';

  return (
    <Link href={`/explore/${route.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/20 transition-all hover:shadow-lg"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
          <img
            src={route.coverImage}
            alt={route.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {route.featured && (
              <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                Destaque
              </span>
            )}
            {route.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1.5 bg-white text-foreground text-sm font-semibold rounded-lg shadow-lg">
              {route.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-foreground line-clamp-1 ${isLarge ? 'text-lg' : 'text-base'}`}>
                {route.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{route.destination}</span>
                </div>
                <span className="text-foreground-muted">•</span>
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-sm">{route.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {isLarge && (
            <p className="text-sm text-foreground-secondary mt-2 line-clamp-2">
              {route.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium text-foreground">{route.rating}</span>
              </div>
              <span className="text-sm text-foreground-muted">({route.reviews} avaliações)</span>
            </div>
            
            {route.expert && (
              <div className="flex items-center gap-2">
                <img
                  src={route.expert.avatar}
                  alt={route.expert.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-foreground-secondary hidden sm:inline">
                  por {route.expert.name.split(' ')[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

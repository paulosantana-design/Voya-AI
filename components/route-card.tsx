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
        whileHover={{ y: -2 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-border/60 hover:border-foreground/10 transition-all hover:shadow-sm"
        style={{ borderWidth: '0.5px' }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
          <img
            src={route.coverImage}
            alt={route.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {route.featured && (
              <span className="px-1.5 py-0.5 bg-foreground text-background text-[10px] font-medium rounded-full">
                Destaque
              </span>
            )}
            {route.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="px-1.5 py-0.5 bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="absolute bottom-2.5 right-2.5">
            <span className="px-2 py-0.5 bg-white text-foreground text-[10px] font-semibold rounded-md">
              {route.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-foreground line-clamp-1 ${isLarge ? 'text-sm' : 'text-xs'}`}>
                {route.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center gap-0.5 text-foreground-muted">
                  <MapPin className="w-3 h-3" />
                  <span className="text-[11px]">{route.destination}</span>
                </div>
                <span className="text-foreground-muted text-[10px]">•</span>
                <div className="flex items-center gap-0.5 text-foreground-muted">
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px]">{route.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {isLarge && (
            <p className="text-[11px] text-foreground-muted mt-1.5 line-clamp-2">
              {route.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border/60" style={{ borderTopWidth: '0.5px' }}>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-[11px] font-medium text-foreground">{route.rating}</span>
              </div>
              <span className="text-[10px] text-foreground-muted">({route.reviews})</span>
            </div>
            
            {route.expert && (
              <div className="flex items-center gap-1.5">
                <img
                  src={route.expert.avatar}
                  alt={route.expert.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-[10px] text-foreground-muted hidden sm:inline">
                  {route.expert.name.split(' ')[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

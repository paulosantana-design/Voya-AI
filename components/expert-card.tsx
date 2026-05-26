'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Verified, ChevronRight } from 'lucide-react';
import type { Expert } from '@/lib/types';
import Link from 'next/link';

interface ExpertCardProps {
  expert: Expert;
  featured?: boolean;
}

export function ExpertCard({ expert, featured = false }: ExpertCardProps) {
  return (
    <Link href={`/experts/${expert.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className={`relative overflow-hidden rounded-xl border transition-all hover:shadow-lg ${
          featured 
            ? 'bg-card border-primary/20' 
            : 'bg-card border-border hover:border-primary/20'
        }`}
      >
        {featured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
            Destaque
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {expert.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Verified className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{expert.name}</h3>
              <p className="text-sm text-primary font-medium">{expert.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-medium text-foreground">{expert.rating}</span>
                <span className="text-sm text-foreground-muted">({expert.reviews} avaliações)</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground-secondary mt-3 line-clamp-2">
            {expert.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {expert.destinations.slice(0, 3).map((dest, i) => (
              <span 
                key={i} 
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted text-foreground-secondary rounded-md"
              >
                <MapPin className="w-3 h-3" />
                {dest}
              </span>
            ))}
            {expert.destinations.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted text-foreground-secondary rounded-md">
                +{expert.destinations.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-foreground-secondary">
              {expert.itineraries} roteiros criados
            </span>
            <div className="flex items-center gap-1 text-primary text-sm font-medium">
              Ver perfil
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

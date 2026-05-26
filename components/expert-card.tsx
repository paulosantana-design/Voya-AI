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
        whileHover={{ y: -2 }}
        className={`relative overflow-hidden rounded-xl border transition-all hover:shadow-sm ${
          featured 
            ? 'bg-card border-foreground/10' 
            : 'bg-card border-border/60 hover:border-foreground/10'
        }`}
        style={{ borderWidth: '0.5px' }}
      >
        {featured && (
          <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-foreground text-background text-[10px] font-medium rounded-full">
            Destaque
          </div>
        )}
        
        <div className="p-3.5">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              {expert.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-foreground rounded-full flex items-center justify-center">
                  <Verified className="w-2.5 h-2.5 text-background" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-medium text-foreground">{expert.name}</h3>
              <p className="text-[11px] text-foreground-secondary">{expert.specialty}</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-[11px] font-medium text-foreground">{expert.rating}</span>
                <span className="text-[10px] text-foreground-muted">({expert.reviews})</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-foreground-muted mt-2.5 line-clamp-2 leading-relaxed">
            {expert.bio}
          </p>

          <div className="flex flex-wrap gap-1 mt-2.5">
            {expert.destinations.slice(0, 3).map((dest, i) => (
              <span 
                key={i} 
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-muted text-foreground-muted rounded"
              >
                <MapPin className="w-2.5 h-2.5" />
                {dest}
              </span>
            ))}
            {expert.destinations.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-muted text-foreground-muted rounded">
                +{expert.destinations.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/60" style={{ borderTopWidth: '0.5px' }}>
            <span className="text-[10px] text-foreground-muted">
              {expert.itineraries} roteiros
            </span>
            <div className="flex items-center gap-0.5 text-foreground-secondary text-[10px] font-medium">
              Ver perfil
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

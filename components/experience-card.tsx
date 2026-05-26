'use client';

import { motion } from 'framer-motion';
import { Star, Clock, MapPin } from 'lucide-react';
import type { Experience } from '@/lib/types';

interface ExperienceCardProps {
  experience: Experience;
  onSelect?: () => void;
}

export function ExperienceCard({ experience, onSelect }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
      onClick={onSelect}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
          {experience.category}
        </div>
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white text-foreground text-sm font-semibold rounded-lg shadow-lg">
          {experience.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2">{experience.title}</h3>
        
        <div className="flex items-center gap-3 mt-2 text-sm text-foreground-secondary">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{experience.duration}</span>
          </div>
        </div>

        <p className="text-sm text-foreground-secondary mt-2 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-medium text-foreground">{experience.rating}</span>
          </div>
          <span className="text-sm text-foreground-muted">({experience.reviews} avaliações)</span>
        </div>
      </div>
    </motion.div>
  );
}

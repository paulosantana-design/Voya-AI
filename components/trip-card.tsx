'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronRight } from 'lucide-react';
import type { Trip } from '@/lib/types';
import Link from 'next/link';

interface TripCardProps {
  trip: Trip;
}

const statusColors = {
  planning: 'bg-warning-light text-warning',
  confirmed: 'bg-success-light text-success',
  completed: 'bg-muted text-foreground-muted',
};

const statusLabels = {
  planning: 'Planejando',
  confirmed: 'Confirmada',
  completed: 'Concluída',
};

export function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/my-trips/${trip.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/20 transition-all hover:shadow-lg"
      >
        {/* Image */}
        <div className="aspect-[16/9] relative overflow-hidden">
          <img
            src={trip.coverImage}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          
          {/* Status */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[trip.status]}`}>
              {statusLabels[trip.status]}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-semibold text-white">{trip.title}</h3>
            <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{trip.destination}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(trip.startDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{trip.travelers} viajante{trip.travelers > 1 ? 's' : ''}</span>
              </div>
              <span>{trip.totalDays} dias</span>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

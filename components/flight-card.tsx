'use client';

import { motion } from 'framer-motion';
import { Plane, Clock, Briefcase, Gift, ChevronRight } from 'lucide-react';
import type { Flight } from '@/lib/types';

interface FlightCardProps {
  flight: Flight;
  onSelect?: () => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  const cabinLabels = {
    economy: 'Econômica',
    premium: 'Premium Economy',
    business: 'Executiva',
    first: 'Primeira Classe',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 lg:w-32">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Plane className="w-5 h-5 text-foreground-secondary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{flight.airline}</p>
            <p className="text-xs text-foreground-muted">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex-1 flex items-center gap-4">
          {/* Departure */}
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{flight.departure.time}</p>
            <p className="text-sm font-medium text-foreground-secondary">{flight.departure.airport}</p>
            <p className="text-xs text-foreground-muted">{flight.departure.city}</p>
          </div>

          {/* Duration */}
          <div className="flex-1 flex flex-col items-center">
            <span className="text-xs text-foreground-muted mb-1">{flight.duration}</span>
            <div className="w-full h-px bg-border relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground-muted" />
              {flight.stops > 0 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-warning" />
              )}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-foreground-muted mt-1">
              {flight.stops === 0 ? 'Direto' : `${flight.stops} parada${flight.stops > 1 ? 's' : ''}`}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground">{flight.arrival.time}</p>
            <p className="text-sm font-medium text-foreground-secondary">{flight.arrival.airport}</p>
            <p className="text-xs text-foreground-muted">{flight.arrival.city}</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col items-end gap-2 lg:w-40">
          <div className="text-right">
            <p className="text-xl font-bold text-foreground">{flight.price}</p>
            {flight.miles && (
              <p className="text-sm text-primary font-medium">ou {flight.miles.toLocaleString()} milhas</p>
            )}
          </div>
          <span className="text-xs text-foreground-muted">{cabinLabels[flight.cabinClass]}</span>
        </div>
      </div>

      {/* Benefits */}
      {flight.benefits && flight.benefits.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {flight.benefits.map((benefit, i) => (
            <span 
              key={i} 
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-success-light text-success rounded-md"
            >
              <Gift className="w-3 h-3" />
              {benefit}
            </span>
          ))}
        </div>
      )}

      {/* Select Button */}
      <button
        onClick={onSelect}
        className="w-full mt-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
      >
        Selecionar voo
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

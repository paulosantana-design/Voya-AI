'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Waves, Utensils, Dumbbell, Gift, Plane } from 'lucide-react';
import type { Hotel } from '@/lib/types';

interface HotelCardProps {
  hotel: Hotel;
  onSelect?: () => void;
}

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi,
  'Piscina': Waves,
  'Restaurante': Utensils,
  'Academia': Dumbbell,
  'Spa': Waves,
};

export function HotelCard({ hotel, onSelect }: HotelCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-64 flex-shrink-0">
          <div className="aspect-[4/3] sm:aspect-auto sm:h-full relative">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg flex items-center gap-1">
              {'★'.repeat(hotel.stars)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-foreground-secondary">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-primary-light px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-semibold text-primary">{hotel.rating}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.amenities.slice(0, 4).map((amenity, i) => {
                const Icon = amenityIcons[amenity] || Wifi;
                return (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted text-foreground-secondary rounded-md"
                  >
                    <Icon className="w-3 h-3" />
                    {amenity}
                  </span>
                );
              })}
            </div>

            {/* Benefits */}
            {hotel.benefits && hotel.benefits.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hotel.benefits.map((benefit, i) => (
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
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-foreground-muted">Total para 7 noites</p>
              <p className="text-xl font-bold text-foreground">{hotel.price}</p>
              <p className="text-sm text-foreground-secondary">{hotel.pricePerNight}</p>
              {hotel.miles && (
                <p className="text-sm text-primary font-medium flex items-center gap-1 mt-1">
                  <Plane className="w-3.5 h-3.5" />
                  +{hotel.miles.toLocaleString()} milhas
                </p>
              )}
            </div>
            <button
              onClick={onSelect}
              className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

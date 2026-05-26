'use client';

import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Lightbulb, 
  Gift, 
  Plane as PlaneIcon,
  Edit3,
  Plus,
  ChevronDown,
  ChevronRight,
  Utensils,
  Camera,
  Hotel,
  Car,
  Coffee
} from 'lucide-react';
import type { ItineraryDay, Activity } from '@/lib/types';
import { useState, useEffect } from 'react';

const periodIcons = {
  morning: Coffee,
  afternoon: Camera,
  evening: Utensils,
};

const typeIcons = {
  transport: Car,
  accommodation: Hotel,
  attraction: Camera,
  food: Utensils,
  experience: Camera,
  free: Coffee,
};

const intensityColors = {
  low: 'bg-success-light text-success',
  medium: 'bg-warning-light text-warning',
  high: 'bg-danger-light text-danger',
};

const intensityLabels = {
  low: 'Leve',
  medium: 'Moderado',
  high: 'Intenso',
};

interface TimelineProps {
  days: ItineraryDay[];
  onEditActivity?: (dayId: string, activityId: string) => void;
  onAddActivity?: (dayId: string, period: string) => void;
}

export function Timeline({ days, onEditActivity, onAddActivity }: TimelineProps) {
  const [expandedDays, setExpandedDays] = useState<string[]>(days.map(d => d.id));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <div className="space-y-4">
      {days.map((day, dayIndex) => (
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dayIndex * 0.1 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* Day Header */}
          <button
            onClick={() => toggleDay(day.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary-light rounded-xl">
                <span className="text-xs font-medium text-primary">Dia</span>
                <span className="text-lg font-bold text-primary">{day.dayNumber}</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">{day.title}</h3>
                <p className="text-sm text-foreground-secondary">
                  {mounted ? new Date(day.date).toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  }) : `Dia ${day.dayNumber}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${intensityColors[day.intensity]}`}>
                {intensityLabels[day.intensity]}
              </span>
              {expandedDays.includes(day.id) ? (
                <ChevronDown className="w-5 h-5 text-foreground-muted" />
              ) : (
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              )}
            </div>
          </button>

          {/* Day Content */}
          {expandedDays.includes(day.id) && (
            <div className="border-t border-border">
              {(['morning', 'afternoon', 'evening'] as const).map(period => {
                const periodActivities = day.activities.filter(a => a.period === period);
                const PeriodIcon = periodIcons[period];
                const periodLabel = period === 'morning' ? 'Manhã' : period === 'afternoon' ? 'Tarde' : 'Noite';

                if (periodActivities.length === 0) return null;

                return (
                  <div key={period} className="border-b border-border last:border-b-0">
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/30">
                      <PeriodIcon className="w-4 h-4 text-foreground-muted" />
                      <span className="text-sm font-medium text-foreground-secondary">{periodLabel}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {periodActivities.map((activity) => (
                        <ActivityCard 
                          key={activity.id} 
                          activity={activity}
                          onEdit={() => onEditActivity?.(day.id, activity.id)}
                        />
                      ))}
                      <button
                        onClick={() => onAddActivity?.(day.id, period)}
                        className="flex items-center gap-2 w-full p-3 border border-dashed border-border rounded-xl text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Adicionar atividade</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface ActivityCardProps {
  activity: Activity;
  onEdit?: () => void;
}

function ActivityCard({ activity, onEdit }: ActivityCardProps) {
  const TypeIcon = typeIcons[activity.type] || Camera;

  return (
    <div className="group relative bg-background-secondary rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex gap-4">
        {/* Time */}
        <div className="flex-shrink-0 w-14 text-center">
          <span className="text-sm font-semibold text-foreground">{activity.time}</span>
          <div className="flex items-center justify-center gap-1 mt-1 text-xs text-foreground-muted">
            <Clock className="w-3 h-3" />
            <span>{activity.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'food' ? 'bg-warning-light' :
                activity.type === 'transport' ? 'bg-muted' :
                activity.type === 'accommodation' ? 'bg-primary-light' :
                activity.type === 'attraction' ? 'bg-accent/10' :
                'bg-success-light'
              }`}>
                <TypeIcon className={`w-4 h-4 ${
                  activity.type === 'food' ? 'text-warning' :
                  activity.type === 'transport' ? 'text-foreground-secondary' :
                  activity.type === 'accommodation' ? 'text-primary' :
                  activity.type === 'attraction' ? 'text-accent' :
                  'text-success'
                }`} />
              </div>
              <h4 className="font-medium text-foreground">{activity.title}</h4>
            </div>
            <button
              onClick={onEdit}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-muted transition-all"
            >
              <Edit3 className="w-4 h-4 text-foreground-muted" />
            </button>
          </div>

          <p className="text-sm text-foreground-secondary mt-1 line-clamp-2">
            {activity.description}
          </p>

          <div className="flex items-center gap-1 mt-2 text-xs text-foreground-muted">
            <MapPin className="w-3 h-3" />
            <span>{activity.location}</span>
          </div>

          {/* Extras */}
          <div className="flex flex-wrap gap-2 mt-3">
            {activity.price && (
              <span className="px-2 py-1 text-xs font-medium bg-muted text-foreground-secondary rounded-md">
                {activity.price}
              </span>
            )}
            {activity.miles && (
              <span className="px-2 py-1 text-xs font-medium bg-primary-light text-primary rounded-md flex items-center gap-1">
                <PlaneIcon className="w-3 h-3" />
                +{activity.miles.toLocaleString()} milhas
              </span>
            )}
            {activity.benefits && activity.benefits.length > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-success-light text-success rounded-md flex items-center gap-1">
                <Gift className="w-3 h-3" />
                {activity.benefits.length} benefício{activity.benefits.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Tips */}
          {activity.tips && activity.tips.length > 0 && (
            <div className="mt-3 p-2 bg-warning-light/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-xs text-foreground-secondary">
                  {activity.tips.map((tip, i) => (
                    <p key={i}>{tip}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        {activity.image && (
          <div className="hidden sm:block flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

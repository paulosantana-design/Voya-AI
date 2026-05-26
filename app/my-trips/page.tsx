'use client';

import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import { TripCard } from '@/components/trip-card';
import { myTrips } from '@/lib/mock-data';
import Link from 'next/link';

export default function MyTripsPage() {
  const planningTrips = myTrips.filter(t => t.status === 'planning');
  const confirmedTrips = myTrips.filter(t => t.status === 'confirmed');
  const completedTrips = myTrips.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Minhas Viagens</h1>
            <p className="text-foreground-secondary mt-1">Gerencie todas as suas viagens em um só lugar</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/30 transition-colors">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <Link
              href="/planner"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova viagem
            </Link>
          </div>
        </div>

        {/* Planning Section */}
        {planningTrips.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Planejando</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TripCard trip={trip} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Confirmed Section */}
        {confirmedTrips.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Confirmadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {confirmedTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TripCard trip={trip} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Section */}
        {completedTrips.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Concluídas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TripCard trip={trip} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {myTrips.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma viagem ainda</h3>
            <p className="text-foreground-secondary mb-6">Comece a planejar sua próxima aventura!</p>
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors"
            >
              <Plus className="w-5 h-5" />
              Criar primeira viagem
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

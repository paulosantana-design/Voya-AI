'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Verified, ArrowLeft, MessageSquare, Calendar } from 'lucide-react';
import { experts, routeTemplates } from '@/lib/mock-data';
import { RouteCard } from '@/components/route-card';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const expert = experts.find(e => e.id === id);

  if (!expert) {
    notFound();
  }

  const expertRoutes = routeTemplates.filter(r => r.expert?.id === expert.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/experts"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Experts
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
              />
              {expert.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Verified className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{expert.name}</h1>
                  <p className="text-lg text-primary font-medium mt-1">{expert.specialty}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-warning fill-warning" />
                  <span className="font-semibold text-foreground">{expert.rating}</span>
                  <span className="text-foreground-muted">({expert.reviews} avaliações)</span>
                </div>
                <div className="text-foreground-secondary">
                  {expert.itineraries} roteiros criados
                </div>
              </div>

              <p className="text-foreground-secondary mt-4 max-w-2xl">{expert.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {expert.destinations.map((dest, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-muted text-foreground-secondary rounded-lg"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {dest}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  Conversar com {expert.name.split(' ')[0]}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-medium rounded-xl hover:border-primary/30 transition-colors">
                  <Calendar className="w-5 h-5" />
                  Agendar consultoria
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Roteiros de {expert.name.split(' ')[0]}
        </h2>

        {expertRoutes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {expertRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RouteCard route={route} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-foreground-muted">Este expert ainda não publicou roteiros.</p>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Avaliações</h2>
          
          <div className="space-y-4">
            {[
              { name: 'Maria S.', rating: 5, comment: 'Roteiro incrível! Cada dica foi perfeita e a viagem superou todas as expectativas.', date: 'há 2 semanas' },
              { name: 'João P.', rating: 5, comment: 'Expert muito atencioso e conhecedor. Recomendo demais!', date: 'há 1 mês' },
              { name: 'Ana L.', rating: 4, comment: 'Ótimas dicas de restaurantes e passeios. A viagem foi maravilhosa.', date: 'há 2 meses' },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-foreground-secondary">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-sm text-foreground-muted">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground-secondary">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

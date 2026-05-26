'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ChatInput } from '@/components/chat-input';
import { RouteCard } from '@/components/route-card';
import { ExpertCard } from '@/components/expert-card';
import { travelStarters, routeTemplates, experts } from '@/lib/mock-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleStartChat = (message: string) => {
    router.push(`/planner?q=${encodeURIComponent(message)}`);
  };

  const handleStarterClick = (label: string) => {
    router.push(`/planner?q=${encodeURIComponent(label)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background-secondary to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI + Experts</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Sua próxima viagem<br />
              <span className="text-primary">começa aqui.</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              Um concierge de viagens com IA, construído com conhecimento de experts reais para transformar desejo em roteiro, logística e experiências memoráveis.
            </p>
          </motion.div>

          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <ChatInput 
              onSend={handleStartChat}
              placeholder="Quer viajar? A Voya tem um roteiro para você."
              large
            />
          </motion.div>

          {/* Starters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {travelStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() => handleStarterClick(starter.label)}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm text-foreground-secondary hover:text-foreground hover:border-primary/30 transition-all"
              >
                <span className="mr-1.5">{starter.icon}</span>
                {starter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Roteiros em destaque</h2>
              <p className="text-foreground-secondary mt-1">Criados por experts para sua próxima aventura</p>
            </div>
            <Link 
              href="/explore"
              className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routeTemplates.slice(0, 3).map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <RouteCard route={route} size={index === 0 ? 'large' : 'default'} />
              </motion.div>
            ))}
          </div>

          <Link 
            href="/explore"
            className="sm:hidden flex items-center justify-center gap-1 text-primary font-medium mt-6"
          >
            Ver todos os roteiros
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-16 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Conheça nossos experts</h2>
              <p className="text-foreground-secondary mt-1">Viajantes experientes prontos para guiar você</p>
            </div>
            <Link 
              href="/experts"
              className="hidden sm:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.filter(e => e.featured).map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExpertCard expert={expert} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground">
              Pronto para transformar sua próxima viagem?
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              Comece gratuitamente e descubra como a Voya pode tornar suas viagens inesquecíveis.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/planner"
                className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors"
              >
                Começar a planejar
              </Link>
              <Link
                href="/plans"
                className="px-8 py-3 bg-card border border-border text-foreground font-medium rounded-xl hover:border-primary/30 transition-colors"
              >
                Ver planos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

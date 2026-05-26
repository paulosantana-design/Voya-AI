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
      <section className="relative overflow-hidden bg-background-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-foreground-secondary text-xs font-medium rounded-full mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Powered by AI + Experts</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
              Sua proxima viagem<br />
              comeca aqui.
            </h1>
            
            <p className="mt-5 text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto leading-relaxed">
              Um concierge de viagens com IA, construido com conhecimento de experts reais para transformar desejo em roteiro.
            </p>
          </motion.div>

          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 max-w-xl mx-auto"
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {travelStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() => handleStarterClick(starter.label)}
                className="px-3.5 py-1.5 bg-background border border-border rounded-full text-xs font-medium text-foreground-secondary hover:text-foreground hover:border-foreground/20 transition-all"
              >
                <span className="mr-1">{starter.icon}</span>
                {starter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-semibold text-foreground tracking-tight">Roteiros em destaque</h2>
              <p className="text-foreground-secondary text-sm mt-1">Criados por experts para sua proxima aventura</p>
            </div>
            <Link 
              href="/explore"
              className="hidden sm:flex items-center gap-1.5 text-sm text-foreground font-medium hover:gap-2.5 transition-all"
            >
              Ver todos
              <ArrowRight className="w-3.5 h-3.5" />
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
            className="sm:hidden flex items-center justify-center gap-1.5 text-sm text-foreground font-medium mt-8"
          >
            Ver todos os roteiros
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-semibold text-foreground tracking-tight">Conheca nossos experts</h2>
              <p className="text-foreground-secondary text-sm mt-1">Viajantes experientes prontos para guiar voce</p>
            </div>
            <Link 
              href="/experts"
              className="hidden sm:flex items-center gap-1.5 text-sm text-foreground font-medium hover:gap-2.5 transition-all"
            >
              Ver todos
              <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">
              Pronto para transformar sua proxima viagem?
            </h2>
            <p className="mt-3 text-base text-foreground-secondary">
              Comece gratuitamente e descubra como a Voya pode tornar suas viagens inesqueciveis.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/planner"
                className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                Comecar a planejar
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-6 py-2.5 bg-background border border-border text-foreground text-sm font-medium rounded-full hover:bg-muted transition-colors"
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

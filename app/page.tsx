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
    // Map starters to explore categories
    const categoryMap: Record<string, string> = {
      'Disney em família': 'disney',
      'Lua de mel': 'romantic',
      'Mochilão Europa': 'europe',
      'Japão cultural': 'asia',
      'Praias paradisíacas': 'beach',
    };
    
    const category = categoryMap[label];
    if (category) {
      router.push(`/explore?category=${category}`);
    } else {
      router.push(`/planner?q=${encodeURIComponent(label)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-foreground-muted text-[11px] font-medium rounded-full mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Powered by AI + Experts</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug tracking-tight">
              Sua proxima viagem<br />
              comeca aqui.
            </h1>
            
            <p className="mt-3 text-sm text-foreground-secondary max-w-md mx-auto leading-relaxed">
              Um concierge de viagens com IA, construido com conhecimento de experts reais para transformar desejo em roteiro.
            </p>
          </motion.div>

          {/* Chat Input */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 max-w-md mx-auto"
          >
            <ChatInput 
              onSend={handleStartChat}
              placeholder="Quer viajar? A Voya tem um roteiro para você."
              large
            />
          </motion.div>

          {/* Starters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 flex flex-wrap justify-center gap-1.5"
          >
            {travelStarters.map((starter) => (
              <button
                key={starter.id}
                onClick={() => handleStarterClick(starter.label)}
                className="px-2.5 py-1 bg-background border border-border/60 rounded-full text-[11px] font-medium text-foreground-muted hover:text-foreground hover:border-foreground/15 transition-all"
                style={{ borderWidth: '0.5px' }}
              >
                <span className="mr-0.5 opacity-70">{starter.icon}</span>
                {starter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-14 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground tracking-tight">Roteiros em destaque</h2>
              <p className="text-foreground-muted text-xs mt-0.5">Criados por experts para sua proxima aventura</p>
            </div>
            <Link 
              href="/explore"
              className="hidden sm:flex items-center gap-1 text-xs text-foreground-secondary font-medium hover:text-foreground hover:gap-1.5 transition-all"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {routeTemplates.slice(0, 3).map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <RouteCard route={route} size={index === 0 ? 'large' : 'default'} />
              </motion.div>
            ))}
          </div>

          <Link 
            href="/explore"
            className="sm:hidden flex items-center justify-center gap-1 text-xs text-foreground-secondary font-medium mt-6"
          >
            Ver todos os roteiros
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-14 bg-background-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground tracking-tight">Conheca nossos experts</h2>
              <p className="text-foreground-muted text-xs mt-0.5">Viajantes experientes prontos para guiar voce</p>
            </div>
            <Link 
              href="/experts"
              className="hidden sm:flex items-center gap-1 text-xs text-foreground-secondary font-medium hover:text-foreground hover:gap-1.5 transition-all"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.filter(e => e.featured).map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <ExpertCard expert={expert} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Pronto para transformar sua proxima viagem?
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Comece gratuitamente e descubra como a Voya pode tornar suas viagens inesqueciveis.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link
                href="/planner"
                className="w-full sm:w-auto px-5 py-2 bg-foreground text-background text-xs font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                Comecar a planejar
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-5 py-2 bg-background border border-border/60 text-foreground text-xs font-medium rounded-full hover:bg-muted transition-colors"
                style={{ borderWidth: '0.5px' }}
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

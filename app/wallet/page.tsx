'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard, Plane, ChevronRight, Gift, Shield, Crown } from 'lucide-react';
import { WalletCard, BenefitCard, MilesProgramCard } from '@/components/wallet-cards';
import { cards, milesPrograms } from '@/lib/mock-data';

export default function WalletPage() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  const totalMiles = milesPrograms.reduce((acc, prog) => acc + prog.balance, 0);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Voya Wallet</h1>
            <p className="text-foreground-secondary mt-1">Gerencie seus cartões, milhas e benefícios</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
            <Plus className="w-4 h-4" />
            Adicionar cartão
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground-secondary">Cartões</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{cards.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground-secondary">Total de milhas</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalMiles.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success-light rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-success" />
              </div>
              <span className="text-foreground-secondary">Benefícios ativos</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {cards.reduce((acc, card) => acc + card.benefits.filter(b => b.active).length, 0)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cards Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Meus Cartões</h2>
            <div className="space-y-4">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <WalletCard 
                    card={card} 
                    onClick={() => setSelectedCard(card)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Benefícios do {selectedCard.name}
            </h2>
            <div className="space-y-3">
              {selectedCard.benefits.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <BenefitCard
                    title={benefit.title}
                    description={benefit.description}
                    category={benefit.category}
                    active={benefit.active}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Miles Programs Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Programas de Milhas</h2>
            <button className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
              Adicionar programa
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {milesPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MilesProgramCard program={program} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-primary-light rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Dica da Voya</h3>
              <p className="text-foreground-secondary mt-1">
                Você tem <strong>12.000 milhas</strong> expirando em março no LATAM Pass. 
                Considere usar em um voo doméstico ou transferir para outro programa.
              </p>
              <button className="mt-3 text-primary font-medium hover:underline">
                Ver opções de uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

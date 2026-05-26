'use client';

import { motion } from 'framer-motion';
import { CreditCard, Plane, Gift, Shield, Crown, ChevronRight } from 'lucide-react';
import type { Card, MilesProgram } from '@/lib/types';

interface WalletCardProps {
  card: Card;
  onClick?: () => void;
}

export function WalletCard({ card, onClick }: WalletCardProps) {
  const brandLogos = {
    visa: '/visa-logo.svg',
    mastercard: '/mastercard-logo.svg',
    amex: '/amex-logo.svg',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left"
    >
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white aspect-[1.6/1]"
        style={{ background: card.color }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative h-full flex flex-col justify-between">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">{card.bank}</p>
              <h3 className="text-lg font-semibold">{card.name}</h3>
            </div>
            <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          {/* Middle */}
          <div className="flex items-center gap-2">
            <span className="text-2xl tracking-[0.2em] font-mono">
              •••• {card.lastDigits}
            </span>
          </div>

          {/* Bottom */}
          <div className="flex items-end justify-between">
            <div>
              {card.milesProgram && (
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  <span className="text-sm">{card.milesBalance?.toLocaleString()} milhas</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-70">{card.benefits.filter(b => b.active).length} benefícios ativos</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

interface BenefitCardProps {
  title: string;
  description: string;
  category: string;
  active: boolean;
}

export function BenefitCard({ title, description, category, active }: BenefitCardProps) {
  const categoryIcons = {
    lounge: Crown,
    insurance: Shield,
    cashback: CreditCard,
    miles: Plane,
    concierge: Gift,
    priority: Crown,
  };

  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Gift;

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      active 
        ? 'bg-card border-primary/20 shadow-sm' 
        : 'bg-muted/50 border-border opacity-60'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          active ? 'bg-primary-light' : 'bg-muted'
        }`}>
          <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-foreground-muted'}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-foreground-secondary mt-0.5">{description}</p>
        </div>
        {active && (
          <span className="px-2 py-1 text-xs font-medium bg-success-light text-success rounded-full">
            Ativo
          </span>
        )}
      </div>
    </div>
  );
}

interface MilesProgramCardProps {
  program: MilesProgram;
  onClick?: () => void;
}

export function MilesProgramCard({ program, onClick }: MilesProgramCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{program.name}</h4>
            <p className="text-2xl font-semibold text-foreground">{program.balance.toLocaleString()}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-foreground-muted" />
      </div>
      {program.expiringMiles && program.expirationDate && (
        <div className="mt-3 p-2 bg-warning-light rounded-lg">
          <p className="text-xs text-warning">
            {program.expiringMiles.toLocaleString()} milhas expiram em {new Date(program.expirationDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}
    </motion.button>
  );
}

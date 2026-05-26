'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Plan } from '@/lib/types';

interface PlanCardProps {
  plan: Plan;
  onSelect?: () => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative bg-card rounded-2xl p-6 transition-all ${
        plan.highlighted
          ? 'border-2 border-primary shadow-lg'
          : 'border border-border hover:border-primary/30'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
          Mais popular
        </div>
      )}

      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
          {plan.period && (
            <span className="text-foreground-muted">{plan.period}</span>
          )}
        </div>
        <p className="text-sm text-foreground-secondary mt-2">{plan.description}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success-light flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-success" />
            </div>
            <span className="text-sm text-foreground-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full mt-6 py-3 rounded-xl font-medium transition-colors ${
          plan.highlighted
            ? 'bg-primary text-white hover:bg-primary-hover'
            : 'bg-muted text-foreground hover:bg-border'
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

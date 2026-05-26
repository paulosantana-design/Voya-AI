'use client';

import { motion } from 'framer-motion';
import { PlanCard } from '@/components/plan-card';
import { plans } from '@/lib/mock-data';
import { Check, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você mantém acesso até o fim do período pago.',
  },
  {
    question: 'Como funciona o plano família?',
    answer: 'O plano família permite adicionar até 5 membros que podem criar e editar roteiros colaborativamente, compartilhar a mesma wallet de milhas e benefícios.',
  },
  {
    question: 'O que está incluso no plano gratuito?',
    answer: 'O plano gratuito inclui criação de até 2 roteiros por mês, chat básico com IA, sugestões de destinos e compartilhamento de roteiros.',
  },
  {
    question: 'Posso fazer upgrade do plano?',
    answer: 'Sim! Você pode fazer upgrade a qualquer momento e o valor será calculado proporcionalmente ao tempo restante do seu plano atual.',
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Escolha o plano ideal para você
          </h1>
          <p className="text-lg text-foreground-secondary mt-4 max-w-2xl mx-auto">
            De viajantes ocasionais a famílias aventureiras, temos o plano perfeito para transformar suas viagens.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlanCard 
                plan={plan} 
                onSelect={() => console.log('Selected plan:', plan.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            Compare os planos
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-foreground font-semibold">Recurso</th>
                    <th className="text-center p-4 text-foreground font-semibold">Essencial</th>
                    <th className="text-center p-4 text-foreground font-semibold bg-primary-light">Premium</th>
                    <th className="text-center p-4 text-foreground font-semibold">Família</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Roteiros por mês', essencial: '2', premium: 'Ilimitado', familia: 'Ilimitado' },
                    { feature: 'Chat com IA', essencial: 'Básico', premium: 'Avançado', familia: 'Avançado' },
                    { feature: 'Acesso a experts', essencial: false, premium: true, familia: true },
                    { feature: 'Integração com milhas', essencial: false, premium: true, familia: true },
                    { feature: 'Exportação PDF', essencial: false, premium: true, familia: true },
                    { feature: 'Membros adicionais', essencial: '-', premium: '-', familia: 'Até 5' },
                    { feature: 'Roteiros colaborativos', essencial: false, premium: false, familia: true },
                    { feature: 'Concierge prioritário', essencial: false, premium: false, familia: true },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-border last:border-b-0">
                      <td className="p-4 text-foreground-secondary">{row.feature}</td>
                      <td className="text-center p-4">
                        {typeof row.essencial === 'boolean' ? (
                          row.essencial ? (
                            <Check className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <span className="text-foreground-muted">-</span>
                          )
                        ) : (
                          <span className="text-foreground-secondary">{row.essencial}</span>
                        )}
                      </td>
                      <td className="text-center p-4 bg-primary-light/50">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <span className="text-foreground-muted">-</span>
                          )
                        ) : (
                          <span className="text-foreground font-medium">{row.premium}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.familia === 'boolean' ? (
                          row.familia ? (
                            <Check className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <span className="text-foreground-muted">-</span>
                          )
                        ) : (
                          <span className="text-foreground-secondary">{row.familia}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            Perguntas frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-foreground-secondary">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

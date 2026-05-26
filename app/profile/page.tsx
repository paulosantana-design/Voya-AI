'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  ChevronRight,
  Edit3,
  Camera
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: User, label: 'Dados pessoais', href: '#personal' },
  { icon: CreditCard, label: 'Plano e assinatura', href: '/plans' },
  { icon: Bell, label: 'Notificações', href: '#notifications' },
  { icon: Shield, label: 'Privacidade e segurança', href: '#privacy' },
];

export default function ProfilePage() {
  const [user] = useState({
    name: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, Brasil',
    memberSince: 'Janeiro 2024',
    plan: 'Premium',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <span className="px-2.5 py-1 bg-primary-light text-primary text-xs font-medium rounded-full">
                  {user.plan}
                </span>
              </div>
              
              <div className="mt-3 space-y-1 text-sm text-foreground-secondary">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Membro desde {user.memberSince}</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-xl hover:bg-border transition-colors">
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-foreground-secondary">Viagens</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">248k</p>
            <p className="text-sm text-foreground-secondary">Milhas</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">23</p>
            <p className="text-sm text-foreground-secondary">Países</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground-secondary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground-muted" />
              </Link>
            );
          })}
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preferências de viagem</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">
                Estilo de viagem preferido
              </label>
              <div className="flex flex-wrap gap-2">
                {['Conforto', 'Aventura', 'Cultural', 'Gastronômica', 'Relaxante'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 bg-primary-light text-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground-secondary mb-2">
                Destinos favoritos
              </label>
              <div className="flex flex-wrap gap-2">
                {['Europa', 'Japão', 'Estados Unidos', 'Caribe'].map((dest) => (
                  <span 
                    key={dest}
                    className="px-3 py-1.5 bg-muted text-foreground-secondary text-sm rounded-full"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 bg-card border border-border rounded-xl text-danger hover:bg-danger-light transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair da conta</span>
        </button>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageSquare, 
  Map, 
  Wallet, 
  Users, 
  Compass,
  Plane,
  Building2,
  Sparkles,
  User,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/planner', label: 'Planejar', icon: MessageSquare },
  { href: '/my-trips', label: 'Minhas Viagens', icon: Map },
  { href: '/explore', label: 'Explorar', icon: Compass },
  { href: '/flights', label: 'Voos', icon: Plane },
  { href: '/hotels', label: 'Hotéis', icon: Building2 },
  { href: '/experiences', label: 'Experiências', icon: Sparkles },
  { href: '/experts', label: 'Experts', icon: Users },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background-secondary/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-semibold text-xl text-foreground">Voya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-light rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Link 
              href="/wallet" 
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </Link>
            <Link 
              href="/experts" 
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Experts</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-muted hover:bg-border transition-colors"
            >
              <User className="w-5 h-5 text-foreground-secondary" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-background-secondary border-b border-border"
        >
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'text-foreground-secondary hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

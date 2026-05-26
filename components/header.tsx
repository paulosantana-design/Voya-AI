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
    <header className="sticky top-0 z-50 bg-background-secondary/80 backdrop-blur-lg border-b border-border/60" style={{ borderBottomWidth: '0.5px' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background font-semibold text-xs">V</span>
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight">Voya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive 
                      ? 'text-foreground bg-muted' 
                      : 'text-foreground-muted hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1.5">
            <Link 
              href="/wallet" 
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Wallet</span>
            </Link>
            <Link 
              href="/experts" 
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Experts</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-muted hover:bg-border transition-colors"
            >
              <User className="w-3.5 h-3.5 text-foreground-muted" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-full hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-foreground" />
              ) : (
                <Menu className="w-4 h-4 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="lg:hidden bg-background-secondary border-b border-border/60"
          style={{ borderBottomWidth: '0.5px' }}
        >
          <nav className="px-4 py-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-foreground-muted hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
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

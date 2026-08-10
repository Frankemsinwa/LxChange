import React, { useState } from 'react';
import { Sun, Moon, ArrowRight, Menu, X, Zap } from 'lucide-react';
import lxLogo from '../assets/logo.png';

interface NavbarProps {
  onOpenQuickTrade: (assetOrCategory?: string) => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenGetStarted: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuickTrade,
  onOpenAuth,
  onOpenGetStarted,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickPills = [
    { label: 'Sell BTC', action: 'BTC', isHot: true },
    { label: 'Sell USDT', action: 'USDT', isHot: true },
    { label: 'Sell ETH', action: 'ETH' },
    { label: 'Sell SOL', action: 'SOL' },
    { label: 'Gift cards', action: 'Gift Cards' },
    { label: 'Airtime', action: 'Airtime' },
    { label: 'Data', action: 'Data' },
    { label: 'Cable TV', action: 'Cable TV' },
    { label: 'Game credits', action: 'Game Credits' },
    { label: 'Vouchers', action: 'Vouchers' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080811]/90 backdrop-blur-xl">
      {/* Top Quick Actions Bar (Figma exact top bar) */}
      <div className="overflow-x-auto border-b border-slate-800/50 bg-[#0c0c1a]/80 py-2 px-4 no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 text-xs font-medium whitespace-nowrap">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => onOpenQuickTrade(pill.action)}
              className={`px-3 py-1 rounded-full transition-all duration-200 border flex items-center gap-1.5 ${
                pill.isHot
                  ? 'text-white border-transparent hover:opacity-90'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
              style={pill.isHot ? { background: 'linear-gradient(115.45deg, #D8582B 15.7%, #9E3B87 50%, #7023BB 84.3%)' } : undefined}
            >
              {pill.isHot && <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />}
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center group transition-transform hover:scale-[1.02]">
            <img src={lxLogo} alt="LXchange" className="h-14 w-auto" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#markets" className="hover:text-purple-400 transition-colors">Markets</a>
            <a href="#trade" className="hover:text-purple-400 transition-colors">Trade</a>
            <a href="#earn" className="hover:text-purple-400 transition-colors">Earn</a>
            <a href="#staking" className="hover:text-purple-400 transition-colors">Staking</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">Learn</a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Toggle Theme"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Sign In */}
            <button
              onClick={() => onOpenAuth('signin')}
              className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
            >
              Sign In
            </button>

            {/* Get Started CTA */}
            <button
              onClick={() => onOpenGetStarted()}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 shadow-md shadow-purple-900/30 flex items-center gap-1.5 group transition-all active:scale-95 cursor-pointer"
              style={{ background: 'linear-gradient(115.45deg, #D8582B 15.7%, #9E3B87 50%, #7023BB 84.3%)' }}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0a0a16] px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col gap-3 font-medium text-slate-300 text-base">
            <a href="#markets" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-purple-400">Markets</a>
            <a href="#trade" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-purple-400">Trade</a>
            <a href="#earn" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-purple-400">Earn</a>
            <a href="#staking" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-purple-400">Staking</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-purple-400">Learn / FAQ</a>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signin');
              }}
              className="w-full py-2.5 rounded-xl border border-slate-700 text-center font-medium text-slate-200"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGetStarted();
              }}
              className="w-full py-2.5 rounded-xl text-center font-medium text-white flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: 'linear-gradient(115.45deg, #D8582B 15.7%, #9E3B87 50%, #7023BB 84.3%)' }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

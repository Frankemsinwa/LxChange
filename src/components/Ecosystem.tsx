import React from 'react';
import {
  TrendingUp,
  CreditCard,
  Smartphone,
  Tv,
  Gamepad2,
  Ticket,
  Building2,
  BellRing,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { ProductService } from '../types/crypto';

interface EcosystemProps {
  products: ProductService[];
  onSelectProduct: (product: ProductService) => void;
}

export const Ecosystem: React.FC<EcosystemProps> = ({ products, onSelectProduct }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-fuchsia-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-indigo-400" />;
      case 'Ticket':
        return <Ticket className="w-5 h-5 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-sky-400" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5 text-rose-400" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-yellow-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-purple-500 inline-block" />
            ECOSYSTEM
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            One platform, everything.
          </h2>
        </div>

        <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
          From selling BTC to paying your DStv subscription — LXchange handles it all seamlessly with instant bank deposits.
        </p>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIconComponent(prod.icon)}
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-normal">
                  {prod.subtitle}
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

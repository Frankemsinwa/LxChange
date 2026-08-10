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
  ChevronRight,
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
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-purple-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-purple-400" />;
      case 'Ticket':
        return <Ticket className="w-5 h-5 text-purple-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5 text-purple-400" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-purple-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
            Ecosystem
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            One platform, everything.
          </h2>
        </div>

        <p className="text-slate-400 max-w-sm text-sm leading-relaxed text-right lg:text-left">
          From selling BTC to paying your DStv subscription — LXchange handles it all seamlessly with instant bank deposits.
        </p>
      </div>

      {/* Grid of Product Cards (8 cards in 4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 8).map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            className="bg-[#111222] p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {getIconComponent(prod.icon)}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm text-white">
                  {prod.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {prod.subtitle}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
};


import React from 'react';
import { Globe2, BarChart3, Coins, Percent } from 'lucide-react';

export const GlobalStats: React.FC = () => {
  const stats = [
    {
      label: 'Global Market Cap',
      value: '$2.8T',
      subtext: '+1.8% 24h',
      icon: Globe2,
    },
    {
      label: '24h Volume',
      value: '$142B',
      subtext: 'Across 40+ pairs',
      icon: BarChart3,
    },
    {
      label: 'Assets Listed',
      value: '2,847',
      subtext: 'Instant NGN pairs',
      icon: Coins,
    },
    {
      label: 'Lowest Fee',
      value: '0.1%',
      subtext: 'Zero deposit fees',
      icon: Percent,
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-xl group-hover:bg-purple-600/15 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:text-purple-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-semibold text-slate-400 mt-1">
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

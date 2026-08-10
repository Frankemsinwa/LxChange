import React from 'react';
import { ShieldCheck, Zap, Eye, Building2, Lock, Headphones } from 'lucide-react';

export const WhyLXchange: React.FC = () => {
  const features = [
    {
      title: 'Fast, precise execution',
      description:
        'Zero slippage on trades. Our proprietary engine processes orders in under 0.1 seconds.',
      icon: Zap,
    },
    {
      title: 'Lightning-fast payouts',
      description:
        'Get naira deposited to your bank account in under 10 minutes, 24 hours a day, 7 days a week.',
      icon: ShieldCheck,
    },
    {
      title: '24/7 transparent pricing',
      description:
        'What you see is what you get. Transparent 1.5% fee locked upfront, zero hidden spreads, zero surprises.',
      icon: Eye,
    },
    {
      title: 'Institutional liquidity',
      description:
        'Deep OTC desk with institutional liquidity for BTC, USDT, ETH, SOL, and more. Trade any volume smoothly.',
      icon: Building2,
    },
    {
      title: 'Secure cold storage',
      description:
        'Cold storage, mandatory 2FA, and round the clock monitoring. Protected at every step.',
      icon: Lock,
    },
    {
      title: '24/7 Premium support',
      description:
        'Connect directly with real Abuja based traders via live chat and WhatsApp, no bots, no queue delays.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
          Why LXchange
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Built for West Africa.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
            Built to last.
          </span>
        </h2>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-[#111222] p-6 sm:p-8 rounded-2xl border border-slate-800 transition-all duration-300"
            >
              <div className="mb-6 w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

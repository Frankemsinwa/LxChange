import React from 'react';
import { ShieldCheck, Zap, Eye, Building2, BellRing, Headphones } from 'lucide-react';

export const WhyLXchange: React.FC = () => {
  const features = [
    {
      title: 'Bank-grade security',
      description:
        'Cold storage, mandatory 2FA, and round the clock monitoring protected at every step.',
      icon: ShieldCheck,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Lightning Fast payouts',
      description:
        'Get naira deposited to your bank account in under 10 minutes, 24 hours a day, 7 days a week.',
      icon: Zap,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
    },
    {
      title: '100% Transparent Rates',
      description:
        'What you see is what you get. Transparent 1.5% fee locked upfront, zero hidden spreads, zero surprises.',
      icon: Eye,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Institutional Liquidity',
      description:
        'Deep OTC desk with institutional liquidity for BTC, USDT, ETH, SOL, and more. Trade any volume smoothly with zero slippage.',
      icon: Building2,
      color: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
    },
    {
      title: 'Smart Rate Alerts',
      description:
        'Set custom price triggers for BTC or USDT. Guaranteed for 15 minutes market quotes the second the market hits your targets.',
      icon: BellRing,
      color: 'from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/30',
    },
    {
      title: '24 / 7 Local support',
      description:
        'Connect directly with real Abuja based traders via live chat and WhatsApp, no bots, no queue delays.',
      icon: Headphones,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-900/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 flex items-center justify-center gap-2">
          <span className="w-2 h-0.5 bg-purple-500 inline-block" />
          WHY LXCHANGE
          <span className="w-2 h-0.5 bg-purple-500 inline-block" />
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Built for West Africa.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
            Built to last.
          </span>
        </h2>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-7 rounded-2xl border border-slate-800 relative group overflow-hidden"
            >
              <div className="mb-5 inline-flex p-3 rounded-xl bg-gradient-to-br border shadow-md">
                <Icon className={`w-6 h-6 ${feature.color.split(' ')[2]}`} />
              </div>

              <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

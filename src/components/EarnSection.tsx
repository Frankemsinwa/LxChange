import React from 'react';
import { Lock, Wallet, Flame, Users, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { YieldOption } from '../types/crypto';

interface EarnSectionProps {
  options: YieldOption[];
  onEarnClick: (option: YieldOption) => void;
}

export const EarnSection: React.FC<EarnSectionProps> = ({ options, onEarnClick }) => {
  return (
    <section id="earn" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-purple-500 inline-block" />
            EARN & STAKING
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Make your crypto work harder.
          </h2>
        </div>

        <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
          Stake, earn yield, and get rewarded for growing the LXchange community with transparent daily payouts.
        </p>
      </div>

      {/* Yield Cards Grid */}
      <div id="staking" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all duration-300 relative group flex flex-col justify-between"
          >
            {opt.badge && (
              <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md">
                {opt.badge}
              </span>
            )}

            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2">{opt.type}</div>
              <h3 className="font-heading text-lg font-bold text-white mb-4">{opt.title}</h3>

              <div className="my-4">
                <span className="text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-indigo-300">
                  {opt.apy}
                </span>
                <span className="text-xs text-slate-400 ml-1.5 font-bold">APY</span>
              </div>

              <div className="text-xs text-slate-400 font-medium mb-6 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {opt.note}
              </div>
            </div>

            <button
              onClick={() => onEarnClick(opt)}
              className="w-full py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-600 border border-purple-500/30 text-purple-200 hover:text-white font-bold text-xs transition-all duration-200 cursor-pointer text-center active:scale-95"
            >
              Earn now
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Floating Highlights Bar (Matching Figma) */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-300 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Rate Locked</div>
            <div className="text-[11px] text-slate-400">15 minutes guaranteed</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-300 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">SOL / NGN</div>
            <div className="text-[11px] text-red-400 font-mono font-semibold">₦311,400 ▼ 1.84%</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center text-blue-300 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Cold Storage</div>
            <div className="text-[11px] text-slate-400">100% asset safety · Est. 2021</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-fuchsia-900/50 flex items-center justify-center text-fuchsia-300 shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">ETH / NGN</div>
            <div className="text-[11px] text-emerald-400 font-mono font-semibold">₦6,118,500 ▲ 1.12%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

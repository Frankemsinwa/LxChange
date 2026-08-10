import React from 'react';
import { YieldOption } from '../types/crypto';

interface EarnSectionProps {
  options: YieldOption[];
  onEarnClick: (option: YieldOption) => void;
}

export const EarnSection: React.FC<EarnSectionProps> = ({ options, onEarnClick }) => {
  return (
    <section id="earn" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
            Earn & Staking
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Make your crypto work harder.
          </h2>
        </div>

        <p className="text-slate-400 max-w-sm text-sm leading-relaxed text-right lg:text-left">
          Stake, earn yield, and get rewarded for growing the LXchange community with transparent daily payouts.
        </p>
      </div>

      {/* Yield Cards Grid */}
      <div id="staking" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="bg-[#111222] p-6 rounded-2xl border border-slate-800 transition-all duration-300 relative flex flex-col justify-between"
          >
            {opt.badge && (
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-purple-600 text-white">
                {opt.badge}
              </span>
            )}

            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2">{opt.type}</div>
              <h3 className="font-heading text-lg font-bold text-white mb-4">{opt.title}</h3>

              <div className="my-4 flex items-baseline">
                <span className="text-3xl font-extrabold text-emerald-400">
                  {opt.apy}
                </span>
                <span className="text-xs text-slate-500 ml-1.5 font-bold">APY</span>
              </div>

              <div className="text-xs text-slate-400 font-medium mb-6">
                {opt.note}
              </div>
            </div>

            <button
              onClick={() => onEarnClick(opt)}
              className="w-full py-2.5 rounded-lg border border-purple-500/30 text-purple-400 hover:bg-purple-600 hover:text-white font-medium text-xs transition-all cursor-pointer text-center"
            >
              Earn now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const TradingExperience: React.FC<{ onStartTrading: () => void }> = ({ onStartTrading }) => {
  return (
    <section id="trade" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side Info */}
        <div className="space-y-6">
          <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
            Trading Experience
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Built for speed.<br />
            Designed for retail trading.
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Execute trades instantly with live market analytics and total transparent pricing. NO hidden spreads, NO delays.
          </p>

          {/* Checklist */}
          <div className="space-y-4 pt-4">
            {[
              '0.1% Trading fee locked upfront',
              'Deep liquidity on all tokens',
              'Sub 10-mins payouts to any Nigerian bank',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-slate-300">{item}</span>
              </div>
            ))}
          </div>

          {/* Start Trading CTA */}
          <div className="pt-6">
            <button
              onClick={onStartTrading}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-orange-500 hover:opacity-90 transition-opacity"
            >
              Start trading now
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="bg-[#111222] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-white">$2,450</span>
                <span className="text-xs font-semibold text-emerald-400">▲ 53.4%</span>
              </div>
              <div className="text-xs text-slate-500">Live analytics</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">164,272,050</div>
              <div className="text-xs text-slate-500">Volume</div>
            </div>
          </div>

          {/* Visual Graph Area */}
          <div className="h-48 relative mb-6">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 120 Q 50 100, 100 110 T 200 60 T 300 80 T 400 20 L 400 150 L 0 150 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M 0 120 Q 50 100, 100 110 T 200 60 T 300 80 T 400 20"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="400" cy="20" r="4" fill="#a855f7" />
            </svg>
          </div>

          {/* Grid Stats below graph */}
          <div className="grid grid-cols-4 gap-4 border-t border-slate-800 pt-6">
            <div>
              <div className="text-[10px] text-slate-500 mb-1">Market</div>
              <div className="text-sm font-semibold text-white">Bullish</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-1">Trend</div>
              <div className="text-sm font-semibold text-emerald-400">+5.4%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-1">Users</div>
              <div className="text-sm font-semibold text-white">142K</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-1">Status</div>
              <div className="text-sm font-semibold text-blue-400">Live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


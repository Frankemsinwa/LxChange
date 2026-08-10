import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { INITIAL_ORDERS } from '../data/cryptoData';

export const TradingExperience: React.FC<{ onStartTrading: () => void }> = ({ onStartTrading }) => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  return (
    <section id="trade" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs font-bold text-purple-400 tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-0.5 bg-purple-500 inline-block" />
            TRADING EXPERIENCE
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built for speed.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Designed for total clarity.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Execute trades instantly with live markets analytics and total transparent pricing. NO hidden spreads, NO delays.
          </p>

          {/* Checklist */}
          <div className="space-y-3 pt-2">
            {[
              'Live BTC/NGN analytics & order book',
              'Guaranteed 15 minutes rates locks',
              'Sub-10 minutes payouts to any Nigerian bank',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-slate-200">{item}</span>
              </div>
            ))}
          </div>

          {/* Start Trading CTA */}
          <div className="pt-4">
            <button
              onClick={onStartTrading}
              className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span>Start trading now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Preview Panel (Matching Figma) */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 glow-purple relative overflow-hidden">
            {/* Header of analytics box */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="text-xs text-slate-400 font-semibold">BTC / NGN</div>
                <div className="text-xl font-extrabold text-white font-mono flex items-center gap-2 mt-0.5">
                  ₦168,420,000
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    ▲ 2.41%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">USD Equivalent</div>
                <div className="text-sm font-mono text-slate-300 font-bold">$104,250</div>
              </div>
            </div>

            {/* Visual Waveform SVG Graph */}
            <div className="py-6">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 90">
                <defs>
                  <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 70 Q 50 30, 100 50 T 200 20 T 300 45 T 400 15 L 400 90 L 0 90 Z"
                  fill="url(#tradeGrad)"
                />
                <path
                  d="M 0 70 Q 50 30, 100 50 T 200 20 T 300 45 T 400 15"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="400" cy="15" r="5" fill="#e879f9" className="animate-ping" />
                <circle cx="400" cy="15" r="4" fill="#a855f7" />
              </svg>
            </div>

            {/* Live Order Stream List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Recent Completed Quotes
              </div>

              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-purple-300">{ord.amount}</span>
                    <span className="text-slate-500">→</span>
                    <span className="font-mono text-white font-semibold">
                      ₦{ord.ngnValue.toLocaleString()}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-semibold ${
                      ord.status === 'Paid'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : ord.status === 'Locked'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

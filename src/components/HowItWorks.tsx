import React from 'react';
import { MessageSquare, Lock, Banknote, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC<{ onStartQuote: () => void }> = ({ onStartQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Request a quote',
      description:
        "Tell us what you're selling, crypto type, amount, network. Get an instant estimate. No account needed to start.",
      icon: MessageSquare,
      color: 'from-purple-600 to-indigo-600 text-purple-300',
    },
    {
      num: '02',
      title: 'Rate gets locked',
      description:
        'A firm naira rate is sent to your chat and WhatsApp. Guaranteed for 15 minutes market moves are our risk.',
      icon: Lock,
      color: 'from-fuchsia-600 to-pink-600 text-fuchsia-300',
    },
    {
      num: '03',
      title: 'Send & receive',
      description:
        'Send the crypto. We confirm on chain and push naira to any Nigerian bank within 10 minutes.',
      icon: Banknote,
      color: 'from-indigo-600 to-purple-600 text-indigo-300',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 flex items-center justify-center gap-2">
          <span className="w-2 h-0.5 bg-purple-500 inline-block" />
          HOW IT WORKS
          <span className="w-2 h-0.5 bg-purple-500 inline-block" />
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Three steps. Ten minutes.
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-8 rounded-2xl border border-slate-800 relative group overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Step Pill Circle */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-extrabold text-lg text-white shadow-lg`}
                  >
                    {step.num}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-purple-400">
                <span>Fast & Automated</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStartQuote}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all cursor-pointer active:scale-95"
        >
          <span>Get Instant Quote Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

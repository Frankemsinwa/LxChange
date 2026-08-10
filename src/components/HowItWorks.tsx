import React from 'react';

export const HowItWorks: React.FC<{ onStartQuote: () => void }> = ({ onStartQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Plan ahead',
      description:
        "Tell us what you're selling, crypto type, amount, network. Get an instant estimate. No account needed to start.",
      color: 'from-purple-500 to-purple-700 text-purple-100',
    },
    {
      num: '02',
      title: 'Fund your wallet',
      description:
        'A firm naira rate is sent to your chat and WhatsApp. Guaranteed for 15 minutes market moves are our risk.',
      color: 'from-orange-500 to-pink-500 text-orange-100',
    },
    {
      num: '03',
      title: 'Start trading',
      description:
        'Send the crypto. We confirm on chain and push naira to any Nigerian bank within 10 minutes.',
      color: 'from-purple-500 to-purple-700 text-purple-100',
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
          How it works
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Three steps, ten minutes.
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-[#111222] p-8 rounded-2xl border border-slate-800 relative group overflow-hidden flex flex-col justify-start"
          >
            <div className="mb-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-lg shadow-lg`}
              >
                {step.num}
              </div>
            </div>

            <h3 className="font-heading text-xl font-bold text-white mb-3">
              {step.title}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};


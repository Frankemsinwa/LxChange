import React from 'react';

export const GlobalStats: React.FC = () => {
  const stats = [
    {
      label: '24h trading volume',
      value: '$1.2B',
    },
    {
      label: 'Live trades/sec',
      value: '$142B',
    },
    {
      label: 'Verified users',
      value: '2.5M+',
    },
    {
      label: 'Trade execution',
      value: '0.1S',
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#111222] p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-center transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight mb-1">
              {stat.value}
            </div>
            <div className="text-xs font-medium text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

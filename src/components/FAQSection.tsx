import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/cryptoData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
          FAQ
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Honest answers to real questions.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#111222] border-slate-700 shadow-lg'
                  : 'bg-[#111222] border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-heading text-base sm:text-lg font-bold text-white">
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform ${
                    isOpen
                      ? 'bg-purple-600 border-purple-500 text-white rotate-180'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed pt-2 font-medium">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};


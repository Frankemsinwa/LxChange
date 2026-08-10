import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#111222] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="text-[10px] font-bold text-purple-500 tracking-wider uppercase mb-3">
            Daily rate digest
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stay ahead of the crypto market.
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
            BTC / NGN and USDT / NGN rates every morning at 8 am WAT, plus alerts when key levels hit.
          </p>

          {/* Form */}
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 max-w-md mx-auto mt-4">
              <CheckCircle2 className="w-5 h-5" />
              <span>You're subscribed! Check your inbox tomorrow at 8 AM WAT.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


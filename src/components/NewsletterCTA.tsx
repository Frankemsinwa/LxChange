import React, { useState } from 'react';
import { Mail, CheckCircle2, MessageSquare, Send } from 'lucide-react';

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
      <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-r from-purple-900 via-fuchsia-900 to-indigo-950 border border-purple-500/30 shadow-2xl glow-purple-lg">
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-fuchsia-300" />
            <span>Daily rate digest</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stay ahead of the crypto market.
          </h2>

          {/* Description */}
          <p className="text-purple-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
            BTC / NGN and USDT / NGN rates every morning at 8 am WAT, plus alerts when key levels hit.
          </p>

          {/* Form */}
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-white text-purple-950 font-extrabold text-sm hover:bg-purple-100 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You're subscribed! Check your inbox tomorrow at 8 AM WAT.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

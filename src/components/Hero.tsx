import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';

interface HeroProps {
  assets: CryptoAsset[];
  onOpenTradeModal: (cryptoSymbol: string, amount: number) => void;
  onExploreMarkets: () => void;
  onOpenGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  assets,
  onOpenTradeModal,
  onExploreMarkets,
  onOpenGetStarted,
}) => {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('BTC');
  const [sellAmount, setSellAmount] = useState<string>('0.01');
  const [isQuoting, setIsQuoting] = useState<boolean>(false);

  // Find selected asset
  const currentAsset = assets.find((a) => a.symbol === selectedAssetSymbol) || assets[0];

  const parsedAmount = parseFloat(sellAmount) || 0;
  const calculatedNgnPayout = Math.round(parsedAmount * currentAsset.ngnPrice);

  const formatNgn = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[300px] bg-indigo-900/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid line pattern background matching Figma design */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [mask-image:radial-gradient(ellipse_80%_80%_at_50%_25%,#000_75%,transparent_100%)]">
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            {/* 20px fine square grid */}
            <pattern id="fineGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.75" />
            </pattern>
            {/* 160px major grid (8x8 fine squares) with intersection dots */}
            <pattern id="figmaGridWithDots" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#fineGridPattern)" />
              {/* Slightly stronger major grid lines */}
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="1" />
              {/* Intersection dots on major grid intersections */}
              <circle cx="0" cy="0" r="2.5" fill="rgba(216, 180, 254, 0.9)" />
              <circle cx="160" cy="0" r="2.5" fill="rgba(216, 180, 254, 0.9)" />
              <circle cx="0" cy="160" r="2.5" fill="rgba(216, 180, 254, 0.9)" />
              <circle cx="160" cy="160" r="2.5" fill="rgba(216, 180, 254, 0.9)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#figmaGridWithDots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400" />
              <span>Naira-first · Abuja · Est. 2021</span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Trade Crypto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-400">
                Smarter
              </span>{' '}
              with LXchange
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Trade crypto at real market rates. Enjoy locked quotes and naira payouts to any Nigerian bank in under 10 minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenGetStarted}
                className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-base"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreMarkets}
                className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all text-base cursor-pointer"
              >
                Explore Markets
              </button>
            </div>

            {/* Hero Key Metrics Bar (Matching Figma stats: ₦168M+, < 10 min, 24 / 7) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-white">₦168M+</div>
                <div className="text-xs text-slate-400 mt-0.5">BTC price today</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-fuchsia-400">&lt; 10 min</div>
                <div className="text-xs text-slate-400 mt-0.5">avg. payout time</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-white">24 / 7</div>
                <div className="text-xs text-slate-400 mt-0.5">human support</div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Quote & Trade Card Widget */}
          <div className="lg:col-span-5 relative">
            {/* Background glowing coin graphic mock */}
            <div className="absolute -top-10 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-20 blur-xl pointer-events-none" />

            {/* Interactive Card */}
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 shadow-2xl relative z-10 glow-purple">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/50 border border-purple-500/40 flex items-center justify-center font-extrabold text-purple-300 text-xs">
                    LX
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">LXchange Live Quote</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {currentAsset.symbol}/NGN
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                        LIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Crypto selector dropdown */}
                <select
                  value={selectedAssetSymbol}
                  onChange={(e) => setSelectedAssetSymbol(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-purple-500 font-semibold cursor-pointer"
                >
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.symbol}>
                      {asset.symbol} ({asset.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Banner */}
              <div className="py-4">
                <div className="text-xs text-slate-400 font-medium">Current Market Price</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                    {formatNgn(currentAsset.ngnPrice)}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      currentAsset.change24h >= 0
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {currentAsset.change24h >= 0 ? '▲' : '▼'} {Math.abs(currentAsset.change24h)}%
                  </span>
                </div>
              </div>

              {/* Interactive Calculator Box */}
              <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {/* Input: Sell */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                    <span>YOU SELL</span>
                    <span>Rate locked for 15 mins</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2.5 focus-within:border-purple-500">
                    <input
                      type="number"
                      step="any"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      className="w-full bg-transparent text-white font-mono font-bold text-lg focus:outline-none"
                      placeholder="0.00"
                    />
                    <span className="px-2 py-1 rounded bg-slate-800 text-xs font-bold text-purple-300 border border-slate-700">
                      {currentAsset.symbol}
                    </span>
                  </div>
                </div>

                {/* Arrow Divider */}
                <div className="flex justify-center -my-1">
                  <div className="w-7 h-7 rounded-full bg-purple-900/80 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Input: Receive */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                    <span>YOU RECEIVE (ESTIMATED)</span>
                    <span className="text-emerald-400 font-semibold">0% Slippage</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5">
                    <div className="w-full text-emerald-400 font-mono font-bold text-lg truncate">
                      {formatNgn(calculatedNgnPayout)}
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-950 text-xs font-bold text-emerald-300 border border-emerald-800/50">
                      NGN
                    </span>
                  </div>
                </div>
              </div>

              {/* Get Firm Quote CTA */}
              <button
                onClick={onOpenGetStarted}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                Get a firm quote
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Floating Bank Payout Badge */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold text-slate-300">Bank Payout NGN</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant settlement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker Bar Across Bottom (Matching Figma ticker) */}
      <div className="mt-16 border-y border-slate-800/80 bg-[#06060e] py-3 overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...assets, ...assets].map((asset, idx) => (
            <div key={`${asset.id}-${idx}`} className="flex items-center gap-3 text-xs font-semibold">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300">
                {asset.icon}
              </span>
              <span className="text-slate-200 font-bold">{asset.symbol}/NGN</span>
              <span className="text-white font-mono font-semibold">{formatNgn(asset.ngnPrice)}</span>
              <span
                className={`flex items-center gap-0.5 text-[11px] font-bold ${
                  asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {asset.change24h >= 0 ? '▲' : '▼'} {Math.abs(asset.change24h)}%
              </span>
              <span className="text-slate-700 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

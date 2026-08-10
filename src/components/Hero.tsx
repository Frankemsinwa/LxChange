import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RefreshCw, Check } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';
import btcCoin from '../assets/Breathe.png';
import ethCoin from '../assets/Frame.png';
import lxIcon from '../assets/Frame (1).png';
import shakeIcon from '../assets/Shake.png';
import lxLogo from '../assets/logo.png';

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

      {/* Grid line pattern background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [mask-image:radial-gradient(ellipse_80%_80%_at_50%_25%,#000_75%,transparent_100%)]">
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="fineGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.75" />
            </pattern>
            <pattern id="figmaGridWithDots" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#fineGridPattern)" />
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="1" />
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
          <div className="lg:col-span-6 space-y-7">
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Naira-first · Abuja · Est. 2021</span>
            </div>

            {/* Main Title */}
            <h1 className="text-[47px] font-bold tracking-[-1.66px] text-white leading-[1.0]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Trade Crypto <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(115.45deg, #D8582B 15.7%, #9E3B87 50%, #7023BB 84.3%)' }}>
                Smarter
              </span>{' '}
              with <br />
              LXchange
            </h1>

            {/* Subtitle */}
            <p className="text-[17.5px] text-slate-300 max-w-xl leading-[30.1px] tracking-[0px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Trade crypto at real market rates. Enjoy locked-in quotes and naira payouts to any bank in under 10 minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenGetStarted}
                className="px-7 py-3.5 rounded-xl font-bold text-white hover:opacity-90 shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-base"
                style={{ background: 'linear-gradient(115.45deg, #D8582B 15.7%, #9E3B87 50%, #7023BB 84.3%)' }}
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

            {/* Hero Key Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₦168M+</div>
                <div className="text-xs text-slate-400 mt-0.5">BTC price today</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-fuchsia-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>&lt; 10 min</div>
                <div className="text-xs text-slate-400 mt-0.5">avg. payout time</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>24 / 7</div>
                <div className="text-xs text-slate-400 mt-0.5">human support</div>
              </div>
            </div>
          </div>

          {/* Right Column: LXchange Exchange Card with Floating Crypto Icons */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px]">
            {/* Floating crypto icons around the card */}
            {/* Bitcoin gold coin - top right */}
            <img
              src={btcCoin}
              alt="Bitcoin"
              className="absolute -top-2 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full object-cover z-20 drop-shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
            />
            {/* Green/teal coin - left side */}
            <img
              src={ethCoin}
              alt="Ethereum"
              className="absolute top-1/2 -left-6 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full object-cover z-20 drop-shadow-[0_4px_15px_rgba(16,185,129,0.4)]"
            />
            {/* LXchange icon - bottom left */}
            <img
              src={lxIcon}
              alt="LXchange"
              className="absolute -bottom-4 left-8 w-14 h-14 md:w-16 md:h-16 rounded-full object-cover z-20 drop-shadow-[0_4px_15px_rgba(168,85,247,0.4)]"
            />
            {/* Shake icon - bottom right */}
            <img
              src={shakeIcon}
              alt="Crypto"
              className="absolute bottom-6 -right-2 w-12 h-12 md:w-14 md:h-14 rounded-full object-cover z-20 drop-shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
            />

            {/* Main Exchange Card */}
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 shadow-2xl relative z-10 glow-purple w-full max-w-[380px]">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-900/50 border border-purple-500/40 flex items-center justify-center overflow-hidden">
                    <img src={lxLogo} alt="LX" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    LXchange · BTC/NGN
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Large Amount Display */}
              <div className="py-3">
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  ₦168,420,000
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                    ▲ 2.41%
                  </span>
                  <span className="text-slate-400">+₦3,988,998</span>
                  <span className="text-slate-500">(24h)</span>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="pb-3">
                <svg viewBox="0 0 340 60" className="w-full h-[60px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6D4AFF" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,45 L30,42 L60,38 L90,40 L120,35 L150,30 L180,32 L210,25 L240,20 L270,18 L300,15 L340,10 L340,60 L0,60 Z"
                    fill="url(#sparkGrad)"
                  />
                  <path
                    d="M0,45 L30,42 L60,38 L90,40 L120,35 L150,30 L180,32 L210,25 L240,20 L270,18 L300,15 L340,10"
                    stroke="url(#sparkLine)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="340" cy="10" r="4" fill="#A855F7" stroke="#1a1a2e" strokeWidth="2" />
                </svg>
              </div>

              {/* Sell & Receive Fields - Side by Side */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {/* YOU SELL */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">You Sell</div>
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                    <input
                      type="number"
                      step="any"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      className="w-full bg-transparent text-white font-mono font-bold text-sm focus:outline-none min-w-0"
                      placeholder="0.00"
                    />
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-purple-300 border border-slate-700 flex-shrink-0">
                      {currentAsset.symbol}
                    </span>
                  </div>
                </div>

                {/* YOU RECEIVE */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">You Receive</div>
                  <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg p-2.5">
                    <div className="w-full text-emerald-400 font-mono font-bold text-sm truncate min-w-0">
                      {formatNgn(calculatedNgnPayout)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Firm Quote CTA */}
              <button
                onClick={onOpenGetStarted}
                className="w-full mt-5 py-3 rounded-xl text-white font-bold text-sm shadow-md shadow-purple-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #6D4AFF 0%, #A855F7 100%)' }}
              >
                Get a firm quote
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Bank Payout Badge */}
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

      {/* Marquee Ticker Bar */}
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

import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  Gift,
  Megaphone,
  Rocket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AdAccent, PlatformAd } from '../types/crypto';

const ROTATION_MS = 5000;

const AD_ICONS: Record<string, LucideIcon> = {
  BadgePercent,
  Rocket,
  Gift,
  Megaphone,
};

const ACCENT_STYLES: Record<
  AdAccent,
  { orb: string; chip: string; cta: string; glow: string; dot: string; bar: string }
> = {
  purple: {
    orb: 'from-purple-500 via-fuchsia-500 to-indigo-500',
    chip: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    cta: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500',
    glow: 'bg-purple-900',
    dot: 'bg-purple-400',
    bar: 'bg-purple-500',
  },
  amber: {
    orb: 'from-amber-400 via-orange-500 to-rose-500',
    chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    cta: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500',
    glow: 'bg-amber-800',
    dot: 'bg-amber-400',
    bar: 'bg-amber-400',
  },
  emerald: {
    orb: 'from-emerald-400 via-teal-500 to-cyan-500',
    chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    cta: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500',
    glow: 'bg-emerald-800',
    dot: 'bg-emerald-400',
    bar: 'bg-emerald-400',
  },
  cyan: {
    orb: 'from-cyan-400 via-sky-500 to-blue-600',
    chip: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    cta: 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500',
    glow: 'bg-cyan-800',
    dot: 'bg-cyan-400',
    bar: 'bg-cyan-400',
  },
};

interface CryptoTickerProps {
  ads: PlatformAd[];
}

export const CryptoTicker: React.FC<CryptoTickerProps> = ({ ads }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = ads.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return undefined;
    const interval = setInterval(next, ROTATION_MS);
    return () => clearInterval(interval);
  }, [paused, next]);

  if (total === 0) return null;

  const ad = ads[active];
  const Icon = AD_ICONS[ad.icon] ?? Megaphone;
  const accent = ACCENT_STYLES[ad.accent] ?? ACCENT_STYLES.purple;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Featured promotions">
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#111222]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        {/* Accent glow keyed to active ad */}
        <div
          key={`glow-${ad.id}`}
          className={`pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full blur-3xl animate-ad-glow ${accent.glow}`}
        />

        {/* Slide */}
        <div key={`slide-${ad.id}`} className="relative p-6 sm:p-10 lg:p-12 animate-ad-entry">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Copy */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  <Megaphone className="w-3 h-3 text-purple-400" />
                  Ad
                </span>
                <span
                  className={`inline-flex px-2.5 py-1 rounded-md border text-[10px] font-bold tracking-wider uppercase ${accent.chip}`}
                >
                  {ad.tag}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {ad.headline}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl">
                {ad.subtext}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer ${accent.cta}`}
                >
                  {ad.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  {ad.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                        {stat.label}
                      </div>
                      <div className="text-sm font-bold text-white font-heading mt-0.5">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-slate-600/40 animate-spin-slow" />
                <div
                  className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${accent.orb} shadow-2xl flex items-center justify-center glow-purple`}
                >
                  <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
                </div>
                <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse border-2 border-[#111222]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer: counter + dots + arrows */}
        <div className="relative flex items-center justify-between gap-4 px-6 pb-6 sm:px-10 lg:px-12">
          <div className="font-mono text-xs text-slate-500 font-semibold tracking-widest">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          <div className="flex items-center gap-2">
            {ads.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActive(idx)}
                aria-label={`Show ad ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === active ? `${accent.dot} w-8` : 'bg-slate-700 w-2 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous ad"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next ad"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-slate-800/80">
          <div
            key={`progress-${active}`}
            className={`h-full ${accent.bar} animate-ad-progress rounded-r-full ${
              paused ? '[animation-play-state:paused]' : ''
            }`}
            style={{ animationDuration: `${ROTATION_MS}ms` }}
          />
        </div>
      </div>
    </section>
  );
};
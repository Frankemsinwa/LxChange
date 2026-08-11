import React from 'react';
import { CryptoAsset } from '../types/crypto';

interface CryptoTickerProps {
  assets: CryptoAsset[];
}

export const CryptoTicker: React.FC<CryptoTickerProps> = ({ assets }) => {
  const formatNgn = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: val < 1000 ? 2 : 0,
    }).format(val);
  };

  const doubledAssets = [...assets, ...assets, ...assets, ...assets];

  return (
    <section className="py-8 border-y border-slate-800/60 bg-[#0a0a18] overflow-hidden">
      <div className="animate-marquee flex items-center gap-5 whitespace-nowrap">
        {doubledAssets.map((asset, idx) => {
          const isPositive = asset.change24h >= 0;
          return (
            <div
              key={`${asset.id}-ticker-${idx}`}
              className="flex items-center gap-3 bg-[#121224] px-4 py-3 rounded-2xl border border-slate-800/60 flex-shrink-0"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-base flex-shrink-0">
                {asset.icon}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {asset.symbol}/NGN
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  {formatNgn(asset.ngnPrice)}
                </span>
              </div>

              {/* Change Badge */}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold flex-shrink-0 ${
                isPositive
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-red-500/15 text-red-400'
              }`}>
                <span>{isPositive ? '▲' : '▼'}</span>
                <span>{Math.abs(asset.change24h)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

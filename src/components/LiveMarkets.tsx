import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';

interface LiveMarketsProps {
  assets: CryptoAsset[];
  onTradeAsset: (asset: CryptoAsset) => void;
}

export const LiveMarkets: React.FC<LiveMarketsProps> = ({ assets, onTradeAsset }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'gainers' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'gainers') return asset.change24h > 0;
    // favorites not implemented in data yet, just show all for now
    return true;
  });

  const formatNgn = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: val < 1000 ? 2 : 0,
    }).format(val);
  };

  const renderSparkline = (points: number[], isPositive: boolean) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const pathD = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#10b981' : '#ef4444';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <section id="markets" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="font-heading text-xl font-bold text-white tracking-tight">
          Naira pairs. Zero-detours.
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pairs..."
              className="pl-9 pr-3 py-2 rounded-lg bg-[#111222] border border-slate-800/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-40"
            />
          </div>
          
          <button
            onClick={() => setFilterTab('gainers')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              filterTab === 'gainers' ? 'bg-[#111222] text-white border border-slate-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Top gainers
          </button>
          
          <button
            onClick={() => setFilterTab('favorites')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              filterTab === 'favorites' ? 'bg-[#111222] text-white border border-slate-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {/* Markets Table */}
      <div className="bg-[#111222] rounded-2xl border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/50 text-[11px] font-semibold text-slate-400 tracking-wider">
                <th className="py-4 px-6">Asset Pair</th>
                <th className="py-4 px-4">NGN Price</th>
                <th className="py-4 px-4">USD Price</th>
                <th className="py-4 px-4">24h Change</th>
                <th className="py-4 px-4 hidden md:table-cell">Mkt Cap</th>
                <th className="py-4 px-4 hidden lg:table-cell">24h Vol</th>
                <th className="py-4 px-4 hidden sm:table-cell"></th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-800/20 transition-colors group cursor-pointer"
                    onClick={() => onTradeAsset(asset)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${asset.iconBg.replace('rounded-xl', '').replace('border', 'border-0').trim()} bg-opacity-20`}>
                          {asset.icon}
                        </div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {asset.symbol}
                          <span className="text-xs text-slate-500 font-normal">
                            {asset.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-white whitespace-nowrap">
                      {formatNgn(asset.ngnPrice)}
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs font-medium whitespace-nowrap">
                      ${asset.usdPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4 font-medium whitespace-nowrap">
                      <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
                        {isPositive ? '+' : ''}{asset.change24h}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs hidden md:table-cell whitespace-nowrap">
                      {asset.marketCap}
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs hidden lg:table-cell whitespace-nowrap">
                      {asset.volume24h}
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      {renderSparkline(asset.sparkline, isPositive)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTradeAsset(asset);
                        }}
                        className="px-5 py-1.5 rounded-lg border border-purple-500/30 text-purple-400 font-medium text-xs hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};



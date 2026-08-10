import React, { useState, useEffect } from 'react';
import {
  Search,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Filter,
  BarChart2,
  Activity,
  Maximize2,
  X,
  Zap,
  ArrowDownRight,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CryptoAsset } from '../types/crypto';

interface LiveMarketsProps {
  assets: CryptoAsset[];
  onTradeAsset: (asset: CryptoAsset) => void;
}

export const LiveMarkets: React.FC<LiveMarketsProps> = ({ assets, onTradeAsset }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'gainers' | 'trending'>('all');
  const [chartMode, setChartMode] = useState<'candles' | 'line' | 'range'>('candles');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedAssetForChart, setSelectedAssetForChart] = useState<CryptoAsset | null>(assets[0]);
  const [timeframe, setTimeframe] = useState<'15M' | '1H' | '4H' | '1D' | '1W'>('1D');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', { hour12: false }) + ' WAT'
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'gainers') return asset.change24h > 0;
    if (filterTab === 'trending') return asset.isTrending;
    return true;
  });

  const formatNgn = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: val < 1000 ? 2 : 0,
    }).format(val);
  };

  // Convert sparkline points to OHLC Candlestick data points
  const generateCandlesFromSparkline = (points: number[]) => {
    const candles = [];
    for (let i = 0; i < points.length - 1; i++) {
      const open = points[i];
      const close = points[i + 1];
      const diff = Math.abs(close - open);
      // Realistic high/low wicks based on volatility
      const seed = ((i + 1) * 37) % 100;
      const high = Math.max(open, close) + (diff * 0.4 + (open * (seed / 5000)));
      const low = Math.min(open, close) - (diff * 0.35 + (open * ((100 - seed) / 5000)));
      candles.push({ open, close, high, low, idx: i });
    }
    return candles;
  };

  // Renders a mini SVG Candlestick chart
  const renderMiniCandlesticks = (points: number[]) => {
    const candles = generateCandlesFromSparkline(points);
    const allValues = candles.flatMap((c) => [c.low, c.high]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = max - min || 1;

    const width = 110;
    const height = 36;
    const candleWidth = 8;
    const gap = (width - candles.length * candleWidth) / (candles.length + 1);

    return (
      <svg width={width} height={height} className="overflow-visible">
        {candles.map((candle, idx) => {
          const isBull = candle.close >= candle.open;
          const x = gap + idx * (candleWidth + gap);

          const yHigh = height - ((candle.high - min) / range) * (height - 6) - 3;
          const yLow = height - ((candle.low - min) / range) * (height - 6) - 3;
          const yOpen = height - ((candle.open - min) / range) * (height - 6) - 3;
          const yClose = height - ((candle.close - min) / range) * (height - 6) - 3;

          const topY = Math.min(yOpen, yClose);
          const bodyHeight = Math.max(Math.abs(yOpen - yClose), 1.5);
          const strokeColor = isBull ? '#10b981' : '#ef4444';
          const fillColor = isBull ? '#10b981' : '#ef4444';

          return (
            <g key={idx}>
              {/* Wick Line */}
              <line
                x1={x + candleWidth / 2}
                y1={yHigh}
                x2={x + candleWidth / 2}
                y2={yLow}
                stroke={strokeColor}
                strokeWidth="1.2"
              />
              {/* Candle Body */}
              <rect
                x={x}
                y={topY}
                width={candleWidth}
                height={bodyHeight}
                fill={fillColor}
                rx="1"
              />
            </g>
          );
        })}
      </svg>
    );
  };

  // Renders a smooth line area chart
  const renderSparkline = (points: number[], isPositive: boolean) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 110;
    const height = 36;

    const pathD = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 8) - 4;
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Renders 24h High/Low range slider bar
  const renderRangeBar = (asset: CryptoAsset) => {
    const min = Math.min(...asset.sparkline);
    const max = Math.max(...asset.sparkline);
    const current = asset.ngnPrice;
    const pct = Math.min(Math.max(((current - min) / (max - min || 1)) * 100, 5), 95);

    return (
      <div className="w-[110px] space-y-1">
        <div className="flex justify-between text-[9px] font-mono text-slate-500">
          <span>L: {formatNgn(min).slice(0, 7)}</span>
          <span>H: {formatNgn(max).slice(0, 7)}</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-800 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  };

  // Pro Candlestick Large Chart Renderer for Selected Asset
  const renderProCandlestickChart = (asset: CryptoAsset) => {
    const candles = generateCandlesFromSparkline(asset.sparkline);
    const allValues = candles.flatMap((c) => [c.low, c.high]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = max - min || 1;

    const width = 520;
    const height = 180;
    const candleWidth = 24;
    const gap = (width - candles.length * candleWidth) / (candles.length + 1);

    return (
      <div className="relative">
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Horizontal Grid lines */}
          {[0.2, 0.5, 0.8].map((pct, idx) => (
            <line
              key={idx}
              x1="0"
              y1={height * pct}
              x2={width}
              y2={height * pct}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="4 4"
            />
          ))}

          {candles.map((candle, idx) => {
            const isBull = candle.close >= candle.open;
            const x = gap + idx * (candleWidth + gap);

            const yHigh = height - ((candle.high - min) / range) * (height - 24) - 12;
            const yLow = height - ((candle.low - min) / range) * (height - 24) - 12;
            const yOpen = height - ((candle.open - min) / range) * (height - 24) - 12;
            const yClose = height - ((candle.close - min) / range) * (height - 24) - 12;

            const topY = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(Math.abs(yOpen - yClose), 3);
            const strokeColor = isBull ? '#10b981' : '#ef4444';
            const fillColor = isBull ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)';

            return (
              <g key={idx} className="hover:opacity-100 transition-opacity cursor-pointer">
                {/* Wick */}
                <line
                  x1={x + candleWidth / 2}
                  y1={yHigh}
                  x2={x + candleWidth / 2}
                  y2={yLow}
                  stroke={strokeColor}
                  strokeWidth="1.8"
                />
                {/* Candle Body */}
                <rect
                  x={x}
                  y={topY}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="1"
                  rx="2"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <section id="markets" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-purple-500 inline-block" />
            LIVE MARKETS · PRO DESK
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Naira pairs. Institutional speed.
          </h2>
        </div>

        {/* Controls Bar: Time, Search, Filter Pills, Chart Mode Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Display Mode Selector (Candles vs Line vs Range) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setChartMode('candles')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                chartMode === 'candles'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Candlestick View"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Candles</span>
            </button>
            <button
              onClick={() => setChartMode('line')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                chartMode === 'line'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Line Chart View"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Line</span>
            </button>
            <button
              onClick={() => setChartMode('range')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                chartMode === 'range'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="High/Low Range"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">24h Range</span>
            </button>
          </div>

          {/* Live WAT Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-purple-300">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{currentTime || '15:51:36 WAT'}</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pairs..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-36 sm:w-44"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {(['all', 'gainers', 'trending'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRO TRADING DESK PREVIEW PANEL (Interactive Chart Header for Selected Asset) */}
      {selectedAssetForChart && (
        <div className="mb-6 rounded-2xl bg-[#0b0c1b] border border-purple-500/30 p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Asset Info & Live Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-lg ${selectedAssetForChart.iconBg}`}>
                    {selectedAssetForChart.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-xl font-extrabold text-white">
                        {selectedAssetForChart.symbol}/NGN
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-[10px] font-bold text-purple-300 uppercase">
                        Spot Pro
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{selectedAssetForChart.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => onTradeAsset(selectedAssetForChart)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant Trade</span>
                </button>
              </div>

              {/* Price & 24h Change */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  {formatNgn(selectedAssetForChart.ngnPrice)}
                </span>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                    selectedAssetForChart.change24h >= 0
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {selectedAssetForChart.change24h >= 0 ? '▲ +' : '▼ '}
                  {selectedAssetForChart.change24h}%
                </span>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#070814] border border-slate-800 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">USD Rate</div>
                  <div className="font-bold text-slate-200">${selectedAssetForChart.usdPrice}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">24h Vol</div>
                  <div className="font-bold text-slate-200">{selectedAssetForChart.volume24h}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Orderbook</div>
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Deep
                  </div>
                </div>
              </div>

              {/* Technical Indicator Badges */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  RSI(14): <strong className="text-purple-300">58.4</strong>
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  MA(20): <strong className="text-purple-300">Bullish</strong>
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  Spread: <strong className="text-emerald-400">0.02%</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Pro Candlestick Chart Display */}
            <div className="lg:col-span-7 bg-[#060712] rounded-xl p-4 border border-slate-800/80">
              {/* Timeframe Selector Bar */}
              <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400">
                  {(['15M', '1H', '4H', '1D', '1W'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                        timeframe === tf
                          ? 'bg-purple-600 text-white'
                          : 'hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                  <BarChart2 className="w-3 h-3" />
                  <span>CANDLESTICK OHLC · REAL-TIME</span>
                </div>
              </div>

              {/* Chart SVG Canvas */}
              {renderProCandlestickChart(selectedAssetForChart)}
            </div>
          </div>
        </div>
      )}

      {/* Markets Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Asset Pair</th>
                <th className="py-4 px-4">NGN Price</th>
                <th className="py-4 px-4">USD Price</th>
                <th className="py-4 px-4">24h Change</th>
                <th className="py-4 px-4 hidden md:table-cell">Mkt Cap</th>
                <th className="py-4 px-4 hidden lg:table-cell">24h Vol</th>
                <th className="py-4 px-4 hidden sm:table-cell">
                  {chartMode === 'candles'
                    ? '7-Day Candles'
                    : chartMode === 'line'
                    ? '7-Day Trend'
                    : '24h High/Low'}
                </th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm font-medium">
              {filteredAssets.map((asset) => {
                const isPositive = asset.change24h >= 0;
                const isSelected = selectedAssetForChart?.id === asset.id;

                return (
                  <tr
                    key={asset.id}
                    className={`transition-colors group cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/30 hover:bg-purple-950/40'
                        : 'hover:bg-slate-900/60'
                    }`}
                    onClick={() => setSelectedAssetForChart(asset)}
                  >
                    {/* Asset Name & Icon */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border font-bold text-base ${asset.iconBg}`}
                        >
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            {asset.symbol}
                            <span className="text-xs text-slate-400 font-normal">
                              / NGN
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">{asset.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* NGN Price */}
                    <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                      {formatNgn(asset.ngnPrice)}
                    </td>

                    {/* USD Price */}
                    <td className="py-4 px-4 font-mono text-slate-300 text-xs whitespace-nowrap">
                      ${asset.usdPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* 24h % */}
                    <td className="py-4 px-4 font-mono font-bold whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                          isPositive
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/15 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {isPositive ? '▲ +' : '▼ '}
                        {asset.change24h}%
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="py-4 px-4 font-mono text-slate-400 text-xs hidden md:table-cell whitespace-nowrap">
                      {asset.marketCap}
                    </td>

                    {/* 24h Volume */}
                    <td className="py-4 px-4 font-mono text-slate-400 text-xs hidden lg:table-cell whitespace-nowrap">
                      {asset.volume24h}
                    </td>

                    {/* Sparkline / Candlestick Chart Column */}
                    <td className="py-4 px-4 hidden sm:table-cell">
                      {chartMode === 'candles'
                        ? renderMiniCandlesticks(asset.sparkline)
                        : chartMode === 'line'
                        ? renderSparkline(asset.sparkline, isPositive)
                        : renderRangeBar(asset)}
                    </td>

                    {/* Action Trade Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTradeAsset(asset);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 font-semibold text-xs transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
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

        {/* Footnote */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <span>Rates refresh continuously</span>
          <span>·</span>
          <span>Rate locked on quote</span>
          <span>·</span>
          <span className="text-purple-300 font-semibold">
            Market moves after lock are on us
          </span>
        </div>
      </div>
    </section>
  );
};


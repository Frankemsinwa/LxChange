import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlobalStats } from './components/GlobalStats';
import { LiveMarkets } from './components/LiveMarkets';
import { WhyLXchange } from './components/WhyLXchange';
import { Ecosystem } from './components/Ecosystem';
import { HowItWorks } from './components/HowItWorks';
import { TradingExperience } from './components/TradingExperience';
import { EarnSection } from './components/EarnSection';
import { FAQSection } from './components/FAQSection';
import { NewsletterCTA } from './components/NewsletterCTA';
import { Footer } from './components/Footer';
import { TradeModal } from './components/TradeModal';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { GetStartedModal } from './components/GetStartedModal';
import { TradeDeskChatModal } from './components/TradeDeskChatModal';

import { INITIAL_CRYPTO_ASSETS, ECOSYSTEM_PRODUCTS, YIELD_OPTIONS } from './data/cryptoData';
import { CryptoAsset, ProductService, YieldOption } from './types/crypto';

interface ActiveTicket {
  ticketId: string;
  tradeSummary: string;
  email: string;
  createdAt: Date;
}

export default function App() {
  const [assets, setAssets] = useState<CryptoAsset[]>(INITIAL_CRYPTO_ASSETS);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Trade Modal State
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedTradeSymbol, setSelectedTradeSymbol] = useState('BTC');
  const [selectedTradeAmount, setSelectedTradeAmount] = useState(0.01);

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductService | null>(null);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Get Started Flow Overlay State
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [getStartedType, setGetStartedType] = useState<'crypto' | 'giftcard'>('crypto');

  // Trade Desk Live Chat Overlay State
  const [chatDeskOpen, setChatDeskOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<ActiveTicket | null>(null);

  // Simulate subtle real-time price fluctuations for live trading feel
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Slight random percentage change (-0.15% to +0.15%)
          const pctChange = (Math.random() - 0.49) * 0.3;
          const newNgn = Math.round(asset.ngnPrice * (1 + pctChange / 100));
          const newUsd = Number((asset.usdPrice * (1 + pctChange / 100)).toFixed(2));
          const newChange24h = Number((asset.change24h + pctChange * 0.1).toFixed(2));

          const updatedSparkline = [...asset.sparkline.slice(1), newNgn];

          return {
            ...asset,
            ngnPrice: newNgn,
            usdPrice: newUsd,
            change24h: newChange24h,
            sparkline: updatedSparkline,
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenGetStarted = (type: 'crypto' | 'giftcard' = 'crypto') => {
    setGetStartedType(type);
    setGetStartedOpen(true);
  };

  const handleOpenQuickTrade = (assetSymbolOrCategory?: string) => {
    if (assetSymbolOrCategory) {
      const lower = assetSymbolOrCategory.toLowerCase();
      if (lower.includes('gift')) {
        handleOpenGetStarted('giftcard');
        return;
      }

      const foundAsset = assets.find(
        (a) => a.symbol.toUpperCase() === assetSymbolOrCategory.toUpperCase()
      );

      if (foundAsset) {
        handleOpenGetStarted('crypto');
        return;
      }

      // Check if it's a product category
      const foundProduct = ECOSYSTEM_PRODUCTS.find(
        (p) => p.title.toLowerCase().includes(assetSymbolOrCategory.toLowerCase())
      );
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        return;
      }
    }

    handleOpenGetStarted('crypto');
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleTradeAsset = (asset: CryptoAsset) => {
    handleOpenGetStarted('crypto');
  };

  const handleEarnClick = (option: YieldOption) => {
    handleOpenGetStarted('crypto');
  };

  const handleOpenLiveChatFromTicket = (ticketDetails?: { ticketId: string; tradeSummary: string; email: string }) => {
    if (ticketDetails) {
      setActiveTicket({
        ...ticketDetails,
        createdAt: new Date(),
      });
    }
    setChatDeskOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#080811] text-slate-100' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Navigation Header */}
      <Navbar
        onOpenQuickTrade={handleOpenQuickTrade}
        onOpenAuth={handleOpenAuth}
        onOpenGetStarted={() => handleOpenGetStarted('crypto')}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          assets={assets}
          onOpenTradeModal={(sym, amt) => {
            handleOpenGetStarted('crypto');
          }}
          onExploreMarkets={() => {
            const el = document.getElementById('markets');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenGetStarted={() => handleOpenGetStarted('crypto')}
        />

        {/* Global Market Stats Bar */}
        <GlobalStats />

        {/* Live Markets Section */}
        <LiveMarkets assets={assets} onTradeAsset={handleTradeAsset} />

        {/* Why LXchange Section */}
        <WhyLXchange />

        {/* Ecosystem Section */}
        <Ecosystem
          products={ECOSYSTEM_PRODUCTS}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />

        {/* How It Works Section */}
        <HowItWorks onStartQuote={() => handleOpenGetStarted('crypto')} />

        {/* Trading Experience Section */}
        <TradingExperience onStartTrading={() => handleOpenGetStarted('crypto')} />

        {/* Earn & Staking Section */}
        <EarnSection options={YIELD_OPTIONS} onEarnClick={handleEarnClick} />

        {/* FAQ Section */}
        <FAQSection />

        {/* Newsletter / Rate Digest CTA Banner */}
        <NewsletterCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Live Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatDeskOpen(true)}
          className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-purple-900/50 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-purple-400/30 group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-purple-900 animate-pulse" />
          </div>
          <span>LX Trade Desk</span>
          {activeTicket && (
            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold font-mono">
              1
            </span>
          )}
        </button>
      </div>

      {/* Get Started Multi-Step Overlay (Design Flow: Step 1 -> Step 2 -> Step 3) */}
      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        assets={assets}
        initialType={getStartedType}
        onOpenLiveChat={handleOpenLiveChatFromTicket}
      />

      {/* LXchange Trade Desk Live Chat Overlay */}
      <TradeDeskChatModal
        isOpen={chatDeskOpen}
        onClose={() => setChatDeskOpen(false)}
        assets={assets}
        activeTicket={activeTicket}
        onOpenTradeForm={() => {
          setChatDeskOpen(false);
          setGetStartedOpen(true);
        }}
      />

      {/* Interactive Trade Modal */}
      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        initialAssetSymbol={selectedTradeSymbol}
        initialAmount={selectedTradeAmount}
        assets={assets}
      />

      {/* Interactive Ecosystem Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

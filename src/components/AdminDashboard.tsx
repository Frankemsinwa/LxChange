import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Zap,
  Coins,
  Link as LinkIcon,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Info,
  DollarSign,
  TrendingUp,
  X,
  Filter,
  Megaphone,
  Rocket,
  Gift,
  BadgePercent,
  Sparkles,
  Eye,
  Menu
} from 'lucide-react';

// Data Interfaces
interface TradeRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  type: 'crypto' | 'giftcard';
  assetName: string;
  actionDetails: string;
  estValue: string;
  status: 'New' | 'Quoted' | 'Settled' | 'Completed';
  receivedTime: string;
}

interface VTUOrder {
  orderId: string;
  product: string;
  provider: 'VTpass' | 'Reloadly' | 'Razer Gold' | 'UniPin';
  amount: string;
  status: 'Delivered' | 'Failed — retry' | 'Processing';
  customerInfo: string;
  failureReason?: string;
}

interface TradeRate {
  id: string;
  asset: string;
  category: 'crypto' | 'giftcard';
  networkOrType: string;
  buyAt: string;
  sellAt: string;
  marketRef: string;
  margin: string;
  status: 'Active' | 'Paused';
}

interface VTUPriceRow {
  id: string;
  category: string;
  model: 'Commission' | 'Commission+fee' | 'Markup';
  providerCost: string;
  marginValue: string;
  marginType: 'percent' | 'fee';
  customerPays: string;
  youEarn: string;
  earnPercent: string;
}

interface PartnerLink {
  id: string;
  partner: string;
  placement: 'Secure Crypto Page' | 'Rate Pages Sidebar' | 'Blog Posts' | 'Gaming Top-up Pages' | 'Footer Banner';
  targetUrl: string;
  clicks: number;
  estEarnings: string;
  status: 'Active' | 'Paused';
}

export interface HomepageAd {
  id: string;
  tag: string;
  headline: string;
  subtext: string;
  icon: 'BadgePercent' | 'Rocket' | 'Gift' | 'Megaphone';
  accent: 'purple' | 'amber' | 'emerald' | 'cyan';
  cta: string;
  targetUrl?: string;
  statLabel1: string;
  statValue1: string;
  statLabel2: string;
  statValue2: string;
  status: 'Active' | 'Paused';
}

export const AdminDashboard: React.FC<{ onBackToSite?: () => void }> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'trade-requests' | 'vtu-orders' | 'rates' | 'affiliates'>('trade-requests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ---------------- STATE 1: TRADE REQUESTS (Customer Stream) ----------------
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([
    {
      id: 'TR-108',
      customerName: 'Chidi O.',
      customerPhone: '+234 803 445 1142',
      type: 'crypto',
      assetName: 'USDT',
      actionDetails: 'Sell 500 USDT',
      estValue: '₦732,500',
      status: 'New',
      receivedTime: '2 min ago',
    },
    {
      id: 'TR-107',
      customerName: 'Amaka E.',
      customerPhone: '+234 812 990 8830',
      type: 'giftcard',
      assetName: 'iTunes $200',
      actionDetails: 'Sell iTunes Physical Card ($200)',
      estValue: '₦256,000',
      status: 'New',
      receivedTime: '11 min ago',
    },
    {
      id: 'TR-106',
      customerName: 'Yusuf B.',
      customerPhone: '+234 705 112 2214',
      type: 'crypto',
      assetName: 'BTC',
      actionDetails: 'Sell 0.05 BTC',
      estValue: '₦8,045,000',
      status: 'New',
      receivedTime: '26 min ago',
    },
    {
      id: 'TR-105',
      customerName: 'Tunde A.',
      customerPhone: '+234 902 334 5561',
      type: 'giftcard',
      assetName: 'Steam $100',
      actionDetails: 'Sell Steam E-Code ($100)',
      estValue: '₦119,000',
      status: 'Quoted',
      receivedTime: '48 min ago',
    },
    {
      id: 'TR-104',
      customerName: 'Blessing N.',
      customerPhone: '+234 816 778 0097',
      type: 'crypto',
      assetName: 'USDT',
      actionDetails: 'Sell 1,200 USDT',
      estValue: '₦1,758,000',
      status: 'Settled',
      receivedTime: '1 hr ago',
    },
  ]);

  const [tradeFilterStatus, setTradeFilterStatus] = useState<string>('All');
  const [selectedTrade, setSelectedTrade] = useState<TradeRequest | null>(null);

  // ---------------- STATE 2: VTU ORDERS (Automated Stream) ----------------
  const [vtuOrders, setVtuOrders] = useState<VTUOrder[]>([
    { orderId: '#1042', product: 'MTN Data 10GB', provider: 'VTpass', amount: '₦5,500', status: 'Delivered', customerInfo: '08034567890' },
    { orderId: '#1041', product: 'CODM · 800 CP', provider: 'Razer Gold', amount: '₦14,200', status: 'Delivered', customerInfo: 'User ID: 6849302' },
    { orderId: '#1040', product: 'DSTV Compact', provider: 'VTpass', amount: '₦19,000', status: 'Failed — retry', customerInfo: 'Smartcard: 1049204910', failureReason: 'VTpass Timeout: Smartcard Verification Service Unreachable' },
    { orderId: '#1039', product: 'Free Fire · 1,080 💎', provider: 'UniPin', amount: '₦11,800', status: 'Delivered', customerInfo: 'Player ID: 9940321' },
    { orderId: '#1038', product: 'Airtel Airtime', provider: 'VTpass', amount: '₦2,000', status: 'Delivered', customerInfo: '08021234567' },
    { orderId: '#1037', product: 'PUBG · 660 UC', provider: 'Razer Gold', amount: '₦13,500', status: 'Delivered', customerInfo: 'Character ID: 51294801' },
  ]);

  const [vtuFilterStatus, setVtuFilterStatus] = useState<string>('All');

  // ---------------- STATE 3: ASSETS & RATES (Admin Master Control) ----------------
  const [tradeRates, setTradeRates] = useState<TradeRate[]>([
    { id: '1', asset: 'USDT', category: 'crypto', networkOrType: 'TRC20 / BEP20', buyAt: '1,465', sellAt: '1,510', marketRef: '1,487', margin: '1.5%', status: 'Active' },
    { id: '2', asset: 'BTC', category: 'crypto', networkOrType: 'Native Bitcoin', buyAt: '160,900,000', sellAt: '165,800,000', marketRef: '163,400,000', margin: '1.5%', status: 'Active' },
    { id: '3', asset: 'ETH', category: 'crypto', networkOrType: 'ERC20', buyAt: '5,830,000', sellAt: '6,010,000', marketRef: '5,920,000', margin: '1.5%', status: 'Active' },
    { id: '4', asset: 'SOL', category: 'crypto', networkOrType: 'Solana Network', buyAt: '240,000', sellAt: '248,000', marketRef: '245,000', margin: '1.5%', status: 'Active' },
    { id: '5', asset: 'iTunes $100', category: 'giftcard', networkOrType: 'USA Physical / E-Code', buyAt: '128,000', sellAt: '135,000', marketRef: '—', margin: '—', status: 'Active' },
    { id: '6', asset: 'Amazon $100', category: 'giftcard', networkOrType: 'USA Cash Receipt', buyAt: '122,000', sellAt: '129,000', marketRef: '—', margin: '—', status: 'Active' },
    { id: '7', asset: 'Steam $100', category: 'giftcard', networkOrType: 'Global Steam Wallet', buyAt: '119,000', sellAt: '126,000', marketRef: '—', margin: '—', status: 'Active' },
  ]);

  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<TradeRate | null>(null);

  // ---------------- STATE 4: VTU PRICING RULES ----------------
  const [vtuPricing, setVtuPricing] = useState<VTUPriceRow[]>([
    { id: '1', category: 'Airtime', model: 'Commission', providerCost: 'Face – 2.5%', marginValue: '1', marginType: 'percent', customerPays: '₦4,950', youEarn: '₦75', earnPercent: '1.5%' },
    { id: '2', category: 'Cable TV', model: 'Commission+fee', providerCost: 'Retail – 1.5%', marginValue: '100', marginType: 'fee', customerPays: '₦19,100', youEarn: '₦385', earnPercent: '' },
    { id: '3', category: 'Data Bundles', model: 'Markup', providerCost: '₦480 (1GB SME)', marginValue: '14', marginType: 'percent', customerPays: '₦547', youEarn: '₦67', earnPercent: '14%' },
    { id: '4', category: 'Game Top-ups', model: 'Markup', providerCost: '₦12,300 (800CP)', marginValue: '15', marginType: 'percent', customerPays: '₦14,145', youEarn: '₦845', earnPercent: '15%' },
    { id: '5', category: 'Gift Cards', model: 'Markup', providerCost: '₦79,200 ($50)', marginValue: '8', marginType: 'percent', customerPays: '₦85,536', youEarn: '₦6,336', earnPercent: '' },
  ]);

  const [vtuPriceModalOpen, setVtuPriceModalOpen] = useState(false);
  const [editingVtuPrice, setEditingVtuPrice] = useState<VTUPriceRow | null>(null);

  // ---------------- STATE 5: AFFILIATE LINKS & HOMEPAGE BANNER ADS SPOTLIGHT ----------------
  const [partnerLinks, setPartnerLinks] = useState<PartnerLink[]>([
    { id: '1', partner: 'Ledger · Hardware Wallet', placement: 'Secure Crypto Page', targetUrl: 'https://ledger.com?aff=lxchange', clicks: 418, estEarnings: '$63', status: 'Active' },
    { id: '2', partner: 'Trezor · Hardware Wallet', placement: 'Blog Posts', targetUrl: 'https://trezor.io?aff=lxchange', clicks: 156, estEarnings: '$21', status: 'Active' },
    { id: '3', partner: 'NordVPN · Gaming Security', placement: 'Gaming Top-up Pages', targetUrl: 'https://nordvpn.com?aff=lxchange', clicks: 203, estEarnings: '$48', status: 'Active' },
    { id: '4', partner: 'TradingView · Charting', placement: 'Rate Pages Sidebar', targetUrl: 'https://tradingview.com?aff=lxchange', clicks: 97, estEarnings: '$19', status: 'Active' },
  ]);

  const [affiliateModalOpen, setAffiliateModalOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<PartnerLink | null>(null);

  // Homepage Banner Ads Spotlight State
  const [homepageAds, setHomepageAds] = useState<HomepageAd[]>([
    {
      id: 'usdt-rate',
      tag: 'SPECIAL RATE',
      headline: 'Buy USDT at our best rate yet.',
      subtext: 'Trade USDT / NGN at a locked 1,575 rate with zero network fees all week.',
      icon: 'BadgePercent',
      accent: 'purple',
      cta: 'Start trading',
      targetUrl: '#trade',
      statLabel1: 'Rate / NGN',
      statValue1: '1,575',
      statLabel2: 'Network fee',
      statValue2: '0.00',
      status: 'Active',
    },
    {
      id: 'btc-zero-fee',
      tag: 'LIMITED OFFER',
      headline: 'Sell Bitcoin, zero fees this weekend.',
      subtext: 'No seller fee on BTC / NGN until Monday 8 AM WAT. Payouts in under 7 minutes.',
      icon: 'Rocket',
      accent: 'amber',
      cta: 'Sell BTC now',
      targetUrl: '#trade',
      statLabel1: 'BTC / NGN',
      statValue1: '168.42M',
      statLabel2: 'Savings',
      statValue2: '1.5% fee',
      status: 'Active',
    },
    {
      id: 'referral-double',
      tag: 'NEW PROMO',
      headline: 'Referrals now pay double bonus.',
      subtext: 'Give friends 2× sign-up bonus and earn 2% on every trade they make for 90 days.',
      icon: 'Gift',
      accent: 'emerald',
      cta: 'Get my link',
      targetUrl: '#earn',
      statLabel1: 'Per referral',
      statValue1: '2%',
      statLabel2: 'Bonus window',
      statValue2: '90 days',
      status: 'Active',
    },
  ]);

  const [adModalOpen, setAdModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<HomepageAd | null>(null);

  // ---------------- HANDLERS ----------------
  const handleUpdateTradeStatus = (tradeId: string, newStatus: 'New' | 'Quoted' | 'Settled' | 'Completed') => {
    setTradeRequests((prev) =>
      prev.map((t) => (t.id === tradeId ? { ...t, status: newStatus } : t))
    );
    if (selectedTrade?.id === tradeId) {
      setSelectedTrade((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDeleteTradeRequest = (tradeId: string) => {
    setTradeRequests((prev) => prev.filter((t) => t.id !== tradeId));
    if (selectedTrade?.id === tradeId) {
      setSelectedTrade(null);
    }
  };

  const handleRetryVtuOrder = (orderId: string) => {
    setVtuOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: 'Delivered', failureReason: undefined } : o))
    );
  };

  const handleToggleAssetStatus = (assetId: string) => {
    setTradeRates((prev) =>
      prev.map((r) => (r.id === assetId ? { ...r, status: r.status === 'Active' ? 'Paused' : 'Active' } : r))
    );
  };

  const handleDeleteAsset = (assetId: string) => {
    setTradeRates((prev) => prev.filter((r) => r.id !== assetId));
  };

  const handleSaveAsset = (assetData: TradeRate) => {
    if (editingAsset) {
      setTradeRates((prev) => prev.map((r) => (r.id === assetData.id ? assetData : r)));
    } else {
      setTradeRates((prev) => [...prev, assetData]);
    }
    setAssetModalOpen(false);
    setEditingAsset(null);
  };

  const handleSaveVtuPricing = (priceData: VTUPriceRow) => {
    if (editingVtuPrice) {
      setVtuPricing((prev) => prev.map((p) => (p.id === priceData.id ? priceData : p)));
    } else {
      setVtuPricing((prev) => [...prev, priceData]);
    }
    setVtuPriceModalOpen(false);
    setEditingVtuPrice(null);
  };

  const handleDeleteVtuPricing = (id: string) => {
    setVtuPricing((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveAffiliate = (affData: PartnerLink) => {
    if (editingAffiliate) {
      setPartnerLinks((prev) => prev.map((p) => (p.id === affData.id ? affData : p)));
    } else {
      setPartnerLinks((prev) => [...prev, affData]);
    }
    setAffiliateModalOpen(false);
    setEditingAffiliate(null);
  };

  const handleToggleAffiliateStatus = (affId: string) => {
    setPartnerLinks((prev) =>
      prev.map((p) => (p.id === affId ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' } : p))
    );
  };

  const handleDeleteAffiliate = (affId: string) => {
    setPartnerLinks((prev) => prev.filter((p) => p.id !== affId));
  };

  // Handlers for Homepage Ads Spotlight
  const handleSaveHomepageAd = (adData: HomepageAd) => {
    if (editingAd) {
      setHomepageAds((prev) => prev.map((a) => (a.id === adData.id ? adData : a)));
    } else {
      setHomepageAds((prev) => [...prev, adData]);
    }
    setAdModalOpen(false);
    setEditingAd(null);
  };

  const handleToggleAdStatus = (adId: string) => {
    setHomepageAds((prev) =>
      prev.map((a) => (a.id === adId ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a))
    );
  };

  const handleDeleteAd = (adId: string) => {
    setHomepageAds((prev) => prev.filter((a) => a.id !== adId));
  };

  // Filtered requests
  const filteredTradeRequests = tradeRequests.filter(
    (t) => tradeFilterStatus === 'All' || t.status === tradeFilterStatus
  );

  const filteredVtuOrders = vtuOrders.filter((o) => {
    if (vtuFilterStatus === 'All') return true;
    if (vtuFilterStatus === 'Failed') return o.status.includes('Failed');
    return o.status === vtuFilterStatus;
  });

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans flex flex-col antialiased selection:bg-purple-500 selection:text-white">
      {/* Top Admin Navigation Bar */}
      <header className="h-16 border-b border-slate-800/80 bg-[#090b17] px-4 sm:px-6 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Hamburger button on mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center text-lg sm:text-xl font-bold tracking-tight">
              <span className="text-white">L</span>
              <span className="text-purple-500 ml-1">X</span>
              <span className="text-white ml-1">change</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono border-l border-slate-800 pl-2 sm:pl-3">
              TRADE DESK
            </span>
          </div>

          {onBackToSite && (
            <button
              onClick={onBackToSite}
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Main Site
            </button>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-medium text-slate-300 hidden sm:inline">Eljey · Admin</span>
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-purple-900/40">
            E
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Navigation Sidebar - Desktop Inline Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-slate-800/70 bg-[#070812] p-4 flex-col gap-1 flex-shrink-0">
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tradeRequestsCount={tradeRequests.filter((t) => t.status === 'New').length}
            vtuOrdersCount={vtuOrders.length}
            tradeRatesCount={tradeRates.length}
            totalAffiliatesCount={partnerLinks.length + homepageAds.length}
            onBackToSite={onBackToSite}
          />
        </aside>

        {/* Left Navigation Sidebar - Mobile Swipe Drawer */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSidebarOpen(false)} />
          {/* Drawer Body */}
          <aside className={`absolute inset-y-0 left-0 w-64 bg-[#070812] border-r border-slate-800 p-4 flex flex-col gap-1 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4">
              <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">NAVIGATION</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              tradeRequestsCount={tradeRequests.filter((t) => t.status === 'New').length}
              vtuOrdersCount={vtuOrders.length}
              tradeRatesCount={tradeRates.length}
              totalAffiliatesCount={partnerLinks.length + homepageAds.length}
              onBackToSite={onBackToSite}
            />
          </aside>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl overflow-y-auto w-full">
          {/* TAB 1: TRADE REQUESTS (Customer-Initiated Stream) */}
          {activeTab === 'trade-requests' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Trade requests</h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Customer sell-to-us requests submitted from the website. Open a request to review, quote, or settle.
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#0d1021] p-1.5 rounded-xl border border-slate-800 max-w-full">
                  <Filter className="w-4 h-4 text-slate-400 ml-1.5 hidden xs:block" />
                  {['All', 'New', 'Quoted', 'Settled', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setTradeFilterStatus(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        tradeFilterStatus === st
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {tradeRequests.filter((t) => t.status === 'New').length}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Awaiting quote</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-500">
                    {tradeRequests.filter((t) => t.status === 'Quoted').length}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Quoted</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-white">₦4.2M</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Settled today</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">6.5 m</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Avg response</div>
                </div>
              </div>

              {/* Requests Table */}
              <div className="rounded-2xl bg-[#0d1021] border border-slate-800/80 overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-slate-800/80">
                  <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    CUSTOMER REQUESTS INBOX ({filteredTradeRequests.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[800px]">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase font-mono bg-[#0a0d1b]/50">
                        <th className="py-3.5 px-6">CUSTOMER</th>
                        <th className="py-3.5 px-6">TRADE DETAILS</th>
                        <th className="py-3.5 px-6">EST. PAYOUT</th>
                        <th className="py-3.5 px-6">STATUS</th>
                        <th className="py-3.5 px-6">RECEIVED</th>
                        <th className="py-3.5 px-6 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredTradeRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors cursor-pointer group">
                          <td className="py-4 px-6" onClick={() => setSelectedTrade(req)}>
                            <div className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                  {req.customerName}
                                </div>
                                <div className="text-xs text-slate-400 font-mono mt-0.5">
                                  {req.customerPhone}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6" onClick={() => setSelectedTrade(req)}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold font-mono">
                                {req.type === 'crypto' ? '₿' : '💳'}
                              </div>
                              <div>
                                <div className="font-semibold text-white">{req.assetName}</div>
                                <div className="text-xs text-slate-400 font-medium">{req.actionDetails}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 font-semibold text-white font-mono" onClick={() => setSelectedTrade(req)}>
                            {req.estValue}
                          </td>

                          <td className="py-4 px-6" onClick={() => setSelectedTrade(req)}>
                            {req.status === 'New' && (
                              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold">
                                New
                              </span>
                            )}
                            {req.status === 'Quoted' && (
                              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                                Quoted
                              </span>
                            )}
                            {req.status === 'Settled' && (
                              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                                Settled
                              </span>
                            )}
                            {req.status === 'Completed' && (
                              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                                Completed
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-slate-400 text-xs font-medium" onClick={() => setSelectedTrade(req)}>
                            {req.receivedTime}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedTrade(req)}
                                className="px-3 py-1.5 rounded-lg bg-purple-900/40 border border-purple-700/50 text-purple-200 hover:bg-purple-800/60 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Review & Quote
                              </button>
                              <button
                                onClick={() => handleDeleteTradeRequest(req.id)}
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                                title="Dismiss Request"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VTU ORDERS (Automated Stream) */}
          {activeTab === 'vtu-orders' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">VTU orders</h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Automated fulfillment via VTpass, Reloadly, and Razer Gold APIs. You step in only when API fails.
                  </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#0d1021] p-1.5 rounded-xl border border-slate-800 max-w-full">
                  <Filter className="w-4 h-4 text-slate-400 ml-1.5 hidden xs:block" />
                  {['All', 'Delivered', 'Failed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setVtuFilterStatus(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        vtuFilterStatus === st
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Alert */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#09152b]/80 border border-cyan-500/30 text-cyan-200 text-xs leading-relaxed flex items-start gap-3 shadow-md">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cyan-300">Automated Pipeline:</span> Customers initiate VTU orders from the main site. The backend calls provider APIs for instant delivery. Failed orders automatically flag here so you can trigger a 1-click retry or issue a refund.
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{vtuOrders.length}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Total orders today</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-500">₦86,400</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">VTU revenue</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">96%</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Auto-fulfilled rate</div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-red-500">
                    {vtuOrders.filter((o) => o.status.includes('Failed')).length}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-2">Needs attention</div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="rounded-2xl bg-[#0d1021] border border-slate-800/80 overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-slate-800/80">
                  <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    LIVE AUTOMATED ORDERS STREAM ({filteredVtuOrders.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[850px]">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase font-mono bg-[#0a0d1b]/50">
                        <th className="py-3.5 px-6">ORDER ID</th>
                        <th className="py-3.5 px-6">PRODUCT</th>
                        <th className="py-3.5 px-6">PROVIDER API</th>
                        <th className="py-3.5 px-6">CUSTOMER REF</th>
                        <th className="py-3.5 px-6">AMOUNT</th>
                        <th className="py-3.5 px-6">STATUS</th>
                        <th className="py-3.5 px-6 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredVtuOrders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-slate-300">
                            {order.orderId}
                          </td>
                          <td className="py-4 px-6 font-semibold text-white">
                            {order.product}
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                              {order.provider}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-xs font-mono text-slate-400">
                            {order.customerInfo}
                          </td>
                          <td className="py-4 px-6 font-semibold text-white font-mono">
                            {order.amount}
                          </td>
                          <td className="py-4 px-6">
                            {order.status === 'Delivered' ? (
                              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                                Delivered
                              </span>
                            ) : (
                              <div className="space-y-1">
                                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold block w-max">
                                  {order.status}
                                </span>
                                {order.failureReason && (
                                  <div className="text-[10px] text-red-400/90 font-mono max-w-xs leading-tight">
                                    {order.failureReason}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {order.status.includes('Failed') ? (
                              <button
                                onClick={() => handleRetryVtuOrder(order.orderId)}
                                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 ml-auto transition-all cursor-pointer shadow-md shadow-red-900/40 whitespace-nowrap"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Retry API Call
                              </button>
                            ) : (
                              <span className="text-xs text-slate-500 font-mono">Auto-Completed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RATES & ASSETS (Admin Creation & Master Control) */}
          {activeTab === 'rates' && (
            <div className="space-y-8 sm:space-y-10 animate-fadeIn">
              {/* SECTION A: TRADABLE ASSETS & RATES */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Rates & Asset Configuration</h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Configure what coins or gift cards LXchange buys and sells. Add new tokens (e.g. Solana), adjust rates, or pause trading anytime.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAsset(null);
                      setAssetModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Tradable Asset / Token
                  </button>
                </div>

                {/* Assets Table */}
                <div className="rounded-2xl bg-[#0d1021] border border-slate-800/80 overflow-hidden shadow-xl">
                  <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
                    <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      TRADABLE ASSETS PORTFOLIO ({tradeRates.length})
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[850px]">
                      <thead>
                        <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase font-mono bg-[#0a0d1b]/50">
                          <th className="py-3.5 px-6">ASSET / TOKEN</th>
                          <th className="py-3.5 px-6">NETWORK / TYPE</th>
                          <th className="py-3.5 px-6">WE BUY AT (₦)</th>
                          <th className="py-3.5 px-6">WE SELL AT (₦)</th>
                          <th className="py-3.5 px-6">MARKET REF</th>
                          <th className="py-3.5 px-6">STATUS</th>
                          <th className="py-3.5 px-6 text-right">MANAGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {tradeRates.map((rate) => (
                          <tr key={rate.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${rate.category === 'crypto' ? 'bg-amber-400' : 'bg-fuchsia-400'}`} />
                                <span>{rate.asset}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                              {rate.networkOrType}
                            </td>
                            <td className="py-4 px-6 font-mono font-semibold text-white">
                              ₦{rate.buyAt}
                            </td>
                            <td className="py-4 px-6 font-mono font-semibold text-purple-300">
                              ₦{rate.sellAt}
                            </td>
                            <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                              {rate.marketRef}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => handleToggleAssetStatus(rate.id)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all ${
                                  rate.status === 'Active'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${rate.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                {rate.status === 'Active' ? 'Active Trading' : 'Paused'}
                              </button>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingAsset(rate);
                                    setAssetModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                                  title="Configure Rates & Rules"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAsset(rate.id)}
                                  className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 hover:bg-red-900/80 hover:text-red-200 transition-colors cursor-pointer"
                                  title="Remove Asset from Platform"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* SECTION B: VTU PRICING RULES */}
              <div className="space-y-6 pt-4 border-t border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">VTU Pricing & Profit Rules</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Set provider cost baselines and profit margins for Airtime, Data, Cable TV, and Gaming top-ups.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingVtuPrice(null);
                      setVtuPriceModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-900/60 border border-purple-700/50 text-purple-200 hover:bg-purple-800/80 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add VTU Category Rule
                  </button>
                </div>

                <div className="rounded-2xl bg-[#0d1021] border border-slate-800/80 overflow-hidden shadow-xl">
                  <div className="p-4 sm:p-5 border-b border-slate-800/80">
                    <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      ACTIVE PRICING RULES ({vtuPricing.length})
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[850px]">
                      <thead>
                        <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase font-mono bg-[#0a0d1b]/50">
                          <th className="py-3.5 px-6">CATEGORY</th>
                          <th className="py-3.5 px-6">MODEL</th>
                          <th className="py-3.5 px-6">PROVIDER COST BASE</th>
                          <th className="py-3.5 px-6">YOUR MARGIN</th>
                          <th className="py-3.5 px-6">CUSTOMER PAYS</th>
                          <th className="py-3.5 px-6">ADMIN EARNS</th>
                          <th className="py-3.5 px-6 text-right">MANAGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {vtuPricing.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">
                              {row.category}
                            </td>
                            <td className="py-4 px-6">
                              {row.model === 'Commission' || row.model === 'Commission+fee' ? (
                                <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-700/50 text-xs font-semibold">
                                  {row.model}
                                </span>
                              ) : (
                                <span className="px-3 py-1 rounded-full bg-amber-950/60 text-amber-400 border border-amber-700/50 text-xs font-semibold">
                                  Markup
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                              {row.providerCost}
                            </td>
                            <td className="py-4 px-6 font-mono text-white">
                              {row.marginValue} {row.marginType === 'percent' ? '%' : '₦ fee'}
                            </td>
                            <td className="py-4 px-6 font-semibold text-white font-mono">
                              {row.customerPays}
                            </td>
                            <td className="py-4 px-6 font-semibold text-emerald-400 font-mono">
                              {row.youEarn} {row.earnPercent && <span className="text-xs text-emerald-500/80 font-normal">({row.earnPercent})</span>}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingVtuPrice(row);
                                    setVtuPriceModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                                  title="Edit Pricing Rule"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVtuPricing(row.id)}
                                  className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 hover:bg-red-900/80 hover:text-red-200 transition-colors cursor-pointer"
                                  title="Delete Pricing Category"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AFFILIATES & HOMEPAGE BANNER ADS */}
          {activeTab === 'affiliates' && (
            <div className="space-y-8 sm:space-y-10 animate-fadeIn font-sans">
              {/* SECTION A: HOMEPAGE BANNER ADS SPOTLIGHT MANAGER */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                      Homepage Banner Ads Spotlight
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Full admin control over the featured promo banner displayed on the homepage before Live Markets. Edit headlines, tags, CTA links, colors, and stat badges.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAd(null);
                      setAdModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Banner Ad
                  </button>
                </div>

                {/* Ads Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {homepageAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="p-5 rounded-2xl bg-[#0d1021] border border-slate-800/80 shadow-xl space-y-4 relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                              ad.accent === 'purple'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : ad.accent === 'amber'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : ad.accent === 'emerald'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            }`}
                          >
                            {ad.tag}
                          </span>
                          <button
                            onClick={() => handleToggleAdStatus(ad.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 cursor-pointer transition-all ${
                              ad.status === 'Active'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${ad.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {ad.status === 'Active' ? 'Live' : 'Paused'}
                          </button>
                        </div>

                        <h3 className="font-bold text-white text-base leading-snug">{ad.headline}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{ad.subtext}</p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[10px] sm:text-[11px] text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {ad.statLabel1}: {ad.statValue1}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                            {ad.statLabel2}: {ad.statValue2}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-purple-400">{ad.cta} →</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingAd(ad);
                              setAdModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                            title="Configure Ad Details & Preview"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAd(ad.id)}
                            className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 hover:bg-red-900/80 transition-colors cursor-pointer"
                            title="Delete Ad"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION B: AFFILIATE PARTNER PROGRAM PLACEMENTS */}
              <div className="space-y-6 pt-6 border-t border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">Affiliate Partner Placements</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Manage third-party hardware wallet & security partner links embedded across LXchange.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAffiliate(null);
                      setAffiliateModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-900/60 border border-purple-700/50 text-purple-200 hover:bg-purple-800/80 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Partner Link
                  </button>
                </div>

                {/* Partner Links Table */}
                <div className="rounded-2xl bg-[#0d1021] border border-slate-800/80 overflow-hidden shadow-xl">
                  <div className="p-4 sm:p-5 border-b border-slate-800/80">
                    <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      ACTIVE PARTNER PLACEMENTS ({partnerLinks.length})
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[850px]">
                      <thead>
                        <tr className="border-b border-slate-800/80 text-[11px] font-bold text-slate-400 uppercase font-mono bg-[#0a0d1b]/50">
                          <th className="py-3.5 px-6">PARTNER BRAND</th>
                          <th className="py-3.5 px-6">SITE PLACEMENT LOCATION</th>
                          <th className="py-3.5 px-6">CLICKS (30D)</th>
                          <th className="py-3.5 px-6">EST. REVENUE</th>
                          <th className="py-3.5 px-6">STATUS</th>
                          <th className="py-3.5 px-6 text-right">MANAGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {partnerLinks.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-6 font-bold text-white">
                              <div>
                                <div>{item.partner}</div>
                                <div className="text-[11px] text-purple-400 font-mono truncate max-w-xs mt-0.5">
                                  {item.targetUrl}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                                {item.placement}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-200 font-semibold">
                              {item.clicks}
                            </td>
                            <td className="py-4 px-6 font-semibold text-emerald-400 font-mono">
                              {item.estEarnings}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => handleToggleAffiliateStatus(item.id)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all ${
                                  item.status === 'Active'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                {item.status}
                              </button>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingAffiliate(item);
                                    setAffiliateModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                                  title="Edit Partner Link"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAffiliate(item.id)}
                                  className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 hover:bg-red-900/80 hover:text-red-200 transition-colors cursor-pointer"
                                  title="Delete Partner Link"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ---------------- MODAL 1: TRADE REQUEST REVIEW ---------------- */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f1224] border border-slate-700 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-5 sm:space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                  CUSTOMER REQUEST REVIEW ({selectedTrade.id})
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedTrade.customerName}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedTrade.customerPhone}</p>
              </div>
              <button
                onClick={() => setSelectedTrade(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-[#090b17] p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 whitespace-nowrap">Trade Action:</span>
                <span className="font-semibold text-white text-right">{selectedTrade.actionDetails}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 whitespace-nowrap">Est. Payout Amount:</span>
                <span className="font-bold text-amber-400 font-mono text-right">{selectedTrade.estValue}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400 whitespace-nowrap">Received Timestamp:</span>
                <span className="text-slate-300 font-mono text-right">{selectedTrade.receivedTime}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-800/60 gap-4">
                <span className="text-slate-400">Current Status:</span>
                <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 font-semibold text-xs border border-purple-800/50">
                  {selectedTrade.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                ADMIN ACTION CONTROLS
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleUpdateTradeStatus(selectedTrade.id, 'Quoted')}
                  className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-amber-900/30"
                >
                  Mark as Quoted
                </button>
                <button
                  onClick={() => handleUpdateTradeStatus(selectedTrade.id, 'Settled')}
                  className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-teal-900/30"
                >
                  Mark as Settled
                </button>
                <button
                  onClick={() => handleUpdateTradeStatus(selectedTrade.id, 'Completed')}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer col-span-2 shadow-md shadow-emerald-900/30"
                >
                  Settle & Complete Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MODAL 2: ASSET & RATES MODAL (TOOLTIPS ON ALL FIELDS) ---------------- */}
      {assetModalOpen && (
        <AssetConfigModal
          asset={editingAsset}
          onClose={() => {
            setAssetModalOpen(false);
            setEditingAsset(null);
          }}
          onSave={handleSaveAsset}
        />
      )}

      {/* ---------------- MODAL 3: VTU PRICING RULE MODAL (TOOLTIPS ON ALL FIELDS) ---------------- */}
      {vtuPriceModalOpen && (
        <VTUPricingRuleModal
          pricing={editingVtuPrice}
          onClose={() => {
            setVtuPriceModalOpen(false);
            setEditingVtuPrice(null);
          }}
          onSave={handleSaveVtuPricing}
        />
      )}

      {/* ---------------- MODAL 4: AFFILIATE LINK MODAL (TOOLTIPS ON ALL FIELDS) ---------------- */}
      {affiliateModalOpen && (
        <AffiliateConfigModal
          affiliate={editingAffiliate}
          onClose={() => {
            setAffiliateModalOpen(false);
            setEditingAffiliate(null);
          }}
          onSave={handleSaveAffiliate}
        />
      )}

      {/* ---------------- MODAL 5: HOMEPAGE BANNER AD MODAL (LIVE PREVIEW & TOOLTIPS) ---------------- */}
      {adModalOpen && (
        <HomepageAdModal
          ad={editingAd}
          onClose={() => {
            setAdModalOpen(false);
            setEditingAd(null);
          }}
          onSave={handleSaveHomepageAd}
        />
      )}
    </div>
  );
};

// =========================================================================
// REUSABLE RESPONSIVE SIDEBAR NAVIGATION COMPONENT
// =========================================================================
const SidebarContent: React.FC<{
  activeTab: string;
  setActiveTab: (tab: any) => void;
  tradeRequestsCount: number;
  vtuOrdersCount: number;
  tradeRatesCount: number;
  totalAffiliatesCount: number;
  onBackToSite?: () => void;
}> = ({
  activeTab,
  setActiveTab,
  tradeRequestsCount,
  vtuOrdersCount,
  tradeRatesCount,
  totalAffiliatesCount,
  onBackToSite
}) => {
  return (
    <nav className="flex-1 space-y-1.5 flex flex-col justify-between">
      <div className="space-y-1.5">
        {/* Nav 1: Trade requests */}
        <button
          onClick={() => setActiveTab('trade-requests')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'trade-requests'
              ? 'bg-[#1b1735] text-white border border-purple-900/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <ArrowLeftRight className={`w-4 h-4 ${activeTab === 'trade-requests' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>Trade requests</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-red-500/90 text-white text-xs font-bold font-mono">
            {tradeRequestsCount}
          </span>
        </button>

        {/* Nav 2: VTU orders */}
        <button
          onClick={() => setActiveTab('vtu-orders')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'vtu-orders'
              ? 'bg-[#1b1735] text-white border border-purple-900/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <Zap className={`w-4 h-4 ${activeTab === 'vtu-orders' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>VTU orders</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold font-mono">
            {vtuOrdersCount}
          </span>
        </button>

        {/* Nav 3: Rates & Assets */}
        <button
          onClick={() => setActiveTab('rates')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'rates'
              ? 'bg-[#1b1735] text-white border border-purple-900/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`font-semibold font-mono text-sm ${activeTab === 'rates' ? 'text-purple-400' : 'text-slate-400'}`}>₦</span>
            <span>Rates & Assets</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold font-mono">
            {tradeRatesCount}
          </span>
        </button>

        {/* Nav 4: Affiliates & Ads Banner */}
        <button
          onClick={() => setActiveTab('affiliates')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'affiliates'
              ? 'bg-[#1b1735] text-white border border-purple-900/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <Megaphone className={`w-4 h-4 ${activeTab === 'affiliates' ? 'text-purple-400' : 'text-slate-400'}`} />
            <span>Affiliates & Banner Ads</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 text-xs font-bold font-mono">
            {totalAffiliatesCount}
          </span>
        </button>
      </div>

      {onBackToSite && (
        <div className="pt-4 border-t border-slate-800/60 mt-6 md:hidden">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Site</span>
          </button>
        </div>
      )}
    </nav>
  );
};

// =========================================================================
// HIGH UX MODALS WITH SIMPLE ENGLISH TOOLTIPS ON EVERY SINGLE FIELD
// =========================================================================

// 1. Asset & Rate Configuration Modal
const AssetConfigModal: React.FC<{
  asset: TradeRate | null;
  onClose: () => void;
  onSave: (asset: TradeRate) => void;
}> = ({ asset, onClose, onSave }) => {
  const [assetName, setAssetName] = useState(asset?.asset || '');
  const [category, setCategory] = useState<'crypto' | 'giftcard'>(asset?.category || 'crypto');
  const [networkOrType, setNetworkOrType] = useState(asset?.networkOrType || 'TRC20 / BEP20');
  const [buyAt, setBuyAt] = useState(asset?.buyAt || '1,500');
  const [sellAt, setSellAt] = useState(asset?.sellAt || '1,550');
  const [marketRef, setMarketRef] = useState(asset?.marketRef || '1,520');
  const [margin, setMargin] = useState(asset?.margin || '1.5%');
  const [status, setStatus] = useState<'Active' | 'Paused'>(asset?.status || 'Active');

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const toggleTooltip = (field: string) => setActiveTooltip((prev) => (prev === field ? null : field));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: asset?.id || `${Date.now()}`,
      asset: assetName,
      category,
      networkOrType,
      buyAt,
      sellAt,
      marketRef,
      margin,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f1224] border border-slate-700 shadow-2xl p-5 sm:p-6 space-y-5 sm:space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-purple-400" />
              {asset ? `Configure Asset: ${asset.asset}` : 'Add New Tradable Asset / Token'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Add or adjust coins and gift cards supported on the LXchange converter.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Asset Category</span>
                <button type="button" onClick={() => toggleTooltip('category')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'category' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Choose if this item is a Cryptocurrency (e.g. BTC, USDT, SOL) or a Gift Card (e.g. iTunes, Steam).
                </div>
              )}
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as 'crypto' | 'giftcard';
                  setCategory(cat);
                  if (cat === 'crypto') setNetworkOrType('TRC20 / BEP20');
                  else setNetworkOrType('USA Physical / E-Code');
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-medium focus:outline-none focus:border-purple-500"
              >
                <option value="crypto">Cryptocurrency (BTC, USDT...)</option>
                <option value="giftcard">Gift Card (iTunes, Steam...)</option>
              </select>
            </div>

            {/* Asset Symbol / Name */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Asset Symbol / Name</span>
                <button type="button" onClick={() => toggleTooltip('assetName')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'assetName' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Ticker symbol or name shown to customers (e.g. SOL, TON, iTunes $100).
                </div>
              )}
              <input
                type="text"
                required
                placeholder={category === 'crypto' ? 'e.g. SOL, BNB, TON' : 'e.g. iTunes $100, Steam $50'}
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Network / Type */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>Network Protocol / Card Type</span>
              <button type="button" onClick={() => toggleTooltip('networkOrType')} className="text-purple-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </label>
            {activeTooltip === 'networkOrType' && (
              <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                Simple English: Specifies blockchain network (TRC20, ERC20, Solana) or gift card condition (Physical Card with Receipt, E-Code).
              </div>
            )}
            {category === 'crypto' ? (
              <select
                value={networkOrType}
                onChange={(e) => setNetworkOrType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="TRC20 / BEP20">TRC20 / BEP20 (Low Fee Multi-Chain)</option>
                <option value="ERC20">ERC20 (Ethereum Mainnet)</option>
                <option value="Native Bitcoin">Native Bitcoin Network</option>
                <option value="Solana Network">Solana Mainnet (SPL)</option>
                <option value="Polygon / Arbitrum">Polygon / Arbitrum Layer-2</option>
              </select>
            ) : (
              <select
                value={networkOrType}
                onChange={(e) => setNetworkOrType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="USA Physical / E-Code">USA Physical Card or E-Code</option>
                <option value="USA Cash Receipt">USA Physical with Cash Receipt</option>
                <option value="Global E-Code">Global Digital E-Code</option>
                <option value="UK / EUR Cards">UK / EUR Physical & Digital</option>
              </select>
            )}
          </div>

          {/* Rates: Buy vs Sell */}
          <div className="p-4 rounded-xl bg-[#090b17] border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>PRICING ENGINE RATES (IN NAIRA ₦)</span>
              <span className="text-[10px] text-slate-400 font-normal">Controls frontend converter rates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                  <span>WE BUY AT (₦)</span>
                  <button type="button" onClick={() => toggleTooltip('buyAt')} className="text-emerald-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                {activeTooltip === 'buyAt' && (
                  <div className="p-2 rounded-xl bg-emerald-950/90 border border-emerald-800/80 text-emerald-200 text-[11px]">
                    Simple English: What LXchange pays the user in Naira when they sell this asset to us.
                  </div>
                )}
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">₦</span>
                  <input
                    type="text"
                    required
                    placeholder="1,465"
                    value={buyAt}
                    onChange={(e) => setBuyAt(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                  <span>WE SELL AT (₦)</span>
                  <button type="button" onClick={() => toggleTooltip('sellAt')} className="text-purple-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                {activeTooltip === 'sellAt' && (
                  <div className="p-2 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-[11px]">
                    Simple English: What LXchange charges the user in Naira when they buy this asset from us.
                  </div>
                )}
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-mono text-sm">₦</span>
                  <input
                    type="text"
                    required
                    placeholder="1,510"
                    value={sellAt}
                    onChange={(e) => setSellAt(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#14182e] border border-slate-700 text-purple-200 font-mono text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Market Reference Price</span>
                <button type="button" onClick={() => toggleTooltip('marketRef')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'marketRef' && (
                <div className="p-2 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-[11px]">
                  Simple English: Global benchmark exchange rate shown as comparison.
                </div>
              )}
              <input
                type="text"
                placeholder="e.g. 1,487"
                value={marketRef}
                onChange={(e) => setMarketRef(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Trading Status</span>
                <button type="button" onClick={() => toggleTooltip('status')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'status' && (
                <div className="p-2 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-[11px]">
                  Simple English: Active makes asset available for trade on website. Paused disables it temporarily.
                </div>
              )}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Paused')}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-purple-500"
              >
                <option value="Active">Active (Available on Site)</option>
                <option value="Paused">Paused (Disabled on Site)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
            >
              Save Asset Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. VTU Pricing Rule Modal (Already enhanced with tooltips)
const VTUPricingRuleModal: React.FC<{
  pricing: VTUPriceRow | null;
  onClose: () => void;
  onSave: (pricing: VTUPriceRow) => void;
}> = ({ pricing, onClose, onSave }) => {
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [presetCategory, setPresetCategory] = useState(pricing?.category || 'Airtime');
  const [customCategory, setCustomCategory] = useState('');
  const [model, setModel] = useState<'Commission' | 'Commission+fee' | 'Markup'>(pricing?.model || 'Markup');
  const [providerCost, setProviderCost] = useState(pricing?.providerCost || '₦480 (1GB SME)');
  const [marginValue, setMarginValue] = useState(pricing?.marginValue || '14');
  const [marginType, setMarginType] = useState<'percent' | 'fee'>(pricing?.marginType || 'percent');
  const [customerPays, setCustomerPays] = useState(pricing?.customerPays || '₦547');
  const [youEarn, setYouEarn] = useState(pricing?.youEarn || '₦67');
  const [earnPercent, setEarnPercent] = useState(pricing?.earnPercent || '14%');

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const toggleTooltip = (field: string) => setActiveTooltip((prev) => (prev === field ? null : field));

  const finalCategoryName = isCustomCategory ? customCategory || 'Custom Service' : presetCategory;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: pricing?.id || `${Date.now()}`,
      category: finalCategoryName,
      model,
      providerCost,
      marginValue,
      marginType,
      customerPays,
      youEarn,
      earnPercent,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f1224] border border-slate-700 shadow-2xl p-5 sm:p-6 space-y-5 sm:space-y-6 animate-scaleUp relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-sans">
              <Zap className="w-5 h-5 text-purple-400" />
              {pricing ? `Configure Rule: ${pricing.category}` : 'Add VTU Pricing & Margin Rule'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Set provider costs, customer rates, and profit margins for digital top-ups.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* FIELD 1: VTU CATEGORY */}
          <div className="space-y-1.5 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>1. VTU Service Category</span>
                <button
                  type="button"
                  onClick={() => toggleTooltip('category')}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>

              <button
                type="button"
                onClick={() => setIsCustomCategory(!isCustomCategory)}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium underline transition-colors cursor-pointer text-left"
              >
                {isCustomCategory ? 'Select Standard Category' : '+ Add Custom Category'}
              </button>
            </div>

            {activeTooltip === 'category' && (
              <div className="p-3 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs leading-relaxed animate-fadeIn">
                <span className="font-bold text-purple-300">Simple English:</span> The type of digital service customers buy on LXchange (e.g. Airtime, Data, Cable TV, Betting Top-ups, Solar Power).
              </div>
            )}

            {!isCustomCategory ? (
              <select
                value={presetCategory}
                onChange={(e) => setPresetCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-medium focus:outline-none focus:border-purple-500"
              >
                <option value="Airtime">Airtime (MTN, Airtel, Glo, 9mobile)</option>
                <option value="Data Bundles">Data Bundles (SME & Direct Data)</option>
                <option value="Cable TV">Cable TV (DSTV, GOtv, Startimes)</option>
                <option value="Game Top-ups">Game Top-ups (CODM, PUBG, Free Fire)</option>
                <option value="Betting Top-ups">Betting Top-ups (SportyBet, 1xBet)</option>
                <option value="Utility Bills">Electricity & Utility Bills</option>
                <option value="Internet Fiber">Internet Fiber Subscriptions</option>
                <option value="Gift Cards">Gift Cards VTU</option>
              </select>
            ) : (
              <input
                type="text"
                required
                placeholder="Enter custom category name (e.g. Solar WAEC PINs)"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-purple-500 text-white font-bold focus:outline-none"
              />
            )}
          </div>

          {/* FIELD 2: PRICING MODEL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>2. Pricing & Profit Model</span>
                <button
                  type="button"
                  onClick={() => toggleTooltip('model')}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
            </div>

            {activeTooltip === 'model' && (
              <div className="p-3 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs leading-relaxed animate-fadeIn">
                <span className="font-bold text-purple-300">Simple English:</span> Defines how LXchange calculates profit:
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                  <li><b>Markup:</b> We add our profit on top of provider cost.</li>
                  <li><b>Commission:</b> Provider discount rate off face value.</li>
                  <li><b>Commission+fee:</b> Provider discount + flat service fee.</li>
                </ul>
              </div>
            )}

            <select
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-semibold focus:outline-none focus:border-purple-500"
            >
              <option value="Markup">Direct Markup % (Provider Cost + Admin Profit)</option>
              <option value="Commission">Commission % (Provider Discount Rate)</option>
              <option value="Commission+fee">Commission + Flat Service Fee (₦)</option>
            </select>
          </div>

          {/* FIELD 3: PROVIDER BASE COST */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>3. Provider Base Cost (VTpass / Razer Gold)</span>
                <button
                  type="button"
                  onClick={() => toggleTooltip('providerCost')}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
            </div>

            {activeTooltip === 'providerCost' && (
              <div className="p-3 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs leading-relaxed animate-fadeIn">
                <span className="font-bold text-purple-300">Simple English:</span> What API providers charge LXchange behind the scenes before we sell to customers.
              </div>
            )}

            <input
              type="text"
              required
              placeholder="e.g. ₦480 (1GB SME) or Retail - 1.5%"
              value={providerCost}
              onChange={(e) => setProviderCost(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* MARGIN & CUSTOMER PAYS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>4. Admin Margin Cut</span>
                <button type="button" onClick={() => toggleTooltip('margin')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'margin' && (
                <div className="p-2 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-[11px]">
                  Percentage or flat fee LXchange keeps as profit.
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="14"
                  value={marginValue}
                  onChange={(e) => setMarginValue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                />
                <select
                  value={marginType}
                  onChange={(e) => setMarginType(e.target.value as 'percent' | 'fee')}
                  className="px-3 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-slate-200 text-xs font-semibold focus:outline-none"
                >
                  <option value="percent">%</option>
                  <option value="fee">₦ fee</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>5. Customer Pays (₦)</span>
                <button type="button" onClick={() => toggleTooltip('customerPays')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'customerPays' && (
                <div className="p-2 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-[11px]">
                  Final price displayed on the live website.
                </div>
              )}
              <input
                type="text"
                required
                placeholder="₦547"
                value={customerPays}
                onChange={(e) => setCustomerPays(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090b17] border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <span>LIVE PROFIT CALCULATOR SUMMARY</span>
                </div>
                <div className="text-[11px] text-slate-400">Net revenue earned on each order in {finalCategoryName}</div>
              </div>
              <div className="sm:text-right">
                <div className="font-bold text-emerald-400 font-mono text-lg sm:text-xl">{youEarn}</div>
                {earnPercent && <div className="text-[10px] text-emerald-500/80 font-mono">({earnPercent} net margin)</div>}
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
            >
              Save Rule Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Affiliate Partner Placement Modal
const AffiliateConfigModal: React.FC<{
  affiliate: PartnerLink | null;
  onClose: () => void;
  onSave: (affiliate: PartnerLink) => void;
}> = ({ affiliate, onClose, onSave }) => {
  const [partner, setPartner] = useState(affiliate?.partner || '');
  const [placement, setPlacement] = useState<PartnerLink['placement']>(affiliate?.placement || 'Secure Crypto Page');
  const [targetUrl, setTargetUrl] = useState(affiliate?.targetUrl || 'https://');
  const [clicks, setClicks] = useState(affiliate?.clicks || 0);
  const [estEarnings, setEstEarnings] = useState(affiliate?.estEarnings || '$0');
  const [status, setStatus] = useState<'Active' | 'Paused'>(affiliate?.status || 'Active');

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const toggleTooltip = (field: string) => setActiveTooltip((prev) => (prev === field ? null : field));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: affiliate?.id || `${Date.now()}`,
      partner,
      placement,
      targetUrl,
      clicks: Number(clicks),
      estEarnings,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f1224] border border-slate-700 shadow-2xl p-5 sm:p-6 space-y-5 sm:space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              {affiliate ? `Edit Partner: ${affiliate.partner}` : 'Add New Affiliate Partner Link'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure third-party partner products promoted across LXchange.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Partner Name */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>Partner Brand & Product Name</span>
              <button type="button" onClick={() => toggleTooltip('partner')} className="text-purple-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </label>
            {activeTooltip === 'partner' && (
              <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                Simple English: The name of the partner product (e.g. Ledger Hardware Wallet, Trezor, NordVPN).
              </div>
            )}
            <input
              type="text"
              required
              placeholder="e.g. Ledger · Hardware Wallet, NordVPN"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Placement */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Placement Location</span>
                <button type="button" onClick={() => toggleTooltip('placement')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'placement' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Where on the LXchange website this affiliate link will appear.
                </div>
              )}
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-medium focus:outline-none focus:border-purple-500"
              >
                <option value="Secure Crypto Page">"Secure your crypto" page</option>
                <option value="Rate Pages Sidebar">Rate Pages Sidebar</option>
                <option value="Blog Posts">Blog Posts & Guides</option>
                <option value="Gaming Top-up Pages">Gaming Top-up Pages</option>
                <option value="Footer Banner">Footer Partner Banner</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Link Status</span>
                <button type="button" onClick={() => toggleTooltip('status')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'status' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Active displays link to website visitors. Paused hides it.
                </div>
              )}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-semibold focus:outline-none focus:border-purple-500"
              >
                <option value="Active">Active (Live Promotion)</option>
                <option value="Paused">Paused (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Target URL */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>Affiliate Target URL</span>
              <button type="button" onClick={() => toggleTooltip('targetUrl')} className="text-purple-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </label>
            {activeTooltip === 'targetUrl' && (
              <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                Simple English: The destination link containing your unique partner referral ID (e.g. https://ledger.com?aff=lxchange).
              </div>
            )}
            <input
              type="url"
              required
              placeholder="https://ledger.com?aff=lxchange"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Clicks Count (30D)</span>
                <button type="button" onClick={() => toggleTooltip('clicks')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'clicks' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Number of visitors who clicked this link over the past 30 days.
                </div>
              )}
              <input
                type="number"
                value={clicks}
                onChange={(e) => setClicks(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Est. Revenue ($ USD)</span>
                <button type="button" onClick={() => toggleTooltip('estEarnings')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'estEarnings' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Total commission earned in US Dollars from this affiliate link.
                </div>
              )}
              <input
                type="text"
                placeholder="$63"
                value={estEarnings}
                onChange={(e) => setEstEarnings(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-emerald-400 font-mono text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
            >
              Save Partner Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Homepage Banner Ads Spotlight Modal (With Live Ad Card Preview & Tooltips)
const HomepageAdModal: React.FC<{
  ad: HomepageAd | null;
  onClose: () => void;
  onSave: (ad: HomepageAd) => void;
}> = ({ ad, onClose, onSave }) => {
  const [tag, setTag] = useState(ad?.tag || 'SPECIAL RATE');
  const [headline, setHeadline] = useState(ad?.headline || 'Buy USDT at our best rate yet.');
  const [subtext, setSubtext] = useState(ad?.subtext || 'Trade USDT / NGN at a locked 1,575 rate with zero network fees all week.');
  const [icon, setIcon] = useState<'BadgePercent' | 'Rocket' | 'Gift' | 'Megaphone'>(ad?.icon || 'BadgePercent');
  const [accent, setAccent] = useState<'purple' | 'amber' | 'emerald' | 'cyan'>(ad?.accent || 'purple');
  const [cta, setCta] = useState(ad?.cta || 'Start trading');
  const [targetUrl, setTargetUrl] = useState(ad?.targetUrl || '#trade');
  const [statLabel1, setStatLabel1] = useState(ad?.statLabel1 || 'Rate / NGN');
  const [statValue1, setStatValue1] = useState(ad?.statValue1 || '1,575');
  const [statLabel2, setStatLabel2] = useState(ad?.statLabel2 || 'Network fee');
  const [statValue2, setStatValue2] = useState(ad?.statValue2 || '0.00');
  const [status, setStatus] = useState<'Active' | 'Paused'>(ad?.status || 'Active');

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const toggleTooltip = (field: string) => setActiveTooltip((prev) => (prev === field ? null : field));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: ad?.id || `ad-${Date.now()}`,
      tag,
      headline,
      subtext,
      icon,
      accent,
      cta,
      targetUrl,
      statLabel1,
      statValue1,
      statLabel2,
      statValue2,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0f1224] border border-slate-700 shadow-2xl p-5 sm:p-6 space-y-5 sm:space-y-6 animate-scaleUp max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {ad ? 'Edit Homepage Banner Ad' : 'Create New Homepage Banner Ad'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure the promo ad card displayed in the homepage spotlight carousel.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LIVE PREVIEW BOX OF THE BANNER AD */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            LIVE HOMEPAGE BANNER PREVIEW
          </label>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111222] border border-slate-800 relative overflow-hidden shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                  accent === 'purple'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : accent === 'amber'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : accent === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {tag || 'PROMO TAG'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">SPOTLIGHT AD CAROUSEL</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">{headline || 'Ad Headline Goes Here'}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{subtext || 'Ad subtext description details...'}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                {statLabel1 && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    {statLabel1}: <strong className="text-white">{statValue1}</strong>
                  </span>
                )}
                {statLabel2 && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                    {statLabel2}: <strong className="text-white">{statValue2}</strong>
                  </span>
                )}
              </div>

              <span
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${
                  accent === 'purple'
                    ? 'bg-purple-600'
                    : accent === 'amber'
                    ? 'bg-amber-600'
                    : accent === 'emerald'
                    ? 'bg-emerald-600'
                    : 'bg-cyan-600'
                }`}
              >
                {cta || 'Button Action'} →
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm pt-2">
          {/* Tag & Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Tag Badge Text</span>
                <button type="button" onClick={() => toggleTooltip('tag')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'tag' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Small pill tag shown on top of the ad (e.g. SPECIAL RATE, LIMITED OFFER, 50% OFF, NEW).
                </div>
              )}
              <input
                type="text"
                required
                placeholder="e.g. SPECIAL RATE, LIMITED OFFER"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Accent Color Theme</span>
                <button type="button" onClick={() => toggleTooltip('accent')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'accent' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Color theme used for the glow background and button.
                </div>
              )}
              <select
                value={accent}
                onChange={(e) => setAccent(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-semibold focus:outline-none focus:border-purple-500"
              >
                <option value="purple">Purple Theme (Crypto & Trades)</option>
                <option value="amber">Amber Gold Theme (Bitcoin & Promos)</option>
                <option value="emerald">Emerald Green Theme (Referrals & Yield)</option>
                <option value="cyan">Cyan Blue Theme (Special Deals)</option>
              </select>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>Main Ad Headline Title</span>
              <button type="button" onClick={() => toggleTooltip('headline')} className="text-purple-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </label>
            {activeTooltip === 'headline' && (
              <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                Simple English: Main big headline title for the banner ad.
              </div>
            )}
            <input
              type="text"
              required
              placeholder="e.g. Buy USDT at our best rate yet."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14182e] border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Subtext */}
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>Subtext / Description</span>
              <button type="button" onClick={() => toggleTooltip('subtext')} className="text-purple-400">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </label>
            {activeTooltip === 'subtext' && (
              <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                Simple English: 1-2 sentence description explaining the promotion details to visitors.
              </div>
            )}
            <textarea
              rows={2}
              required
              placeholder="Trade USDT / NGN at a locked 1,575 rate with zero network fees all week."
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500 font-sans"
            />
          </div>

          {/* CTA & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>CTA Button Text</span>
                <button type="button" onClick={() => toggleTooltip('cta')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'cta' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Label written on the action button (e.g. Start trading, Claim Offer, Get my link).
                </div>
              )}
              <input
                type="text"
                required
                placeholder="e.g. Start trading"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-white font-semibold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Target Action Link / URL</span>
                <button type="button" onClick={() => toggleTooltip('targetUrl')} className="text-purple-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </label>
              {activeTooltip === 'targetUrl' && (
                <div className="p-2.5 rounded-xl bg-purple-950/90 border border-purple-800/80 text-purple-200 text-xs">
                  Simple English: Destination link when user clicks button (e.g. #trade, #earn, or external URL).
                </div>
              )}
              <input
                type="text"
                placeholder="#trade or https://..."
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#14182e] border border-slate-700 text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-[#090b17] border border-slate-800">
            <div className="space-y-1 font-sans">
              <label className="text-[11px] text-slate-300 font-semibold">Stat Pill 1 (Label & Value)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Rate / NGN"
                  value={statLabel1}
                  onChange={(e) => setStatLabel1(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 rounded-lg bg-[#14182e] border border-slate-700 text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="1,575"
                  value={statValue1}
                  onChange={(e) => setStatValue1(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 rounded-lg bg-[#14182e] border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <label className="text-[11px] text-slate-300 font-semibold">Stat Pill 2 (Label & Value)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Fee"
                  value={statLabel2}
                  onChange={(e) => setStatLabel2(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 rounded-lg bg-[#14182e] border border-slate-700 text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="0.00"
                  value={statValue2}
                  onChange={(e) => setStatValue2(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 rounded-lg bg-[#14182e] border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
            >
              Save Homepage Banner Ad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

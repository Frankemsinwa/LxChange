import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Check, Copy, Zap, CreditCard, Landmark, Coins, 
  ShieldCheck, CheckCircle2, X, QrCode, Timer, Lock, ChevronRight, AlertCircle, ArrowUpRight 
} from 'lucide-react';
import lxLogo from '../assets/logo.png';
import { STORE_CATEGORIES, STORE_PRODUCTS_MAP, StoreProduct, StoreProvider, StoreCategory } from '../data/storeData';

interface StorePageProps {
  onBackToExchange: () => void;
  usdtRate?: number;
}

export const StorePage: React.FC<StorePageProps> = ({
  onBackToExchange,
  usdtRate = 1582,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('airtime');
  const [activeProviderId, setActiveProviderId] = useState<string>('mtn');
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  
  // Checkout Form State
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card' | 'usdt'>('bank');
  
  // Mobile Checkout Drawer State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Payment Active Modal / Step State
  const [activePaymentStep, setActivePaymentStep] = useState<'form' | 'bank_modal' | 'card_modal' | 'card_otp' | 'usdt_modal' | 'processing' | 'confirmed'>('form');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderRef, setOrderRef] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardOtp, setCardOtp] = useState<string>('');

  // USDT Network selection
  const [usdtNetwork, setUsdtNetwork] = useState<'TRC20' | 'BEP20' | 'SOL'>('TRC20');

  // Countdown timer simulation for bank transfer / USDT
  const [timeLeft, setTimeLeft] = useState<number>(899); // 14:59

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activePaymentStep === 'bank_modal' || activePaymentStep === 'usdt_modal') {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePaymentStep]);

  const activeCategory = STORE_CATEGORIES.find((c) => c.id === activeCategoryId) || STORE_CATEGORIES[0];
  const activeProvider = activeCategory.providers.find((p) => p.id === activeProviderId) || activeCategory.providers[0];

  const categoryProducts = STORE_PRODUCTS_MAP[activeCategoryId] || {};
  const currentProducts: StoreProduct[] = categoryProducts[activeProvider.id] || [];

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategoryId(catId);
    const newCat = STORE_CATEGORIES.find((c) => c.id === catId);
    if (newCat && newCat.providers.length > 0) {
      setActiveProviderId(newCat.providers[0].id);
    }
    setSelectedProduct(null);
    setActivePaymentStep('form');
  };

  const handleProviderChange = (provId: string) => {
    setActiveProviderId(provId);
    setSelectedProduct(null);
    setActivePaymentStep('form');
  };

  const handleProductSelect = (prod: StoreProduct) => {
    setSelectedProduct(prod);
    setActivePaymentStep('form');
  };

  // Submit initial checkout form -> routes to chosen payment method step
  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !accountNumber || !email) return;

    if (paymentMethod === 'bank') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setActivePaymentStep('bank_modal');
      }, 800);
    } else if (paymentMethod === 'card') {
      setActivePaymentStep('card_modal');
    } else if (paymentMethod === 'usdt') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setActivePaymentStep('usdt_modal');
      }, 800);
    }
  };

  // Confirm Bank Transfer Payment
  const handleConfirmBankTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finishOrder();
    }, 1500);
  };

  // Submit Card Details -> Open 3DS OTP step
  const handleSubmitCardDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActivePaymentStep('card_otp');
    }, 1000);
  };

  // Submit Card OTP -> Order Confirmed
  const handleSubmitCardOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finishOrder();
    }, 1200);
  };

  // Confirm USDT Transfer
  const handleConfirmUsdt = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finishOrder();
    }, 1500);
  };

  const finishOrder = () => {
    const randomRef = 'LXV-' + Math.floor(10000 + Math.random() * 90000);
    setOrderRef(randomRef);
    setActivePaymentStep('confirmed');
    setMobileDrawerOpen(false);
  };

  const handleCopyRef = () => {
    if (orderRef) {
      navigator.clipboard.writeText(orderRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleCopyText = (text: string, type: 'account' | 'address') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const resetCheckout = () => {
    setActivePaymentStep('form');
    setSelectedProduct(null);
    setAccountNumber('');
    setEmail('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setCardName('');
    setCardOtp('');
    setMobileDrawerOpen(false);
  };

  const usdtAmount = selectedProduct ? (selectedProduct.price / usdtRate).toFixed(2) : '0.00';

  // Bank transfer account details generator based on item
  const bankAccountNo = '904839' + (selectedProduct ? selectedProduct.price.toString().padStart(4, '0').slice(-4) : '2019');

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 font-sans selection:bg-purple-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080811]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onBackToExchange}
              className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
            >
              <img src={lxLogo} alt="LXchange" className="h-10 sm:h-12 w-auto" />
            </button>
            <span className="px-2 py-0.5 rounded-md bg-purple-950/70 border border-purple-800/50 text-purple-300 font-mono font-bold text-[10px] sm:text-xs tracking-wider uppercase">
              STORE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
            <div className="hidden xs:flex items-center gap-2 text-slate-400 bg-slate-900/80 border border-slate-800/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs">USDT</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-200 font-mono font-semibold text-[11px] sm:text-xs">₦{usdtRate.toLocaleString()}</span>
            </div>

            <button
              onClick={onBackToExchange}
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors font-semibold text-xs sm:text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to exchange</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full flex-grow">
        {activePaymentStep === 'confirmed' ? (
          /* Order Confirmed View */
          <div className="max-w-xl mx-auto my-6 sm:my-12 p-6 sm:p-12 rounded-3xl bg-[#0c0c1a] border border-slate-800/80 shadow-2xl text-center flex flex-col items-center justify-center animate-fade-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-xl shadow-emerald-950/40">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Order confirmed
            </h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono text-sm sm:text-base font-bold mb-6">
              <span>{orderRef}</span>
              <button 
                onClick={handleCopyRef}
                className="p-1 hover:text-white transition-colors"
                title="Copy reference code"
              >
                {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-slate-300 text-sm sm:text-base mb-2 max-w-md">
              Delivery is on the way — receipt sent to{' '}
              <strong className="text-white font-semibold">{email || 'sam@gmail.com'}</strong>
            </p>

            <p className="text-slate-500 text-xs font-mono mb-8">
              When live, fulfilment fires automatically through the provider API.
            </p>

            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={resetCheckout}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold text-white shadow-lg transition-all active:scale-95 cursor-pointer"
                style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
              >
                Buy something else
              </button>

              <button
                onClick={onBackToExchange}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to exchange
              </button>
            </div>
          </div>
        ) : (
          /* Normal Store Browsing View */
          <div>
            {/* Header Hero Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
                Everyday digital,{' '}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(115.45deg, #A855F7 0%, #D8582B 100%)' }}
                >
                  paid in naira.
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-base max-w-2xl leading-relaxed">
                Airtime, data, TV, gift cards and game credits — pay by bank transfer, card or USDT. Delivery is instant once payment confirms.
              </p>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 no-scrollbar border-b border-slate-800/60 mb-5 sm:mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              {STORE_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#181832] text-white border border-purple-500/60 shadow-lg shadow-purple-950/50'
                        : 'bg-slate-900/60 text-slate-400 border border-slate-800/60 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Provider Selector Row */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 no-scrollbar mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              <span className="text-slate-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider shrink-0 mr-1">
                PROVIDER
              </span>
              {activeCategory.providers.map((prov) => {
                const isActive = prov.id === activeProviderId;
                return (
                  <button
                    key={prov.id}
                    onClick={() => handleProviderChange(prov.id)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#15152b] text-white border-purple-500/70 ring-1 ring-purple-500/40'
                        : 'bg-slate-900/50 text-slate-300 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] uppercase font-black ${prov.badgeBg} ${prov.badgeText}`}
                    >
                      {prov.iconLetter}
                    </span>
                    <span>{prov.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content Grid: Products Grid (Left) + Desktop Checkout Sidebar (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Products Section */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {currentProducts.map((prod) => {
                    const isSelected = selectedProduct?.id === prod.id;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleProductSelect(prod)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                          isSelected
                            ? 'bg-[#161633] border-purple-500/80 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/50'
                            : 'bg-[#0b0b18] border-slate-800/80 hover:border-slate-700 hover:bg-[#0f0f22]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-[11px] uppercase font-black ${activeProvider.badgeBg} ${activeProvider.badgeText}`}>
                              {activeProvider.iconLetter}
                            </span>
                            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                              {prod.name}
                            </span>
                          </div>
                          {prod.discountPercent && (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] sm:text-[11px] font-bold">
                              {prod.discountPercent}% off
                            </span>
                          )}
                        </div>

                        <p className="text-slate-400 text-xs font-medium mb-3 sm:mb-4">
                          {prod.subtext}
                        </p>

                        <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/40">
                          <span className="text-amber-400 font-mono text-base sm:text-lg font-bold">
                            ₦{prod.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                            Select →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-slate-500 text-xs font-mono pt-2">
                  {activeCategory.footerNote}
                </p>
              </div>

              {/* Desktop Checkout Panel Section (lg:block hidden on mobile) */}
              <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
                <div className="sticky top-24 rounded-3xl bg-[#0c0c1c] border border-slate-800/80 p-6 sm:p-7 shadow-2xl">
                  {!selectedProduct ? (
                    <div className="py-16 px-4 text-center border border-dashed border-slate-800/80 rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-2">
                        CHECKOUT
                      </span>
                      <h3 className="text-xl font-bold text-slate-300 mb-2">
                        Pick a product to check out
                      </h3>
                      <p className="text-slate-500 text-xs">
                        Prices include delivery — no extras at pay.
                      </p>
                    </div>
                  ) : (
                    <RenderCheckoutForm
                      selectedProduct={selectedProduct}
                      activeProvider={activeProvider}
                      accountNumber={accountNumber}
                      setAccountNumber={setAccountNumber}
                      email={email}
                      setEmail={setEmail}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      isProcessing={isProcessing}
                      onSubmit={handleInitiatePayment}
                      onCancel={() => setSelectedProduct(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Mobile Sticky Checkout Bar */}
      {selectedProduct && activePaymentStep === 'form' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0c1c]/95 border-t border-slate-800/90 p-4 backdrop-blur-xl shadow-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-400 font-mono uppercase">
              {activeProvider.name} · {selectedProduct.name}
            </p>
            <p className="text-lg font-mono font-bold text-amber-400">
              ₦{selectedProduct.price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg cursor-pointer flex items-center gap-1.5"
            style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
          >
            <span>Proceed to Pay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Checkout Bottom Sheet Modal Drawer */}
      {mobileDrawerOpen && selectedProduct && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end animate-fade-in">
          <div className="w-full bg-[#0c0c1c] border-t border-slate-800 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <h3 className="text-lg font-bold text-white">Checkout</h3>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <RenderCheckoutForm
              selectedProduct={selectedProduct}
              activeProvider={activeProvider}
              accountNumber={accountNumber}
              setAccountNumber={setAccountNumber}
              email={email}
              setEmail={setEmail}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isProcessing={isProcessing}
              onSubmit={handleInitiatePayment}
              onCancel={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Payment Modals Flow Overlays */}
      
      {/* 1. Bank Transfer Modal */}
      {activePaymentStep === 'bank_modal' && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0c0c1c] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/40">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bank Transfer</h3>
                  <p className="text-[11px] text-slate-400">Dedicated payment account</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-xs">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="bg-[#121226] rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>Bank Name</span>
                <span className="font-bold text-white">Wema Bank / Moniepoint</span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>Account Name</span>
                <span className="font-semibold text-white">LXchange Digital Store</span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span>Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-amber-400">{bankAccountNo}</span>
                  <button
                    onClick={() => handleCopyText(bankAccountNo, 'account')}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>Amount to Pay</span>
                <span className="font-mono text-base font-extrabold text-white">₦{selectedProduct.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 text-purple-200 text-xs flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Transfer the exact amount to the account above. Fulfillment triggers automatically once received.</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleConfirmBankTransfer}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>I have made this transfer</span>
                )}
              </button>

              <button
                onClick={() => setActivePaymentStep('form')}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors text-center"
              >
                Cancel payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Card Payment Modal */}
      {activePaymentStep === 'card_modal' && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmitCardDetails} className="w-full max-w-md bg-[#0c0c1c] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/40">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Pay with Card</h3>
                  <p className="text-[11px] text-slate-400">Debit or Credit Card</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit SSL</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase">CARD NUMBER</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="5399 0000 0000 0000"
                  className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase">EXPIRY DATE</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase">CARDHOLDER NAME</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Full name on card"
                  className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Pay ₦{selectedProduct.price.toLocaleString()}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActivePaymentStep('form')}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors text-center"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Card 3DS OTP Modal */}
      {activePaymentStep === 'card_otp' && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmitCardOtp} className="w-full max-w-sm bg-[#0c0c1c] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white">3D Secure Verification</h3>
            <p className="text-xs text-slate-400">
              An OTP has been sent to your mobile phone linked with your card.
            </p>

            <input
              type="text"
              maxLength={6}
              required
              value={cardOtp}
              onChange={(e) => setCardOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-amber-400 placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Confirm & Pay ₦{selectedProduct.price.toLocaleString()}</span>
              )}
            </button>
          </form>
        </div>
      )}

      {/* 4. USDT Crypto Modal */}
      {activePaymentStep === 'usdt_modal' && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0c0c1c] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/40">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Pay with USDT</h3>
                  <p className="text-[11px] text-slate-400">Instant Crypto Deposit</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-xs">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Network Selector Tabs */}
            <div className="flex gap-2">
              {(['TRC20', 'BEP20', 'SOL'] as const).map((net) => (
                <button
                  key={net}
                  onClick={() => setUsdtNetwork(net)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    usdtNetwork === net
                      ? 'bg-purple-950/80 border-purple-500 text-white'
                      : 'bg-[#121226] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>

            {/* Deposit Box Details */}
            <div className="bg-[#121226] rounded-2xl border border-slate-800 p-4 text-center space-y-3">
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-mono">USDT AMOUNT DUE</p>
                <p className="text-2xl font-black text-amber-400 font-mono">${usdtAmount} USDT</p>
                <p className="text-[11px] text-slate-500">Rate: ₦{usdtRate.toLocaleString()} / USDT</p>
              </div>

              <div className="p-3 bg-white rounded-xl inline-block shadow-lg mx-auto">
                <QrCode className="w-24 h-24 text-slate-950" />
              </div>

              <div>
                <p className="text-[11px] text-slate-400 uppercase font-mono mb-1">DEPOSIT ADDRESS ({usdtNetwork})</p>
                <div className="flex items-center justify-between bg-[#080811] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200">
                  <span className="truncate mr-2">
                    {usdtNetwork === 'TRC20'
                      ? 'T9xLxCHaNgE904839201948392019'
                      : usdtNetwork === 'BEP20'
                      ? '0x71C90483920194839201948392019'
                      : 'SolLXCHaNgE904839201948392019'}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyText(
                        usdtNetwork === 'TRC20'
                          ? 'T9xLxCHaNgE904839201948392019'
                          : usdtNetwork === 'BEP20'
                          ? '0x71C90483920194839201948392019'
                          : 'SolLXCHaNgE904839201948392019',
                        'address'
                      )
                    }
                    className="p-1 text-slate-400 hover:text-white shrink-0"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleConfirmUsdt}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>I've sent the USDT</span>
                )}
              </button>

              <button
                onClick={() => setActivePaymentStep('form')}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2021–2026 LXchange Digital Ltd · Abuja, Nigeria</p>
          <button
            onClick={onBackToExchange}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Back to the exchange
          </button>
        </div>
      </footer>
    </div>
  );
};

// Reusable Inner Component for Checkout Form
interface RenderCheckoutFormProps {
  selectedProduct: StoreProduct;
  activeProvider: StoreProvider;
  accountNumber: string;
  setAccountNumber: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  paymentMethod: 'bank' | 'card' | 'usdt';
  setPaymentMethod: (method: 'bank' | 'card' | 'usdt') => void;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const RenderCheckoutForm: React.FC<RenderCheckoutFormProps> = ({
  selectedProduct,
  activeProvider,
  accountNumber,
  setAccountNumber,
  email,
  setEmail,
  paymentMethod,
  setPaymentMethod,
  isProcessing,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <h3 className="text-lg sm:text-xl font-bold text-white">Checkout</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-slate-200 underline"
        >
          Change item
        </button>
      </div>

      {/* Item summary */}
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between items-center text-slate-300">
          <span>Item</span>
          <span className="font-semibold text-white">
            {activeProvider.name} · {selectedProduct.name}
          </span>
        </div>

        {selectedProduct.faceValue && (
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Face value</span>
            <span className="font-mono">₦{selectedProduct.faceValue.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-base font-bold pt-2 border-t border-slate-800/60">
          <span className="text-slate-200">You pay</span>
          <span className="text-amber-400 font-mono text-lg sm:text-xl">
            ₦{selectedProduct.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Dynamic Account Input Field */}
      <div className="space-y-1">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          {activeProvider.inputLabel}
        </label>
        <input
          type="text"
          required
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder={activeProvider.inputPlaceholder}
          className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Receipt Email Input */}
      <div className="space-y-1">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          EMAIL (FOR RECEIPT)
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full bg-[#121226] border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Payment Method Selector Tabs */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          PAY WITH
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
              paymentMethod === 'bank'
                ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                : 'bg-[#121226] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span className="text-[11px]">Bank transfer</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
              paymentMethod === 'card'
                ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                : 'bg-[#121226] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-[11px]">Card</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('usdt')}
            className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
              paymentMethod === 'usdt'
                ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                : 'bg-[#121226] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span className="text-[11px]">USDT</span>
          </button>
        </div>
      </div>

      {/* Submit Pay Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
        style={{ background: 'linear-gradient(115.45deg, #6D4AFF 0%, #A855F7 100%)' }}
      >
        {isProcessing ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <span>Pay ₦{selectedProduct.price.toLocaleString()}</span>
        )}
      </button>

      <p className="text-[10px] text-slate-500 text-center leading-relaxed">
        Demo checkout — live version connects to Paystack / Flutterwave + provider APIs. Prices illustrative.
      </p>
    </form>
  );
};

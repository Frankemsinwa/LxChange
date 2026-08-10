import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Shield, DollarSign, Gift } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: CryptoAsset[];
  onOpenLiveChat: (ticketDetails?: { ticketId: string; tradeSummary: string; email: string }) => void;
  initialType?: 'crypto' | 'giftcard';
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  assets,
  onOpenLiveChat,
  initialType = 'crypto',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tradeType, setTradeType] = useState<'crypto' | 'giftcard'>(initialType);

  // Step 1 - Form Inputs
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('USDT');
  const [cryptoAmount, setCryptoAmount] = useState<string>('100');
  
  const [cardBrand, setCardBrand] = useState<string>('Amazon');
  const [cardValueUsd, setCardValueUsd] = useState<string>('100');

  // Step 2 - Contact Details
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Step 3 - Ticket
  const [generatedTicketId, setGeneratedTicketId] = useState<string>('LX-2704');

  if (!isOpen) return null;

  // Calculations
  const currentAsset = assets.find((a) => a.symbol === selectedAssetSymbol) || assets[0];
  const parsedCryptoAmount = parseFloat(cryptoAmount) || 0;
  const estimatedCryptoNgn = Math.round(parsedCryptoAmount * currentAsset.ngnPrice);

  const parsedCardUsd = parseFloat(cardValueUsd) || 0;
  // Estimated gift card rate ~ ₦1,380 per USD
  const estimatedGiftCardNgn = Math.round(parsedCardUsd * 1380);

  const estimatedPayoutFormatted =
    tradeType === 'crypto'
      ? parsedCryptoAmount > 0
        ? `₦${estimatedCryptoNgn.toLocaleString()}`
        : '—'
      : parsedCardUsd > 0
      ? `₦${estimatedGiftCardNgn.toLocaleString()}`
      : '—';

  const tradeSummaryString =
    tradeType === 'crypto'
      ? `Selling ${parsedCryptoAmount} ${selectedAssetSymbol} · est. ₦${estimatedCryptoNgn.toLocaleString()}`
      : `Selling $${parsedCardUsd} ${cardBrand} Gift Card · est. ₦${estimatedGiftCardNgn.toLocaleString()}`;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticket = `LX-${randomNum}`;
    setGeneratedTicketId(ticket);
    setStep(3);
  };

  const handleOpenChat = () => {
    onClose();
    onOpenLiveChat({
      ticketId: generatedTicketId,
      tradeSummary: tradeSummaryString,
      email: email || 'sam@gmail.com',
    });
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-[440px] rounded-3xl bg-[#0e0f1d] border border-purple-500/30 p-6 sm:p-8 relative shadow-2xl text-slate-100 glow-purple">
        {/* Close Icon */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: START A TRADE */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                Start a trade
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tell us what you're selling. A locked rate arrives in minutes.
              </p>
            </div>

            {/* Progress Bar (2 bars, bar 1 active) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="h-1 rounded-full bg-purple-500" />
              <div className="h-1 rounded-full bg-slate-800" />
            </div>

            {/* Type Selector Tabs */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-[#090a14] border border-slate-800">
              <button
                type="button"
                onClick={() => setTradeType('crypto')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  tradeType === 'crypto'
                    ? 'bg-[#15172b] text-white border border-purple-500/50 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>💰 Crypto</span>
              </button>
              <button
                type="button"
                onClick={() => setTradeType('giftcard')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  tradeType === 'giftcard'
                    ? 'bg-[#15172b] text-white border border-purple-500/50 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🎁 Gift card</span>
              </button>
            </div>

            {/* Tab Form Content */}
            {tradeType === 'crypto' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1.5">
                    CRYPTO ASSET *
                  </label>
                  <select
                    value={selectedAssetSymbol}
                    onChange={(e) => setSelectedAssetSymbol(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {assets.map((asset) => (
                      <option key={asset.id} value={asset.symbol}>
                        {asset.symbol} - {asset.name} (₦{asset.ngnPrice.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1.5">
                    CRYPTO AMOUNT *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={cryptoAmount}
                    onChange={(e) => setCryptoAmount(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1.5">
                    CARD BRAND *
                  </label>
                  <select
                    value={cardBrand}
                    onChange={(e) => setCardBrand(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="Amazon">Amazon Gift Card</option>
                    <option value="Apple / iTunes">Apple / iTunes</option>
                    <option value="Steam">Steam Wallet</option>
                    <option value="Sephora">Sephora</option>
                    <option value="Google Play">Google Play</option>
                    <option value="eBay">eBay</option>
                    <option value="Nordstrom">Nordstrom</option>
                    <option value="Razer Gold">Razer Gold</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1.5">
                    CARD VALUE (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={cardValueUsd}
                    onChange={(e) => setCardValueUsd(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Est Payout Box */}
            <div className="p-4 rounded-xl bg-[#090a14] border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Est. payout:</span>
              <span className="text-base font-extrabold font-mono text-purple-300">
                {estimatedPayoutFormatted}
              </span>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Continue →</span>
            </button>
          </form>
        )}

        {/* STEP 2: YOUR DETAILS */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                Your details
              </h2>
              <p className="text-xs text-purple-300 font-medium mt-1">
                {tradeSummaryString}
              </p>
            </div>

            {/* Progress Bar (2 bars, both active) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="h-1 rounded-full bg-purple-500" />
              <div className="h-1 rounded-full bg-purple-500" />
            </div>

            {/* Inputs */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    WHATSAPP *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234..."
                    className="w-full px-3.5 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                  NOTES (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. TRC20, payout to GTBank"
                  className="w-full px-4 py-3 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Send trade request</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white font-semibold transition-colors flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: REQUEST RECEIVED */}
        {step === 3 && (
          <div className="text-center py-4 space-y-5">
            {/* Circle Checkmark Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                Request received
              </h2>

              {/* Ticket ID Badge */}
              <div>
                <span className="px-4 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-400 font-mono font-extrabold text-sm inline-block shadow-inner">
                  {generatedTicketId}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              <p>
                Confirmation sent to <span className="font-bold text-white">{email || 'sam@gmail.com'}</span>.
              </p>
              <p className="text-slate-400">
                Your locked rate arrives in the live chat — usually within minutes.
              </p>
            </div>

            <button
              onClick={handleOpenChat}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Open live chat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Shield, DollarSign, Gift, Upload, Building2, CreditCard, Coins } from 'lucide-react';
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

  // Step 1 - Trade Asset Details
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('USDT');
  const [cryptoAmount, setCryptoAmount] = useState<string>('100');
  const [cryptoNetwork, setCryptoNetwork] = useState<string>('TRC20 (Tron Network)');
  const [txHash, setTxHash] = useState<string>('');

  const [cardBrand, setCardBrand] = useState<string>('iTunes');
  const [cardValueUsd, setCardValueUsd] = useState<string>('200');
  const [cardCode, setCardCode] = useState<string>('');
  const [cardCondition, setCardCondition] = useState<string>('USA Physical Card with Cash Receipt');
  const [cardCountry, setCardCountry] = useState<string>('United States (USD)');
  const [cardPhotoName, setCardPhotoName] = useState<string>('');
  const [receiptPhotoName, setReceiptPhotoName] = useState<string>('');

  // Step 2 - Customer Contact & Bank Details
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bankName, setBankName] = useState<string>('UBA (United Bank for Africa)');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');

  // Step 3 - Ticket
  const [generatedTicketId, setGeneratedTicketId] = useState<string>('LX-2704');

  if (!isOpen) return null;

  // Calculations
  const currentAsset = assets.find((a) => a.symbol === selectedAssetSymbol) || assets[0];
  const parsedCryptoAmount = parseFloat(cryptoAmount) || 0;
  const estimatedCryptoNgn = Math.round(parsedCryptoAmount * currentAsset.ngnPrice);

  const parsedCardUsd = parseFloat(cardValueUsd) || 0;
  // Estimated gift card rate ~ ₦1,280 per USD
  const estimatedGiftCardNgn = Math.round(parsedCardUsd * 1280);

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
      ? `Selling ${parsedCryptoAmount} ${selectedAssetSymbol} (${cryptoNetwork}) · est. ₦${estimatedCryptoNgn.toLocaleString()}`
      : `Selling $${parsedCardUsd} ${cardBrand} (${cardCondition}) · est. ₦${estimatedGiftCardNgn.toLocaleString()}`;

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
      email: email || 'customer@gmail.com',
    });
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-[500px] rounded-3xl bg-[#0e0f1d] border border-purple-500/30 p-6 sm:p-8 relative shadow-2xl text-slate-100 glow-purple max-h-[92vh] overflow-y-auto">
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
                Select your asset details below. Locked rate & fast payout guaranteed.
              </p>
            </div>

            {/* Progress Bar */}
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
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Cryptocurrency</span>
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
                <Gift className="w-4 h-4 text-fuchsia-400" />
                <span>Gift Card</span>
              </button>
            </div>

            {/* Tab Form Content */}
            {tradeType === 'crypto' ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                      CRYPTO ASSET *
                    </label>
                    <select
                      value={selectedAssetSymbol}
                      onChange={(e) => setSelectedAssetSymbol(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {assets.map((asset) => (
                        <option key={asset.id} value={asset.symbol}>
                          {asset.symbol} - {asset.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                      AMOUNT TO SELL *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    BLOCKCHAIN NETWORK PROTOCOL *
                  </label>
                  <select
                    value={cryptoNetwork}
                    onChange={(e) => setCryptoNetwork(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="TRC20 (Tron Network)">TRC20 (Tron Network - Low Fee)</option>
                    <option value="BEP20 (BNB Smart Chain)">BEP20 (BNB Smart Chain)</option>
                    <option value="Solana Network">Solana Mainnet (SPL)</option>
                    <option value="Native Bitcoin Network">Native Bitcoin Network</option>
                    <option value="ERC20 (Ethereum Mainnet)">ERC20 (Ethereum Mainnet)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    TXHASH / PROOF OF TRANSFER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="e.g. 0x7e2a91b4028f81a704c3d2e1..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                      CARD BRAND *
                    </label>
                    <select
                      value={cardBrand}
                      onChange={(e) => setCardBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="iTunes">Apple / iTunes</option>
                      <option value="Steam">Steam Wallet</option>
                      <option value="Amazon">Amazon Gift Card</option>
                      <option value="Sephora">Sephora</option>
                      <option value="Google Play">Google Play</option>
                      <option value="eBay">eBay</option>
                      <option value="Razer Gold">Razer Gold</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                      CARD VALUE (USD $) *
                    </label>
                    <input
                      type="number"
                      required
                      value={cardValueUsd}
                      onChange={(e) => setCardValueUsd(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    GIFT CARD E-CODE / PIN (OPTIONAL FOR PHYSICAL)
                  </label>
                  <input
                    type="text"
                    value={cardCode}
                    onChange={(e) => setCardCode(e.target.value)}
                    placeholder="e.g. X79A-4019-994B-2018"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-mono font-bold text-amber-400 placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold tracking-wider text-purple-300 uppercase block mb-1">
                    CARD CONDITION & TYPE *
                  </label>
                  <select
                    value={cardCondition}
                    onChange={(e) => setCardCondition(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="USA Physical Card with Cash Receipt">USA Physical Card with Cash Receipt</option>
                    <option value="USA Physical Card without Receipt">USA Physical Card without Receipt</option>
                    <option value="Global Digital E-Code">Global Digital E-Code</option>
                    <option value="UK / EUR Physical & Digital">UK / EUR Physical & Digital</option>
                  </select>
                </div>

                {/* Upload Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">UPLOAD CARD PHOTO</label>
                    <label className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-300 text-xs font-semibold cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate">{cardPhotoName || 'Attach Card'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCardPhotoName(e.target.files?.[0]?.name || 'Card Uploaded')}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-mono block mb-1">UPLOAD RECEIPT PHOTO</label>
                    <label className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-300 text-xs font-semibold cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate">{receiptPhotoName || 'Attach Receipt'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReceiptPhotoName(e.target.files?.[0]?.name || 'Receipt Uploaded')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Est Payout Box */}
            <div className="p-4 rounded-xl bg-[#090a14] border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Est. Naira Payout:</span>
              <span className="text-lg font-extrabold font-mono text-purple-300">
                {estimatedPayoutFormatted}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Next: Payout Bank Account →</span>
            </button>
          </form>
        )}

        {/* STEP 2: CUSTOMER CONTACT & PAYOUT BANK DETAILS */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5 text-xs">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                Payout Bank Details
              </h2>
              <p className="text-xs text-purple-300 font-medium mt-1">
                {tradeSummaryString}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-1 rounded-full bg-purple-500" />
              <div className="h-1 rounded-full bg-purple-500" />
            </div>

            {/* Customer Personal Contact Info */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                1. CONTACT INFORMATION
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Amaka Elizabeth Okonkwo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    WHATSAPP PHONE *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234 812 990 8830"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amaka@gmail.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090a14] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Destination NGN Bank Account */}
            <div className="space-y-3 p-4 rounded-xl bg-[#090a14] border border-slate-800">
              <div className="text-[11px] font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                2. NIGERIAN BANK PAYOUT ACCOUNT
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-semibold block mb-1">SELECT BANK NAME *</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#14172e] border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="UBA (United Bank for Africa)">UBA (United Bank for Africa)</option>
                  <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                  <option value="GTBank (Guaranty Trust Bank)">GTBank (Guaranty Trust Bank)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                  <option value="OPay Digital Bank">OPay Digital Bank</option>
                  <option value="Moniepoint Microfinance Bank">Moniepoint Microfinance Bank</option>
                  <option value="PalmPay">PalmPay</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 font-semibold block mb-1">ACCOUNT NUMBER (10 DIGITS) *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="2049102940"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#14172e] border border-slate-700 font-mono text-xs text-emerald-400 font-bold placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-semibold block mb-1">BENEFICIARY NAME *</label>
                  <input
                    type="text"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Account Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#14172e] border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Submit Trade Request</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white font-semibold transition-colors flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Asset Selection</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: REQUEST RECEIVED */}
        {step === 3 && (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                Request Submitted
              </h2>

              <div>
                <span className="px-4 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-400 font-mono font-extrabold text-sm inline-block shadow-inner">
                  TICKET #{generatedTicketId}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              <p>
                Confirmation sent to <span className="font-bold text-white">{email || 'your email'}</span>.
              </p>
              <p className="text-slate-400">
                Your request is live on the Admin Trade Desk. Click below to chat live with a trader and track your payout.
              </p>
            </div>

            <button
              onClick={handleOpenChat}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Open Live Trade Chat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

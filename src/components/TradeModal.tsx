import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle2, Clock, ShieldCheck, ArrowRight, Building2, RefreshCw } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAssetSymbol?: string;
  initialAmount?: number;
  assets: CryptoAsset[];
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  initialAssetSymbol = 'BTC',
  initialAmount = 0.01,
  assets,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(initialAssetSymbol);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [bank, setBank] = useState('Kuda Bank');
  const [accountNumber, setAccountNumber] = useState('2048910234');
  const [accountName, setAccountName] = useState('Fatima Bello');
  const [step, setStep] = useState<'quote' | 'confirm' | 'success'>('quote');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900s
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialAssetSymbol) setSelectedSymbol(initialAssetSymbol);
    if (initialAmount) setAmount(initialAmount.toString());
  }, [initialAssetSymbol, initialAmount]);

  useEffect(() => {
    if (step === 'confirm' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  if (!isOpen) return null;

  const currentAsset = assets.find((a) => a.symbol === selectedSymbol) || assets[0];
  const numAmount = parseFloat(amount) || 0;
  const estimatedNgn = Math.round(numAmount * currentAsset.ngnPrice);

  const formatNgn = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const dummyDepositAddress = `0x71C9f5B${selectedSymbol}00192a8b34c${selectedSymbol}ef98`;

  const copyAddress = () => {
    navigator.clipboard.writeText(dummyDepositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-purple-500/30 p-6 sm:p-8 relative shadow-2xl glow-purple overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step 1: Quote Form */}
        {step === 'quote' && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                INSTANT SWAP & PAYOUT
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-white">
                Get Guaranteed Firm Quote
              </h3>
            </div>

            {/* Asset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select Cryptocurrency</label>
              <div className="grid grid-cols-4 gap-2">
                {assets.slice(0, 4).map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedSymbol(asset.symbol)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedSymbol === asset.symbol
                        ? 'bg-purple-600 border-purple-400 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm">{asset.symbol}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Amount ({selectedSymbol})</span>
                <span>Market: {formatNgn(currentAsset.ngnPrice)}</span>
              </div>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono font-bold text-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Bank details */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>Destination Bank Account (NGN)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-white"
                >
                  <option>Kuda Bank</option>
                  <option>GTBank</option>
                  <option>Zenith Bank</option>
                  <option>OPay</option>
                  <option>Moniepoint</option>
                  <option>Access Bank</option>
                  <option>First Bank</option>
                </select>

                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="10 digit account no."
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white"
                />
              </div>

              <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-between">
                <span>Account Verified: {accountName}</span>
                <span>Instant Deposit</span>
              </div>
            </div>

            {/* Total Summary Box */}
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex justify-between items-center">
              <div>
                <div className="text-xs text-purple-200">Guaranteed NGN Payout</div>
                <div className="text-2xl font-extrabold font-mono text-white mt-0.5">
                  {formatNgn(estimatedNgn)}
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>Fee: <span className="text-emerald-400 font-bold">₦0 (1.5% locked)</span></div>
                <div>Time: <span className="text-white font-bold">&lt; 10 min</span></div>
              </div>
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Lock Rate & Get Payment Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Rate Locked & Deposit Wallet */}
        {step === 'confirm' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  RATE LOCKED
                </div>
                <h3 className="font-heading text-xl font-extrabold text-white">
                  Deposit {amount} {selectedSymbol}
                </h3>
              </div>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Expected Payout Banner */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400">Locked Payout to {bank}</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">
                  {formatNgn(estimatedNgn)}
                </div>
              </div>
              <div className="text-xs text-right text-slate-400 font-mono">
                <div>{accountNumber}</div>
                <div className="font-bold text-slate-200">{accountName}</div>
              </div>
            </div>

            {/* Wallet Address Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Send exactly {amount} {selectedSymbol} to:
              </label>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-purple-300 truncate font-semibold">
                  {dummyDepositAddress}
                </span>
                <button
                  onClick={copyAddress}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Simulated QR placeholder */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded p-1 flex flex-col justify-between">
                  <div className="flex justify-between"><div className="w-3 h-3 bg-white" /><div className="w-3 h-3 bg-white" /></div>
                  <div className="flex justify-between"><div className="w-3 h-3 bg-white" /><div className="w-3 h-3 bg-white" /></div>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-bold text-white">Automated On-Chain Monitoring</p>
                <p className="text-slate-400">Funds are released automatically upon 1 blockchain confirmation.</p>
              </div>
            </div>

            <button
              onClick={() => setStep('success')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Have Sent the Payment</span>
            </button>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-heading text-2xl font-extrabold text-white">
                Transfer Detected & Order Processing!
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                Your quote of <span className="text-emerald-400 font-bold">{formatNgn(estimatedNgn)}</span> is being processed. Naira will arrive in your <span className="font-bold text-white">{bank}</span> account within 10 minutes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left space-y-1 text-slate-400">
              <div className="flex justify-between"><span>TX ID:</span><span className="text-purple-300 font-bold">LX-{Math.floor(10000 + Math.random() * 90000)}</span></div>
              <div className="flex justify-between"><span>Status:</span><span className="text-emerald-400 font-bold">Processing Payout</span></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer"
            >
              Done & Return to Exchange
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

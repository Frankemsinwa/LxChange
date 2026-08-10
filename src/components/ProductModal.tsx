import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Zap, Smartphone, Tv, Gamepad2, CreditCard, Building2, BellRing, Gift } from 'lucide-react';
import { ProductService } from '../types/crypto';

interface ProductModalProps {
  product: ProductService | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('08031234567');
  const [network, setNetwork] = useState('MTN');
  const [amount, setAmount] = useState('2000');
  const [smartcardNo, setSmartcardNo] = useState('1029384756');
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-purple-500/30 p-6 sm:p-8 relative shadow-2xl glow-purple">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                ECOSYSTEM SERVICE
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-white">
                {product.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{product.subtitle}</p>
            </div>

            {/* Dynamic Inputs Based on Category */}
            {product.id === 'airtime' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Network</label>
                  <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white"
                  >
                    <option>MTN Nigeria</option>
                    <option>Airtel Nigeria</option>
                    <option>Glo Nigeria</option>
                    <option>9mobile</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Amount (NGN)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white"
                  />
                </div>
              </div>
            )}

            {product.id === 'cable' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Provider</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white">
                    <option>DStv Nigeria</option>
                    <option>GOtv</option>
                    <option>StarTimes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Smartcard / IUC Number</label>
                  <input
                    type="text"
                    value={smartcardNo}
                    onChange={(e) => setSmartcardNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-white"
                  />
                </div>
              </div>
            )}

            {product.id === 'otc' && (
              <div className="space-y-3 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <p className="text-xs text-purple-200">
                  Our Abuja OTC desk handles high-volume institutional trades (&gt; ₦50M) with zero slippage and direct WhatsApp manager support.
                </p>
                <div className="text-xs font-bold text-white">Abuja Office: Plot 402, Maitama, Abuja</div>
              </div>
            )}

            {product.id !== 'airtime' && product.id !== 'cable' && product.id !== 'otc' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-white">Instant Automated Execution</p>
                <p>Pay with crypto (USDT/BTC/SOL) or Naira bank transfer with guaranteed rate locking.</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Proceed with {product.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">
              Request Initiated!
            </h3>
            <p className="text-xs text-slate-300">
              Your order for {product.title} has been logged. An instant status update will be pushed to your notification drawer.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

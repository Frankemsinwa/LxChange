import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Clock, ShieldCheck, Zap, Building2, CheckCircle2, RefreshCw } from 'lucide-react';
import { LXLogo } from './LXLogo';
import { CryptoAsset } from '../types/crypto';

interface TradeTicket {
  ticketId: string;
  tradeSummary: string;
  email: string;
  createdAt: Date;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  type?: 'text' | 'live-rates' | 'ticket';
  ticketData?: TradeTicket;
  time: string;
}

interface TradeDeskChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: CryptoAsset[];
  activeTicket?: TradeTicket | null;
  onOpenTradeForm: () => void;
}

export const TradeDeskChatModal: React.FC<TradeDeskChatModalProps> = ({
  isOpen,
  onClose,
  assets,
  activeTicket,
  onOpenTradeForm,
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins for locked rate
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Messages
  useEffect(() => {
    const initialMsgs: ChatMessage[] = [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Hey 👋 Welcome to the LXchange Trade Desk! Ask me about rates, how to sell crypto or gift cards, or start a trade to get a locked NGN quote.',
        time: '15:53',
      },
      {
        id: 'msg-rates',
        sender: 'bot',
        type: 'live-rates',
        time: '15:53',
      },
    ];

    if (activeTicket) {
      initialMsgs.push({
        id: `ticket-${activeTicket.ticketId}`,
        sender: 'bot',
        type: 'ticket',
        ticketData: activeTicket,
        time: 'Just now',
      });
    }

    setMessages(initialMsgs);
  }, [activeTicket]);

  // Countdown timer for locked rate
  useEffect(() => {
    if (activeTicket && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [activeTicket, timeLeft]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const btcAsset = assets.find((a) => a.symbol === 'BTC') || assets[0];
  const usdtAsset = assets.find((a) => a.symbol === 'USDT') || assets[1] || assets[0];

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');

    // Simulated Bot Reply
    setTimeout(() => {
      let botResponseText =
        "Thanks for reaching out! A live LXchange trader is reviewing your query. Current locked rates are guaranteed for 15 minutes once you submit a trade request.";

      const lower = textToSend.toLowerCase();
      if (lower.includes('btc')) {
        botResponseText = `Current BTC/NGN rate is ₦${btcAsset.ngnPrice.toLocaleString()} per BTC. Would you like to start a trade?`;
      } else if (lower.includes('usdt')) {
        botResponseText = `Current USDT/NGN rate is ₦${usdtAsset.ngnPrice.toLocaleString()} per USDT. Instant bank payout guaranteed in < 10 minutes.`;
      } else if (lower.includes('gift') || lower.includes('card')) {
        botResponseText = `We buy Amazon, Apple/iTunes, Steam, Sephora, Razer Gold & Google Play gift cards at up to ₦1,380/USD! Click 'Start a trade' above to send card details.`;
      } else if (lower.includes('how long') || lower.includes('time') || lower.includes('speed')) {
        botResponseText = `Payouts take under 10 minutes directly into any Nigerian bank account (GTBank, Kuda, Zenith, Moniepoint, OPay) after transaction confirmation.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Outer Phone / Desk Modal Container */}
      <div className="w-full max-w-[420px] h-[640px] rounded-3xl bg-[#090914] border border-purple-500/30 flex flex-col overflow-hidden shadow-2xl relative glow-purple">
        {/* HEADER AREA */}
        <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950/90 p-4 border-b border-purple-500/20 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <LXLogo size="md" layout="icon" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>

            {/* Title Details */}
            <div>
              <h3 className="font-heading font-extrabold text-white text-base leading-tight">
                LXchange Trade Desk
              </h3>
              <p className="text-xs text-purple-200">Naira-first · Abuja, Nigeria</p>
            </div>
          </div>

          {/* Sub status */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-purple-200/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Trader online · Replies in minutes</span>
          </div>

          {/* Badges Carousel Row */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-semibold text-purple-200">
            <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 whitespace-nowrap">
              ⚡ Rate locked 15 min
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 whitespace-nowrap">
              🏦 Naira &lt; 10 min
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 whitespace-nowrap">
              🔒 Encrypted
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 whitespace-nowrap">
              🇳🇬 Abuja-based
            </span>
          </div>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#06060e]">
          {/* Date Badge */}
          <div className="text-center my-1">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400">
              Today · 28 Jul
            </span>
          </div>

          {/* Messages Stream */}
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              {msg.sender === 'bot' ? (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    LX
                  </div>

                  <div className="max-w-[85%] space-y-2">
                    {msg.text && (
                      <div className="p-3.5 rounded-2xl bg-[#131326] border border-slate-800 text-xs text-slate-200 leading-relaxed rounded-tl-none">
                        {msg.text}
                      </div>
                    )}

                    {/* Embedded Live Rates Card */}
                    {msg.type === 'live-rates' && (
                      <div className="p-3.5 rounded-2xl bg-[#111122] border border-slate-800 text-xs text-slate-200 space-y-2.5 rounded-tl-none">
                        <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                          LIVE RATES · NGN
                        </div>

                        <div className="space-y-1.5 font-mono">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#191933]">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">
                                ₿
                              </span>
                              <span className="font-bold text-white">BTC</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-white">₦{btcAsset.ngnPrice.toLocaleString()}</div>
                              <div className="text-[10px] text-emerald-400">▲ 2.41%</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded-lg bg-[#191933]">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">
                                ₮
                              </span>
                              <span className="font-bold text-white">USDT</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-white">₦{usdtAsset.ngnPrice.toLocaleString()}</div>
                              <div className="text-[10px] text-emerald-400">▲ 0.12%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Active Ticket Card */}
                    {msg.type === 'ticket' && msg.ticketData && (
                      <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-xs space-y-2 rounded-tl-none">
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
                          <span>ACTIVE TICKET: {msg.ticketData.ticketId}</span>
                          <span className="flex items-center gap-1 font-mono text-purple-300">
                            <Clock className="w-3 h-3" />
                            {formatTimer(timeLeft)}
                          </span>
                        </div>
                        <div className="font-medium text-white">{msg.ticketData.tradeSummary}</div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Assigned to Trader Aisha · Rate locked for 15m</span>
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500 pl-1">{msg.time}</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <div className="max-w-[80%] p-3.5 rounded-2xl bg-purple-600 text-white text-xs font-medium rounded-tr-none shadow-md">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 pr-1 mt-0.5">{msg.time}</span>
                </div>
              )}
            </div>
          ))}

          <div ref={chatBottomRef} />
        </div>

        {/* QUICK ACTION PILLS ROW */}
        <div className="px-3 py-2 bg-[#080812] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSendMessage('What is the current BTC rate?')}
            className="px-3 py-1.5 rounded-full bg-[#131326] hover:bg-purple-900/50 border border-slate-800 text-[11px] font-semibold text-slate-200 whitespace-nowrap cursor-pointer transition-colors"
          >
            ₿ BTC rate
          </button>
          <button
            onClick={() => handleSendMessage('What is the current USDT rate?')}
            className="px-3 py-1.5 rounded-full bg-[#131326] hover:bg-purple-900/50 border border-slate-800 text-[11px] font-semibold text-slate-200 whitespace-nowrap cursor-pointer transition-colors"
          >
            ₮ USDT rate
          </button>
          <button
            onClick={() => handleSendMessage('How much do you buy gift cards?')}
            className="px-3 py-1.5 rounded-full bg-[#131326] hover:bg-purple-900/50 border border-slate-800 text-[11px] font-semibold text-slate-200 whitespace-nowrap cursor-pointer transition-colors"
          >
            🎁 Gift cards
          </button>
          <button
            onClick={() => handleSendMessage('How long does bank payout take?')}
            className="px-3 py-1.5 rounded-full bg-[#131326] hover:bg-purple-900/50 border border-slate-800 text-[11px] font-semibold text-slate-200 whitespace-nowrap cursor-pointer transition-colors"
          >
            ⏱️ How long?
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenTradeForm();
            }}
            className="px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            ⚡ Start a trade
          </button>
        </div>

        {/* INPUT BAR */}
        <div className="p-3 bg-[#080812] border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Message the trade desk..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#121224] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium"
          />
          <button
            onClick={() => handleSendMessage()}
            className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

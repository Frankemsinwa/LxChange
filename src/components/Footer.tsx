import React from 'react';
import { Send, MessageCircle, Mail, Globe, Shield } from 'lucide-react';
import { LXLogo } from './LXLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#05050b] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <LXLogo size="lg" showTagline={true} />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The naira-first crypto exchange and digital products store. Abuja, Nigeria — serving West Africa since 2021.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                title="Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                𝕏
              </a>
              <a
                href="#"
                title="Telegram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                title="WhatsApp"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                title="Email"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#trade" className="hover:text-purple-400 transition-colors">Spot Trading</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Airtime & Data</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">OTC Desk</a></li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Developers
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Webhooks</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Rate Feed</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
              <li><a href="#earn" className="hover:text-purple-400 transition-colors">Referral program</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Rate Alerts</a></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2021-2026 LXchange Digital Ltd. Abuja, Nigeria. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Cookies</a>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed">
          Digital assets involve significant risk. Prices are volatile. Trade only what you can afford to lose. LXchange is not an investment adviser.
        </div>
      </div>
    </footer>
  );
};

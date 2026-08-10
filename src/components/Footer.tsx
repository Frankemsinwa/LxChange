import React from 'react';
import { LXLogo } from './LXLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0B0B19] pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <LXLogo size="lg" showTagline={false} />
            </a>
            <p className="text-sm text-slate-400">
              Start trading, simply.
            </p>
          </div>

          {/* Column 1: Company */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Legal</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#trade" className="hover:text-purple-400 transition-colors">Spot Trading</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">P2P Market</a></li>
              <li><a href="#earn" className="hover:text-purple-400 transition-colors">Staking</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Launchpad</a></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
          <div>
            © 2026 LxChange.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
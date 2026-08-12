export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  iconBg: string;
  ngnPrice: number;
  usdPrice: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  sparkline: number[];
  isGainer?: boolean;
  isTrending?: boolean;
}

export interface ProductService {
  id: string;
  title: string;
  subtitle: string;
  category: 'trading' | 'bills' | 'vouchers' | 'services';
  icon: string;
}

export type AdAccent = 'purple' | 'emerald' | 'amber' | 'cyan';

export interface PlatformAd {
  id: string;
  tag: string;
  headline: string;
  subtext: string;
  icon: string;
  accent: AdAccent;
  cta: string;
  stats: { label: string; value: string }[];
}

export interface YieldOption {
  id: string;
  title: string;
  apy: string;
  badge?: string;
  note: string;
  type: string;
  crypto: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OrderItem {
  id: string;
  amount: string;
  asset: string;
  ngnValue: number;
  status: 'Paid' | 'Locked' | 'Pending';
  time: string;
  txHash: string;
}

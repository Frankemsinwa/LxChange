import React from 'react';

interface LXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical' | 'icon';
  showTagline?: boolean;
  className?: string;
}

export const LXLogo: React.FC<LXLogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  showTagline = true,
  className = '',
}) => {
  // Sizing definitions
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  }[size];

  const taglineSize = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
    xl: 'text-[16px]',
  }[size];

  const EmblemSVG = (
    <div className={`relative flex-shrink-0 ${iconDimensions}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]"
      >
        <defs>
          <linearGradient id="lxOrangeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7e00" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="lxBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Outer Orbit / Layered Double Ring */}
        <circle cx="50" cy="50" r="46" stroke="url(#lxOrangeGoldGrad)" strokeWidth="3" opacity="0.9" />
        <circle cx="50" cy="50" r="41" stroke="url(#lxOrangeGoldGrad)" strokeWidth="1.5" opacity="0.5" strokeDasharray="180 20" />

        {/* 4 Chart Bars */}
        {/* Bar 1 (Tall) */}
        <rect x="25" y="28" width="9" height="44" rx="4" fill="url(#lxBarGrad)" />
        {/* Bar 2 (Short) */}
        <rect x="38" y="50" width="9" height="22" rx="4" fill="url(#lxBarGrad)" />
        {/* Bar 3 (Medium Tall) */}
        <rect x="51" y="40" width="9" height="32" rx="4" fill="url(#lxBarGrad)" />
        {/* Bar 4 (Short) */}
        <rect x="64" y="54" width="9" height="18" rx="4" fill="url(#lxBarGrad)" />

        {/* Connecting Trend Line graph with node dots */}
        <path
          d="M 38 42 L 46 54 L 56 44 L 66 54"
          stroke="url(#lxOrangeGoldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="38" cy="42" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        <circle cx="46" cy="54" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        <circle cx="56" cy="44" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        <circle cx="66" cy="54" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
      </svg>
    </div>
  );

  if (layout === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{EmblemSVG}</div>;
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {EmblemSVG}
        <div className="mt-2 flex flex-col items-center">
          <span className={`font-heading font-black uppercase text-white tracking-wider ${textSize}`}>
            LXCHANGE
          </span>
          {showTagline && (
            <span className={`font-medium text-slate-300 font-sans tracking-tight mt-0.5 ${taglineSize}`}>
              ..... you first
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {EmblemSVG}
      <div className="flex flex-col leading-none justify-center">
        <span className={`font-heading font-black uppercase text-white tracking-wider ${textSize}`}>
          LXCHANGE
        </span>
        {showTagline && (
          <span className={`font-medium text-slate-300 font-sans tracking-tight self-end mt-0.5 ${taglineSize}`}>
            ..... you first
          </span>
        )}
      </div>
    </div>
  );
};

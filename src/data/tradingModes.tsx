import React from 'react';

export interface TradingMode {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  features: string[];
}

// Simple SVG icons for trading modes
const SimpleIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const GuaranteeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

const MaximizerIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    <path d="M7 7l10 10M17 7l-10 10" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const tradingModes: TradingMode[] = [
  {
    id: 'simple',
    icon: SimpleIcon,
    name: 'Simple Mode',
    description: 'Basic automated trading with standard parameters, perfect for beginners who want to start trading gold with minimal complexity.',
    features: [
      'Automated trade execution',
      'Standard risk parameters',
      'Basic market analysis',
      'Simple setup process',
      'Beginner-friendly interface'
    ],
  },
  {
    id: 'pip-guarantee',
    icon: GuaranteeIcon,
    name: '30+ Pip Guarantee',
    description: 'Conservative approach with guaranteed minimum profit targets, ensuring consistent returns with reduced risk exposure.',
    features: [
      'Guaranteed 30+ pip minimum',
      'Conservative risk management',
      'Steady profit accumulation',
      'Lower drawdown limits',
      'Consistent performance tracking'
    ],
  },
  {
    id: 'profit-maximizer',
    icon: MaximizerIcon,
    name: 'Profit Maximizer',
    description: 'Aggressive strategy for maximum returns, utilizing advanced algorithms and high-frequency execution for experienced traders.',
    features: [
      'Maximum profit potential',
      'Advanced ML algorithms',
      'High-frequency execution',
      'Dynamic position sizing',
      'Real-time optimization'
    ],
  },
];
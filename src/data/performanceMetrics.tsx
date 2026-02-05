import React from 'react';

export interface PerformanceMetric {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  trend: 'positive' | 'negative' | 'neutral';
  description: string;
}

// Simple SVG icons for performance metrics
const DrawdownIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const ProfitTargetIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const WinRateIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const TradeDurationIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const RiskRewardIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3v18h18"/>
    <path d="M7 16l4-4 4 4 6-6"/>
    <circle cx="7" cy="16" r="2"/>
    <circle cx="11" cy="12" r="2"/>
    <circle cx="15" cy="16" r="2"/>
    <circle cx="21" cy="10" r="2"/>
  </svg>
);

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'total-return',
    icon: ProfitTargetIcon,
    label: 'Total Return',
    value: '247.3',
    unit: '%',
    trend: 'positive',
    description: 'Cumulative return achieved through quantitative multi-engine algorithmic trading.',
  },
  {
    id: 'win-rate',
    icon: WinRateIcon,
    label: 'Win Rate',
    value: '78.5',
    unit: '%',
    trend: 'positive',
    description: 'Percentage of profitable trades, indicating the accuracy of trading signals and execution.',
  },
  {
    id: 'sharpe-ratio',
    icon: RiskRewardIcon,
    label: 'Sharpe Ratio',
    value: '2.87',
    unit: 'ratio',
    trend: 'positive',
    description: 'Risk-adjusted return metric demonstrating superior performance per unit of risk.',
  },
  {
    id: 'max-drawdown',
    icon: DrawdownIcon,
    label: 'Maximum Drawdown',
    value: '5.2',
    unit: '%',
    trend: 'negative',
    description: 'Maximum peak-to-trough decline in account balance, indicating excellent risk control.',
  },
  {
    id: 'trade-duration',
    icon: TradeDurationIcon,
    label: 'Average Trade Duration',
    value: '2.4',
    unit: 'hours',
    trend: 'neutral',
    description: 'Average time positions are held, optimized for maximum profit extraction.',
  },
];
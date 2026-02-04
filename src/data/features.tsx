import React from 'react';

export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Simple SVG icons for features - using inline SVG for better performance
const PredictionEngineIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const GPUIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <rect x="4" y="8" width="4" height="2"/>
    <rect x="4" y="12" width="4" height="2"/>
    <rect x="10" y="8" width="4" height="2"/>
    <rect x="10" y="12" width="4" height="2"/>
    <rect x="16" y="8" width="4" height="2"/>
    <rect x="16" y="12" width="4" height="2"/>
  </svg>
);

const RiskManagementIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V5l-9-4z"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const MLModelIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="19" r="2"/>
    <circle cx="5" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
  </svg>
);

const MultiTimeframeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 2h8M8 22h8"/>
  </svg>
);

const HFTIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const RealTimeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
);

const TradeManagementIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
  </svg>
);

export const features: Feature[] = [
  {
    id: 'prediction-engines',
    icon: PredictionEngineIcon,
    title: '40+ Prediction Engines',
    description: 'Advanced algorithmic engines analyze market patterns, trends, and signals to provide accurate gold price predictions with high precision.',
  },
  {
    id: 'gpu-acceleration',
    icon: GPUIcon,
    title: 'GPU Acceleration',
    description: 'Leverage CUDA, DirectML, and ROCm technologies for lightning-fast computations and real-time market analysis processing.',
  },
  {
    id: 'risk-management',
    icon: RiskManagementIcon,
    title: 'Advanced Risk Management',
    description: 'Intelligent risk assessment and management systems protect your capital with customizable stop-loss and position sizing strategies.',
  },
  {
    id: 'ml-models',
    icon: MLModelIcon,
    title: 'ML Model Integration',
    description: 'Sophisticated machine learning models including LSTM, Random Forest, and XGBoost for predictive analytics and pattern recognition.',
  },
  {
    id: 'multi-timeframe',
    icon: MultiTimeframeIcon,
    title: 'Multi-Timeframe Analysis',
    description: 'Comprehensive analysis across all timeframes from M1 to 1 Month, providing both scalping and long-term trading opportunities.',
  },
  {
    id: 'high-frequency',
    icon: HFTIcon,
    title: 'High-Frequency Execution',
    description: 'Ultra-fast trade execution with minimal latency, capturing market opportunities in milliseconds for maximum profit potential.',
  },
  {
    id: 'real-time-analysis',
    icon: RealTimeIcon,
    title: 'Real-Time Market Analysis',
    description: 'Continuous market monitoring and analysis with instant signal generation and trade recommendations based on live market data.',
  },
  {
    id: 'trade-management',
    icon: TradeManagementIcon,
    title: 'Automated Trade Management',
    description: 'Complete trade lifecycle management with automated entry, exit, and position management based on predefined strategies.',
  },
];
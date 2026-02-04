import React from 'react';

export interface Technology {
  id: string;
  name: string;
  category: string;
}

export interface TechnologyCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  technologies: Technology[];
}

// Simple SVG icons for technology categories
const MLModelsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="19" r="2"/>
    <circle cx="5" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
  </svg>
);

const GPUAccelerationIcon = (
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

const AnalysisEnginesIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const TimeframesIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 2h8M8 22h8"/>
  </svg>
);

const ExecutionSystemsIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

export const technologyCategories: TechnologyCategory[] = [
  {
    id: 'ml-models',
    name: 'ML Models',
    icon: MLModelsIcon,
    technologies: [
      { id: 'lstm', name: 'LSTM', category: 'ml-models' },
      { id: 'random-forest', name: 'Random Forest', category: 'ml-models' },
      { id: 'xgboost', name: 'XGBoost', category: 'ml-models' },
      { id: 'neural-networks', name: 'Neural Networks', category: 'ml-models' },
      { id: 'svm', name: 'Support Vector Machines', category: 'ml-models' },
      { id: 'gradient-boosting', name: 'Gradient Boosting', category: 'ml-models' },
    ],
  },
  {
    id: 'gpu-acceleration',
    name: 'GPU Acceleration',
    icon: GPUAccelerationIcon,
    technologies: [
      { id: 'cuda', name: 'CUDA', category: 'gpu-acceleration' },
      { id: 'directml', name: 'DirectML', category: 'gpu-acceleration' },
      { id: 'rocm', name: 'ROCm', category: 'gpu-acceleration' },
      { id: 'opencl', name: 'OpenCL', category: 'gpu-acceleration' },
      { id: 'tensorrt', name: 'TensorRT', category: 'gpu-acceleration' },
    ],
  },
  {
    id: 'analysis-engines',
    name: 'Analysis Engines',
    icon: AnalysisEnginesIcon,
    technologies: [
      { id: 'prediction-engines', name: '40+ Prediction Engines', category: 'analysis-engines' },
      { id: 'pattern-recognition', name: 'Pattern Recognition', category: 'analysis-engines' },
      { id: 'trend-analysis', name: 'Trend Analysis', category: 'analysis-engines' },
      { id: 'sentiment-analysis', name: 'Sentiment Analysis', category: 'analysis-engines' },
      { id: 'volatility-analysis', name: 'Volatility Analysis', category: 'analysis-engines' },
      { id: 'correlation-analysis', name: 'Correlation Analysis', category: 'analysis-engines' },
    ],
  },
  {
    id: 'timeframes',
    name: 'Timeframes',
    icon: TimeframesIcon,
    technologies: [
      { id: 'm1', name: 'M1', category: 'timeframes' },
      { id: 'm5', name: 'M5', category: 'timeframes' },
      { id: 'm15', name: 'M15', category: 'timeframes' },
      { id: 'm30', name: 'M30', category: 'timeframes' },
      { id: 'h1', name: 'H1', category: 'timeframes' },
      { id: 'h4', name: 'H4', category: 'timeframes' },
      { id: 'd1', name: 'D1', category: 'timeframes' },
      { id: 'w1', name: 'W1', category: 'timeframes' },
      { id: '1-month', name: '1 Month', category: 'timeframes' },
    ],
  },
  {
    id: 'execution-systems',
    name: 'Execution Systems',
    icon: ExecutionSystemsIcon,
    technologies: [
      { id: 'hft', name: 'High-Frequency Trading', category: 'execution-systems' },
      { id: 'order-management', name: 'Order Management', category: 'execution-systems' },
      { id: 'risk-management', name: 'Risk Management', category: 'execution-systems' },
      { id: 'position-sizing', name: 'Position Sizing', category: 'execution-systems' },
      { id: 'trade-execution', name: 'Trade Execution', category: 'execution-systems' },
      { id: 'latency-optimization', name: 'Latency Optimization', category: 'execution-systems' },
    ],
  },
];
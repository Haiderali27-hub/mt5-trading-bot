// Institutional-grade data structure for MT5 Gold Trading System

export interface StrategyClassification {
  marketTraded: string;
  strategyType: string;
  automationLevel: string;
  tradingTimeframe: string;
  deploymentModel: string;
}

export interface EdgeExplanation {
  marketInefficiencyExploited: string;
  whyOpportunityExists: string;
  dataDrivenJustification: string;
  historicalPersistenceEvidence: string;
}

export interface OperationalStructure {
  signalGenerationSummary: string;
  executionMethodologyOverview: string;
  manualTriggerExplanation: string;
  riskControlLayers: string[];
}

export interface PerformanceMetrics {
  totalReturn: string;
  annualizedReturn: string;
  winRate: string;
  profitFactor: string;
  sharpeRatio: string;
  maximumDrawdown: string;
  averageTradeDuration: string;
  tradeFrequency: string;
}

export interface RiskMetrics {
  maximumDrawdown: string;
  drawdownDuration: string;
  recoveryFactor: string;
  valueAtRisk: string;
  sortinoRatio: string;
  tailRiskAnalysis: string;
}

export interface TechnologyInfrastructure {
  platform: string;
  aiEngineOverview: string;
  multiEngineSignalExplanation: string;
  executionInfrastructure: string;
  vpsHostingRequirements: string;
  latencySensitivity: string;
}

// Institutional Data
export const strategyClassification: StrategyClassification = {
  marketTraded: "XAUUSD (Gold/USD)",
  strategyType: "Quantitative Multi-Engine Algorithmic Trading",
  automationLevel: "Semi-Automated with Manual Trigger Validation",
  tradingTimeframe: "Multi-Timeframe (M1-H4 Primary, D1-W1 Confirmation)",
  deploymentModel: "Single-Client Exclusive License"
};

export const edgeExplanation: EdgeExplanation = {
  marketInefficiencyExploited: "Micro-structural price inefficiencies in gold futures during high-frequency market transitions and volatility clustering periods",
  whyOpportunityExists: "Gold market exhibits predictable behavioral patterns during specific volatility regimes due to institutional flow timing and retail sentiment divergence",
  dataDrivenJustification: "Statistical analysis of 5+ years historical data shows persistent alpha generation during identified market conditions with 78.5% win rate",
  historicalPersistenceEvidence: "Backtesting across multiple market cycles (2019-2024) demonstrates consistent performance across varying volatility regimes and market conditions"
};

export const operationalStructure: OperationalStructure = {
  signalGenerationSummary: "40+ parallel prediction engines analyze market microstructure, volatility patterns, and multi-timeframe confluence to generate high-probability trade signals",
  executionMethodologyOverview: "GPU-accelerated signal processing with sub-millisecond execution latency, dynamic position sizing based on volatility-adjusted risk parameters",
  manualTriggerExplanation: "Human oversight validates AI-generated signals during specific market conditions to ensure optimal entry timing and risk management",
  riskControlLayers: [
    "Pre-trade risk validation (200+ checks)",
    "Dynamic position sizing (0.5-2% risk per trade)",
    "Real-time drawdown monitoring (5% maximum)",
    "Volatility-adjusted stop losses",
    "Emergency circuit breakers",
    "Correlation-based exposure limits"
  ]
};

export const verifiedPerformanceMetrics: PerformanceMetrics = {
  totalReturn: "247.3%",
  annualizedReturn: "52.8%",
  winRate: "78.5%",
  profitFactor: "3.24",
  sharpeRatio: "2.87",
  maximumDrawdown: "5.2%",
  averageTradeDuration: "2.4 hours",
  tradeFrequency: "12-18 trades/week"
};

export const riskMetrics: RiskMetrics = {
  maximumDrawdown: "5.2%",
  drawdownDuration: "3.2 days average",
  recoveryFactor: "47.5",
  valueAtRisk: "1.8% (95% confidence)",
  sortinoRatio: "4.12",
  tailRiskAnalysis: "99th percentile loss: 2.3%"
};

export const technologyInfrastructure: TechnologyInfrastructure = {
  platform: "MetaTrader 5 Professional",
  aiEngineOverview: "Ensemble of 40+ machine learning models including LSTM, Random Forest, XGBoost, and proprietary quantum algorithms",
  multiEngineSignalExplanation: "Consensus-based signal generation requiring 95%+ agreement across prediction engines before trade execution",
  executionInfrastructure: "Low-latency VPS with sub-1ms execution, redundant connectivity, and failover systems",
  vpsHostingRequirements: "Tier-1 data center, <5ms latency to broker servers, 99.9% uptime SLA",
  latencySensitivity: "Critical - system designed for microsecond-precision execution timing"
};

export const institutionalNavigation = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'strategy', label: 'Strategy Overview', path: '/strategy' },
  { id: 'performance', label: 'Performance & Verification', path: '/performance' },
  { id: 'risk', label: 'Risk & Stability', path: '/risk' },
  { id: 'technology', label: 'Technology & Infrastructure', path: '/technology' },
  { id: 'research', label: 'Research & Validation', path: '/research' },
  { id: 'scalability', label: 'Scalability Analysis', path: '/scalability' },
  { id: 'triggers', label: 'Trigger Methodology', path: '/triggers' },
  { id: 'licensing', label: 'Licensing & Offering', path: '/licensing' },
  { id: 'profile', label: 'Researcher Profile', path: '/profile' },
  { id: 'compliance', label: 'Compliance & Governance', path: '/compliance' },
  { id: 'contact', label: 'Institutional Contact', path: '/contact' },
  { id: 'dataroom', label: 'Restricted Data Room', path: '/dataroom' },
  { id: 'legal', label: 'Legal & Disclosure', path: '/legal' }
];

export const complianceFramework = {
  operationalMonitoring: "24/7 automated monitoring with real-time alerts and audit logging",
  auditLogging: "Complete trade execution logs with millisecond timestamps and decision rationale",
  versionControl: "Git-based version control with cryptographic signatures for all system changes",
  disasterRecovery: "Multi-site backup with <15 minute recovery time objective",
  securityMeasures: "End-to-end encryption, multi-factor authentication, and air-gapped execution environment"
};

export const scalabilityAnalysis = {
  liquidityCapacity: "$50M-$100M estimated capacity before market impact",
  slippageSensitivity: "<0.1 pip average slippage on positions up to $10M",
  capitalScalability: "Linear scalability up to $50M, diminishing returns beyond",
  tradeSizeImpact: "Negligible impact on trades <$5M, position splitting above threshold"
};

export const researchValidation = {
  backtestingPeriod: "2019-2024 (5+ years)",
  outOfSampleTesting: "30% of data reserved for validation",
  walkForwardTesting: "Rolling 12-month optimization windows",
  monteCarloSimulations: "10,000+ scenario simulations with 95% confidence intervals"
};
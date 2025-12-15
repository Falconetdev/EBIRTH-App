export enum CalculatorTab {
  CLASSIC = "CLASSIC",
  PRO = "PRO",
  MARGIN = "MARGIN",
  AI_JOURNAL = "AI_JOURNAL",
}

export enum TradeDirection {
  LONG = "LONG",
  SHORT = "SHORT",
}

export enum MarginMode {
  ISOLATED = "ISOLATED",
  CROSS = "CROSS",
}

export interface TradeMetrics {
  leverage: number;
  riskAmount: number;
  marginRequired: number;
  potentialProfit: number;
  slDistancePct: number;
  targetDistancePct: number;
  rrRatio: number;
  isValid: boolean;
  error?: string;
}

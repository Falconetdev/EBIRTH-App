import { TradeDirection } from "../types/leverage-calculator";

export const calculateDistancePct = (
  entry: number,
  price: number,
  direction: TradeDirection,
): number => {
  if (entry === 0) return 0;
  if (direction === TradeDirection.LONG) {
    return (price - entry) / entry;
  } else {
    return (entry - price) / entry;
  }
};

export const calculateSlDistanceAbs = (
  entry: number,
  sl: number,
  direction: TradeDirection,
): number => {
  if (entry === 0) return 0;
  // Distance is always positive for calculation purposes representing the % move against us
  if (direction === TradeDirection.LONG) {
    return (entry - sl) / entry;
  } else {
    return (sl - entry) / entry;
  }
};

/**
 * Calculates safe leverage based on Risk, Margin, and Stop Loss Distance.
 * Returns leverage as an integer (floored) or 0 if unsafe/invalid.
 */
export const calculateSafeLeverage = (
  riskUsd: number,
  marginUsd: number,
  slDistPct: number, // decimal format (e.g., 0.05 for 5%)
): { leverage: number; error?: string; warning?: string } => {
  if (marginUsd <= 0 || slDistPct <= 0 || riskUsd <= 0) {
    return { leverage: 0 };
  }

  // Math: Leverage = Risk / (Margin * SL_Distance)
  const rawLev = riskUsd / (marginUsd * slDistPct);

  // Case: Stop Loss is so wide that even 1x leverage exceeds risk
  if (rawLev < 1) {
    return {
      leverage: 0,
      error:
        "Stop Loss is too wide for this Risk/Margin ratio. Decrease Margin or tighten Stop Loss.",
    };
  }

  const leverage = Math.floor(rawLev);

  // Case: 1x Leverage (Technically valid, but not for futures)
  if (leverage === 1) {
    return {
      leverage: 1,
      warning:
        "1x Leverage is essentially Spot Trading. Not recommended for Futures.",
    };
  }

  return { leverage };
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(val);
};

export const formatPct = (val: number) => {
  return (val * 100).toFixed(2) + "%";
};

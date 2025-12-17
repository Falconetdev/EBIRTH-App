import React, { useState, useEffect } from "react";
import {
  NumberInput,
  DirectionSwitch,
  PercentageGroup,
} from "./InputComponents";
import { TradeDirection, MarginMode } from "../../types/leverage-calculator";
import {
  calculateSlDistanceAbs,
  calculateSafeLeverage,
  formatCurrency,
} from "../../utils/calculations";

const ProCalculator: React.FC = () => {
  const [direction, setDirection] = useState<TradeDirection>(
    TradeDirection.LONG,
  );
  const [mode, setMode] = useState<MarginMode>(MarginMode.CROSS);

  const [capital, setCapital] = useState<number | "">("");
  const [marginPct, setMarginPct] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | "">("");

  const [riskPct, setRiskPct] = useState<number | null>(null);
  const [risk, setRisk] = useState<number | "">("");

  const [entry, setEntry] = useState<string>("");
  const [sl, setSl] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [leverage, setLeverage] = useState<number>(0);
  const [errors, setErrors] = useState<{
    sl?: string;
    target?: string;
    generic?: string;
  }>({});
  const [warning, setWarning] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Stats for display
  const [slPercentage, setSlPercentage] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(0);

  // Auto-set Defaults when Capital is entered
  useEffect(() => {
    if (capital !== '' && capital > 0) {
      if (marginPct === null) setMarginPct(5);
      if (riskPct === null) setRiskPct(2.5);
    }
  }, [capital, marginPct, riskPct]);

  // Sync Margin Pct with Values
  useEffect(() => {
    if (marginPct !== null && capital !== "" && capital > 0) {
      setMargin(Number((capital * (marginPct / 100)).toFixed(2)));
    }
  }, [capital, marginPct]);

  // Sync Risk Pct with Values
  useEffect(() => {
    if (riskPct !== null && capital !== "" && capital > 0) {
      setRisk(Number((capital * (riskPct / 100)).toFixed(2)));
    }
  }, [capital, riskPct]);

  // Main Calculation Logic & Validation
  useEffect(() => {
    setErrors({});
    setWarning("");

    const entryP = parseFloat(entry);
    const slP = parseFloat(sl);
    const targetP = parseFloat(target);
    const marginP = typeof margin === "number" ? margin : 0;
    const riskP = typeof risk === "number" ? risk : 0;

    const currentErrors: { sl?: string; target?: string; generic?: string } =
      {};

    // Calculate Percentages for Display with 3 decimal places
    if (entryP > 0 && slP > 0) {
      setSlPercentage((Math.abs(entryP - slP) / entryP) * 100);
    } else {
      setSlPercentage(0);
    }

    if (entryP > 0 && targetP > 0) {
      setTargetPercentage((Math.abs(targetP - entryP) / entryP) * 100);
    } else {
      setTargetPercentage(0);
    }

    if (!entryP || !slP || marginP <= 0 || riskP <= 0) {
      setLeverage(0);
      return;
    }

    // Specific Field Validation
    if (entryP === slP) {
      currentErrors.sl = "Entry and SL cannot be same.";
    }

    // SL Direction Check
    if (direction === TradeDirection.LONG && slP >= entryP) {
      currentErrors.sl = "Long SL must be below Entry price.";
    }
    if (direction === TradeDirection.SHORT && slP <= entryP) {
      currentErrors.sl = "Short SL must be above Entry price.";
    }

    // Target Direction Check
    if (targetP) {
      if (direction === TradeDirection.LONG && targetP <= entryP) {
        currentErrors.target = "Long Target must be above Entry.";
      }
      if (direction === TradeDirection.SHORT && targetP >= entryP) {
        currentErrors.target = "Short Target must be below Entry.";
      }
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setLeverage(0);
      return;
    }

    const slDist = calculateSlDistanceAbs(entryP, slP, direction);
    // Use shared calculation logic
    const result = calculateSafeLeverage(riskP, marginP, slDist);

    if (result.error) {
      setErrors({ generic: result.error });
      setLeverage(0);
    } else {
      setLeverage(result.leverage);
      if (result.warning) setWarning(result.warning);
    }
  }, [entry, sl, margin, risk, direction, target]);

  // Derived Stats
  const entryP = parseFloat(entry) || 0;
  const targetP = parseFloat(target) || 0;
  const slP = parseFloat(sl) || 0;
  const slDist = calculateSlDistanceAbs(entryP, slP, direction);

  const riskVal = typeof risk === "number" ? risk : 0;
  const marginVal = typeof margin === "number" ? margin : 0;
  const capitalVal = typeof capital === "number" ? capital : 0;

  let targetDist = 0;
  if (targetP > 0 && entryP > 0) {
    targetDist =
      direction === TradeDirection.LONG
        ? (targetP - entryP) / entryP
        : (entryP - targetP) / entryP;
  }

  const rr = slDist > 0 ? targetDist / slDist : 0;
  const profit = rr > 0 ? riskVal * rr : 0;
  const capitalRiskPct = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
  // Fix precision issue for display comparisons
  const displayRiskPct = Number(capitalRiskPct.toFixed(2));

  // Liquidation Error Logic
  const isLiquidationError = mode === MarginMode.ISOLATED && riskVal > marginVal;

  // Bad Trade Logic (RR < 1.5)
  const isBadTrade = rr > 0 && rr < 1.5;

  // ROI Reality Check
  const courseFee = 105;
  const tradesToCover = profit > 0 ? Math.ceil(courseFee / profit) : 0;

  const copySignal = () => {
    if (leverage === 0 || isLiquidationError) return;
    const riskPercentage = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
    const rewardPercentage = targetP ? Math.abs(rr) * riskPercentage : 0;

    const text = `
${direction === TradeDirection.LONG ? "🟢 BUY / LONG SETUP" : "🔴 SELL / SHORT SETUP"}

📈 Entry : ${entryP}
❌ Stop Loss : ${slP}
🎯 Target : ${targetP || "Open"}
⚡ Leverage : ${leverage}x

⚠️ Risk : ${riskPercentage.toFixed(2)}%
💰 Reward : ${targetP ? rewardPercentage.toFixed(2) + "%" : "N/A"}

⚡ Powered by Inner Racers`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isHighRisk = leverage > 0 && displayRiskPct > 5;
  const hasError = Object.keys(errors).length > 0;
  
  // LOGIC UPDATE: Show help if Bad Trade, Liquidation Error, High Risk, or General Error
  const showHelp = isHighRisk || hasError || isLiquidationError || (isBadTrade && leverage > 0);

  return (
    <div className="space-y-6">
      <DirectionSwitch direction={direction} setDirection={setDirection} />

      {/* Mode Toggles */}
      <div className="flex justify-center gap-6 mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${mode === MarginMode.ISOLATED ? "border-app-gold bg-app-gold/20" : "border-gray-600 bg-transparent"}`}
          >
            {mode === MarginMode.ISOLATED && (
              <div className="w-2 h-2 rounded-full bg-app-gold" />
            )}
          </div>
          <input
            type="radio"
            checked={mode === MarginMode.ISOLATED}
            onChange={() => setMode(MarginMode.ISOLATED)}
            className="hidden"
          />
          <span className="text-gray-400 group-hover:text-white transition-colors">
            Isolated
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${mode === MarginMode.CROSS ? "border-app-gold bg-app-gold/20" : "border-gray-600 bg-transparent"}`}
          >
            {mode === MarginMode.CROSS && (
              <div className="w-2 h-2 rounded-full bg-app-gold" />
            )}
          </div>
          <input
            type="radio"
            checked={mode === MarginMode.CROSS}
            onChange={() => setMode(MarginMode.CROSS)}
            className="hidden"
          />
          <span className="text-gray-400 group-hover:text-white transition-colors">
            Cross
          </span>
        </label>
      </div>

      <NumberInput
        label="Total Capital"
        value={capital}
        onChange={(v) => setCapital(v === "" ? "" : parseFloat(v))}
        prefix="$"
        tooltip="Your total trading account balance."
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <NumberInput
            label="Margin Size"
            value={margin}
            onChange={(v) => {
              setMargin(v === "" ? "" : parseFloat(v));
              setMarginPct(null);
            }}
            prefix="$"
            tooltip="Amount of capital you want to commit to this trade."
          />
          <PercentageGroup
            options={[2.5, 5, 10]}
            onSelect={(v) => setMarginPct(v)}
            activeVal={marginPct}
          />
        </div>
        <div className="flex-1">
          <NumberInput
            label="Risk Tolerance"
            value={risk}
            onChange={(v) => {
              setRisk(v === "" ? "" : parseFloat(v));
              setRiskPct(null);
            }}
            prefix="$"
            highlight
            tooltip="Maximum amount you are willing to lose."
            cornerHint={capitalVal > 0 && riskVal > 0 ? {
                text: `${displayRiskPct}% of Cap`,
                color: displayRiskPct > 5 ? 'text-app-danger' : 'text-gray-400'
            } : undefined}
          />
          <PercentageGroup
            options={[1, 2.5, 5]}
            onSelect={(v) => setRiskPct(v)}
            activeVal={riskPct}
          />
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 flex flex-col">
          <NumberInput
            label="Entry Price"
            value={entry}
            onChange={setEntry}
            tooltip="The price where you enter the trade."
          />
        </div>
        <div className="flex-1 flex flex-col relative">
          <NumberInput
            label="Stop Loss"
            value={sl}
            onChange={setSl}
            error={errors.sl}
            tooltip="Price where trade exits to prevent further loss."
            cornerHint={
              slPercentage > 0
                ? {
                    text: `-${slPercentage.toFixed(3)}%`,
                    color: "text-app-danger",
                  }
                : undefined
            }
          />
        </div>
      </div>

      <div className="relative">
        <NumberInput
          label="1st Target (Optional)"
          value={target}
          onChange={setTarget}
          placeholder="Take Profit"
          className="border-app-gold/50"
          tooltip="Primary target used for R:R calculation."
          error={errors.target}
          cornerHint={
            targetPercentage > 0
              ? {
                  text: `+${targetPercentage.toFixed(3)}%`,
                  color: "text-app-success",
                }
              : undefined
          }
        />
      </div>

      {/* Result Section */}
      <div className="w-full mt-8 p-1 rounded-3xl bg-white/5 border border-white/5">
        <div className="relative z-10 px-2 flex flex-col gap-6 py-6">
            
            {/* Disclaimer Text */}
            <div className="text-[10px] text-gray-400 italic text-center -mb-2">
              Note: Trading fees are not included. Actual returns may vary slightly.
            </div>

          {/* Grid First */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Risk : Reward
              </div>
              <div className="font-mono font-bold text-xl">
                {targetP > 0 ? (
                  <>
                    <span
                      className={
                        isBadTrade
                          ? "text-app-danger"
                          : rr < 2
                            ? "text-yellow-500"
                            : "text-app-success"
                      }
                    >
                      1 : {rr.toFixed(2)}
                    </span>
                    <div className="text-[9px] mt-1 font-sans opacity-80 leading-tight">
                      {isBadTrade ? (
                        <span className="text-red-400">
                          ⛔ Consider adjusting SL/TP for better R:R
                        </span>
                      ) : rr < 2 ? (
                        <span className="text-yellow-500">
                          ⚠️ Okay<br/>(Medium)
                        </span>
                      ) : (
                        <span className="text-green-400">✅ Good Trade</span>
                      )}
                    </div>
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm flex flex-col justify-center">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Est. Profit
              </div>
              <div className="font-mono font-bold text-xl text-app-success">
                {formatCurrency(profit)}
              </div>
              
              {/* ROI Reality Check - HIDE if Bad Trade, Liquidation Error, or Need > 10 Trades */}
              {profit > 0 && rr >= 1.5 && !isLiquidationError && !isBadTrade && tradesToCover <= 10 && (
                <a href="https://wa.me/94777890356" target="_blank" rel="noopener noreferrer" className="mt-1 text-[9px] text-app-gold font-bold leading-tight hover:underline">
                  {profit >= courseFee ? (
                      <span className="text-green-400 animate-pulse">
                          🔥 Boom! This single trade pays for your Lifetime Membership!
                      </span>
                  ) : (
                      <span>
                          💡 Insight: Just {tradesToCover} win{tradesToCover > 1 ? 's' : ''} like this covers your Lifetime Membership.
                      </span>
                  )}
                </a>
              )}
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Max Loss
              </div>
              <div className="font-mono font-bold text-xl text-app-danger">
                {formatCurrency(riskVal)}
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Exposure
              </div>
              <div className="font-mono font-bold text-xl text-white">
                {capitalVal > 0
                  ? ((marginVal / capitalVal) * 100).toFixed(1)
                  : 0}
                %
              </div>
            </div>
          </div>

          {/* Risk Feedback */}
          {leverage > 0 && (
            <div className="flex justify-center w-full">
              {isLiquidationError ? (
                <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30 flex items-center justify-center gap-2 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  ⛔ Liquidation Risk! Risk ({formatCurrency(riskVal)}) exceeds Margin ({formatCurrency(marginVal)})
               </div>
              ) : displayRiskPct > 5 ? (
               <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-xl border border-red-500/30 flex flex-col items-center justify-center gap-1 leading-tight">
                  <span className="uppercase tracking-widest text-[10px]">⚠️ Capital Risk Warning</span>
                  <span>You are risking <span className="text-app-gold font-black">{displayRiskPct.toFixed(2)}%</span> of your TOTAL Capital.</span>
               </div>
              ) : displayRiskPct <= 2.5 ? (
               <div className="w-full text-center text-green-400 text-xs font-bold bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/30 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  ✅ Perfect Risk ({displayRiskPct.toFixed(2)}% of Capital)
               </div>
              ) : (
               <div className="w-full text-center text-orange-400 text-xs font-bold bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-500/30 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  ⚖️ Moderate Risk ({displayRiskPct.toFixed(2)}% of Capital)
               </div>
              )}
            </div>
          )}

          {/* Leverage Section Moved Bottom */}
          <div className="text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">
              {displayRiskPct <= 5 && !isLiquidationError ? "Best Safe Leverage" : "Calculated Leverage"}
            </div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-app-gold to-yellow-600 drop-shadow-sm flex justify-center items-baseline gap-1">
              {isLiquidationError ? 0 : leverage}
              <span className="text-2xl text-yellow-700 font-bold">x</span>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              {errors.generic && (
                <div className="text-red-400 text-xs font-bold bg-red-900/20 py-1 px-3 rounded inline-block border border-red-500/20 animate-slide-down">
                  ⛔ {errors.generic}
                </div>
              )}
              {warning && !errors.generic && (
                <div className="text-yellow-500 text-xs font-bold bg-yellow-900/20 py-1 px-3 rounded inline-block border border-yellow-500/20 animate-slide-down">
                  ⚠️ {warning}
                </div>
              )}
            </div>
               
               {/* FEATURE 1: Help Me Button */}
               {showHelp && (
                <div className="mt-4 pt-4 border-t border-white/5 animate-slide-down w-full flex flex-col items-center">
                  <div className="text-gray-300 text-xs font-medium mb-3 text-center">
                    දිගටම Loss වෙනවද? (Keep losing?) <br/> Get Professional Risk Training.
                  </div>
                  <a 
                    href="https://wa.me/94777890356?text=Hi%20Inner%20Racers,%20I%20keep%20getting%20High%20Risk%20warnings.%20I%20need%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all transform hover:-translate-y-0.5"
                  >
                    👉 Ask Inner Racers
                  </a>
                </div>
               )}

            {leverage > 0 && !isLiquidationError && (
              <button
                onClick={copySignal}
                className={`mt-6 w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2
                     ${copied ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-white/10 hover:bg-white/20 text-white border border-white/5"}
                     `}
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Signal Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy Signal
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProCalculator;

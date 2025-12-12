import React, { useState, useEffect } from "react";
import {
  NumberInput,
  DirectionSwitch,
  PercentageGroup,
} from "./InputComponents";
import { TradeDirection } from "../../types/leverage-calculator";
import {
  calculateSlDistanceAbs,
  calculateDistancePct,
  formatCurrency,
} from "../../utils/calculations";

const MarginCalculator: React.FC = () => {
  const [direction, setDirection] = useState<TradeDirection>(
    TradeDirection.LONG,
  );
  const [capital, setCapital] = useState<number | "">("");
  const [fixedLev, setFixedLev] = useState<number | "">("");

  const [riskPct, setRiskPct] = useState<number | null>(null);
  const [risk, setRisk] = useState<number | "">("");

  const [entry, setEntry] = useState<string>("");
  const [sl, setSl] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [errors, setErrors] = useState<{ sl?: string; target?: string }>({});
  const [warning, setWarning] = useState<string>("");

  const [requiredMargin, setRequiredMargin] = useState<number>(0);

  // Display Stats
  const [slPercentage, setSlPercentage] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(0);

  // Sync Risk Pct
  useEffect(() => {
    if (riskPct !== null && capital !== "" && capital > 0) {
      setRisk(Number((capital * (riskPct / 100)).toFixed(2)));
    }
  }, [capital, riskPct]);

  useEffect(() => {
    setErrors({});
    setWarning("");
    const entryP = parseFloat(entry);
    const slP = parseFloat(sl);
    const targetP = parseFloat(target);
    const levP = typeof fixedLev === "number" ? fixedLev : 0;
    const riskP = typeof risk === "number" ? risk : 0;

    const currentErrors: { sl?: string; target?: string } = {};

    // Calculate Percentages for Display hints
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

    if (!entryP || !slP || levP <= 0 || riskP <= 0) {
      setRequiredMargin(0);
      return;
    }

    if (levP === 1) {
      setWarning("1x Leverage is Spot Trading.");
    }

    // SL Validation logic
    if (direction === TradeDirection.LONG && slP >= entryP) {
      currentErrors.sl = "Long SL must be below Entry.";
    }
    if (direction === TradeDirection.SHORT && slP <= entryP) {
      currentErrors.sl = "Short SL must be above Entry.";
    }

    // Target Validation
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
      setRequiredMargin(0);
      return;
    }

    const slDist = calculateSlDistanceAbs(entryP, slP, direction);
    if (slDist <= 0) {
      setRequiredMargin(0);
      return;
    }

    // Formula: Margin = Risk / (Leverage * SL_Dist_Pct)
    const req = riskP / (levP * slDist);

    setRequiredMargin(req);
  }, [entry, sl, target, fixedLev, risk, direction]);

  const capitalVal = typeof capital === "number" ? capital : 0;
  const riskVal = typeof risk === "number" ? risk : 0;
  const fixedLevVal = typeof fixedLev === "number" ? fixedLev : 0;

  const capitalRiskPct = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;

  // Derived Stats for Render
  const entryP = parseFloat(entry) || 0;
  const slP = parseFloat(sl) || 0;
  const targetP = parseFloat(target) || 0;
  const slDist = calculateSlDistanceAbs(entryP, slP, direction);
  const targetDist = calculateDistancePct(entryP, targetP, direction); // Returns positive if in direction

  const rr = slDist > 0 && targetDist > 0 ? targetDist / slDist : 0;
  const profit = rr > 0 ? riskVal * rr : 0;

  return (
    <div className="space-y-6">
      <DirectionSwitch direction={direction} setDirection={setDirection} />

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
            label="Fixed Leverage"
            value={fixedLev}
            onChange={(v) => setFixedLev(v === "" ? "" : parseFloat(v))}
            suffix="x"
            tooltip="The leverage multiplier you intend to use."
          />
          <div className="flex gap-1.5 mt-2">
            {[10, 20, 50, 100].map((l) => (
              <button
                key={l}
                onClick={() => setFixedLev(l)}
                className="flex-1 py-1.5 text-[10px] border border-white/10 bg-white/5 rounded hover:border-app-gold text-gray-400 hover:text-white transition-all"
              >
                {l}x
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <NumberInput
            label="Risk Amount"
            value={risk}
            onChange={(v) => {
              setRisk(v === "" ? "" : parseFloat(v));
              setRiskPct(null);
            }}
            prefix="$"
            highlight
            tooltip="Total amount you are willing to lose on this trade."
          />
          <PercentageGroup
            options={[1, 2.5, 5]}
            onSelect={(v) => setRiskPct(v)}
            activeVal={riskPct}
          />
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 relative">
          <NumberInput label="Entry Price" value={entry} onChange={setEntry} />
        </div>
        <div className="flex-1 relative">
          <NumberInput
            label="Stop Loss"
            value={sl}
            onChange={setSl}
            error={errors.sl}
            cornerHint={
              slPercentage > 0
                ? {
                    text: `-${slPercentage.toFixed(2)}%`,
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
          tooltip="Primary target used for R:R and Profit calculation."
          error={errors.target}
          cornerHint={
            targetPercentage > 0
              ? {
                  text: `+${targetPercentage.toFixed(2)}%`,
                  color: "text-app-success",
                }
              : undefined
          }
        />
      </div>

      {/* Result */}
      <div className="w-full mt-8 p-1 rounded-3xl bg-white/5 border border-white/5">
        <div className="text-center relative overflow-hidden px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-8">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Risk : Reward
              </div>
              <div className="font-mono font-bold text-xl">
                {targetP > 0 ? (
                  <>
                    <span
                      className={
                        rr < 1.5
                          ? "text-app-danger"
                          : rr < 2
                            ? "text-yellow-500"
                            : "text-app-success"
                      }
                    >
                      1 : {rr.toFixed(2)}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                Est. Profit
              </div>
              <div className="font-mono font-bold text-xl text-app-success">
                {formatCurrency(profit)}
              </div>
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
                Leverage
              </div>
              <div className="font-mono font-bold text-xl text-white">
                {fixedLevVal > 0 ? fixedLevVal + "x" : "-"}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">
            Required Margin
          </div>
          <div className="text-5xl font-black text-app-gold drop-shadow-md">
            {formatCurrency(requiredMargin)}
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            {warning && (
              <div className="text-yellow-500 text-xs font-bold bg-yellow-900/20 py-1 px-3 rounded inline-block border border-yellow-500/20 animate-slide-down">
                ⚠️ {warning}
              </div>
            )}

            {capitalVal > 0 && requiredMargin > capitalVal && (
              <div className="w-full p-3 bg-red-500/10 border border-red-500/20 backdrop-blur-sm rounded-lg text-red-400 text-xs font-bold animate-slide-down">
                ⛔ Insufficient Capital (Need{" "}
                {formatCurrency(requiredMargin - capitalVal)} more)
              </div>
            )}

            {capitalRiskPct > 5 ? (
              <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                ⚠️ Bad Risk ({capitalRiskPct.toFixed(2)}% of Capital)
              </div>
            ) : capitalRiskPct > 0 && capitalRiskPct <= 2.5 ? (
              <div className="w-full text-center text-green-400 text-xs font-bold bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/30 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>✅
                Perfect Risk ({capitalRiskPct.toFixed(2)}% of Capital)
              </div>
            ) : capitalRiskPct > 0 ? (
              <div className="w-full text-center text-orange-400 text-xs font-bold bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-500/30 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                ⚖️ Moderate Risk ({capitalRiskPct.toFixed(2)}% of Capital)
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;

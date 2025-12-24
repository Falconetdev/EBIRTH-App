import React, { useState, useEffect, useRef } from 'react';
import { NumberInput, DirectionSwitch, PercentageGroup } from './InputComponents';
import { TradeDirection, MarginMode } from '../../types/leverage-calculator';
import { calculateSlDistanceAbs, calculateSafeLeverage, formatCurrency } from '../../utils/calculations';

const ProCalculator: React.FC = () => {
  const wisdomRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TradeDirection>(TradeDirection.LONG);
  const [mode, setMode] = useState<MarginMode>(MarginMode.CROSS);

  const [capital, setCapital] = useState<number | ''>('');
  const [marginPct, setMarginPct] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | ''>('');

  const [riskPct, setRiskPct] = useState<number | null>(null);
  const [risk, setRisk] = useState<number | ''>('');

  const [entry, setEntry] = useState<string>('');
  const [sl, setSl] = useState<string>('');
  const [target, setTarget] = useState<string>('');

  const [leverage, setLeverage] = useState<number>(0);
  const [errors, setErrors] = useState<{ sl?: string; target?: string; generic?: string }>({});
  const [warning, setWarning] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showRRInfo, setShowRRInfo] = useState<boolean>(false);

  const [slPercentage, setSlPercentage] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(0);

  const COURSE_FEE = 105;

  useEffect(() => {
    if (capital !== '' && capital > 0) {
      if (marginPct === null) setMarginPct(5);
      if (riskPct === null) setRiskPct(2.5);
    }
  }, [capital]);

  useEffect(() => {
    if (marginPct !== null && capital !== '' && capital > 0) {
      setMargin(Number((capital * (marginPct / 100)).toFixed(2)));
    }
  }, [capital, marginPct]);

  useEffect(() => {
    if (riskPct !== null && capital !== '' && capital > 0) {
      setRisk(Number((capital * (riskPct / 100)).toFixed(2)));
    }
  }, [capital, riskPct]);

  useEffect(() => {
    if (showRRInfo && wisdomRef.current) {
      wisdomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showRRInfo]);

  useEffect(() => {
    setErrors({});
    setWarning('');

    const entryP = parseFloat(entry);
    const slP = parseFloat(sl);
    const targetP = parseFloat(target);
    const marginP = typeof margin === 'number' ? margin : 0;
    const riskP = typeof risk === 'number' ? risk : 0;

    const currentErrors: { sl?: string; target?: string; generic?: string } = {};

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

    if (entryP === slP) {
      currentErrors.sl = "Entry and SL cannot be same.";
    }

    if (direction === TradeDirection.LONG && slP >= entryP) {
      currentErrors.sl = "Long SL must be below Entry price.";
    }
    if (direction === TradeDirection.SHORT && slP <= entryP) {
      currentErrors.sl = "Short SL must be above Entry price.";
    }

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
    const result = calculateSafeLeverage(riskP, marginP, slDist);

    if (result.error) {
      setErrors({ generic: result.error });
      setLeverage(0);
    } else {
      setLeverage(result.leverage);
      if (result.warning) setWarning(result.warning);
    }

  }, [entry, sl, margin, risk, direction, target]);

  const entryP = parseFloat(entry) || 0;
  const targetP = parseFloat(target) || 0;
  const slP = parseFloat(sl) || 0;
  const slDist = calculateSlDistanceAbs(entryP, slP, direction);

  const riskVal = typeof risk === 'number' ? risk : 0;
  const marginVal = typeof margin === 'number' ? margin : 0;
  const capitalVal = typeof capital === 'number' ? capital : 0;

  let targetDist = 0;
  if(targetP > 0 && entryP > 0) {
    targetDist = direction === TradeDirection.LONG ? (targetP - entryP) / entryP : (entryP - targetP) / entryP;
  }

  const rr = slDist > 0 ? targetDist / slDist : 0;
  const profit = rr > 0 ? riskVal * rr : 0;
  const capitalRiskPct = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
  const displayRiskPct = Number(capitalRiskPct.toFixed(2));

  const isLiquidationError = mode === MarginMode.ISOLATED && riskVal > marginVal;

  const isBadTrade = (targetP > 0) && (rr < 1.5);

  const tradesToCover = profit > 0 ? Math.ceil(COURSE_FEE / profit) : 0;

  const copySignal = () => {
    if (leverage === 0 || isLiquidationError) return;
    const riskPercentage = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
    const rewardPercentage = targetP ? (Math.abs(rr) * riskPercentage) : 0;
    const text = `
${direction === TradeDirection.LONG ? "🟢 BUY / LONG SETUP" : "🔴 SELL / SHORT SETUP"}

📈 Entry : ${entryP}
❌ Stop Loss : ${slP}
🎯 Target : ${targetP || 'Open'}
⚡ Leverage : ${leverage}x

⚠️ Risk : ${riskPercentage.toFixed(2)}%
💰 Reward : ${targetP ? rewardPercentage.toFixed(2) + '%' : 'N/A'}

⚡ Powered by Inner Racers`.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHighRisk = leverage > 0 && displayRiskPct > 5;
  const hasError = Object.keys(errors).length > 0;
  const showHelp = isHighRisk || hasError || isLiquidationError || (isBadTrade && leverage > 0);

  const getWaLink = () => {
    const msg = profit >= COURSE_FEE
      ? `Hi Inner Racers, I just found a trade setup with ${formatCurrency(profit)} profit. I want to unlock Lifetime Membership!`
      : `Hi Inner Racers, I'm calculating my trades. Tell me more about the Lifetime Membership Fee.`;
    return `https://wa.me/94777890356?text=${encodeURIComponent(msg)}`;
  };

  const getFullMembershipLink = () => {
    const msg = `Hi Inner Racers, I want to get Perfect Management + Full Membership. I'm tired of taking low quality trades.`;
    return `https://wa.me/94777890356?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6">
      <DirectionSwitch direction={direction} setDirection={setDirection} />

      <div className="flex justify-center gap-6 mb-4 text-sm">
         <label className="flex items-center gap-2 cursor-pointer group">
           <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${mode === MarginMode.ISOLATED ? 'border-app-gold bg-app-gold/20' : 'border-gray-600 bg-transparent'}`}>
              {mode === MarginMode.ISOLATED && <div className="w-2 h-2 rounded-full bg-app-gold" />}
           </div>
           <input type="radio" checked={mode === MarginMode.ISOLATED} onChange={() => setMode(MarginMode.ISOLATED)} className="hidden"/>
           <span className="text-gray-400 group-hover:text-white transition-colors">Isolated</span>
         </label>
         <label className="flex items-center gap-2 cursor-pointer group">
           <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${mode === MarginMode.CROSS ? 'border-app-gold bg-app-gold/20' : 'border-gray-600 bg-transparent'}`}>
              {mode === MarginMode.CROSS && <div className="w-2 h-2 rounded-full bg-app-gold" />}
           </div>
           <input type="radio" checked={mode === MarginMode.CROSS} onChange={() => setMode(MarginMode.CROSS)} className="hidden"/>
           <span className="text-gray-400 group-hover:text-white transition-colors">Cross</span>
         </label>
      </div>

      <NumberInput
        label="Total Capital"
        value={capital}
        onChange={(v) => setCapital(v === '' ? '' : parseFloat(v))}
        prefix="$"
        tooltip="Your total trading account balance."
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <NumberInput
            label="Margin Size"
            value={margin}
            onChange={(v) => { setMargin(v === '' ? '' : parseFloat(v)); setMarginPct(null); }}
            prefix="$"
            tooltip="Amount of capital you want to commit to this trade."
          />
          <PercentageGroup options={[2.5, 5, 10]} onSelect={(v) => setMarginPct(v)} activeVal={marginPct} />
        </div>
        <div className="flex-1">
          <NumberInput
            label="Risk Tolerance"
            value={risk}
            onChange={(v) => { setRisk(v === '' ? '' : parseFloat(v)); setRiskPct(null); }}
            prefix="$"
            highlight
            tooltip="Maximum amount you are willing to lose."
            cornerHint={capitalVal > 0 && riskVal > 0 ? {
                text: `${displayRiskPct}% of Cap`,
                color: displayRiskPct > 5 ? 'text-app-danger' : 'text-gray-400'
            } : undefined}
          />
          <PercentageGroup options={[1, 2.5, 5]} onSelect={(v) => setRiskPct(v)} activeVal={riskPct} />
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 flex flex-col">
            <NumberInput label="Entry Price" value={entry} onChange={setEntry} tooltip="The price where you enter the trade." />
        </div>
        <div className="flex-1 flex flex-col relative">
            <NumberInput
              label="Stop Loss"
              value={sl}
              onChange={setSl}
              error={errors.sl}
              tooltip="Price where trade exits to prevent further loss."
              cornerHint={slPercentage > 0 ? { text: `-${slPercentage.toFixed(3)}%`, color: 'text-app-danger' } : undefined}
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
            cornerHint={targetPercentage > 0 ? { text: `+${targetPercentage.toFixed(3)}%`, color: 'text-app-success' } : undefined}
        />
      </div>

      <div className="w-full mt-8 p-1 rounded-3xl bg-white/5 border border-white/5">
        <div className="relative z-10 px-2 flex flex-col gap-6 py-6">
            <div className="text-[10px] text-gray-400 italic text-center -mb-2">
              Note: Trading fees are not included. Actual returns may vary slightly.
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm relative">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Risk : Reward</div>
                <div className="font-mono font-bold text-xl">
                    {targetP > 0 ? (
                        <>
                           <span className={isBadTrade ? 'text-app-danger' : rr < 2 ? 'text-yellow-500' : 'text-app-success'}>
                               1 : {rr.toFixed(2)}
                           </span>
                           <div className="text-[9px] mt-1 font-sans opacity-80 leading-tight flex items-start gap-1">
                               {isBadTrade ? (
                                 <div className="flex flex-col gap-1 items-start">
                                    <span className="text-red-400 font-bold flex items-center gap-1">
                                        ⛔ Bad Trade!
                                    </span>
                                    <span className="text-[8px] text-red-500 uppercase tracking-tighter font-black">Don't take this trade!</span>
                                 </div>
                               ) : rr < 2 ? (
                                 <span className="text-yellow-500">⚠️ Okay<br/>(Medium)</span>
                               ) : (
                                 <span className="text-green-400">✅ Good Trade</span>
                               )}
                           </div>
                        </>
                    ) : '-'}
                </div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm flex flex-col justify-center">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Est. Profit</div>
                <div className="font-mono font-bold text-xl text-app-success">{formatCurrency(profit)}</div>

                {profit >= 30 && rr >= 1.5 && !isLiquidationError && !isBadTrade && (
                  <a
                    href={getWaLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-[9px] text-app-gold font-bold leading-tight hover:opacity-80 transition-opacity block group/profit"
                  >
                    {profit >= COURSE_FEE ? (
                        <span className="text-green-400 animate-pulse block">
                            🔥 Boom! This trade pays for your Lifetime Membership Fee! {profit > COURSE_FEE && `(and you have an extra ${formatCurrency(profit - COURSE_FEE)})`}
                            <span className="text-[8px] text-white/50 block font-normal group-hover/profit:text-app-gold transition-colors">Click to Claim Membership 👉</span>
                        </span>
                    ) : (
                        <span>
                            💡 Insight: Just {tradesToCover} wins like this covers your Lifetime Membership Fee.
                            <span className="text-[8px] text-white/50 block font-normal group-hover/profit:text-app-gold transition-colors">Click for Details 👉</span>
                        </span>
                    )}
                  </a>
                )}
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Max Loss</div>
                <div className="font-mono font-bold text-xl text-app-danger">{formatCurrency(riskVal)}</div>
              </div>
               <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Exposure</div>
                <div className="font-mono font-bold text-xl text-white">
                  {capitalVal > 0 ? (marginVal/capitalVal * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>

            {isBadTrade && (
              <button
                onClick={() => setShowRRInfo(!showRRInfo)}
                className="w-full mt-4 bg-gradient-to-r from-red-700 via-red-500 to-red-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                <span>⛔ CRITICAL RISK DETECTED (Click to see why)</span>
              </button>
            )}

            {leverage > 0 && (
            <div className="flex justify-center w-full mt-4">
                {isLiquidationError ? (
                  <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30 flex items-center justify-center gap-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    ⛔ Liquidation Risk! Risk exceeds Margin.
                 </div>
                ) : isBadTrade ? (
                  displayRiskPct > 5 ? (
                    <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-xl border border-red-500/30 flex flex-col items-center justify-center gap-1 leading-tight">
                        <span className="uppercase tracking-widest text-[10px]">⛔ CRITICAL WARNING</span>
                        <span>High Risk ({displayRiskPct.toFixed(2)}%) + Bad Trade Setup</span>
                    </div>
                  ) : (
                    <div className="w-full text-center text-orange-400 text-xs font-bold bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-500/30 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        ⚠️ Safe Amount, but BAD TRADE (Low R:R)
                    </div>
                  )
                ) : displayRiskPct > 5 ? (
                 <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-xl border border-red-500/30 flex flex-col items-center justify-center gap-1 leading-tight">
                    <span className="uppercase tracking-widest text-[10px]">⚠️ Capital Risk Warning</span>
                    <span>You are risking <span className="text-app-gold font-black">{displayRiskPct.toFixed(2)}%</span> of your TOTAL Capital.</span>
                    <span className="text-[10px] opacity-80 mt-1">Professional traders rarely risk more than 2.5%.</span>
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

            <div className="text-center mt-6">
              <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">
                {displayRiskPct <= 5 && !isLiquidationError ? "Best Safe Leverage" : "Calculated Leverage"}
              </div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-app-gold to-yellow-600 drop-shadow-sm flex justify-center items-baseline gap-1">
                {isLiquidationError ? 0 : leverage}<span className="text-2xl text-yellow-700 font-bold">x</span>
              </div>

              {showRRInfo && (
                <div ref={wisdomRef} className="mt-8 text-left bg-[#0f172a] border-2 border-app-gold rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-slide-up">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-app-gold animate-pulse"></span>
                      <span className="text-app-gold font-black text-[10px] uppercase tracking-[0.2em]">Trading Wisdom</span>
                    </div>
                    <button onClick={() => setShowRRInfo(false)} className="text-gray-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[16px] text-white leading-relaxed font-bold border-l-4 border-app-gold pl-4">
                      "Real traders never risk more than they earn from their 1st target."
                    </p>
                    <p className="text-[14px] text-gray-200 leading-relaxed font-medium">
                      Always check the <span className="text-app-gold font-black underline decoration-app-gold/30">1st Target</span>. If the reward isn't at least 1.5x your risk, <span className="text-red-400 font-bold">it is a Bad Trade</span>.
                    </p>
                    <p className="text-[13px] text-gray-300 leading-relaxed font-medium bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-app-gold font-black block mb-1 tracking-wider uppercase text-[10px]">⚠️ Warning:</span>
                      If you run trades like this even after a few profits, then a single loss will make you lose more than what you earned. Be careful about that! Learn to trade properly, then earn.
                    </p>

                    <div className="pt-2 flex flex-col gap-3">
                        <a
                          href={getFullMembershipLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-gradient-to-r from-app-gold to-yellow-600 text-black rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                          Get Perfect Management + Full Membership
                        </a>

                        <button
                          onClick={() => setShowRRInfo(false)}
                          className="w-full py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                        >
                          I understand, Got it
                        </button>
                    </div>
                  </div>
                </div>
              )}

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

               {showHelp && (
                <div className="mt-4 pt-4 border-t border-white/5 animate-slide-down w-full flex flex-col items-center">
                  <div className="text-gray-300 text-xs font-medium mb-3 text-center">
                    Keep losing? Get Professional Risk Training.
                  </div>
                  <a
                    href="https://wa.me/94777890356?text=Hi%20Inner%20Racers,%20I%20need%20help."
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
                     ${copied ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'}
                     `}
                   >
                     {copied ? (
                        <>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           Signal Copied!
                        </>
                     ) : (
                        <>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
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

import React, { useState, useEffect, useRef } from 'react';
import { NumberInput, DirectionSwitch, PercentageGroup } from './InputComponents';
import { TradeDirection } from '../../types/leverage-calculator';
import { calculateSlDistanceAbs, calculateDistancePct, formatCurrency } from '../../utils/calculations';

const MarginCalculator: React.FC = () => {
  const wisdomRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<TradeDirection>(TradeDirection.LONG);
  const [capital, setCapital] = useState<number | ''>('');
  const [fixedLev, setFixedLev] = useState<number | ''>('');

  const [riskPct, setRiskPct] = useState<number | null>(null);
  const [risk, setRisk] = useState<number | ''>('');

  const [entry, setEntry] = useState<string>('');
  const [sl, setSl] = useState<string>('');
  const [target, setTarget] = useState<string>('');

  const [errors, setErrors] = useState<{ sl?: string; target?: string }>({});
  const [warning, setWarning] = useState<string>('');
  const [requiredMargin, setRequiredMargin] = useState<number>(0);
  const [showRRInfo, setShowRRInfo] = useState<boolean>(false);

  const [slPercentage, setSlPercentage] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(0);

  const COURSE_FEE = 105;

  useEffect(() => {
    if (capital !== '' && capital > 0) {
      if (riskPct === null) setRiskPct(2.5);
    }
  }, [capital]);

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
    const levP = typeof fixedLev === 'number' ? fixedLev : 0;
    const riskP = typeof risk === 'number' ? risk : 0;

    const currentErrors: { sl?: string; target?: string } = {};

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

    if (direction === TradeDirection.LONG && slP >= entryP) {
      currentErrors.sl = "Long SL must be below Entry.";
    }
    if (direction === TradeDirection.SHORT && slP <= entryP) {
      currentErrors.sl = "Short SL must be above Entry.";
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
        setRequiredMargin(0);
        return;
    }

    const slDist = calculateSlDistanceAbs(entryP, slP, direction);
    if (slDist <= 0) {
      setRequiredMargin(0);
      return;
    }

    const req = riskP / (levP * slDist);
    setRequiredMargin(req);

  }, [entry, sl, target, fixedLev, risk, direction]);

  const capitalVal = typeof capital === 'number' ? capital : 0;
  const riskVal = typeof risk === 'number' ? risk : 0;
  const fixedLevVal = typeof fixedLev === 'number' ? fixedLev : 0;
  const capitalRiskPct = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
  const displayRiskPct = Number(capitalRiskPct.toFixed(2));

  const entryP = parseFloat(entry) || 0;
  const slP = parseFloat(sl) || 0;
  const targetP = parseFloat(target) || 0;
  const slDist = calculateSlDistanceAbs(entryP, slP, direction);
  const targetDist = calculateDistancePct(entryP, targetP, direction);

  const rr = slDist > 0 && targetDist > 0 ? targetDist / slDist : 0;
  const profit = rr > 0 ? riskVal * rr : 0;

  const isBadTrade = (targetP > 0) && (rr < 1.5);

  const tradesToCover = profit > 0 ? Math.ceil(COURSE_FEE / profit) : 0;
  const isHighRisk = displayRiskPct > 5;
  const isInsufficient = capitalVal > 0 && requiredMargin > capitalVal;
  const hasError = Object.keys(errors).length > 0;

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
            label="Fixed Leverage"
            value={fixedLev}
            onChange={(v) => setFixedLev(v === '' ? '' : parseFloat(v))}
            suffix="x"
            tooltip="The leverage multiplier you intend to use."
          />
          <div className="flex gap-1.5 mt-2">
            {[10, 20, 50, 100].map(l => (
              <button key={l} onClick={() => setFixedLev(l)} className="flex-1 py-1.5 text-[10px] border border-white/10 bg-white/5 rounded hover:border-app-gold text-gray-400 hover:text-white transition-all">{l}x</button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <NumberInput
            label="Risk Amount"
            value={risk}
            onChange={(v) => { setRisk(v === '' ? '' : parseFloat(v)); setRiskPct(null); }}
            prefix="$"
            highlight
            tooltip="Total amount you are willing to lose on this trade."
            cornerHint={capitalVal > 0 && riskVal > 0 ? {
                text: `${displayRiskPct}% of Cap`,
                color: displayRiskPct > 5 ? 'text-app-danger' : 'text-gray-400'
            } : undefined}
          />
          <PercentageGroup options={[1, 2.5, 5]} onSelect={(v) => setRiskPct(v)} activeVal={riskPct} />
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
                cornerHint={slPercentage > 0 ? { text: `-${slPercentage.toFixed(2)}%`, color: 'text-app-danger' } : undefined}
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
            cornerHint={targetPercentage > 0 ? { text: `+${targetPercentage.toFixed(2)}%`, color: 'text-app-success' } : undefined}
        />
      </div>

       <div className="w-full mt-8 p-1 rounded-3xl bg-white/5 border border-white/5">
        <div className="text-center relative overflow-hidden px-4 py-8">
            <div className="text-[10px] text-gray-400 italic text-center mb-4">
              Note: Trading fees are not included. Actual returns may vary slightly.
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm relative">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Risk : Reward</div>
                <div className="font-mono font-bold text-xl">
                    {targetP > 0 ? (
                        <>
                           <span className={isBadTrade ? 'text-app-danger' : rr < 2 ? 'text-yellow-500' : 'text-app-success'}>
                               1 : {rr.toFixed(2)}
                           </span>
                           <div className="text-[9px] mt-1 font-sans opacity-80 leading-tight flex items-start gap-1 text-left">
                               {isBadTrade ? (
                                 <div className="flex flex-col gap-1 items-start text-left">
                                    <span className="text-red-400 font-bold flex items-center gap-1">
                                        ⛔ Bad Trade!
                                    </span>
                                    <span className="text-[8px] text-red-500 uppercase tracking-tighter font-black">Don't take this trade!</span>
                                 </div>
                               ) : rr < 2 ? (
                                 <span className="text-yellow-500 text-left">⚠️ Okay<br/>(Medium)</span>
                               ) : (
                                 <span className="text-green-400 text-left">✅ Good Trade</span>
                               )}
                           </div>
                        </>
                    ) : '-'}
                </div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-sm flex flex-col justify-center">
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Est. Profit</div>
                <div className="font-mono font-bold text-xl text-app-success">{formatCurrency(profit)}</div>

                {profit >= 30 && rr >= 1.5 && !isBadTrade && (
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
                <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Leverage</div>
                <div className="font-mono font-bold text-xl text-white">{fixedLevVal > 0 ? fixedLevVal + 'x' : '-'}</div>
              </div>
            </div>

            {isBadTrade && (
              <button
                onClick={() => setShowRRInfo(!showRRInfo)}
                className="w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse flex items-center justify-center gap-2 mb-6 hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                <span>⛔ CRITICAL RISK DETECTED (Click to see why)</span>
              </button>
            )}

            <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">Required Margin</div>
            <div className="text-5xl font-black text-app-gold drop-shadow-md">{formatCurrency(requiredMargin)}</div>

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
                {warning && (
                     <div className="text-yellow-500 text-xs font-bold bg-yellow-900/20 py-1 px-3 rounded inline-block border border-yellow-500/20 animate-slide-down">
                      ⚠️ {warning}
                    </div>
                )}

                {isInsufficient && (
                <div className="w-full p-3 bg-red-500/10 border border-red-500/20 backdrop-blur-sm rounded-lg text-red-400 text-xs font-bold animate-slide-down">
                    ⛔ Insufficient Capital (Need {formatCurrency(requiredMargin - capitalVal)} more)
                </div>
                )}

                {isBadTrade ? (
                  displayRiskPct > 5 ? (
                    <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-xl border border-red-500/30 flex flex-col items-center justify-center gap-1 leading-tight">
                        <span className="uppercase tracking-widest text-[10px]">⛔ CRITICAL WARNING</span>
                        <span>High Risk ({displayRiskPct.toFixed(2)}%) + Bad Trade Setup</span>
                    </div>
                  ) : (
                    <div className="w-full text-center text-orange-400 text-xs font-bold bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-500/30 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                        ⚠️ Safe Amount, but BAD TRADE (Low R:R)
                    </div>
                  )
                ) : displayRiskPct > 5 ? (
                    <div className="w-full text-center text-red-400 text-xs font-bold bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30 flex flex-col items-center justify-center gap-1">
                        <span className="flex items-center gap-2 uppercase tracking-widest text-[10px]">⚠️ Capital Risk Warning</span>
                        <span>Bad Risk ({displayRiskPct.toFixed(2)}% of Capital)</span>
                        <span className="text-[10px] opacity-80">Professional traders rarely risk more than 2.5%.</span>
                    </div>
                ) : displayRiskPct > 0 && displayRiskPct <= 2.5 ? (
                    <div className="w-full text-center text-green-400 text-xs font-bold bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/30 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        ✅ Perfect Risk ({displayRiskPct.toFixed(2)}% of Capital)
                    </div>
                ) : displayRiskPct > 0 ? (
                    <div className="text-orange-400 flex items-center justify-center gap-1 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/20 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                        ⚖️ Moderate Risk ({displayRiskPct.toFixed(2)}% of Capital)
                    </div>
                ) : null}
            </div>

            {(isHighRisk || isInsufficient || hasError || isBadTrade) && (
              <div className="mt-4 pt-4 border-t border-white/5 animate-slide-down w-full flex flex-col items-center">
                <div className="text-gray-300 text-xs font-medium mb-3 text-center">
                  Keep losing? Get Professional Risk Training.
                </div>
                <a
                  href="https://wa.me/94777890356?text=Hi%20Inner%20Racers,%20I%20need%20help."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group"
                >
                  👉 Ask Inner Racers
                </a>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;

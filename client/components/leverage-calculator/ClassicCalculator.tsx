import React, { useState, useEffect } from 'react';
import { NumberInput } from './InputComponents';

const ClassicCalculator: React.FC = () => {
  const [capital, setCapital] = useState<number | ''>('');
  const [marginPct, setMarginPct] = useState<number>(5);
  const [marginUsd, setMarginUsd] = useState<number | ''>('');
  const [riskPct, setRiskPct] = useState<number>(50); // Risk % of Margin
  const [riskUsd, setRiskUsd] = useState<number | ''>('');
  const [slChartPct, setSlChartPct] = useState<number | ''>(''); // Allow empty state
  const [leverage, setLeverage] = useState<number>(0);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'warning' | 'info' } | null>(null);

  // Handle Capital Change
  const handleCapitalChange = (val: string) => {
    const cap = val === '' ? '' : parseFloat(val);
    setCapital(cap);

    if (cap !== '' && cap > 0) {
        setMarginPct(5);
        const newMarginUsd = Number((cap * 0.05).toFixed(2));
        setMarginUsd(newMarginUsd);
        setRiskPct(50);
        setRiskUsd(Number((newMarginUsd * 0.50).toFixed(2)));
    } else {
        setMarginUsd('');
        setRiskUsd('');
    }
  };

  const handleMarginPctChange = (val: number) => {
    setMarginPct(val);
    setRiskPct(50);
    if (capital !== '' && capital > 0) {
        const calculatedMargin = Number((capital * (val / 100)).toFixed(2));
        setMarginUsd(calculatedMargin);
        setRiskUsd(Number((calculatedMargin * 0.50).toFixed(2)));
    }
  };

  const handleMarginUsdChange = (val: string) => {
    if (val === '') {
        setMarginUsd('');
        setRiskUsd('');
        return;
    }
    const usd = parseFloat(val);
    setMarginUsd(usd);
    if (capital !== '' && capital > 0) {
        setMarginPct(Number(((usd / capital) * 100).toFixed(1)));
    }
    setRiskPct(50);
    setRiskUsd(Number((usd * 0.50).toFixed(2)));
  };

  const handleRiskPctChange = (val: number) => {
    setRiskPct(val);
    if (marginUsd !== '' && marginUsd > 0) {
        setRiskUsd(Number((marginUsd * (val / 100)).toFixed(2)));
    }
  };

  const handleRiskUsdChange = (val: string) => {
    if (val === '') {
        setRiskUsd('');
        return;
    }
    const usd = parseFloat(val);
    setRiskUsd(usd);
    if (marginUsd !== '' && marginUsd > 0) {
        setRiskPct(Number(((usd / marginUsd) * 100).toFixed(1)));
    }
  };

  useEffect(() => {
    setMessage(null);
    const slVal = typeof slChartPct === 'number' ? slChartPct : 0;
    const marginVal = typeof marginUsd === 'number' ? marginUsd : 0;

    if (slVal <= 0 || marginVal <= 0) {
      setLeverage(0);
      return;
    }

    if (slVal > 50) {
      setLeverage(0);
      setMessage({ text: "Stop Loss > 50% is too wide. This is gambling, not trading.", type: 'error' });
      return;
    }

    const rawLev = riskPct / slVal;

    if (rawLev < 1) {
      setLeverage(0);
      setMessage({ text: "Stop Loss is too wide for this Risk setting. Decrease SL or Increase Risk.", type: 'error' });
      return;
    }

    const flooredLev = Math.floor(rawLev);
    if (flooredLev === 1) {
      setLeverage(1);
      setMessage({ text: "1x Leverage is Spot Trading. Not suitable for Futures.", type: 'warning' });
      return;
    }

    setLeverage(flooredLev);
  }, [riskPct, slChartPct, marginUsd]);

  const capitalVal = typeof capital === 'number' ? capital : 0;
  const riskVal = typeof riskUsd === 'number' ? riskUsd : 0;
  const capitalRiskPct = capitalVal > 0 ? (riskVal / capitalVal) * 100 : 0;
  const displayRiskPct = Number(capitalRiskPct.toFixed(2));

  const isHighRisk = !message && leverage > 1 && displayRiskPct > 5;
  const isError = message?.type === 'error';
  const showHelp = isHighRisk || isError;

  return (
    <div className="space-y-6">
      <NumberInput
        label="Total Capital"
        value={capital}
        onChange={handleCapitalChange}
        prefix="$"
        tooltip="Your total account balance available for trading."
      />

      <div className="glass-panel p-5 rounded-2xl relative group">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-app-gold font-bold text-sm tracking-wide">Margin Allocation</label>
            <div className="relative tooltip-trigger cursor-help">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-600 flex items-center justify-center text-[9px] text-gray-400">?</div>
                <div className="tooltip-content">How much money you put into this specific trade.</div>
            </div>
          </div>
        </div>

        <div className="relative w-full pb-6">
            <input
              type="range"
              min="1" max="100"
              value={marginPct}
              onChange={(e) => handleMarginPctChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-app-gold hover:accent-yellow-300 transition-all z-10 relative block"
            />
            <span className="absolute top-4 left-0 text-[10px] text-gray-600 font-mono">1%</span>
            <span className="absolute top-4 right-0 text-[10px] text-gray-600 font-mono">100%</span>
            <span
              className="absolute top-4 -translate-x-1/2 text-xs text-app-gold font-bold font-mono transition-none pointer-events-none"
              style={{ left: `${((marginPct - 1) / 99) * 100}%` }}
            >
                {marginPct}%
            </span>
        </div>
        <div className="mt-2">
           <NumberInput label="Manual Margin Amount" value={marginUsd} onChange={handleMarginUsdChange} prefix="$" className="mt-2" />
        </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-app-danger font-bold text-sm tracking-wide">Risk Exposure</label>
            <div className="relative tooltip-trigger cursor-help">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-600 flex items-center justify-center text-[9px] text-gray-400">?</div>
                <div className="tooltip-content">The amount you are willing to lose if the Stop Loss is hit.</div>
            </div>
          </div>
        </div>

        <div className="relative w-full pb-6">
            <input
              type="range"
              min="1" max="100"
              value={riskPct}
              onChange={(e) => handleRiskPctChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-app-danger hover:accent-red-400 transition-all z-10 relative block"
            />
             <span className="absolute top-4 left-0 text-[10px] text-gray-600 font-mono">1%</span>
             <span className="absolute top-4 right-0 text-[10px] text-gray-600 font-mono">100%</span>
             <span
               className="absolute top-4 -translate-x-1/2 text-xs text-app-danger font-bold font-mono transition-none pointer-events-none"
               style={{ left: `${((riskPct - 1) / 99) * 100}%` }}
             >
                 {riskPct}%
             </span>
        </div>

        <NumberInput
            label="Manual Risk Amount"
            value={riskUsd}
            onChange={handleRiskUsdChange}
            prefix="$"
            className="mt-4"
            cornerHint={capitalVal > 0 && riskVal > 0 ? {
                text: `${displayRiskPct}% of Cap`,
                color: displayRiskPct > 5 ? 'text-app-danger' : 'text-gray-400'
            } : undefined}
        />
      </div>

      <NumberInput
        label="Stop Loss Distance (Chart %)"
        value={slChartPct}
        onChange={(v) => setSlChartPct(v === '' ? '' : parseFloat(v))}
        suffix="%"
        tooltip="The distance from Entry to Stop Loss on the chart in percentage."
      />

      <div className="w-full mt-8 p-1 rounded-3xl bg-white/5 border border-white/5">
        <div className="text-center relative overflow-hidden py-8">
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">Maximum Safe Leverage</div>
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-app-gold to-yellow-600 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            {leverage}x
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 px-4">
            {message && (
               <div className={`p-2 border rounded-lg text-xs font-bold w-full ${
                 message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                 message.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 'text-gray-400'
               }`}>
                 {message.type === 'error' ? '⛔ ' : '⚠️ '} {message.text}
               </div>
            )}

            {!message && leverage > 1 && (
              displayRiskPct > 5 ? (
                <span className="text-app-danger flex flex-col items-center justify-center gap-1 bg-red-900/10 px-4 py-2 rounded-xl border border-red-500/20 text-xs font-bold leading-relaxed">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-red-500">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      Danger Zone
                  </span>
                  <span className="text-center text-red-300">
                    You are risking <span className="text-app-gold underline decoration-app-gold/50">{displayRiskPct.toFixed(2)}%</span> of your TOTAL capital!
                    <br/>
                    Professional traders rarely risk more than 2.5%.
                  </span>
                </span>
              ) : displayRiskPct <= 2.5 ? (
                <span className="text-app-success flex items-center justify-center gap-1 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-app-success"></span>
                  Perfect Risk ({displayRiskPct.toFixed(2)}% of Capital)
                </span>
              ) : (
                <span className="text-orange-400 flex items-center justify-center gap-1 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Moderate Risk ({displayRiskPct.toFixed(2)}% of Capital)
                </span>
              )
            )}

            {showHelp && (
              <div className="mt-4 pt-4 border-t border-white/5 animate-slide-down w-full flex flex-col items-center">
                <div className="text-gray-300 text-xs font-medium mb-3 text-center">
                  Keep losing? Get Professional Risk Training.
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicCalculator;

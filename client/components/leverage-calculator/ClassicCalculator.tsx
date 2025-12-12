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

  // Update Margin USD when Pct Changes
  const handleMarginPctChange = (val: number) => {
    setMarginPct(val);
    if (capital !== '' && capital > 0) {
        const calculatedMargin = Number((capital * (val / 100)).toFixed(2));
        setMarginUsd(calculatedMargin);
        
        // Recalculate Risk based on new Margin
        setRiskUsd(Number((calculatedMargin * (riskPct / 100)).toFixed(2)));
    }
  };

  // Update Margin Pct when USD Changes
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
    
    // Recalculate Risk
    setRiskUsd(Number((usd * (riskPct / 100)).toFixed(2)));
  };

  // Update Risk USD when Pct Changes
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

  // When Capital changes, update Margin USD if we have a % set (default 5%)
  useEffect(() => {
    if (capital === '' || capital === 0) {
        setMarginUsd('');
        setRiskUsd('');
        return;
    }
    // Auto-calculate margin based on slider %
    const calculatedMargin = Number((capital * (marginPct / 100)).toFixed(2));
    setMarginUsd(calculatedMargin);
    
    // Auto-calculate risk based on slider % (default 50%)
    setRiskUsd(Number((calculatedMargin * (riskPct / 100)).toFixed(2)));
  }, [capital]);

  useEffect(() => {
    setMessage(null);
    const slVal = typeof slChartPct === 'number' ? slChartPct : 0;
    const marginVal = typeof marginUsd === 'number' ? marginUsd : 0;
    
    // Validations
    if (slVal <= 0 || marginVal <= 0) {
      setLeverage(0);
      return;
    }

    if (slVal > 50) {
      setLeverage(0);
      setMessage({ text: "Stop Loss > 50% is too wide. This is gambling, not trading.", type: 'error' });
      return;
    }

    // Simplified Formula for Classic: Leverage = Risk% (of margin) / SL%
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
  
  return (
    <div className="space-y-6">
      <NumberInput 
        label="Total Capital" 
        value={capital} 
        onChange={(v) => setCapital(v === '' ? '' : parseFloat(v))} 
        prefix="$" 
        tooltip="Your total account balance available for trading."
      />

      {/* Margin Section */}
      <div className="glass-panel p-5 rounded-2xl relative group">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-app-gold font-bold text-sm tracking-wide">Margin Allocation</label>
            <div className="relative tooltip-trigger cursor-help">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-600 flex items-center justify-center text-[9px] text-gray-400">?</div>
                <div className="tooltip-content">How much money you put into this specific trade.</div>
            </div>
          </div>
          <span className="text-white font-mono bg-black/30 px-2 py-1 rounded border border-white/10">
            {marginUsd !== '' ? `$${marginUsd}` : '-'}
          </span>
        </div>
        
        <input 
          type="range" 
          min="1" max="100" 
          value={marginPct} 
          onChange={(e) => handleMarginPctChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-app-gold hover:accent-yellow-300 transition-all"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
           <span>1%</span>
           <span className="text-app-gold">{marginPct}%</span>
           <span>100%</span>
        </div>
        
        <div className="mt-4">
           <NumberInput label="Manual Margin Amount" value={marginUsd} onChange={handleMarginUsdChange} prefix="$" className="mt-2" />
        </div>
      </div>

      {/* Risk Section */}
      <div className="glass-panel p-5 rounded-2xl border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-app-danger font-bold text-sm tracking-wide">Risk Exposure</label>
            <div className="relative tooltip-trigger cursor-help">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-600 flex items-center justify-center text-[9px] text-gray-400">?</div>
                <div className="tooltip-content">The amount you are willing to lose if the Stop Loss is hit.</div>
            </div>
          </div>
          <span className="text-white font-mono bg-black/30 px-2 py-1 rounded border border-white/10">
            {riskUsd !== '' ? `$${riskUsd}` : '-'}
          </span>
        </div>
        
        <input 
          type="range" 
          min="1" max="100" 
          value={riskPct} 
          onChange={(e) => handleRiskPctChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-app-danger hover:accent-red-400 transition-all"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
           <span>1%</span>
           <span className="text-app-danger">{riskPct}%</span>
           <span>100%</span>
        </div>

        <NumberInput label="Manual Risk Amount" value={riskUsd} onChange={handleRiskUsdChange} prefix="$" className="mt-4" />
      </div>

      <NumberInput 
        label="Stop Loss Distance (Chart %)" 
        value={slChartPct} 
        onChange={(v) => setSlChartPct(v === '' ? '' : parseFloat(v))} 
        suffix="%" 
        tooltip="The distance from Entry to Stop Loss on the chart in percentage."
      />

      {/* Result */}
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
              capitalRiskPct > 5 ? (
                <span className="text-app-danger flex items-center justify-center gap-1 bg-red-900/20 px-3 py-1 rounded-full border border-red-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-app-danger"></span>
                  High Risk ({capitalRiskPct.toFixed(2)}% of Capital)
                </span>
              ) : capitalRiskPct <= 2.5 ? (
                <span className="text-app-success flex items-center justify-center gap-1 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-app-success"></span>
                  Perfect Risk ({capitalRiskPct.toFixed(2)}% of Capital)
                </span>
              ) : (
                <span className="text-orange-400 flex items-center justify-center gap-1 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/20 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Moderate Risk ({capitalRiskPct.toFixed(2)}% of Capital)
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicCalculator;
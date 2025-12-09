import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';

export default function LeverageCalculator() {
  const [capital, setCapital] = useState<string>('');
  const [margin, setMargin] = useState<string>('');
  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [risk, setRisk] = useState<string>('');
  const [riskPercentage, setRiskPercentage] = useState<number>(50);
  const [stopLoss, setStopLoss] = useState<string>('');
  const [leverage, setLeverage] = useState<number | null>(null);
  const [safeLeverage, setSafeLeverage] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isDangerous, setIsDangerous] = useState<boolean>(false);

  // Update defaults when capital changes
  useEffect(() => {
    if (capital) {
      setMarginPercentage(0);
      setMargin('');
      setError('');
    }
  }, [capital]);

  // Update margin from slider
  const updateMarginFromSlider = (value: number) => {
    setMarginPercentage(value);
    const capitalNum = parseFloat(capital);
    if (!isNaN(capitalNum) && capitalNum > 0) {
      const newMargin = (capitalNum * (value / 100)).toFixed(2);
      setMargin(newMargin);
      updateRiskDefaultsFromMargin(newMargin);
    }
  };

  // Update margin slider from manual input
  const updateMarginFromInput = (value: string) => {
    setMargin(value);
    const capitalNum = parseFloat(capital);
    const marginNum = parseFloat(value);
    if (!isNaN(marginNum) && marginNum >= 0 && capitalNum > 0) {
      const percentage = Math.min((marginNum / capitalNum) * 100, 100);
      setMarginPercentage(percentage);
      updateRiskDefaultsFromMargin(value);
    }
  };

  // Update risk defaults when margin changes
  const updateRiskDefaultsFromMargin = (marginValue: string) => {
    const marginNum = parseFloat(marginValue);
    if (!isNaN(marginNum) && marginNum > 0) {
      const defaultRisk = (marginNum * 0.5).toFixed(2);
      setRisk(defaultRisk);
      setRiskPercentage(50);
    }
  };

  // Update risk from slider
  const updateRiskFromSlider = (value: number) => {
    setRiskPercentage(value);
    const marginNum = parseFloat(margin);
    if (!isNaN(marginNum) && marginNum > 0) {
      const newRisk = (marginNum * (value / 100)).toFixed(2);
      setRisk(newRisk);
    }
  };

  // Update risk slider from manual input
  const updateRiskFromInput = (value: string) => {
    setRisk(value);
    const marginNum = parseFloat(margin);
    const riskNum = parseFloat(value);
    if (!isNaN(riskNum) && riskNum >= 0 && marginNum > 0) {
      const percentage = Math.min((riskNum / marginNum) * 100, 100);
      setRiskPercentage(percentage);
    }
  };

  const calculate = () => {
    const capitalNum = parseFloat(capital);
    const marginNum = parseFloat(margin);
    const riskNum = parseFloat(risk);
    const stopLossNum = parseFloat(stopLoss) / 100;

    if (isNaN(capitalNum) || isNaN(marginNum) || isNaN(riskNum) || isNaN(stopLossNum)) {
      setError('Please fill out all fields correctly!');
      return;
    }

    setError('');

    const calculatedLeverage = Math.floor(riskNum / (marginNum * stopLossNum));
    setLeverage(calculatedLeverage);

    if (calculatedLeverage < 1) {
      setIsDangerous(false);
      setSafeLeverage(null);
      return;
    }

    const actualLoss = marginNum * calculatedLeverage * stopLossNum;
    if (actualLoss > capitalNum * 0.05) {
      setIsDangerous(true);
      const safeLev = Math.floor((capitalNum * 0.05) / (marginNum * stopLossNum));
      setSafeLeverage(safeLev);
    } else {
      setIsDangerous(false);
      setSafeLeverage(null);
    }
  };

  const isFormValid = capital && margin && risk && stopLoss;

  return (
    <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.15),_rgba(26,11,46,0))] blur-3xl"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="text-[#FFD700]">Leverage</span> Calculator
            </h1>
            <p className="text-white/70 text-lg">
              Calculate the optimal leverage for your trades
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-[#1a0b2e] border border-purple-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
            {/* Capital Input */}
            <div className="mb-6">
              <label htmlFor="capital" className="block text-white/90 font-semibold text-lg mb-2">
                Capital (USDT):
              </label>
              <input
                type="number"
                id="capital"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                placeholder="Enter your total capital"
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all"
              />
              <small className="block text-white/50 text-sm mt-2">
                This is the total amount of money you have for trading.
              </small>
            </div>

            {/* Margin Input */}
            <div className="mb-6">
              <label htmlFor="margin" className="block text-white/90 font-semibold text-lg mb-2">
                Margin:
              </label>
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={marginPercentage}
                  onChange={(e) => updateMarginFromSlider(Number(e.target.value))}
                  disabled={!capital}
                  className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FFD700] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <small className="block text-white/60 text-sm mt-2">
                  Selected Margin: <span className="text-[#FFD700] font-semibold">{marginPercentage.toFixed(0)}%</span>
                </small>
              </div>
              <input
                type="number"
                id="margin"
                value={margin}
                onChange={(e) => updateMarginFromInput(e.target.value)}
                placeholder="Enter margin in USD"
                disabled={!capital}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <small className="block text-white/50 text-sm mt-2">
                The amount you're putting into this trade. Select margin as a percentage of your capital using the slider, or type it manually in dollars.
              </small>
            </div>

            {/* Risk Input */}
            <div className="mb-6">
              <label htmlFor="risk" className="block text-white/90 font-semibold text-lg mb-2">
                Risk:
              </label>
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={riskPercentage}
                  onChange={(e) => updateRiskFromSlider(Number(e.target.value))}
                  disabled={!margin}
                  className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FFD700] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
                <small className="block text-white/60 text-sm mt-2">
                  Selected Risk: <span className="text-[#FFD700] font-semibold">{riskPercentage.toFixed(1)}%</span>
                </small>
              </div>
              <input
                type="number"
                id="risk"
                value={risk}
                onChange={(e) => updateRiskFromInput(e.target.value)}
                placeholder="Enter risk in USD"
                disabled={!margin}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <small className="block text-white/50 text-sm mt-2">
                The percentage of your margin you're willing to risk on this trade, or you can type the risk amount in USD.
              </small>
            </div>

            {/* Stop Loss Input */}
            <div className="mb-6">
              <label htmlFor="stoploss" className="block text-white/90 font-semibold text-lg mb-2">
                Stop Loss %:
              </label>
              <input
                type="number"
                id="stoploss"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Enter stop loss percentage"
                disabled={!capital}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <small className="block text-white/50 text-sm mt-2">
                The percentage of price movement at which your trade will automatically close to prevent further losses.
              </small>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculate}
              disabled={!isFormValid}
              className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black font-bold text-lg rounded-xl hover:from-[#FFC700] hover:to-[#FFB700] disabled:from-purple-900/50 disabled:to-purple-800/50 disabled:cursor-not-allowed disabled:text-white/40 transition-all shadow-lg disabled:shadow-none"
            >
              Calculate Leverage
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                {error}
              </div>
            )}

            {/* Output */}
            {leverage !== null && (
              <div className="mt-8">
                <div className={`text-center p-6 rounded-xl border ${
                  isDangerous 
                    ? 'bg-red-600/10 border-red-500/30' 
                    : leverage < 1
                    ? 'bg-orange-600/10 border-orange-500/30'
                    : 'bg-green-600/10 border-green-500/30'
                }`}>
                  <div className={`text-5xl font-bold mb-2 ${
                    isDangerous 
                      ? 'text-red-400' 
                      : leverage < 1
                      ? 'text-orange-400'
                      : 'text-green-400'
                  }`}>
                    Leverage = {leverage}X
                    {isDangerous && <span className="ml-3 text-4xl">⚠️</span>}
                  </div>
                  {leverage < 1 && (
                    <small className="block text-orange-300 text-sm mt-3">
                      No leverage is required if the leverage is less than 1X. Consider revising your margin or risk settings.
                    </small>
                  )}
                </div>

                {/* Safe Leverage Warning */}
                {safeLeverage !== null && (
                  <div className={`mt-4 p-4 rounded-xl border ${
                    safeLeverage <= 1
                      ? 'bg-red-600/20 border-red-500/30'
                      : 'bg-green-600/20 border-green-500/30'
                  }`}>
                    <p className={`text-center font-semibold ${
                      safeLeverage <= 1 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {safeLeverage <= 1
                        ? '⚠️ Warning: Safe leverage is less than or equal to 1X. Please reduce your margin to keep the trade safe.'
                        : `✅ Safe Leverage to keep risk under 5% of capital: ${safeLeverage}X`
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
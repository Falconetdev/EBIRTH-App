import React from "react";
import { TradeDirection } from "../../types/leverage-calculator";

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  highlight?: boolean;
  tooltip?: string;
  cornerHint?: {
    text: string;
    color: string;
  };
  error?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  className,
  highlight,
  tooltip,
  cornerHint,
  error,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Prevent negative numbers
    if (val.includes("-")) return;
    onChange(val);
  };

  return (
    <div className={`flex flex-col gap-1 flex-1 group ${className}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <label
          className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${error ? "text-app-danger" : highlight ? "text-app-gold" : "text-gray-400 group-focus-within:text-app-gold"}`}
        >
          {label}
        </label>
        {tooltip && (
          <div className="relative tooltip-trigger cursor-help">
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] transition-colors ${error ? "border-red-500 text-red-500" : "border-gray-600 text-gray-400 hover:text-app-gold hover:border-app-gold"}`}
            >
              ?
            </div>
            <div className="tooltip-content mb-2">{tooltip}</div>
          </div>
        )}
      </div>

      <div
        className={`glass-input flex items-center rounded-xl overflow-hidden h-12 relative ${error ? "!border-red-500/50 !shadow-[0_0_15px_rgba(239,68,68,0.15)] bg-red-500/5" : ""}`}
      >
        {prefix && (
          <span className="pl-4 text-gray-500 font-mono select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min="0"
          value={value}
          onChange={handleInputChange}
          onWheel={(e) => e.currentTarget.blur()} // Disable mouse wheel changing numbers
          placeholder={placeholder}
          className={`w-full bg-transparent p-3 outline-none font-mono text-lg placeholder-gray-600 ${error ? "text-red-100" : "text-white"}`}
        />
        {suffix && (
          <span className="pr-4 text-gray-500 text-xs font-bold select-none">
            {suffix}
          </span>
        )}

        {/* Percentage Hint inside corner */}
        {cornerHint && !error && (
          <div
            className={`absolute top-1 right-2 text-[9px] font-mono font-bold px-1.5 rounded bg-black/40 border border-white/5 ${cornerHint.color}`}
          >
            {cornerHint.text}
          </div>
        )}
      </div>

      {error && (
        <div className="text-app-danger text-[10px] font-bold mt-1 animate-slide-down flex items-start gap-1.5 px-1 leading-tight">
          <svg
            className="w-3 h-3 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

interface DirectionSwitchProps {
  direction: TradeDirection;
  setDirection: (d: TradeDirection) => void;
}

export const DirectionSwitch: React.FC<DirectionSwitchProps> = ({
  direction,
  setDirection,
}) => (
  <div className="flex bg-black/30 p-1.5 rounded-2xl mb-6 border border-white/5 relative overflow-hidden">
    {/* Animated Background Slider */}
    <div
      className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl transition-all duration-500 ease-out z-0 ${
        direction === TradeDirection.LONG
          ? "left-1.5 bg-green-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          : "left-[calc(50%+3px)] bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      }`}
    />

    <button
      onClick={() => setDirection(TradeDirection.LONG)}
      className={`flex-1 py-3 rounded-xl font-black text-sm relative z-10 transition-all duration-300 flex items-center justify-center gap-2 ${
        direction === TradeDirection.LONG
          ? "text-green-400"
          : "text-gray-500 hover:text-gray-300"
      }`}
    >
      <span>LONG</span>
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${direction === TradeDirection.LONG ? "rotate-0" : "rotate-180 opacity-50"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
    <button
      onClick={() => setDirection(TradeDirection.SHORT)}
      className={`flex-1 py-3 rounded-xl font-black text-sm relative z-10 transition-all duration-300 flex items-center justify-center gap-2 ${
        direction === TradeDirection.SHORT
          ? "text-red-400"
          : "text-gray-500 hover:text-gray-300"
      }`}
    >
      <span>SHORT</span>
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${direction === TradeDirection.SHORT ? "rotate-0" : "rotate-180 opacity-50"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  </div>
);

interface PercentageGroupProps {
  options: number[];
  onSelect: (val: number) => void;
  activeVal?: number | null;
}

export const PercentageGroup: React.FC<PercentageGroupProps> = ({
  options,
  onSelect,
  activeVal,
}) => (
  <div className="flex gap-2 mt-2">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onSelect(opt)}
        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border backdrop-blur-sm transition-all duration-300 ${
          activeVal === opt
            ? "bg-app-gold/20 text-app-gold border-app-gold shadow-[0_0_10px_rgba(255,215,0,0.2)]"
            : "bg-white/5 text-gray-500 border-transparent hover:bg-white/10 hover:border-white/20"
        }`}
      >
        {opt}%
      </button>
    ))}
  </div>
);

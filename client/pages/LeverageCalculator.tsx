import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { CalculatorTab } from "../types/leverage-calculator";
import ClassicCalculator from "../components/leverage-calculator/ClassicCalculator";
import ProCalculator from "../components/leverage-calculator/ProCalculator";
import MarginCalculator from "../components/leverage-calculator/MarginCalculator";
import DotGrid from "../components/leverage-calculator/DotGrid";

export default function LeverageCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>(CalculatorTab.PRO);

  const tabs = [
    {
      id: CalculatorTab.CLASSIC,
      label: "Classic",
      icon: (
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: CalculatorTab.PRO,
      label: "Pro Leverage",
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: CalculatorTab.MARGIN,
      label: "Margin",
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <PageLayout
      showFooter={true}
      className="bg-[#0a0118]"
      mainClassName="bg-[#0a0118]"
    >
      <section className="relative min-h-screen bg-[#0a0118] bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.15),_rgba(26,11,46,0))] blur-3xl"></div>
        
        <div className="relative text-app-text font-sans selection:bg-app-gold selection:text-black flex justify-center py-10 px-4 overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
            {/* DotGrid Background */}
            <div className="absolute inset-0 pointer-events-none">
              <DotGrid
                dotSize={2} // Request: Small Dots
                gap={10} // Closer gap for small dots
                baseColor="#202020" // Solid dark grey for visibility
                activeColor="#ffd700"
                proximity={100}
                shockRadius={200}
                shockStrength={5} // From code snippet
                resistance={750} // From code snippet
                returnDuration={3} // SLOW AND SMOOTH RETURN
              />
              {/* Subtle Noise Texture Overlay to blend */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
            </div>

            <div className="w-full max-w-xl relative z-10 flex flex-col items-center">
              {/* Header - Animated Liquid Text */}
              <div className="text-center mb-10 relative">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter liquid-text drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-2">
                  INNER RACERS
                </h1>
                <div className="text-[10px] font-bold tracking-[0.3em] text-white opacity-90 uppercase">
                  Professional Trading Calculator Pro
                </div>
                {/* Decorative Line */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-app-gold to-transparent mx-auto mt-4 rounded-full opacity-50"></div>
              </div>

              {/* Glass Navigation */}
              <div className="glass-panel p-1.5 rounded-2xl flex gap-2 mb-8 w-full max-w-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-app-gold text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Content Card - With Moving Yellow Light Border */}
              <div className="calculator-frame w-full mb-8">
                {/* Independent Layer for the Border Animation (Masked) */}
                <div className="calculator-border-gradient"></div>

                {/* Content Layer (Glass) */}
                <div className="calculator-content p-6 md:p-8">
                  {activeTab === CalculatorTab.CLASSIC && <ClassicCalculator />}
                  {activeTab === CalculatorTab.PRO && <ProCalculator />}
                  {activeTab === CalculatorTab.MARGIN && <MarginCalculator />}
                </div>
              </div>

              {/* Footer Section */}
              <div className="w-full flex flex-col items-center gap-3 relative z-10 pb-8">
                <div className="text-gray-400 text-[10px] font-medium tracking-wider opacity-60">
                  Have questions or feedback?
                </div>

                <a
                  href="https://wa.me/94777890356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#25D366] transition-colors uppercase tracking-widest">
                    Contact Team Inner Racers
                  </span>
                </a>

                <div className="text-gray-600 text-[9px] uppercase tracking-[0.3em] font-mono">
                  Powered by Team Inner Racers • 2025
                </div>
              </div>
            </div>
        </div>
      </section>
    </PageLayout>
  );
}

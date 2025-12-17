import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { CalculatorTab } from "../types/leverage-calculator";
import ClassicCalculator from "../components/leverage-calculator/ClassicCalculator";
import ProCalculator from "../components/leverage-calculator/ProCalculator";
import MarginCalculator from "../components/leverage-calculator/MarginCalculator";
import MemberToolsTab from "../components/leverage-calculator/MemberToolsTab";
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
    {
      id: CalculatorTab.AI_JOURNAL,
      label: "AI + Journal 🔒",
      icon: (
        <span className="text-base">🤖</span>
      ),
    },
  ];

  return (
    <PageLayout
      showFooter={true}
      className="bg-app-bg"
      mainClassName="bg-app-bg"
    >
      <div className="min-h-screen bg-app-bg text-app-text font-sans selection:bg-app-gold selection:text-black flex flex-col items-center pt-28 pb-10 px-4 relative overflow-hidden">
        
        {/* DotGrid Background */}
        <div className="fixed inset-0 pointer-events-none">
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

        <div className="w-full max-w-xl relative z-10 flex flex-col items-center flex-grow">
          
          {/* Header - Animated Liquid Text */}
          <div className="text-center mb-10 relative w-full">
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
              <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap gap-2 mb-8 w-full">
                {tabs.map((tab) => {
                  const isSpecial = tab.id === CalculatorTab.AI_JOURNAL;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[80px] py-2 px-2 rounded-xl text-xs font-bold transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-app-gold text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                          : isSpecial
                            ? "text-app-gold border border-app-gold/30 bg-app-gold/5 hover:bg-app-gold/10 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      style={isSpecial && activeTab !== tab.id ? {
                        animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      } : undefined}
                    >
                      {tab.icon}
                      {isSpecial ? (
                        <span>{tab.label.replace(" 🔒", "")} <span className="opacity-70">🔒</span></span>
                      ) : (
                        tab.label
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main Content Card - With Moving Yellow Light Border */}
              <div className="calculator-frame w-full relative mb-12">
                {/* Independent Layer for the Border Animation (Masked) */}
                <div className="calculator-border-gradient"></div>

                {/* Content Layer (Glass) */}
                <div className="calculator-content p-6 md:p-8">
                  <div key={activeTab} className="animate-slide-up">
                    {activeTab === CalculatorTab.CLASSIC && <ClassicCalculator />}
                    {activeTab === CalculatorTab.PRO && <ProCalculator />}
                    {activeTab === CalculatorTab.MARGIN && <MarginCalculator />}
                    {activeTab === CalculatorTab.AI_JOURNAL && <MemberToolsTab />}
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* LIFETIME MEMBERSHIP PROMO CARD                     */}
              {/* -------------------------------------------------- */}
              {activeTab !== CalculatorTab.AI_JOURNAL && (
                <div className="w-full relative mb-8 group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* Ambient Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-app-gold to-yellow-600 rounded-3xl blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
                
                <div className="relative rounded-3xl bg-[#080516] border border-app-gold/30 p-8 overflow-hidden shadow-2xl">
                  
                  {/* Badge */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-app-gold text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl shadow-[0_4px_10px_rgba(255,215,0,0.3)] tracking-widest z-10">
                      BEST VALUE
                    </div>
                  </div>

                  {/* Header Content */}
                  <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-app-gold to-white mb-2 drop-shadow-sm">
                      UNLOCK LIFETIME MEMBERSHIP
                    </h2>
                    <p className="text-gray-400 font-medium text-sm tracking-wide">
                      Pay Once. Trade Forever.
                    </p>
                  </div>

                  {/* Tag */}
                  <div className="flex justify-center mb-8 relative z-10">
                    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                      <span className="text-[10px] font-bold text-orange-400 tracking-wider flex items-center gap-2 uppercase text-center">
                        🔥 One-Time Payment | No Monthly Fees | Life-Time Access
                      </span>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3.5 mb-8 px-2 relative z-10">
                    {[
                      "Full Trading Course + Lifetime Updates",
                      "24/7 Live Trading Club (Discord) 🔴",
                      "VIP Signals & Market Updates 🚀",
                      "Personal Coach Support 👨‍🏫",
                      "Lifetime Online & Physical Revisions 🔄",
                      "Access to Physical Trading Club 🏢",
                      "Dedicated Call Center Support 📞"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-0.5 min-w-[18px] w-[18px] h-[18px] rounded-full bg-app-gold/10 border border-app-gold/40 flex items-center justify-center text-app-gold shadow-[0_0_10px_rgba(255,215,0,0.1)] group-hover/item:bg-app-gold group-hover/item:text-black transition-all duration-300">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300 font-medium text-left leading-tight group-hover/item:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://wa.me/94777890356?text=Hi%20Inner%20Racers,%20I%20need%20to%20unlock%20Lifetime%20Membership"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group/btn"
                  >
                    <svg className="w-6 h-6 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-[10px] font-bold text-white group-hover/btn:text-green-200 transition-colors uppercase tracking-widest">
                      Contact Team Inner Racers
                    </span>
                  </a>
                </div>
                </div>
              )}

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
    </PageLayout>
  );
}

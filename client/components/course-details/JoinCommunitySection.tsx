import { TrendingUp, BarChart3, Users, Send } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

const JoinCommunitySection = () => {
  return (
    <section className="relative mt-16 overflow-hidden min-h-[600px] md:min-h-[720px] border border-white/10 bg-[#1b0835]/80 py-8 md:py-12">
      <div className="absolute inset-0">
        <img
          src="/join.webp"
          alt="Trading community event"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120625]/90 via-[#120625]/75 to-transparent"></div>
      </div>

      <div className="relative flex flex-col items-center px-4 pt-1 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-10">
          <div className="flex-1 space-y-6 md:space-y-8 text-white w-full text-center lg:text-left">
            {/* Main Title with animated gradient */}
            <h2 className="font-sora font-extrabold text-[28px] leading-[36px] sm:text-[36px] sm:leading-[44px] md:text-[48px] md:leading-[56px] lg:text-[64px] lg:leading-[72px] text-center animate-gradient bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-[length:200%_auto] text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
              Inner Racers Trading Community
            </h2>

            {/* Call to action with 3D effect */}
            <div className="relative flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full perspective-1000 flex-nowrap">
              <span className="text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[28px] font-extrabold drop-shadow-lg animate-fade-in-up whitespace-nowrap" style={{animationDelay: '0.1s'}}>
                එකට අදම
              </span>

              <div className="relative group">
                <span className="relative z-10 inline-block text-[#FFD700] text-[40px] sm:text-[52px] md:text-[68px] lg:text-[90px] font-extrabold rotate-[-12deg] hover:rotate-0 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] animate-bounce-slow" style={{animationDelay: '0.2s'}}>
                  JOIN
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-30 animate-pulse"></div>
              </div>

              <span className="text-white text-[22px] sm:text-[28px] md:text-[32px] lg:text-[28px] font-extrabold drop-shadow-lg animate-fade-in-up whitespace-nowrap" style={{animationDelay: '0.3s'}}>
                වෙන්න
              </span>
            </div>

          </div>

          <div className="flex flex-1 justify-center lg:justify-end max-w-md lg:max-w-none animate-fade-in-right" style={{animationDelay: '0.5s'}}>
            <div className="relative group">
              <img
                src="/hero-new.png"
                alt="Community mentor speaking"
                className="h-auto w-full max-h-[300px] md:max-h-[400px] lg:max-h-none object-contain rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
              />
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 blur-3xl rounded-3xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-indigo-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Benefits Grid */}
          <div className="flex flex-1 flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
            {/* Benefit 1 */}
            <div className="flex items-center gap-3 text-white group hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg group-hover:shadow-yellow-500/50 transition-shadow">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Exclusive Signals</p>
                <p className="text-xs text-white/70">Daily trading alerts</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-center gap-3 text-white group hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                <BarChart3 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Market Insights</p>
                <p className="text-xs text-white/70">Expert analysis</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-center gap-3 text-white group hover:scale-105 transition-transform">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg group-hover:shadow-pink-500/50 transition-shadow">
                <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Thousands of Traders</p>
                <p className="text-xs text-white/70">Growing community</p>
              </div>
            </div>
          </div>

          {/* Authentic Telegram Button with Ripple Effect */}
          <a
            href="https://t.me/innerracers"
            target="_blank"
            rel="noreferrer"
            className="telegram-button group relative flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0088cc] px-6 sm:px-7 py-3 sm:py-3.5 text-[15px] sm:text-base font-medium text-white transition-all duration-150 active:scale-95 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)] w-full sm:w-auto overflow-hidden"
            onClick={(e) => {
              const button = e.currentTarget;
              const ripple = document.createElement('span');
              const rect = button.getBoundingClientRect();
              const size = Math.max(rect.width, rect.height);
              const x = e.clientX - rect.left - size / 2;
              const y = e.clientY - rect.top - size / 2;
              
              ripple.style.width = ripple.style.height = `${size}px`;
              ripple.style.left = `${x}px`;
              ripple.style.top = `${y}px`;
              ripple.className = 'telegram-ripple';
              
              button.appendChild(ripple);
              setTimeout(() => ripple.remove(), 600);
            }}
          >
            {/* Official Telegram Icon */}
            <FaTelegram className="relative z-10 w-5 h-5" />
            <span className="relative z-10 whitespace-nowrap">Join Telegram Channel</span>
          </a>

          <style dangerouslySetInnerHTML={{__html: `
            .telegram-button::before {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%);
              pointer-events: none;
            }
            
            .telegram-button:hover {
              background: #0096db;
            }
            
            .telegram-button:active {
              background: #007ab8;
            }
            
            .telegram-ripple {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.5);
              transform: scale(0);
              animation: ripple-animation 0.6s ease-out;
              pointer-events: none;
            }
            
            @keyframes ripple-animation {
              to {
                transform: scale(2);
                opacity: 0;
              }
            }
            /* Custom Animations */
            @keyframes gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fade-in-right {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0) rotate(-12deg); }
              50% { transform: translateY(-10px) rotate(-12deg); }
            }
            
            .animate-gradient {
              animation: gradient 3s ease infinite;
            }
            
            .animate-fade-in-up {
              animation: fade-in-up 0.6s ease-out forwards;
              opacity: 0;
            }
            
            .animate-fade-in-right {
              animation: fade-in-right 0.8s ease-out forwards;
              opacity: 0;
            }
            
            .animate-fade-in {
              animation: fade-in 0.6s ease-out forwards;
              opacity: 0;
            }
            
            .animate-bounce-slow {
              animation: bounce-slow 3s ease-in-out infinite;
            }
            
            .perspective-1000 {
              perspective: 1000px;
            }
          `}} />
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;

import React from 'react';

const MemberToolsTab: React.FC = () => {
  return (
    <div className="animate-slide-up flex flex-col items-center text-center space-y-8 py-4 relative">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-app-gold/10 blur-[60px] rounded-full pointer-events-none"></div>

      {/* Locked Icon Section */}
      <div className="relative mb-2 animate-bounce-slow">
        <div className="relative w-24 h-24 bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl flex items-center justify-center border border-app-gold/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] z-10 rotate-3 transition-transform hover:rotate-0 duration-500">
          <svg className="w-10 h-10 text-app-gold drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
           {/* Ping Effect */}
          <div className="absolute -top-1 -right-1">
            <span className="flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-app-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-app-gold border-2 border-black"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Headlines */}
      <div className="space-y-3 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-app-gold to-white tracking-tight drop-shadow-sm">
          Member Exclusive Tools
        </h2>
        <p className="text-sm text-gray-300 font-medium max-w-xs mx-auto leading-relaxed">
          Unlock these professional tools instantly with your Lifetime Membership.
        </p>
      </div>

      {/* Feature List */}
      <div className="w-full bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-2xl relative z-10 overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
         <div className="bg-[#0c081f] rounded-2xl p-6 backdrop-blur-md">
            <ul className="space-y-6 text-left">
            <li className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                </div>
                <div>
                <div className="text-white font-bold text-base mb-1">🤖 AI Market Analysis</div>
                <div className="text-gray-400 text-xs leading-relaxed">Get instant, AI-powered second opinions on your trades before you enter. Reduce emotional bias.</div>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                </div>
                <div>
                <div className="text-white font-bold text-base mb-1">📖 Pro PDF Journal</div>
                <div className="text-gray-400 text-xs leading-relaxed">Track your psychology and performance. The #1 secret of profitable traders.</div>
                </div>
            </li>
            </ul>
         </div>
      </div>

      {/* Pricing & CTA */}
      <div className="w-full space-y-6 relative z-10 pt-2">
        <div className="flex flex-col items-center">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-2 border border-red-500/20">
             Limited Time Offer
          </div>
          <div className="text-gray-500 text-sm font-medium line-through decoration-red-500 decoration-2">LKR 36,000</div>
          <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <span className="text-app-gold">LKR 32,000</span>
          </div>
           <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1 opacity-80">(One-Time Payment • Lifetime Access)</div>
        </div>

        <a 
          href="https://wa.me/94777890356?text=I%20want%20to%20claim%20the%20LKR%2032000%20Discount%20and%20Unlock%20Pro%20Tools"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full overflow-hidden bg-gradient-to-r from-[#25D366] to-[#1ebc57] text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          
          <span className="relative z-10">👉 Claim LKR 4,000 Discount & Unlock</span>
          <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MemberToolsTab;
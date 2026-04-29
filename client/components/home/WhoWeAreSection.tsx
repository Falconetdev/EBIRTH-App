import { Button } from "@/components/ui/button";

const WhoWeAreSection = () => {
  return (
    <section id="who-we-are" className="relative mt-12 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="absolute inset-0 bg-inherit"></div>
      
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -top-20 -left-10 hidden md:block opacity-60">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating bitcoin"
          className="h-40 w-40 -rotate-[15deg] object-contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-15%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(128,78,235,0.25),_rgba(12,5,26,0))] blur-3xl sm:h-80 sm:w-80"></div>
      <div className="pointer-events-none absolute -right-16 top-1/3 hidden lg:block opacity-40">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating bitcoin"
          className="h-48 w-48 -rotate-[10deg] object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] text-center mb-4">Who We Are</h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
          <span className="text-[#FFD700]">Building Your Business Dreams, Step by Step</span>
        </h3>

        {/* Hero Image */}
        <div className="relative mb-16 overflow-hidden rounded-2xl border-2 border-[#FFD700]/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent z-10"></div>
          <img
            src="/who-we-are.webp"
            alt="Collaborative trading session at eBirth Business Academy"
            className="h-[400px] w-full object-cover"
          />
        </div>

        {/* Timeline - Contains only the 4 milestones */}
        <div className="relative pb-12">
          {/* Timeline Line - extends full height of the 4 milestones */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-purple-500 to-[#FFD700] opacity-0 animate-[growDown_1.2s_ease-out_0.8s_forwards]"></div>

          {/* Timeline Items (4 milestones only) */}
          <div className="space-y-12">
            
            {/* Milestone 1: Our Story (2019) */}
            <div className="relative pl-20 md:pl-24 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
              <div className="absolute left-0 top-0 h-14 w-14 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg shadow-yellow-500/50 border-4 border-[#0c051a]">
                <span className="text-[#0c051a] font-bold text-base">2019</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
                <h4 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-3">Our Story</h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/80">
                  Our journey started in 2019 with a clear vision: to help new entrepreneurs succeed. What began as a small initiative has now grown into a government-registered educational institute. Today, we serve students from our main offices in Kegalle and Nugegoda, as well as through our online platforms.
                </p>
              </div>
            </div>

            {/* Milestone 2: What We Do */}
            <div className="relative pl-20 md:pl-24 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
              <div className="absolute left-0 top-0 h-14 w-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/50 border-4 border-[#0c051a]">
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <h4 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-3">What We Do</h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/80 mb-4">
                  We are more than just a classroom. We have expanded into three focused areas to give you a complete business education:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-purple-900/20 rounded-lg p-3 border border-purple-500/10">
                    <span className="text-[#FFD700] mt-1 text-lg">•</span>
                    <span className="text-sm sm:text-base text-white/70"><strong className="text-white">Inner Racers:</strong> This is our trading arm, where we teach you how to master financial markets and investing.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-purple-900/20 rounded-lg p-3 border border-purple-500/10">
                    <span className="text-[#FFD700] mt-1 text-lg">•</span>
                    <span className="text-sm sm:text-base text-white/70"><strong className="text-white">Invocade:</strong> Here, we focus on the future, teaching you about AI technology and modern tech solutions.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-purple-900/20 rounded-lg p-3 border border-purple-500/10">
                    <span className="text-[#FFD700] mt-1 text-lg">•</span>
                    <span className="text-sm sm:text-base text-white/70"><strong className="text-white">Viyala:</strong> This division helps you explore opportunities in the tourism and hospitality industry.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestone 3: How We Teach */}
            <div className="relative pl-20 md:pl-24 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
              <div className="absolute left-0 top-0 h-14 w-14 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg shadow-yellow-500/50 border-4 border-[#0c051a]">
                <svg className="w-6 h-6 text-[#0c051a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
                <h4 className="text-xl sm:text-2xl font-bold text-[#FFD700] mb-3">How We Teach</h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/80">
                  We believe that practice makes perfect. That is why our courses are designed with <strong className="text-[#FFD700]">30% theory and 70% practical work</strong>. We don't just teach you from a book; we invite you to our <strong className="text-[#FFD700]">"24/7 Live Trading Club"</strong> to trade alongside experts. Plus, once you join us, you get a <strong className="text-[#FFD700]">Lifetime Membership</strong> to keep learning and growing.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Growing Future Indicator - Outside timeline, no connecting line */}
        <div className="relative pl-20 md:pl-24 opacity-0 animate-[fadeInUp_0.6s_ease-out_1.0s_forwards]">
          <div className="absolute left-0 top-0 h-14 w-14 rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-purple-600 flex items-center justify-center shadow-lg shadow-yellow-500/50 border-4 border-[#0c051a] animate-[pulse_2s_ease-in-out_infinite]">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="bg-gradient-to-br from-[#FFD700]/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/30 hover:border-[#FFD700]/50 transition-all">
            <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-purple-400 bg-clip-text text-transparent mb-2">Growing Forward</h4>
            <p className="text-sm sm:text-base text-white/70 italic">
              Our journey continues... Stay tuned for more innovations and opportunities.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg sm:text-xl font-semibold text-white/90 mb-6">
            Join eBirth Business Academy today, and let's turn your ideas into a real business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;

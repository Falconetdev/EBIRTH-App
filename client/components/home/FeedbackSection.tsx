import { Star } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { useEffect, useRef } from "react";

const FeedbackSection = () => {
  const trustindexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = trustindexRef.current;
    if (!container) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cdn.trustindex.io/loader.js?ae8da7b68fb7161db746666e8b2';
    container.appendChild(script);
    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="feedback"
      className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-[#FFD700]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              Voices of Victory
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-medium text-white/80 max-w-3xl mx-auto leading-relaxed">
            අප ගැන අප කියනවාට වඩා, Inner Racer සමඟ එක්ව ජීවිතය ජයගත් 1000+ සිසුන්ගේ සාර්ථකත්වයේ කතා වලට සවන් දෙන්න
          </p>

          {/* Facebook Reviews Button */}
          <div className="flex justify-center pt-4">
            <a
              href="https://web.facebook.com/InnerRacers/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm sm:text-base font-bold">View All Reviews on Facebook</span>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-white/90">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFD700] text-[#FFD700]" />
                  <span>1000+ Success Stories</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Trustindex Reviews Widget */}
        <div ref={trustindexRef} className="w-full"></div>
      </div>
    </section>
  );
};

export default FeedbackSection;

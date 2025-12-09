import { ArrowRight } from "lucide-react";

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
          <div className="flex-1 space-y-4 md:space-y-6 text-white w-full text-center lg:text-left">
            <h2 className="font-sora font-extrabold text-[28px] leading-[36px] sm:text-[36px] sm:leading-[44px] md:text-[48px] md:leading-[56px] lg:text-[64px] lg:leading-[72px] text-center bg-gradient-to-br from-[#000000] via-[#fff831] to-[#FEF08A] text-transparent bg-clip-text">
              Inner Racers Trading Community
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 w-full">
              <span className="text-white text-[20px] sm:text-[24px] md:text-[30px] lg:text-[25px] font-extrabold">
                එකට අදම
              </span>

              <span className="text-[#FEF08A] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[80px] font-extrabold rotate-[-15deg]">
                JOIN
              </span>

              <span className="text-white text-[20px] sm:text-[24px] md:text-[30px] lg:text-[25px] font-extrabold">
                වෙන්න
              </span>
            </div>
          </div>

          <div className="flex flex-1 justify-center lg:justify-end max-w-md lg:max-w-none">
            <img
              src="/hero-new.png"
              alt="Community mentor speaking"
              className="h-auto w-full max-h-[300px] md:max-h-[400px] lg:max-h-none object-contain rounded-3xl"
            />
          </div>
        </div>

        <div
          className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-[50px] rounded-[16px] px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-b from-[#070116] to-[#6D28D9]"
        >
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white text-white text-center sm:text-left text-xs sm:text-sm md:text-base font-medium">
            <span className="px-3 sm:px-4 py-2">Get exclusive trading signals</span>
            <span className="px-3 sm:px-4 py-2">Market insights</span>
            <span className="px-3 sm:px-4 py-2">Join thousands of traders</span>
          </div>

          <a
            href="https://t.me/innerracers"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#4f46e5] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-[#4338ca] w-full sm:w-auto"
          >
            Join Telegram Channel
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunitySection;

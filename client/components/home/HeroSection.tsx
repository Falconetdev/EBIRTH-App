import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  images: string[];
};

const HeroSection = ({ images }: HeroSectionProps) => {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="absolute inset-0 bg-inherit"></div>
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.55),_rgba(26,11,46,0))] blur-2xl sm:h-[420px] sm:w-[420px] sm:blur-3xl lg:h-[520px] lg:w-[520px]"></div>

      {/* Decorative Coins Layout */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Coin 3 (Top Left) - Enlarged
        <img
          src="/coin4.webp"
          alt="Decorative coin top left"
          className="coin-float absolute left-[-40px] top-[-30px] h-56 w-56 rotate-[18deg] opacity-40 hidden sm:block"
          style={{ animationDelay: '0.8s' }}
        /> */}
        {/* Supporting small coin near top-left */}
        <img
          src="/coin3.webp"
          alt="Decorative coin"
          className="coin-float absolute  top-24 h-[260px] w-[200px] rotate-[-12deg]  hidden md:block"
          style={{ animationDelay: '1.6s' }}
        />
        {/* Mid background subtle coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin mid"
          className="coin-float absolute left-[52%] top-[15%] h-[100px] w-[100px] -translate-x-1/2 rotate-[22deg] opacity-70"
          style={{ animationDelay: '2.2s' }}
        />
        {/* Coin 1 (Right Corner) - Enlarged */}
        <img
          src="/coin1.webp"
          alt="Decorative coin right"
          className="coin-float absolute right-[2px] top-[220px] h-[260px] w-[200px] rotate-[-15deg]  hidden lg:block"
          style={{ animationDelay: '1.1s' }}
        />
        {/* Bottom left accent coin
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin bottom left"
          className="coin-float absolute left-8 bottom-6 h-24 w-24 rotate-[30deg] opacity-30 hidden md:block"
          style={{ animationDelay: '1.9s' }}
        /> */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              <span className="text-[#FFD700]">eBirth</span>
              <br />
              Business Academy
            </h1>
            <p className="text-white/80 font-bold text-xl sm:text-2xl mb-8 max-w-xl">
              Where Dreams Take Flight
              <br />
              and Entrepreneurs Are Born
            </p>
            <p className="text-[#FFD700] text-lg font-semibold mb-6">
              Trading ගනා සාරථි සංඛලනයේ මුල ඉදන් ඉගෙනගමු
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-6 text-lg rounded-lg">
                Get Started
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-6 lg:justify-start">
              <div className="flex -space-x-3">
                {images.map((img, index) => (
                  <img
                    key={`${img}-${index}`}
                    src={img}
                    alt="Student profile"
                    className="h-14 w-14 rounded-full border-2 border-purple-500/40 object-cover shadow-lg shadow-purple-900/30"
                  />
                ))}
              </div>
              <div className="flex flex-col items-center text-white/70 md:flex-row md:items-center md:gap-3">
                <span className="text-xs uppercase tracking-[0.35em]">Trusted by</span>
                <div className="flex items-baseline gap-2 text-[#FFD700]">
                  <span className="text-2xl font-extrabold leading-none">3,600+</span>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/60">Learners</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[360px] w-full max-w-sm sm:h-[420px] sm:max-w-md lg:h-[600px] lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl w-full h-full ">
                <img
                  src="/hero-new.webp"
                  alt="eBirth Business Academy - Hero Image"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    if (e.currentTarget.src.includes("placeholder.svg")) return;
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[56px] bg-[radial-gradient(circle,_rgba(255,215,0,0.18),_rgba(26,11,46,0))] blur-3xl lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

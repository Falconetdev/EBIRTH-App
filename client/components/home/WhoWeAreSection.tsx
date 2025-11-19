import { Button } from "@/components/ui/button";

const WhoWeAreSection = () => {
  return (
    <section id="who-we-are" className=" mt-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-inherit opacity-95"></div>
      <h2 className="text-6xl font-bold text-[#FFD700]   text-center mb-8">Who We Are</h2>
      <div className="pointer-events-none absolute -top-20 -left-10 hidden md:block opacity-60">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating bitcoin"
          className="h-40 w-40 -rotate-[15deg] object-contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-15%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(128,78,235,0.25),_rgba(12,5,26,0))] blur-3xl sm:h-80 sm:w-80"></div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        
        <div className="order-1 text-center lg:order-2 lg:text-left">
          
          <h3 className="mt-4 text-3xl font-extrabold text-white md:text-4xl opacity-70">
            <span>Empowering Dreams, </span>
            <span className="text-[#FFD700]">Building Futures</span>
          </h3>
          <p className="mt-6 text-md leading-relaxed text-white/80 ">
            eBirth Business Academy is Sri Lanka's leading trading education hub. At eBirth Business Academy - Where Entrepreneurs Are Born - we connect ambition with the strategies, mentorship, and community needed to grow sustainable ventures.
          </p>
          <p className="mt-4 text-md leading-relaxed text-white/70">
            eBirth Business Academy ඔබේ trading හීන සරු රටාවකට පත් කරන්න සත්‍ය අත්දැකීම්, industry expert प्रशिक्षकයන් සහ flexible learning journeys එකතු කරලා උචිත දැනුම ලබාදෙයි. Real-world skills සහ data-driven insights සමඟ ඔබේ trading journey එකට විශ්වාසය එකතු කරමු.
          </p>
          <p className="mt-4 text-md leading-relaxed text-white/70 ">
            Innovative ideas හඳුනාගෙන thriving entrepreneur community එකක් සමඟ එකතුවී ඔබේ entrepreneurial dreams reality බවට පත්කරන්න අපි ඔබට අත්වැලක්. Let's design the future you imagine.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button className="group flex items-center gap-3 rounded-full bg-[#FFD700] px-8 py-3 text-base font-semibold text-black shadow-lg shadow-yellow-400/30 transition hover:bg-[#FFC700]">
              Learn More
            </Button>
          </div>
        </div>

        <div className="order-2 lg:order-1 flex items-start h-full ">
          <div className="relative overflow-hidden  p-2  ">
            <div className="absolute inset-0 -z-10  "></div>
            <div className="relative aspect-[4/3] overflow-hidden ">
              <img
                src="/who-we-are.webp"
                alt="Collaborative trading session at eBirth Business Academy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;

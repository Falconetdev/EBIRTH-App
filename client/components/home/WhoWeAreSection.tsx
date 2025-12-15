import { Button } from "@/components/ui/button";

const WhoWeAreSection = () => {
  return (
    <section id="who-we-are" className="relative mt-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-inherit"></div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] text-center mb-8">Who We Are</h2>
      <div className="pointer-events-none absolute -top-20 -left-10 hidden md:block opacity-60">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating bitcoin"
          className="h-40 w-40 -rotate-[15deg] object-contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-15%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(128,78,235,0.25),_rgba(12,5,26,0))] blur-3xl sm:h-80 sm:w-80"></div>
      {/* Right edge large coin peek */}
      <div className="pointer-events-none absolute -right-16 top-1/3 hidden lg:block opacity-40">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating bitcoin"
          className="h-48 w-48 -rotate-[10deg] object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
        
        <div className="order-1 text-center lg:order-2 lg:text-left">
          
          <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            <span className="text-[#FFD700]">Building Your Business Dreams, Step by Step</span>
          </h3>
          
          <h4 className="mt-6 text-xl sm:text-2xl font-bold text-[#FFD700]">Our Story</h4>
          <p className="mt-3 text-sm sm:text-base md:text-md leading-relaxed text-white/80">
            Our journey started in 2019 with a clear vision: to help new entrepreneurs succeed. What began as a small initiative has now grown into a government-registered educational institute. Today, we serve students from our main offices in Kegalle and Nugegoda, as well as through our online platforms.
          </p>
          
          <h4 className="mt-6 text-xl sm:text-2xl font-bold text-[#FFD700]">What We Do</h4>
          <p className="mt-3 text-sm sm:text-base md:text-md leading-relaxed text-white/80">
            We are more than just a classroom. We have expanded into three focused areas to give you a complete business education:
          </p>
          <ul className="mt-3 space-y-2 text-sm sm:text-base text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-[#FFD700] mt-1">•</span>
              <span><strong className="text-white">Inner Racers:</strong> This is our trading arm, where we teach you how to master financial markets and investing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD700] mt-1">•</span>
              <span><strong className="text-white">Invocade:</strong> Here, we focus on the future, teaching you about AI technology and modern tech solutions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFD700] mt-1">•</span>
              <span><strong className="text-white">Viyala:</strong> This division helps you explore opportunities in the tourism and hospitality industry.</span>
            </li>
          </ul>
          
          <h4 className="mt-6 text-xl sm:text-2xl font-bold text-[#FFD700]">How We Teach</h4>
          <p className="mt-3 text-sm sm:text-base md:text-md leading-relaxed text-white/80">
            We believe that practice makes perfect. That is why our courses are designed with <strong className="text-[#FFD700]">30% theory and 70% practical work</strong>. We don't just teach you from a book; we invite you to our <strong className="text-[#FFD700]">"24/7 Live Trading Club"</strong> to trade alongside experts. Plus, once you join us, you get a <strong className="text-[#FFD700]">Lifetime Membership</strong> to keep learning and growing.
          </p>
          
          <h4 className="mt-6 text-xl sm:text-2xl font-bold text-[#FFD700]">Trusted Partnerships</h4>
          <p className="mt-3 text-sm sm:text-base md:text-md leading-relaxed text-white/80">
            Quality is our priority. We have partnered with the <strong className="text-white">University of Sri Jayewardenepura</strong> and the <strong className="text-white">Entre' Club</strong> to bring you university-level knowledge. Our lecturers are experienced professionals who are qualified to guide you on your path to success.
          </p>
          
          <p className="mt-6 text-base sm:text-lg font-semibold text-white/90">
            Join eBirth Business Academy today, and let's turn your ideas into a real business.
          </p>
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

const HeroSection = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/trading-mentor.webp"
          alt="Free Trading Mentorship"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120625]/70 via-[#120625]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white font-bold text-4xl md:text-6xl">
          Free Trading Mentorship
        </h1>
        <p className="text-white text-xl md:text-3xl mt-4 font-semibold">
          Online / YouTube Courses
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

import { Star, Users } from "lucide-react";

const CourseHero = () => {
  return (
    <header
      className="p-4 sm:p-6 lg:p-8 rounded-2xl space-y-4 sm:space-y-6 text-center lg:text-left bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/course-hero.webp')" }}
    >
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#FFD700]/80">
        Premium Membership
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
        Foundations + Advanced Trading Membership
        <span className="text-[#FFD700]"> Online</span>
      </h1>
      <p className="mx-auto max-w-3xl text-sm sm:text-base lg:text-lg text-white/70 lg:mx-0">
        Trading fundamentals සිට advanced strategies දක්වා master bosses! It's time to take your game to the next level 🚀
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/80 lg:justify-start">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
          <Star className="h-4 w-4 text-[#FFD700]" />
          4.9 (186 reviews)
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
          <Users className="h-4 w-4" />
          2,450+ learners enrolled
        </span>
      </div>
    </header>
  );
};

export default CourseHero;

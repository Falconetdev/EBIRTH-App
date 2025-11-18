import { Star, Users } from "lucide-react";

const CourseHero = () => {
  return (
    <header
      className=" p-4 rounded-2xl space-y-6 text-center lg:text-left bg-fit bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/course-hero.webp')" }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD700]/80">
        Premium Membership
      </p>
      <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">
        Foundations + Advanced Trading Membership
        <span className="text-[#FFD700]"> Online</span>
      </h1>
      <p className="mx-auto max-w-3xl text-base text-white/70 lg:mx-0 lg:text-lg">
        Trading fundamentals සිට advanced strategies දක්වා master bosses! It's time to take your game to the next level 🚀
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 lg:justify-start">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
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

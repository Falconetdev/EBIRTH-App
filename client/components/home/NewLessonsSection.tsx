import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  description: string;
  lessonTag: string;
  platform: string;
  image: string;
};

type NewLessonsSectionProps = {
  lessons: Lesson[];
};

const NewLessonsSection = ({ lessons }: NewLessonsSectionProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-inherit overflow-hidden">
      {/* Anchored decorative coins top-left */}
      <div className="pointer-events-none absolute left-2 top-2 sm:left-6 sm:top-4">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float h-20 w-20 rotate-[18deg] opacity-30 sm:h-24 sm:w-24"
        />
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute -left-6 top-14 h-14 w-14 rotate-[-12deg] opacity-25 sm:h-16 sm:w-16"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
      {/* Bottom-left large coin peeking in */}
      <div className="pointer-events-none absolute -left-16 bottom-[-48px] hidden md:block opacity-35">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float h-44 w-44 -rotate-[16deg]"
          style={{ animationDelay: '0.9s' }}
        />
      </div>
      {/* Subtle center background coin behind cards */}
      <div className="pointer-events-none absolute left-1/2 top-[65%] -translate-x-1/2 opacity-20">
        <img
          src="/coin4.webp"
          alt="Decorative coin"
          className="coin-float h-16 w-16 rotate-[20deg]"
          style={{ animationDelay: '1.6s' }}
        />
      </div>
      {/* <div className="pointer-events-none absolute -top-6 left-4 hidden sm:block">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Floating coin"
          className="h-24 w-24 rotate-[12deg] object-contain opacity-70"
        />
      </div> */}
     

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-[#FFD700] drop-shadow md:text-5xl">
            Our New Lessons
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/80 sm:text-base md:text-lg">
            මූලිකයෙන් ඉගෙන | Crypto trading basics දැනගන්න | advanced techniques එකටම සපයන
            <br className="hidden sm:block" />
            actionable programmes සමඟ ඔබේ trading journey එක upgrade කරමු
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#2b0e4c]/70 p-6 shadow-[0_0_40px_rgba(123,97,255,0.25)]"
            >
              <div className="relative rounded-[26px] border border-[#ffd700]/30 bg-black/40">
                <div className="relative h-[280px] overflow-hidden rounded-[26px]">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      if (e.currentTarget.src.includes("placeholder.svg")) return;
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                      <span>{lesson.lessonTag}</span>
                      <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-[#FF2D20]"
                        >
                          <path d="M10 15L15 12L10 9V15ZM22 12C22 6.48 17.52 2 12 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 12 22C17.52 22 22 17.52 22 12ZM4 12C4 7.59 7.58 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.58 20 4 16.41 4 12Z" />
                        </svg>
                        {lesson.platform}
                      </span>
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Focus</p>
                      <p className="text-2xl font-bold text-white">Trade කෙසේද?</p>
                      <p className="text-sm font-semibold text-[#FFD700]">TradingView</p>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                      <span>Lesson</span>
                      <span>{lesson.lessonTag.split(" ").pop()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-center">
                <h3 className="text-2xl font-semibold text-white">{lesson.title}</h3>
                <p className="text-sm text-white/70">{lesson.description}</p>
                <Button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700]">
                  Watch Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFD700] bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black"
          >
            View All Courses
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewLessonsSection;

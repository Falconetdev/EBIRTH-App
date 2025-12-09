import CourseCard from "./CourseCard";
import { ArrowRight } from "lucide-react";

type OtherCourse = {
  price: number;
  originalPrice: number;
  discount: number;
};

type OtherCoursesSectionProps = {
  otherCourses: OtherCourse[];
};

const OtherCoursesSection = ({ otherCourses }: OtherCoursesSectionProps) => {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#1b0835]/70 p-4 sm:p-6 md:p-8 shadow-[0_30px_80px_rgba(26,8,53,0.35)]">
      <header className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Other Courses <span className="text-[#b097ff]">| අනෙකුත් පාඨමාලා</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/70">
          Keep expanding your trading mastery with our broader library of programs across languages.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        {otherCourses.map((course) => (
          <CourseCard
            key={`${course.price}-${course.discount}-${course.originalPrice}`}
            {...course}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center">
        <button className="flex items-center gap-2 rounded-full border-2 border-purple-400/50 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-purple-200 transition-all duration-300 hover:border-purple-300 hover:text-white">
          See All Events
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default OtherCoursesSection;

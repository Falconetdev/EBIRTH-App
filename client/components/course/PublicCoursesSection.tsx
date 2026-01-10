import React from 'react';
import { usePublicCourses } from '@/hooks/usePublicCourses';
import type { PublicCourse } from '@shared/api';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function CourseCard({ course }: { course: PublicCourse }) {
  // Calculate total value and savings for combo courses
  const totalValue = course.is_combo_course && course.sub_courses
    ? course.sub_courses.reduce((sum, sub) => sum + sub.price, 0)
    : 0;
  const savings = totalValue > 0 ? totalValue - course.price : 0;
  const hasDiscount = course.original_price && course.original_price > course.price;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm transition hover:bg-white/10">
      <div className="relative h-40 bg-gradient-to-br from-[#2d0a7c] to-[#6d23ff]">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-overlay"
          />
        ) : null}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-[#FFD700] px-3 py-1 text-xs font-semibold text-black shadow">
            {course.course_code}
          </span>
          {course.is_combo_course && (
            <span className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow">
              📦 COMBO
            </span>
          )}
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white/80">
          {course.duration}
        </span>
        {course.category && (
          <span className="absolute left-4 bottom-4 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
            {course.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 text-white bg-[#361088]/80">
        <h3 className="text-lg font-semibold leading-tight">{course.title}</h3>
        <p className="text-sm text-white/70 line-clamp-3">{course.description}</p>

        {/* Combo Sub-Courses */}
        {course.is_combo_course && course.sub_courses && course.sub_courses.length > 0 && (
          <div className="rounded-lg bg-white/5 p-3 space-y-2">
            <p className="text-xs font-semibold text-[#FFD700]">This combo includes:</p>
            <ul className="space-y-1">
              {course.sub_courses.map((sub) => (
                <li key={sub.id} className="text-xs text-white/80 flex items-center gap-1">
                  <span className="text-[#FFD700]">✓</span>
                  {sub.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto space-y-2">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-xs text-white/40 line-through">
                {course.currency} {course.original_price?.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-[#FFD700]">
              {course.currency} {course.price.toLocaleString()}
            </span>
          </div>

          {/* Combo Savings */}
          {course.is_combo_course && savings > 0 && (
            <p className="text-xs text-green-400 font-semibold">
              💰 Save {course.currency} {savings.toLocaleString()}!
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-white/60">
          <span>{course.students_count} students</span>
        </div>

        {course.lecturers?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {course.lecturers.slice(0,2).map((lec, i) => (
              <span key={i} className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">
                {lec.lecturer_name}
              </span>
            ))}
          </div>
        )}

        <Link to={`/membership/${course.id}`}>
          <Button className="group mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-semibold text-black hover:bg-[#FFC700]">
            View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default function PublicCoursesSection() {
  const { data, loading, error, refetch } = usePublicCourses();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // Get unique categories from courses
  const categories = React.useMemo(() => {
    if (!data) return [];
    const uniqueCategories = new Set(data.map(c => c.category).filter(Boolean));
    return ['all', ...Array.from(uniqueCategories)];
  }, [data]);

  // Filter courses by selected category
  const filteredCourses = React.useMemo(() => {
    if (!data) return [];
    if (selectedCategory === 'all') return data;
    return data.filter(course => course.category === selectedCategory);
  }, [data, selectedCategory]);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#120625] via-[#1e0942] to-[#2d0a7c] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10 text-white">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Live <span className="bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent">Public Courses</span>
          </h2>
          <p className="text-base text-white/80">Fetched directly from the eBirth public API.</p>
        </header>

        {/* Category Filters */}
        {!loading && !error && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category === 'all' ? 'All Courses' : category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-10"><span className="animate-pulse text-white/50">Loading courses...</span></div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-4 py-10">
            <p className="text-red-400 text-sm">{error}</p>
            <Button variant="outline" onClick={refetch}>Retry</Button>
          </div>
        )}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {filteredCourses.length === 0 && (
              <p className="text-center text-white/60 col-span-full">No courses available in this category.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

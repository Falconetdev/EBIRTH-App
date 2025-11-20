import { usePublicCourses } from '@/hooks/usePublicCourses';
import type { PublicCourse } from '@shared/api';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CourseCard({ course }: { course: PublicCourse }) {
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
        <span className="absolute left-4 top-4 rounded-full bg-[#FFD700] px-3 py-1 text-xs font-semibold text-black shadow">
          {course.course_code}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white/80">
          {course.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 text-white bg-[#361088]/80">
        <h3 className="text-lg font-semibold leading-tight">{course.title}</h3>
        <p className="text-sm text-white/70 line-clamp-4">{course.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
          <span>{course.currency} {course.price.toLocaleString()}</span>
          <span>{course.students_count} students</span>
        </div>
        {course.lecturers?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {course.lecturers.slice(0,2).map((lec, i) => (
              <span key={i} className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">
                {lec.lecturer_name}
              </span>
            ))}
          </div>
        )}
        <Button className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-3 text-sm font-semibold text-black hover:bg-[#FFC700]">
          View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </article>
  );
}

export default function PublicCoursesSection() {
  const { data, loading, error, refetch } = usePublicCourses();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#120625] via-[#1e0942] to-[#2d0a7c] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10 text-white">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Live <span className="bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent">Public Courses</span>
          </h2>
          <p className="text-base text-white/80">Fetched directly from the eBirth public API.</p>
        </header>

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
            {data.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {data.length === 0 && (
              <p className="text-center text-white/60 col-span-full">No courses available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

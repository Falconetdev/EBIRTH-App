import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicCourses } from '@/hooks/usePublicCourses';
import type { PublicCourse } from '@shared/api';
import { ArrowRight } from 'lucide-react';

type TabKey = "all" | "online" | "physical";

type CourseCard = {
  id: string;
  title: string;
  description: string;
  level: "Free" | "Advanced" | "Premium";
  deliveryMode: "online" | "physical" | "hybrid";
  duration: string;
  badge: "Online" | "Beginner Friendly" | "Physical Classes" | "Language-specific" | "Hands-On Projects";
  image: string;
};

const tabs: { key: TabKey; label: string; shortLabel: string }[] = [
  { key: "all", label: "All Courses", shortLabel: "All" },
  { key: "online", label: "Online Membership", shortLabel: "Online" },
  { key: "physical", label: "Physical Membership", shortLabel: "Physical" },
];

// Fallback courses (shown if API fails or returns no data)
const fallbackCourses: CourseCard[] = [
  {
    id: "free-trading",
    title: "Free Trading Mentorship",
    description: "Kickstart trading fundamentals with live mentorship sessions, 100% free.",
    level: "Free",
    deliveryMode: "online",
    duration: "6 Weeks",
    badge: "Beginner Friendly",
    image: "/courses/KEG.jpg",
  },
  {
    id: "institutional",
    title: "Institutional Membership",
    description: "Institutional-grade mastery with structured evaluations and prop-ready frameworks.",
    level: "Premium",
    deliveryMode: "physical",
    duration: "12 Weeks",
    badge: "Physical Classes",
    image: "/courses/NUGEGODA.jpg",
  },
  {
    id: "elliott",
    title: "Elliott Wave Membership",
    description: "Decode market waves and master precision entries with expert-led pathing.",
    level: "Premium",
    deliveryMode: "physical",
    duration: "10 Weeks",
    badge: "Hands-On Projects",
    image: "/courses/EWC KEGALLE.jpg",
  },
  {
    id: "smc",
    title: "SMC & ICT Market Core",
    description: "Institutional concepts simplified with actionable smart money playbooks.",
    level: "Advanced",
    deliveryMode: "online",
    duration: "8 Weeks",
    badge: "Online",
    image: "/courses/SMC.jpg",
  },
  {
    id: "msnr",
    title: "MSnR Membership",
    description: "Full-stack fundamentals for future-focused creators and career switchers.",
    level: "Advanced",
    deliveryMode: "online",
    duration: "10 Weeks",
    badge: "Online",
    image: "/courses/MSNRONLINE.jpg",
  },
  {
    id: "institutionalonline",
    title: "Institutional Membership Online",
    description: "Build global communication confidence with tailored language coaching tracks.",
    level: "Premium",
    deliveryMode: "online",
    duration: "8 Weeks",
    badge: "Online",
    image: "/courses/NUGEGODA.jpg",
  },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const { data: apiCourses, loading, error } = usePublicCourses();

  // Use API courses if available and not empty, otherwise use fallback
  const useApiData = !loading && !error && apiCourses && apiCourses.length > 0;
  
  // Convert API courses to CourseCard format
  const apiCoursesFormatted: CourseCard[] = useApiData
    ? apiCourses.map((course: PublicCourse) => ({
        id: course.id.toString(),
        title: course.title,
        description: course.description,
        level: course.price === 0 ? "Free" : (course.price > 50000 ? "Premium" : "Advanced"),
        deliveryMode: (course.delivery_mode === 'physical' ? 'physical' :
                      course.delivery_mode === 'hybrid' ? 'hybrid' :
                      'online') as CourseCard['deliveryMode'],
        duration: course.duration || `${course.total_days || 0} Days`,
        badge: (course.delivery_mode === 'online' ? 'Online' :
                course.delivery_mode === 'physical' ? 'Physical Classes' :
                'Online') as CourseCard['badge'],
        image: course.image_url || "/courses/KEG.jpg",
      }))
    : fallbackCourses;

  const filteredCourses =
    activeTab === "all"
      ? apiCoursesFormatted
      : apiCoursesFormatted.filter((course) =>
          activeTab === "online" ? course.deliveryMode === "online" :
          activeTab === "physical" ? (course.deliveryMode === "physical" || course.deliveryMode === "hybrid") :
          true
        );

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A0450] via-[#2D0A7C] to-[#6D23FF] px-4 py-20 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[-12%] top-[-18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_65%)] blur-2xl" />
        <div className="absolute right-[-10%] bottom-[-15%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(115,63,255,0.4),_transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-12 text-white">
        <header className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-5xl px-2">
            Explore Our <span className="bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent">Courses & Mentorship</span> Programs
          </h2>
          <p className="text-sm sm:text-base text-white/80 px-4">
            Choose from free, advanced, institutional, and specialized tracks to match your learning goals.
          </p>
        </header>

        <div className="flex justify-center px-4">
          <div className="inline-flex rounded-full bg-white/10 p-1 max-w-full">
            <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-black/40 p-1">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-tight sm:tracking-normal transition-all ${
                      isActive
                        ? "bg-[#8C52FF] text-white shadow-[0_0_20px_rgba(140,82,255,0.4)]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Show short label on mobile, full label on larger screens */}
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <span className="animate-pulse text-white/50">Loading courses...</span>
          </div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="rounded-full bg-white/5 p-6 mb-6">
              <svg className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No {activeTab === 'online' ? 'Online' : activeTab === 'physical' ? 'Physical' : ''} Courses Available
            </h3>
            <p className="text-white/70 text-base max-w-md mb-6">
              {activeTab === 'all'
                ? "We currently don't have any courses available. Please check back soon!"
                : `We currently don't have any ${activeTab === 'online' ? 'online' : 'physical'} membership programs available. Try switching to ${activeTab === 'online' ? 'Physical Membership' : 'Online Membership'} or view all courses!`
              }
            </p>
            {activeTab !== 'all' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab(activeTab === 'online' ? 'physical' : 'online')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8C52FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a45e6] shadow-[0_0_20px_rgba(140,82,255,0.4)]"
                >
                  Switch to {activeTab === 'online' ? 'Physical' : 'Online'} Membership
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View All Courses
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && filteredCourses.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
            const highlightColor =
              course.level === "Free"
                ? "bg-[#FFB3B3] text-[#800F2F]"
                : course.level === "Advanced"
                  ? "bg-[#B5E48C] text-[#1B4332]"
                  : "bg-[#FFE178] text-[#7A4E00]";

            return (
              <article
                key={course.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-white/10 backdrop-blur transition hover:-translate-y-2 hover:bg-white/15 hover:shadow-[0_28px_60px_rgba(8,0,40,0.45)]"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#361088]/80 to-transparent" />
                  {course.level === "Free" ? (
                    <span className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex items-center rounded-full bg-white px-2 sm:px-3 py-1 text-xs font-semibold text-[#A10027] shadow-lg">
                      Free
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-4 sm:gap-5 bg-[#361088]/90 p-4 sm:p-6 text-white">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold leading-tight">{course.title}</h3>
                    <p className="text-xs sm:text-sm text-white/70 line-clamp-3">{course.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-medium uppercase tracking-wide sm:tracking-[0.15em]">
                    <span className={`flex items-center rounded-full px-3 py-1 ${highlightColor}`}>
                      {course.level}
                    </span>
                    <span className="flex items-center rounded-full bg-white/15 px-3 py-1 text-white/85">
                      {course.duration}
                    </span>
                    <span className="flex items-center rounded-full bg-white/15 px-3 py-1 text-white/85">
                      {course.badge}
                    </span>
                  </div>

                  {useApiData ? (
                    <Link
                      to={`/membership/${course.id}`}
                      className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FFE178] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_32px_rgba(254,240,138,0.35)] transition hover:scale-[1.02]"
                    >
                      View Details <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <Link
                      to="/course-details"
                      className="mt-auto inline-flex items-center justify-center rounded-full bg-[#FFE178] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_32px_rgba(254,240,138,0.35)] transition hover:scale-[1.02]"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </article>
            );
            })}
          </div>
        )}

        {!loading && !useApiData && filteredCourses.length > 0 && (
          <p className="text-center text-xs text-white/50 mt-4">
            Showing sample courses (API unavailable)
          </p>
        )}
      </div>
    </section>
  );
};

export default Explore;
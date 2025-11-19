import { useState } from "react";

type TabKey = "all" | "trading" | "technology" | "language";

type CourseCard = {
  id: string;
  title: string;
  description: string;
  level: "Free" | "Advanced" | "Premium";
  category: TabKey;
  duration: string;
  badge: "Online" | "Beginner Friendly" | "Physical Classes" | "Language-specific" | "Hands-On Projects";
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All Courses" },
  { key: "trading", label: "Trading" },
  { key: "technology", label: "Technology & Development" },
  { key: "language", label: "Language Learning" },
];

const courses: CourseCard[] = [
  {
    id: "free-trading",
    title: "Free Trading Mentorship",
    description: "Kickstart trading fundamentals with live mentorship sessions, 100% free.",
    level: "Free",
    category: "trading",
    duration: "6 Weeks",
    badge: "Beginner Friendly",
  },
  {
    id: "institutional",
    title: "Institutional Membership",
    description: "Institutional-grade mastery with structured evaluations and prop-ready frameworks.",
    level: "Premium",
    category: "trading",
    duration: "12 Weeks",
    badge: "Physical Classes",
  },
  {
    id: "elliott",
    title: "Elliott Wave Membership",
    description: "Decode market waves and master precision entries with expert-led pathing.",
    level: "Premium",
    category: "trading",
    duration: "10 Weeks",
    badge: "Hands-On Projects",
  },
  {
    id: "smc",
    title: "SMC & ICT Market Core",
    description: "Institutional concepts simplified with actionable smart money playbooks.",
    level: "Advanced",
    category: "trading",
    duration: "8 Weeks",
    badge: "Online",
  },
  {
    id: "webdev",
    title: "Web Development Masterclass",
    description: "Full-stack fundamentals for future-focused creators and career switchers.",
    level: "Advanced",
    category: "technology",
    duration: "10 Weeks",
    badge: "Hands-On Projects",
  },
  {
    id: "languages",
    title: "Languages",
    description: "Build global communication confidence with tailored language coaching tracks.",
    level: "Free",
    category: "language",
    duration: "8 Weeks",
    badge: "Language-specific",
  },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filteredCourses =
    activeTab === "all" ? courses : courses.filter((course) => course.category === activeTab);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A0450] via-[#2D0A7C] to-[#6D23FF] px-4 py-20 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[-12%] top-[-18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_65%)] blur-2xl" />
        <div className="absolute right-[-10%] bottom-[-15%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(115,63,255,0.4),_transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-12 text-white">
        <header className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Explore Our <span className="bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent">Courses & Mentorship</span> Programs
          </h2>
          <p className="text-base text-white/80">
            Choose from free, advanced, institutional, and specialized tracks to match your learning goals.
          </p>
        </header>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#FFE178] text-[#1B0B2E] shadow-[0_12px_28px_rgba(245,209,96,0.35)]"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

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
                <div className="relative h-28 bg-gradient-to-r from-[#F8F1FF] to-[#DED6FF]">
                  {course.level === "Free" ? (
                    <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#A10027] shadow">
                      Free
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-5  bg-[#361088]/90 p-6 text-white">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-tight">{course.title}</h3>
                    <p className="text-sm text-white/70">{course.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.25em]">
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

                  <button className="mt-auto inline-flex items-center justify-center rounded-full bg-[#FFE178] px-5 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_32px_rgba(254,240,138,0.35)] transition hover:scale-[1.02]">
                    Learn More
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Explore;
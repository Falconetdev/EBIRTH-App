import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TabKey } from "./types";

type CourseDay = {
  title: string;
  points?: string[];
  description?: string;
};

type CourseProgram = {
  program: string;
  days: CourseDay[];
};

type BenefitGridItem = {
  heading: string;
  detail: string;
};

type AdditionalBenefits = {
  lead: string;
  bullets: { title: string; detail: string }[];
};

type CourseTabsProps = {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
  highlights: string[];
  courseContent: CourseProgram[];
  additionalBenefits: AdditionalBenefits;
  benefitGrid: BenefitGridItem[];
};

const tabConfig: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Course Overview" },
  { key: "content", label: "Course Content" },
  { key: "benefits", label: "Additional Benefits" },
];

const CourseTabs = ({
  activeTab,
  onTabChange,
  highlights,
  courseContent,
  additionalBenefits,
  benefitGrid,
}: CourseTabsProps) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#1b0835]/80 p-8 shadow-[0_30px_80px_rgba(26,8,53,0.45)]">
      <nav className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">
        {tabConfig.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`relative transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD700] ${
                isActive ? "text-[#FFD700]" : "hover:text-[#FFD700]/70"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#FFD700]"></span>
              )}
            </button>
          );
        })}
      </nav>

      <section className="space-y-6 pt-8">
        {activeTab === "overview" && (
          <>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Course Overview</h2>
              <p className="text-sm uppercase tracking-[0.4em] text-[#FFD700]/80">
                Build Trading Career එකේ ඔබේ සවිමත් හඬ!
              </p>
              <p className="text-base leading-relaxed text-white/75">
                "Foundations + Advanced Trading Membership" eBirth Business Academy විසින් නිර්මාණය කරන ලද immersive learning experience එකකි. මෙය trading fundamentals, market mechanics, risk management frameworks සහ high-conviction strategies එකතු කරන සම්පූර්ණ ecosystem එකක්.
              </p>
              <p className="text-base leading-relaxed text-white/70">
                Live trading labs, real-time chart breakdowns, weekly case studies, සහ dedicated community mentorship එකක් සමඟ consistency build කරන්න සහ ඔබේ trading journey එක streamline කරන්න. Course එක තුළ video modules, practice decks, signal breakdowns, සහ bonus expert sessions 12ක් ද ඇතුළත්.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Highlights:</h3>
              <ul className="space-y-3 text-base text-white/75">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#FFD700]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Course Content</h2>
              <p className="text-sm uppercase tracking-[0.4em] text-[#FFD700]/80">
                Basic + Advanced journey mapped day-by-day
              </p>
            </div>

            <div className="space-y-8">
              {courseContent.map((course) => (
                <section key={course.program} className="space-y-4">
                  <header className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]/80">Program Outline</p>
                    <h3 className="text-xl font-semibold text-white">{course.program}</h3>
                  </header>

                  <Accordion type="multiple" className="space-y-3">
                    {course.days.map((day) => (
                      <AccordionItem
                        key={`${course.program}-${day.title}`}
                        value={`${course.program}-${day.title}`}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                      >
                        <AccordionTrigger className="px-4 py-3 text-left text-base font-semibold text-white">
                          {day.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 px-4 pb-4 text-base leading-relaxed text-white/75">
                          {day.points ? (
                            <ul className="space-y-2">
                              {day.points.map((point) => (
                                <li key={point} className="flex items-start gap-3">
                                  <span className="mt-2 h-2 w-2 rounded-full bg-[#FFD700]"></span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{day.description}</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
            </div>

            <p className="text-sm text-white/50">
              * All live sessions are recorded and uploaded to the learning portal within 12 hours with Sinhala & English annotations.
            </p>
          </div>
        )}

        {activeTab === "benefits" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Membership Perks</h2>
              <p className="text-sm uppercase tracking-[0.4em] text-[#FFD700]/80">
                Stay supported beyond the classroom
              </p>
            </div>

            <div className="space-y-4 text-base text-white/75">
              <p>{additionalBenefits.lead}</p>
              <ul className="space-y-3">
                {additionalBenefits.bullets.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#FFD700]"></span>
                    <div>
                      <p className="font-semibold text-white">{benefit.title}</p>
                      <p className="text-white/75">{benefit.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {benefitGrid.map((benefit) => (
                <article
                  key={benefit.heading}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{benefit.heading}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/75">{benefit.detail}</p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-[#FFD700]/20 bg-[#FFD700]/10 p-5 text-white/80">
              <p className="text-sm uppercase tracking-[0.35em] text-[#FFD700]">Bonus Drops</p>
              <p className="mt-2 text-base leading-relaxed">
                Monthly market outlook reports, invite-only meetups, සහ priority access to partner masterclasses keep you ahead of emerging opportunities.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseTabs;

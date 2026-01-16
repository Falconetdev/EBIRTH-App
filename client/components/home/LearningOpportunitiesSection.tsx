import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePublicCourses } from '@/hooks/usePublicCourses';
import type { PublicCourse } from '@shared/api';

type Membership = {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  deliveryMode?: 'online' | 'physical';
};

type LearningOpportunitiesSectionProps = {
  memberships: Membership[];
};

const LearningOpportunitiesSection = ({ memberships }: LearningOpportunitiesSectionProps) => {
  const [activeType, setActiveType] = useState<'online' | 'physical'>('online');
  const navigate = useNavigate();
  const { data: apiCourses, loading, error } = usePublicCourses();

  // Use API courses if available, otherwise use hardcoded fallback
  const useApiData = !loading && !error && apiCourses && apiCourses.length > 0;

  // Convert API courses to Membership format
  const apiMemberships: Membership[] = useApiData
    ? apiCourses.map((course: PublicCourse) => ({
        id: course.id.toString(),
        title: course.title,
        price: `${course.currency} ${course.price.toLocaleString()}`,
        oldPrice: course.original_price
          ? `${course.currency} ${course.original_price.toLocaleString()}`
          : `${course.currency} ${course.price.toLocaleString()}`, // Use original_price from API, fallback to same price if not set
        image: course.image_url || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
        description: course.description,
        deliveryMode: course.delivery_mode === 'physical' ? 'physical' : 'online',
      }))
    : memberships.map(m => ({
        ...m,
        deliveryMode: m.id.toLowerCase().includes('online') ? 'online' : 'physical'
      }));

  const visibleMemberships = useMemo(() => {
    const filtered = apiMemberships.filter(m =>
      activeType === 'online' ? m.deliveryMode === 'online' : m.deliveryMode === 'physical'
    );
    
    // Show only 2 courses per tab
    return filtered.slice(0, 2);
  }, [apiMemberships, activeType]);

  const hasMoreCourses = useMemo(() => {
    return apiMemberships.filter(m =>
      activeType === 'online' ? m.deliveryMode === 'online' : m.deliveryMode === 'physical'
    ).length > 2;
  }, [apiMemberships, activeType]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-inherit overflow-hidden">
      {/* Anchored decorative coins top-left */}
      <div className="pointer-events-none absolute left-3 top-3 sm:left-8 sm:top-6">
        {/* <img
          src="/coin4.webp"
          alt="Decorative coin"
          className="coin-float h-16 w-16 rotate-[25deg] opacity-30 sm:h-20 sm:w-20"
        /> */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute left-14 top-10 h-12 w-12 rotate-[-8deg] opacity-25 sm:h-14 sm:w-14"
          style={{ animationDelay: '0.9s' }}
        />
      </div>
      {/* Bottom-left large coin peeking in */}
      <div className="pointer-events-none absolute -left-20 bottom-[-56px] hidden md:block opacity-40">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float h-52 w-52 -rotate-[18deg]"
          style={{ animationDelay: '1.2s' }}
        />
      </div>
      {/* Subtle center background coin */}
      <div className="pointer-events-none absolute left-1/2 top-[72%] -translate-x-1/2 opacity-15">
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float h-16 w-16 rotate-[18deg]"
          style={{ animationDelay: '2s' }}
        />
      </div>
     

      {/* <div className="pointer-events-none absolute right-[-6%] top-[-12%] hidden lg:block">
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Parachute coin"
          className="h-44 w-44 object-contain"
        />
      </div> */}

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center px-8 space-y-10">
          <h2 className="text-4xl font-extrabold text-[#FFD700] drop-shadow md:text-5xl ">
            First You Learn. Then You Earn.
          </h2>
          <p className="mt-5 text-base font-semibold leading-relaxed text-white/80 sm:text-lg md:text-xl px-10">
            දැනුම යනු ආයෝජනයකි. නිවැරදි ඉගෙනීම තුළින් ඔබේ මූල්‍ය නිදහස ළඟා කරගන්නා ආකාරය පියවරෙන් පියවර අපෙන් ඉගෙන ගන්න.
          </p>
        </div>

        <div className="mt-10 flex justify-center px-4">
          <div className="inline-flex rounded-full bg-white/10 p-1 max-w-full">
            <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-black/40 p-1">
              <button
                type="button"
                onClick={() => setActiveType('online')}
                className={`flex-1 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-tight sm:tracking-normal transition-all ${activeType === 'online' ? 'bg-[#8C52FF] text-white shadow-[0_0_20px_rgba(140,82,255,0.4)]' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                <span className="sm:hidden">Online</span>
                <span className="hidden sm:inline">Online Membership</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveType('physical')}
                className={`flex-1 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-tight sm:tracking-normal transition-all ${activeType === 'physical' ? 'bg-[#8C52FF] text-white shadow-[0_0_20px_rgba(140,82,255,0.4)]' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
              >
                <span className="sm:hidden">Physical</span>
                <span className="hidden sm:inline">Physical Membership</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-[0.3em] text-white/60 px-4">
          Online Mentorship & Life-Time Memberships
        </p>

        {loading && (
          <div className="flex justify-center py-10">
            <span className="animate-pulse text-white/50 text-sm">Loading courses...</span>
          </div>
        )}

        {!loading && visibleMemberships.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="rounded-full bg-white/5 p-6 mb-6">
              <svg className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No {activeType === 'online' ? 'Online' : 'Physical'} Courses Available
            </h3>
            <p className="text-white/70 text-base max-w-md mb-6">
              We currently don't have any {activeType === 'online' ? 'online' : 'physical'} membership programs available.
              Try switching to {activeType === 'online' ? 'Physical Membership' : 'Online Membership'} or check back soon!
            </p>
            <Button
              onClick={() => setActiveType(activeType === 'online' ? 'physical' : 'online')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8C52FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a45e6] shadow-[0_0_20px_rgba(140,82,255,0.4)]"
            >
              Switch to {activeType === 'online' ? 'Physical' : 'Online'} Membership
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!loading && visibleMemberships.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 auto-rows-fr">
            {visibleMemberships.map((plan) => (
              <div
                key={plan.id}
                className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#311063]/80 shadow-[0_0_35px_rgba(88,28,135,0.35)]"
              >
              <div className="relative h-52 w-full shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#000]/30 via-[#17043a]/40 to-[#4c1d95]/60"></div>
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-5 px-8 py-8 text-center">
                <h3 className="text-2xl font-semibold text-white">{plan.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-white/70 line-clamp-4">{plan.description}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-green-500">{plan.price}</span>
                  <span className="text-base font-medium text-white/50 line-through">{plan.oldPrice}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 mt-auto">
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate(useApiData ? `/membership/${plan.id}` : '/course-details');
                    }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700]"
                  >
                    Enroll Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(useApiData ? `/membership/${plan.id}` : '/course-details');
                    }}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5 text-[#FFD700] transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        {!loading && hasMoreCourses && (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate('/membership');
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-8 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              View All Courses
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningOpportunitiesSection;

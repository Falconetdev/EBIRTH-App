import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Membership = {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
};

type LearningOpportunitiesSectionProps = {
  memberships: Membership[];
};

const LearningOpportunitiesSection = ({ memberships }: LearningOpportunitiesSectionProps) => {
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
            Explore Our Learning Opportunities
          </h2>
          <p className="mt-5 text-base font-semibold leading-relaxed text-white/80 sm:text-lg md:text-xl px-10">
            Beginner කෙනෙක්ද? හොඳයි ✅ Expert levelවත් ඔබට අවශ්‍යද? No worries,
            අපේ course catalog එක definitely ඔයාට match වෙන එකක් sure වෙලාම තියෙනවා!
            Join වෙලා skills level up කරමු!!
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-full bg-white/10 p-1">
            <div className="flex items-center gap-2 rounded-full bg-black/40 p-1">
              <button className="rounded-full bg-[#8C52FF] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(140,82,255,0.4)] sm:text-sm">
                Online Membership
              </button>
              <button className="rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white sm:text-sm">
                Physical Membership
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
          Online Mentorship & Life-Time Memberships
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {memberships.map((plan) => (
            <div
              key={plan.id}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#311063]/80 shadow-[0_0_35px_rgba(88,28,135,0.35)]"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#000]/30 via-[#17043a]/40 to-[#4c1d95]/60"></div>
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-5 px-8 py-8 text-center">
                <h3 className="text-2xl font-semibold text-white">{plan.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{plan.description}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-green-500">{plan.price}</span>
                  <span className="text-base font-medium text-white/50 line-through">{plan.oldPrice}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700]">
                    Enroll Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
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
      </div>
    </section>
  );
};

export default LearningOpportunitiesSection;

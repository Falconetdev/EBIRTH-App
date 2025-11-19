type PackageCard = {
  id: string;
  title: string;
  mode: string;
  price: string;
  originalPrice: string;
  duration: string;
  schedule: string;
  location: string;
  badge?: string;
  badgeColor?: string;
  details: string[];
};

const packages: PackageCard[] = [
  {
    id: "online",
    title: "Foundations + Advanced – Online",
    mode: "Online",
    price: "රු. 38,000",
    originalPrice: "රු. 48,000",
    duration: "21 Days",
    schedule: "Monday, Wednesday, Friday, and Sunday (Fraction Sessions)",
    location: "7:30 PM on weekdays • 7:00 PM on Sundays",
    badge: "Online",
    badgeColor: "bg-[#B9FBC0] text-[#065F46]",
    details: [
      "Live cohort-based sessions",
      "Execution templates and market case studies",
      "Lifetime community access",
    ],
  },
  {
    id: "kegalle",
    title: "Foundations + Advanced – Kegalle",
    mode: "In-person",
    price: "රු. 39,000",
    originalPrice: "රු. 46,000",
    duration: "7 Days",
    schedule: "7 consecutive days (Saturdays)",
    location: "eBirth Business Academy, No 316, Main Street, Kegalle",
    details: [
      "Hands-on trading floor simulations",
      "Weekend deep dives and mentor clinics",
      "On-site analytics support",
    ],
  },
  {
    id: "nugegoda",
    title: "Foundations + Advanced – Nugegoda",
    mode: "In-person",
    price: "රු. 42,000",
    originalPrice: "රු. 47,000",
    duration: "7 Days",
    schedule: "7 consecutive days (Saturdays or Sundays)",
    location: "eBirth Business Academy, No 205C, Wijerama Junction, Nugegoda",
    details: [
      "Specialised prop-trading drills",
      "Peer learning labs",
      "Progress reviews with senior mentors",
    ],
  },
  {
    id: "tamil",
    title: "Foundations + Advanced – Tamil Medium",
    mode: "Online + Practical",
    price: "රු. 36,000",
    originalPrice: "රු. 38,000",
    duration: "7 Days",
    schedule: "இன்டர்நெட் மற்றும் நேரடி அமர்வுகள் (Practical Session)",
    location: "தமிழ் மொழியில் mentorship, தினமும் மாலை 7:00 மணிக்கு",
    badge: "Tamil Medium",
    badgeColor: "bg-[#FFF2B2] text-[#7A4E00]",
    details: [
      "தமிழ் மொழி கற்றல் முறை",
      "Live trade breakdowns",
      "Dedicated Q&A mentorship",
    ],
  },
];

const packagesTitleHighlight = "bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent";

const Packages = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1A0450] via-[#2D0A7C] to-[#6D23FF] px-4 py-20 sm:px-6 lg:px-10 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute left-[-15%] top-[-18%] h-60 w-60 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_65%)] blur-2xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(115,63,255,0.45),_transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl space-y-16">
        <header className="space-y-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Institutional <span className={packagesTitleHighlight}>Membership</span>
          </h2>
          <p className="text-base text-white/80">
            Tailored programs to build strong foundations in trading and finance with dedicated mentors.
          </p>
          <p className="text-sm font-semibold text-white/70">
            “Select your preferred mode or location below and start learning with expert mentors.”
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(12,5,45,0.35)] backdrop-blur transition hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="relative flex h-36 items-start justify-end  bg-[#d9d9d9]/70 px-6 py-5">
                {pkg.badge ? (
                  <span className={`rounded-full px-4 py-1 text-xs font-semibold ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                ) : (
                  <span className="rounded-full bg-[#B9FBC0] px-4 py-1 text-xs font-semibold text-[#065F46]">
                    {pkg.mode}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-6 ] bg-[#2C0562]/90 px-8 py-10">
                <header className="space-y-2">
                  <h3 className="text-xl font-semibold leading-tight">{pkg.title}</h3>
                  <div className="flex items-baseline gap-3 text-[#51FF00]">
                    <span className="text-3xl font-extrabold">{pkg.price}</span>
                    <span className="text-sm font-semibold text-white/40 line-through">{pkg.originalPrice}</span>
                  </div>
                </header>

                <div className="space-y-3 text-sm text-white/75">
                  <p className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#FFE178]" />
                    {pkg.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#FFE178]" />
                    {pkg.schedule}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[#FFE178]" />
                    {pkg.location}
                  </p>
                  <ul className="space-y-2 pt-2 text-white/65">
                    {pkg.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-white/40" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  <a
                    href="#enroll"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#FFE178] px-6 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_32px_rgba(255,226,120,0.35)] transition hover:scale-[1.02]"
                  >
                    Enroll Now
                  </a>
                  <a
                    href="#details"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-[#FFE178] px-6 py-3 text-sm font-semibold text-[#FFE178] transition hover:bg-[#FFE178]/10"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
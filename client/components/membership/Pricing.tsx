import { ReactNode } from "react";

type PricingTier = {
  id: string;
  name: string;
  eyebrow: string;
  highlight?: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
};

const tiers: PricingTier[] = [
  {
    id: "free",
    eyebrow: "Free Trading",
    name: "Free Trading Mentorship",
    price: "Free 100%",
    priceNote: "",
    description: "Learn the basics of trading – 100% free, forever.",
    features: [
      "Master Retail Analysis",
      "Advanced Support & Resistance",
      "Specialized Entry Techniques",
      "Effective Management Tips",
      "Free Trading Alert Service",
    ],
    cta: "Get a Free Mentorship",
    href: "#free-trading",
  },
  {
    id: "advanced",
    eyebrow: "Advanced Trading",
    name: "Advanced Trading Membership",
    highlight: "Most Popular",
    price: "One Time",
    priceNote: "Payment",
    description: "Level up with advanced strategies, VIP signals & lifetime access.",
    features: [
      "Master Management Plans",
      "Advanced Strategies & Styles",
      "VIP Trading Club Access",
      "VIP Signals & Updates",
      "Live Time Membership",
    ],
    cta: "Get a Membership",
    href: "#advanced-trading",
  },
  {
    id: "elliott",
    eyebrow: "Elliott Wave",
    name: "Elliott Wave  Membership",
    price: "One Time",
    priceNote: "Payment",
    description: "Master Elliott Wave theory with custom paths & 24/7 support.",
    features: [
      "Master Management Plans",
      "Advanced Strategies & Styles",
      "LIVE Trading Club Access",
      "VIP Signals & Updates",
      "Live Time Membership",
    ],
    cta: "Get a Membership",
    href: "#elliott-wave",
  },
];

type PricingCardProps = {
  tier: PricingTier;
  accent?: ReactNode;
};

const PricingCard = ({ tier, accent }: PricingCardProps) => {
  const highlightTerms = ["membership", "mentorship"];
  const highlightRegex = /(membership|mentorship)/gi;
  const nameParts = tier.name.split(highlightRegex).filter((part) => part !== undefined);

  return (
    <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/90 px-6 py-12  text-[#1B0B2E] shadow-[0_24px_60px_rgba(27,11,46,0.25)] transition hover:-translate-y-2 hover:shadow-[0_32px_70px_rgba(27,11,46,0.35)] sm:px-8">
      {accent}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7E57FF]">
            {tier.eyebrow}
          </p>
          <h3 className="text-2xl font-bold text-[#12072A]">
            {nameParts.map((part, index) => {
              if (!part) return null;
              const isHighlight = highlightTerms.includes(part.toLowerCase());
              return isHighlight ? (
                <span
                  key={`${tier.id}-name-${index}`}
                  className="bg-gradient-to-b from-[#000000] to-[#FEF08A] bg-clip-text text-transparent"
                >
                  {part}
                </span>
              ) : (
                <span key={`${tier.id}-name-${index}`}>{part}</span>
              );
            })}
          </h3>
          <p className="text-sm text-[#2F1B4C]/80">{tier.description}</p>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-extrabold text-[#371080]">{tier.price}</p>
          {tier.priceNote ? (
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#371080]/70">
              {tier.priceNote}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#12072A]/60">
            What's included:
          </p>
          <ul className="space-y-2 text-sm text-[#2F1B4C]/80">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFD700]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={tier.href}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFD700] px-6 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_32px_rgba(255,215,0,0.35)] transition hover:scale-[1.02] hover:bg-[#ffeb57]"
      >
        {tier.cta}
      </a>
    </article>
  );
};

const Pricing = () => {
  return (
    <section className="relative isolate overflow-hidden  px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-5%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25),_transparent_70%)] blur-2xl" />
        <div className="absolute right-[-12%] bottom-[-15%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(116,64,255,0.45),_transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl text-center text-white">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Choose the right membership for you
        </h2>
        
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            accent={
              tier.highlight ? (
                <span className="absolute left-1/2 top-3 inline-flex -translate-x-1/2 items-center rounded-full bg-[#FF7A7A] px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  {tier.highlight}
                </span>
              ) : null
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;

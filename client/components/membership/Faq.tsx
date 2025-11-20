import { useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: "free",
    question: "Is the Free Trading Mentorship really free?",
    answer:
      "Absolutely. The Free Trading Mentorship includes beginner lessons, trading strategies, live guidance, and the full community without hidden fees—plus free trading alert service access.",
  },
  {
    id: "difference",
    question: "What's the difference between Free, Advanced, and Elliott Wave Memberships?",
    answer:
      "Free unlocks foundational skills. Advanced adds VIP signals, lifetime access, and deep strategy frameworks. Elliott Wave layers in specialised wave theory mentorship with custom support pathways.",
  },
  {
    id: "experience",
    question: "Do I need prior trading experience to join?",
    answer:
      "No experience required. Each program includes structured onboarding, live sessions, and mentors who guide you from the basics to advanced execution.",
  },
  {
    id: "access",
    question: "How do I access the courses and mentorship sessions?",
    answer:
      "All content lives inside our member portal with scheduled live streams, recorded replays, and community forums accessible from any device.",
  },
  {
    id: "payment",
    question: "Is the membership a one-time payment or subscription?",
    answer:
      "Advanced and Elliott Wave memberships are one-time payments that unlock lifetime access. The Free tier remains completely free forever.",
  },
  {
    id: "certificate",
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes. Upon completing the structured milestones and assessments, you will receive a digitally verifiable certificate from eBirth Business Academy.",
  },
];

const Faq = () => {
  const [activeId, setActiveId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="relative isolate overflow-hidden  px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.2),_transparent_60%)] blur-2xl" />
        <div className="absolute right-[-12%] bottom-[-18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(116,64,255,0.4),_transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-12 text-white">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Frequently Asked <span className="bg-gradient-to-r from-[#FFE178] via-[#E8C843] to-[#C29E1B] bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="mt-4 text-base text-white/75">
            Everything you need to know about how our memberships work before you get started.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = faq.id === activeId;

            return (
              <button
                key={faq.id}
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="group w-full overflow-hidden rounded-[28px] border border-white/15 bg-black/20 text-left shadow-[0_24px_60px_rgba(7,2,26,0.35)] backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-[#FFD700]/80"
              >
                <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
                  <span className="text-base font-semibold sm:text-lg">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FFD700] text-[#1B0B2E] transition group-hover:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  } px-6 pb-0 sm:px-8`}
                >
                  <div className="overflow-hidden text-sm leading-relaxed text-white/75">
                    <div className="pb-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
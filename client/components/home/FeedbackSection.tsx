import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  sinhala: string;
  english: string;
  name: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: "student-1",
    sinhala:
      "eBirth Academy එකේ practical approach එක සහ real-world examples හරහා මගේම business එකක් නිවැරදිව start කරන්න confident feel වුණා.",
    english:
      "The practical guidance and relatable case studies helped me launch my own business successfully.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-2",
    sinhala:
      "Trading එකක් දැනට start කරනවානම් හෝ dream එකක් තියෙනවානම් eBirth Academy එකෙන් ලැබෙන mentorship එකෙන් real confidence එකක් හදාගන්න පුළුවන්.",
    english:
      "Practical sessions and knowledge-packed tools gave me the courage to take my business idea live.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-3",
    sinhala:
      "eBirth ටෙ mentorship එකෙන් daily guide එකක් ලැබුවා. Advanced strategies explain කරලා trading journey එකත් power up වෙලා.",
    english:
      "Big thanks to the eBirth team for showing the roadmap to scale my journey with confidence.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
];

const FeedbackSection = () => {
  return (
    <section
      id="feedback"
      className="relative w-full overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f1e7ff] via-[#d8c6ff] to-[#bb9bff] opacity-70"
    >
      <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_rgba(217,193,255,0))]"></div>
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-black md:text-5xl">Student's Feedback</h2>
          <p className="text-base font-medium text-black/70 md:text-lg">
            eBirth Academy එකේ විශිෂ්ට journey එක start කරන අපේ students ලගේ learning experience එක ගැන කියන feedbacks ?
          </p>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-black/50">
              Based on 1000+ Feedbacks
            </p>
        </div>

        <div className="mt-14 grid w-full gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="overflow-hidden rounded-[32px] text-white"
            >
              <div className="flex h-full flex-col">
                <div className="relative rounded-t-[32px] bg-[#5c1fca] px-8 pt-10 pb-24 text-left text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Quote className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-lg leading-relaxed font-medium text-white">
                    {testimonial.sinhala}
                  </p>
                </div>

                <div className="relative flex   rounded-b-[32px] bg-black px-8 pb-10 pt-16 ">
                  <div className="border-4 border-white absolute left-1/4 top-0 h-24 w-24 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-full shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover "
                      onError={(e) => {
                        if (e.currentTarget.src.includes("placeholder.svg")) return;
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <span
              key={`${testimonial.id}-dot`}
              className={`h-2.5 rounded-full transition-all ${
                index === 1 ? "w-9 bg-[#FFD700]" : "w-2.5 bg-black/20"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;

import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  sinhala: string;
  english: string;
  name: string;
  role: string;
  image: string;
};

type CourseFeedbackSectionProps = {
  testimonials: Testimonial[];
};

const CourseFeedbackSection = ({ testimonials }: CourseFeedbackSectionProps) => {
  return (
    <section
      id="feedback"
      className="relative w-full min-w-screen mt-5 rounded-3xl overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f1e7ff] via-[#d8c6ff] to-[#bb9bff]"
    >
      <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_rgba(217,193,255,0))]"></div>
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black">Voices of Victory</h2>
          <p className="text-sm sm:text-base md:text-lg font-medium text-black/70">
            අප ගැන අප කියනවාට වඩා, Inner Racer සමඟ එක්ව ජීවිතය ජයගත් 1000+ සිසුන්ගේ සාර්ථකත්වයේ කතා වලට සවන් දෙන්න
          </p>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] sm:tracking-[0.45em] text-black/50">
            Based on 1000+ Feedbacks
          </p>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-14 grid w-full gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="overflow-hidden rounded-[32px] text-white"
            >
              <div className="flex h-full flex-col">
                <div className="relative rounded-t-[32px] bg-[#5c1fca] px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-20 sm:pb-24 text-left text-white">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15">
                    <Quote className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed font-medium text-white line-clamp-6">
                    {testimonial.sinhala}
                  </p>
                </div>

                <div className="relative flex rounded-b-[32px] bg-black px-4 sm:px-6 md:px-8 pb-8 sm:pb-10 pt-14 sm:pt-16">
                  <div className="border-4 border-white absolute left-1/4 top-0 h-20 w-20 sm:h-24 sm:w-24 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-full shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
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
                  <div className="mt-4 sm:mt-5">
                    <p className="text-base sm:text-lg font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-2 sm:gap-3">
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

export default CourseFeedbackSection;

import { Quote, Star } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import reviews from "@/lib/review.json";

type Testimonial = {
  id: string;
  name: string;
  image: string;
  review: string;
};

const toDirectImageUrl = (url: string) => {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) {
    const fileId = match[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return url;
};

const testimonials: Testimonial[] = reviews.map((review, index) => ({
  id: `review-${index}`,
  name: review.reviewer_name,
  review: review.review,
  image: toDirectImageUrl(review.image_url),
}));

const FeedbackSection = () => {
  return (
    <section
      id="feedback"
      className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-[#FFD700]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              Voices of Victory
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-medium text-white/80 max-w-3xl mx-auto leading-relaxed">
            අප ගැන අප කියනවාට වඩා, Inner Racer සමඟ එක්ව ජීවිතය ජයගත් 1000+ සිසුන්ගේ සාර්ථකත්වයේ කතා වලට සවන් දෙන්න
          </p>

          {/* Facebook Reviews Button */}
          <div className="flex justify-center pt-4">
            <a
              href="https://web.facebook.com/InnerRacers/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm sm:text-base font-bold">View All Reviews on Facebook</span>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-white/90">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFD700] text-[#FFD700]" />
                  <span>1000+ Success Stories</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <FeedbackCarousel />
      </div>
    </section>
  );
};

export default FeedbackSection;

// ======================
// CARD COMPONENT
// ======================

const FeedbackCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:shadow-[#FFD700]/20 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700]/30">
      <div className="flex flex-col flex-1">
        {/* Quote Section with Gradient */}
        <div className="relative flex flex-1 flex-col rounded-t-3xl bg-gradient-to-br from-purple-900/80 to-purple-800/60 backdrop-blur-sm px-6 sm:px-8 pt-8 sm:pt-10 pb-10 sm:pb-12 text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/30 group-hover:bg-[#FFD700]/30 transition-colors">
            <Quote className="h-6 w-6 text-[#FFD700]" />
          </div>

          <p className="mt-6 text-sm sm:text-base leading-relaxed font-medium text-white/90 line-clamp-6">
            "{testimonial.review}"
          </p>

          {/* Decorative gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Profile Section with Glass Effect */}
        <div className="relative flex items-center gap-4 rounded-b-3xl bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-sm px-6 sm:px-8 py-6">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-0.5">
              <div className="h-full w-full rounded-full overflow-hidden bg-slate-900">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    if (e.currentTarget.src.includes("placeholder.svg")) return;
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-xl group-hover:bg-[#FFD700]/30 transition-all"></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-base sm:text-lg font-bold text-white truncate">
              {testimonial.name}
            </p>
            <p className="text-xs sm:text-sm text-[#FFD700]/80 font-medium">
              Success Story
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================
// CAROUSEL
// ======================

const FeedbackCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  // Autoplay
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative mt-14">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="items-stretch">
          {testimonials.map((t) => (
            <CarouselItem
              key={t.id}
              className="md:basis-1/2 xl:basis-1/3 flex"
            >
              <FeedbackCard testimonial={t} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300" />
        <CarouselNext className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300" />
      </Carousel>

      <CarouselDots current={current} api={api} />
    </div>
  );
};

// ======================
// DOTS (you already have it)
// ======================

const CarouselDots = ({ current, api }) => {
  if (!api) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {api.scrollSnapList().map((_, idx) => (
        <button
          key={idx}
          onClick={() => api.scrollTo(idx)}
          className={`h-3 w-3 rounded-full transition-all duration-300 ${
            current === idx
              ? "bg-[#FFD700] w-8 shadow-lg shadow-[#FFD700]/50"
              : "bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};

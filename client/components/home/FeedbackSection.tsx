import { Quote } from "lucide-react";
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
      className="relative w-full overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f1e7ff] via-[#d8c6ff] to-[#bb9bff] opacity-70"
    >
      <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_rgba(217,193,255,0))]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-black md:text-5xl">
            Voices of Victory
          </h2>

          <p className="text-base font-medium text-black/70 md:text-lg">
            අප ගැන අප කියනවාට වඩා, Inner Racer සමඟ එක්ව ජීවිතය ජයගත් 1000+ සිසුන්ගේ සාර්ථකත්වයේ කතා වලට සවන් දෙන්න
          </p>
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
    <div className="flex h-full flex-col overflow-hidden rounded-[32px] text-white shadow-[0_24px_60px_rgba(53,16,102,0.28)]">
      <div className="flex flex-col flex-1">
        <div className="relative flex flex-1 flex-col rounded-t-[32px] bg-[#5c1fca] px-8 pt-10 pb-12 text-left text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Quote className="h-6 w-6" />
          </div>

          <p className="mt-6 text-base leading-relaxed font-medium text-white line-clamp-6">
            {testimonial.review}
          </p>
        </div>

        <div className="relative flex items-end rounded-b-[32px] bg-black px-8 pb-10 pt-16">
          <div className="border-4 border-white absolute left-1/4 top-0 h-20 w-20 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-full shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
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

          <div className="mt-4">
            <p className="text-lg font-semibold text-white">
              {testimonial.name}
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

        <CarouselPrevious className="bg-[#5c1fca] text-white border-white/30 hover:bg-[#4a12a5]" />
        <CarouselNext className="bg-[#5c1fca] text-white border-white/30 hover:bg-[#4a12a5]" />
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
          className={`h-3 w-3 rounded-full ${
            current === idx ? "bg-[#4a12a5]" : "bg-black/30"
          }`}
        />
      ))}
    </div>
  );
};

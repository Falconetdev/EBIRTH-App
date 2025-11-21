import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  {
    id: "student-4",
    sinhala: "Community එකේ support එක නිසා trading discipline එක strongly build කරගන්නත් consistency develop කරන්නත් හැකි වුණා.",
    english: "Community support built discipline and consistency in my daily routine.",
    name: "Nethmi Perera",
    role: "Equity Trader",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-5",
    sinhala: "Live sessions වල real-time breakdown වලින් complex market moves புரிந்துகொள்ள easy වුණා.",
    english: "Real-time breakdowns made complex market moves easy to grasp.",
    name: "Ishara Wickramasinghe",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-6",
    sinhala: "Mentor feedback එකට සරිලන practical homework එකක් එක්ක progress track කරන්න පුළුවන් වුණා.",
    english: "Structured mentor feedback and homework let me track progress clearly.",
    name: "Rashan Silva",
    role: "Crypto Analyst",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-7",
    sinhala: "Roadmap එක නිසා overwhelm feeling එක completely disappear උනා, step-by-step progress motivating.",
    english: "The roadmap removed overwhelm and made progress motivating.",
    name: "Dilusha Perera",
    role: "Roadmap Learner",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-8",
    sinhala: "Fast Q&A responses මගින් blockers ඉක්මනින් clear කර momentum keep කරන්න පුළුවන් වුණා.",
    english: "Fast Q&A responses cleared blockers and kept momentum.",
    name: "Tharindu Wijesinghe",
    role: "Community Member",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-9",
    sinhala: "Weekly recaps gaps identify කර immediate action plan build කරන්න massive help වුණා.",
    english: "Weekly recaps identified gaps and shaped an action plan.",
    name: "Ravindu Jayasuriya",
    role: "Recap Participant",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-10",
    sinhala: "Live trading room transparency එක trust + confidence දෙකම build කළා.",
    english: "Live room transparency built trust and confidence.",
    name: "Isuri Madushika",
    role: "Live Room Member",
    image: "https://images.unsplash.com/photo-1526613011291-1e1711f56b5d?auto=format&fit=crop&w=400&q=80",
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

        <FeedbackCarousel />

        {/* Dots handled inside FeedbackCarousel; duplicate removed */}
      </div>
    </section>
  );
};

export default FeedbackSection;

// ----- Carousel Subcomponents -----

const FeedbackCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[32px] text-white shadow-[0_24px_60px_rgba(53,16,102,0.28)]">
      <div className="flex flex-col flex-1">
        <div className="relative flex flex-1 flex-col rounded-t-[32px] bg-[#5c1fca] px-8 pt-10 pb-12 text-left text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Quote className="h-6 w-6" />
          </div>
          <p className="mt-6 text-base leading-relaxed font-medium text-white line-clamp-4">
            {testimonial.sinhala}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/80 line-clamp-3">
            {testimonial.english}
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
            <p className="text-lg font-semibold text-white">{testimonial.name}</p>
            <p className="text-sm text-white/60">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Simple autoplay (optional) every 5s
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (!api) return;
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative mt-14">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="items-stretch">
          {testimonials.map((t) => (
            <CarouselItem key={t.id} className="md:basis-1/2 xl:basis-1/3 flex">
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

const CarouselDots = ({ current, api }: { current?: number; api?: any }) => {
  const [selected, setSelected] = useState(current || 0);
  useEffect(() => {
    if (typeof current === "number") setSelected(current);
  }, [current]);
  if (!testimonials.length) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      {testimonials.map((_, index) => (
        <button
          key={`dot-${index}`}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={`h-2.5 rounded-full transition-all ${
            selected === index ? "w-9 bg-[#FFD700]" : "w-2.5 bg-black/30 hover:bg-black/50"
          }`}
        />
      ))}
    </div>
  );
};

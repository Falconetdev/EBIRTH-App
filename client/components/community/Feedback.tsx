import { ChevronDown, Quote } from "lucide-react";

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
    name: "Sachini Abeywardena",
    role: "Student Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-3",
    sinhala:
      "eBirth ටෙ mentorship එකෙන් daily guide එකක් ලැබුවා. Advanced strategies explain කරලා trading journey එකත් power up වෙලා.",
    english:
      "Big thanks to the eBirth team for showing the roadmap to scale my journey with confidence.",
    name: "Kasun Jayasinghe",
    role: "FX Trader",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-4",
    sinhala:
      "Community එකේ support එක නිසා මට trading discipline එක strongly build කරගන්නත් consistency එක develop කරන්නත් හැකි වුණා.",
    english:
      "The community support helped me stay disciplined and build consistency in my daily trading routine.",
    name: "Nethmi Perera",
    role: "Equity Trader",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-5",
    sinhala:
      "Live sessions වල real-time breakdown වලින් complex market moves புரிந்துகொள்ள easy වුණා.",
    english:
      "Real-time breakdowns during live sessions made complex market moves easy to understand.",
    name: "Ishara Wickramasinghe",
    role: "Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-6",
    sinhala:
      "Mentor feedback එකට සරිලන practical homework එකක් එක්කම progress track කරන්න පුළුවන් වුණා.",
    english:
      "Structured mentor feedback with practical homework helped me track progress without stress.",
    name: "Rashan Silva",
    role: "Crypto Analyst",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
];

type FeedbackCardProps = {
  testimonial: Testimonial;
};

const FeedbackCard = ({ testimonial }: FeedbackCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(53,16,102,0.28)]">
      <div className="relative flex min-h-[280px] flex-1 flex-col bg-gradient-to-b from-[#6E21FF] via-[#5820DA] to-[#4013A5] px-8 pt-12 pb-24 text-left text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Quote className="h-7 w-7" />
        </div>
        <p className="mt-6 text-base leading-relaxed text-white/90">
          {testimonial.sinhala}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          {testimonial.english}
        </p>
      </div>

      <div className="relative flex items-center gap-4 bg-[#080212] px-8 pb-10 pt-16 text-white">
        <div className="absolute left-8 top-0 -translate-y-1/2">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-[0_16px_30px_rgba(0,0,0,0.4)]"
            onError={(e) => {
              if (e.currentTarget.src.includes("placeholder.svg")) return;
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">{testimonial.name}</p>
          <p className="text-sm text-white/60">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
};

const FeedbackSection = () => {
  return (
    <section
      id="feedback"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#F5ECFF] via-[#E1CEFF] to-[#CBA5FF] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.65),_rgba(217,193,255,0))]"></div>
      <div className="relative mx-auto max-w-6xl">
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-extrabold text-[#10002B] md:text-5xl">Student's Feedback</h2>
          <p className="mx-auto max-w-2xl text-base font-medium text-[#2D0C5F]/80 md:text-lg">
            Discover what our students have to say about their learning experience with us.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#533393]/70">
            Based on 1000+ Feedbacks
          </p>
        </div>

        <div className="mt-16 grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <FeedbackCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <button className="group inline-flex items-center gap-2 rounded-full bg-[#FFE500] px-8 py-3 text-sm font-semibold text-[#1B0B2E] shadow-[0_18px_30px_rgba(158,124,255,0.35)] transition hover:bg-[#ffdd38]">
            See All Feedbacks
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;

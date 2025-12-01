import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import reviews from "@/lib/review.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Testimonial = {
  id: string;
  name: string;
  review: string;
  image: string;
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
  id: `testimonial-${index}`,
  name: review.reviewer_name,
  review: review.review,
  image: toDirectImageUrl(review.image_url),
}));

type FeedbackCardProps = {
  testimonial: Testimonial;
  onMore: (testimonial: Testimonial) => void;
};

const FeedbackCard = ({ testimonial, onMore }: FeedbackCardProps) => {
  const isLongReview = testimonial.review.length > 220;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(53,16,102,0.28)]">
      <div className="relative flex min-h-[320px] flex-1 flex-col bg-gradient-to-b from-[#6E21FF] via-[#5820DA] to-[#4013A5] px-8 pt-12 pb-24 text-left text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Quote className="h-7 w-7" />
        </div>
        <p
          className="mt-6 text-base leading-relaxed text-white/90 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
        >
          {testimonial.review}
        </p>

        {isLongReview && (
          <button
            type="button"
            onClick={() => onMore(testimonial)}
            className="mt-4 w-fit text-sm font-semibold text-[#FFE500] underline-offset-4 transition hover:underline"
          >
            More 
          </button>
        )}
      </div>

      <div className="relative flex items-center gap-4 bg-[#080212] px-8 pb-10 pt-16 text-white">
        <div className="absolute left-8 top-0 -translate-y-1/2">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            loading="lazy"
            className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-[0_16px_30px_rgba(0,0,0,0.4)]"
            onError={(e) => {
              if (!e.currentTarget.src.includes("placeholder.svg")) {
                e.currentTarget.src = "/placeholder.svg";
              }
            }}
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">{testimonial.name}</p>
          <p className="text-sm text-white/60">Inner Racers Student</p>
        </div>
      </div>
    </article>
  );
};

const FeedbackSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 6);
  const canToggle = testimonials.length > 6;

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
          {displayedTestimonials.map((testimonial) => (
            <FeedbackCard
              key={testimonial.id}
              testimonial={testimonial}
              onMore={setSelectedReview}
            />
          ))}
        </div>

        {canToggle && (
          <div className="mt-12 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="group inline-flex items-center gap-2 rounded-full bg-[#FFE500] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(158,124,255,0.35)] transition hover:bg-[#ffdd38]"
            >
              {showAll ? "Show Less" : "See All Feedbacks"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showAll
                    ? "rotate-180"
                    : "group-hover:translate-y-0.5"
                }`}
              />
            </button>
          </div>
        )}
      </div>
      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedReview && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  {selectedReview.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-white">
                  Full Student Review
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex gap-4">
                <img
                  src={selectedReview.image}
                  alt={selectedReview.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <p className="text-base leading-relaxed text-white whitespace-pre-line">
                  {selectedReview.review}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeedbackSection;

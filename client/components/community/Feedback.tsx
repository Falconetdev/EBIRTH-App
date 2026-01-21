import { useState, useRef, useEffect } from "react";
import { ChevronDown, Quote, Star } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import reviews from "@/lib/review.json";
import { motion, AnimatePresence } from "framer-motion";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:shadow-[#FFD700]/20 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700]/30">
      <div className="relative flex min-h-[320px] flex-1 flex-col bg-gradient-to-br from-purple-900/80 to-purple-800/60 backdrop-blur-sm px-6 sm:px-8 pt-8 sm:pt-12 pb-10 sm:pb-24 text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/30 group-hover:bg-[#FFD700]/30 transition-colors">
          <Quote className="h-6 w-6 text-[#FFD700]" />
        </div>
        <p
          className="mt-6 text-sm sm:text-base leading-relaxed text-white/90 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
        >
          "{testimonial.review}"
        </p>

        {isLongReview && (
          <button
            type="button"
            onClick={() => onMore(testimonial)}
            className="mt-4 w-fit text-sm font-semibold text-[#FFD700] hover:text-[#FFA500] underline-offset-4 transition hover:underline"
          >
            Read More →
          </button>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="relative flex items-center gap-4 bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-sm px-6 sm:px-8 py-6 text-white">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-0.5">
            <div className="h-full w-full rounded-full overflow-hidden bg-slate-900">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  if (!e.currentTarget.src.includes("placeholder.svg")) {
                    e.currentTarget.src = "/placeholder.svg";
                  }
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-xl group-hover:bg-[#FFD700]/30 transition-all"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg font-bold text-white truncate">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-[#FFD700]/80 font-medium">Success Story</p>
        </div>
      </div>
    </article>
  );
};

const FeedbackSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 6);
  const canToggle = testimonials.length > 6;

  const handleToggle = () => {
    if (showAll) {
      // Collapsing - scroll to section top smoothly
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      id="feedback"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] py-24 px-4 sm:px-6 lg:px-8"
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

        <motion.div
          layout
          className="mt-16 grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FeedbackCard
                  testimonial={testimonial}
                  onMore={setSelectedReview}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {canToggle && (
          <div className="mt-12 flex items-center justify-center">
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={showAll}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] px-8 py-4 text-sm font-bold text-black shadow-lg hover:shadow-[#FFD700]/50 transition-all duration-300 hover:scale-105"
            >
              {showAll ? "Show Less" : "See All Feedbacks"}
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
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

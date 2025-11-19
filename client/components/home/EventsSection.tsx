import { Card } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type Event = {
  id: string;
  title: string;
  description: string;
  schedule: string;
  time: string;
  location: string;
  image: string;
};

type EventsSectionProps = {
  events: Event[];
};

const EventsSection = ({ events }: EventsSectionProps) => {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#220943] via-[#341067] to-[#1b0635]">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.14),_rgba(34,9,67,0))]"></div>
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(140,82,255,0.28),_rgba(27,6,53,0))] blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold uppercase text-[#FFD700] md:text-5xl">
            Upcoming Events & Competitions
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            අපේ trading community එක සමඟ real-time lessons, competitions සහ live trading experience එකක් ලැබෙයි.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-[#2b0f4e]/70 shadow-[0_0_45px_rgba(110,63,190,0.35)]"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    if (e.currentTarget.src.includes("placeholder.svg")) return;
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2b0f4e]/30 to-[#2b0f4e]"></div>
              </div>

              <div className="space-y-6 px-8 py-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                  Featured Community Event
                </p>
                <h3 className="text-xl font-bold leading-8 text-[#FFD700]">
                  {event.title}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-sm font-medium text-white">
                    <CalendarDays className="h-5 w-5 text-[#FFD700]" />
                    <span>{event.schedule}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm font-medium text-white">
                    <Clock3 className="h-5 w-5 text-[#FFD700]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                    <MapPin className="h-4 w-4 text-[#FFD700]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            variant="outline"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFD700] bg-transparent px-10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black"
          >
            See All Events
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

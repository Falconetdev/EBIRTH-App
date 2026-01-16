import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, type DocumentData } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import type { Event } from "@/types/event";

// Default hardcoded events (fallback when no real events exist)
const DEFAULT_EVENTS: Event[] = [
  {
    id: "event-1",
    title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
    slug: "inner-racers-youtube-live-1",
    description:
      "ඔබත් \"INNER RACERS\" YouTube එකට සම්බන්ධ වෙලා අපේ LIVE TRADING sessions වලින් real-time දැනුම ලබාගන්න.",
    schedule: "Every Saturday",
    time: "8.00 PM",
    location: "YouTube Live",
    coverUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    coverStoragePath: null,
    createdAt: null,
    updatedAt: null,
    featured: true,
  },
  {
    id: "event-2",
    title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
    slug: "inner-racers-youtube-live-2",
    description:
      "අපගේ LIVE TRADING sessions join වෙලා strategy breakdowns, Q&A සහ mentorship එකක් එක්වරටම ලබාගන්න.",
    schedule: "Every Saturday",
    time: "8.00 PM",
    location: "Hybrid Studio",
    coverUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    coverStoragePath: null,
    createdAt: null,
    updatedAt: null,
    featured: true,
  },
  {
    id: "event-3",
    title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
    slug: "inner-racers-youtube-live-3",
    description:
      "Trading community එකක් වෙලා එකට ඉගෙන ගන්න අපේ mentorship crew එකත් සමඟ hands-on market reviews එකට connect වෙන්න.",
    schedule: "Every Saturday",
    time: "8.00 PM",
    location: "eBirth HQ",
    coverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    coverStoragePath: null,
    createdAt: null,
    updatedAt: null,
    featured: true,
  },
];

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        // Query for featured events only (no orderBy to avoid index requirement)
        const eventsQuery = query(
          collection(db, "events"),
          where("featured", "==", true)
        );
        const snapshot = await getDocs(eventsQuery);
        const mapped = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            title: data.title ?? "Untitled",
            slug: data.slug ?? doc.id,
            description: data.description ?? "",
            schedule: data.schedule ?? "",
            time: data.time ?? "",
            location: data.location ?? "",
            coverUrl: data.coverUrl ?? null,
            coverStoragePath: data.coverStoragePath ?? null,
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
            featured: data.featured ?? false,
          } satisfies Event;
        });
        
        // Sort by createdAt client-side and take top 3
        const sorted = mapped.sort((a, b) => {
          const aTime = a.createdAt?.toMillis?.() ?? 0;
          const bTime = b.createdAt?.toMillis?.() ?? 0;
          return bTime - aTime; // Descending order (newest first)
        });
        
        // If no real events, use default hardcoded events
        if (sorted.length === 0) {
          setEvents(DEFAULT_EVENTS);
        } else {
          setEvents(sorted.slice(0, 3)); // Show max 3 featured events
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // On error, fall back to default events
        setEvents(DEFAULT_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvents();
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-inherit overflow-hidden">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-white/70">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // Always show section - either with real events or defaults
  return (
    <section className="relative  py-20 px-4 sm:px-6 lg:px-8 bg-inherit overflow-hidden">
      {/* <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.14),_rgba(34,9,67,0))]"></div> */}
      {/* <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(140,82,255,0.28),_rgba(27,6,53,0))] blur-3xl"></div> */}

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
                {event.coverUrl ? (
                  <img
                    src={event.coverUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6E21FF] to-[#4013A5]">
                    <CalendarDays className="h-16 w-16 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2b0f4e]/30 to-[#2b0f4e]"></div>
              </div>

              <div className="space-y-6 px-8 py-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                  Featured Community Event
                </p>
                <h3 className="text-xl font-bold leading-8 text-[#FFD700]">
                  {event.title}
                </h3>
                <p className="text-sm text-white/75 leading-relaxed line-clamp-3">
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
          <Link to="/events">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFD700] bg-transparent px-10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black"
            >
              See All Events
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

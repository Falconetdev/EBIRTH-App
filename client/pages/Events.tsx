import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";

import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/lib/firebase";
import type { Event } from "@/types/event";

const formatDate = (timestamp?: { toDate: () => Date } | null) => {
  if (!timestamp) return "Just now";
  try {
    return timestamp.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Just now";
  }
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(query(collection(db, "events"), orderBy("createdAt", "desc")));
        if (!isMounted) return;
        const mapped = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as DocumentData;
          return {
            id: docSnapshot.id,
            title: data.title ?? "Untitled",
            slug: data.slug ?? docSnapshot.id,
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
        setEvents(mapped);
      } catch (fetchError) {
        if (!isMounted) return;
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load events");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout className="bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,229,0,0.2),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4">
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE500]/10 px-4 py-1.5 border border-[#FFE500]/20">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#FFE500]">eBirth Events</span>
            </div>
            <h1 className="text-4xl font-semibold sm:text-5xl">Upcoming Events & Competitions</h1>
            <p className="text-base text-white/80">Join us for live trading sessions, workshops, and exclusive events</p>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <p className="text-white/70">Loading events…</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-red-500/10 text-red-100">
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 text-white/70">
              <p>No events scheduled yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-white/40 hover:shadow-xl hover:shadow-[#FFE500]/10"
                >
                  {/* Event Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {event.coverUrl ? (
                      <img
                        src={event.coverUrl}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6E21FF] to-[#4013A5]">
                        <svg className="h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {event.featured && (
                      <div className="absolute left-4 top-4 rounded-full bg-[#FFE500] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#1B0B2E]">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-white/70 line-clamp-3">{event.description}</p>
                    </div>

                    {/* Event Info */}
                    <div className="space-y-2 text-sm">
                      {event.schedule && (
                        <div className="flex items-center gap-2 text-white/60">
                          <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{event.schedule}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-2 text-white/60">
                          <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-white/60">
                          <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto text-xs text-white/50">
                      Added {formatDate(event.createdAt as { toDate: () => Date } | null)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div className="flex justify-center pt-8">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FFE500] hover:bg-[#ffd700] px-8 py-3.5 text-sm font-semibold text-[#1B0B2E] transition-all shadow-lg shadow-[#FFE500]/20 hover:shadow-xl hover:shadow-[#FFE500]/30"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;

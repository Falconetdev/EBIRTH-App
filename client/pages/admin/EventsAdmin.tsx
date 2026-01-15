import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  type DocumentData,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import type { Event } from "@/types/event";

const EventsAdmin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const eventsQuery = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
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
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const formatDate = (timestamp?: { toDate: () => Date } | null) => {
    if (!timestamp) return "—";
    try {
      return timestamp.toDate().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const handleDelete = async (event: Event) => {
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) {
      return;
    }
    setDeletingSlug(event.slug);
    try {
      await deleteDoc(doc(db, "events", event.slug));
      if (event.coverStoragePath) {
        await deleteObject(ref(storage, event.coverStoragePath));
      }
      toast({ title: "Event deleted" });
    } catch (err) {
      toast({ title: "Failed to delete", description: err instanceof Error ? err.message : undefined });
    } finally {
      setDeletingSlug(null);
    }
  };

  const emptyState = !loading && events.length === 0;

  const tableBody = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="px-4 py-10 text-center text-sm text-white/70">
            Loading events…
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={5} className="px-4 py-10 text-center text-sm text-red-200">
            {error}
          </td>
        </tr>
      );
    }

    if (emptyState) {
      return (
        <tr>
          <td colSpan={5} className="px-4 py-16 text-center text-sm text-white/70">
            No events yet. Create your first event!
          </td>
        </tr>
      );
    }

    return events.map((event) => (
      <tr key={event.id} className="border-t border-white/10 font-light text-white/90">
        <td className="px-4 py-4 text-sm">{event.title}</td>
        <td className="px-4 py-4 text-sm text-white/70">{event.schedule}</td>
        <td className="px-4 py-4 text-sm text-white/70">{event.location}</td>
        <td className="px-4 py-4 text-center">
          {event.featured ? (
            <span className="inline-flex rounded-full bg-[#FFE500]/20 px-2 py-1 text-xs font-semibold text-[#FFE500]">
              Featured
            </span>
          ) : (
            <span className="text-white/40">—</span>
          )}
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(`/admin/events/${event.slug}/edit`)}
              className="inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event)}
              disabled={deletingSlug === event.slug}
              className="inline-flex items-center rounded-xl border border-red-400/40 px-3 py-1.5 text-sm text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              {deletingSlug === event.slug ? "Deleting…" : "Delete"}
            </button>
          </div>
        </td>
      </tr>
    ));
  }, [deletingSlug, emptyState, error, loading, navigate, events]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Inner Racers Studio</p>
            <h1 className="text-3xl font-semibold text-white">Events Admin</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-white/20">
              <Link
                to="/admin/blog"
                className="px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
              >
                Blog
              </Link>
              <span className="bg-white/20 px-4 py-2 text-sm font-semibold text-white">Events</span>
              <Link
                to="/admin/resources"
                className="px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
              >
                Resources
              </Link>
            </div>
            <Link
              to="/admin/events/new"
              className="rounded-xl bg-[#FFE500] px-5 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700]"
            >
              New Event
            </Link>
            <a
              href="/events"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
            >
              View public events
            </a>
            <button
              onClick={async () => {
                await logout();
                navigate("/admin/login", { replace: true });
              }}
              className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Schedule</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 text-center font-semibold">Featured</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventsAdmin;

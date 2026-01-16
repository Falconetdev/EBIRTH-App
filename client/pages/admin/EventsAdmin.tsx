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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
          <p className="text-white/60">Manage your events and schedules</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/events/new"
            className="rounded-xl bg-[#FFE500] px-5 py-2.5 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] hover:shadow-lg hover:shadow-[#FFE500]/20"
          >
            + New Event
          </Link>
          <a
            href="/events"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
          >
            View Public Events
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
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
  );
};

export default EventsAdmin;

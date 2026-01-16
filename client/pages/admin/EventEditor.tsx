import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ChevronRight } from "lucide-react";

import EventForm, { type EventFormValues } from "@/components/admin/EventForm";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import type { Event } from "@/types/event";

const EventEditor = () => {
  const params = useParams<{ slug?: string }>();
  const slugParam = params.slug;
  const isNew = !slugParam;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [initialEvent, setInitialEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isNew || !slugParam) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDoc(doc(db, "events", slugParam));
        if (!snapshot.exists()) {
          setError("Event not found");
          return;
        }
        const data = snapshot.data();
        setInitialEvent({
          id: snapshot.id,
          title: data?.title ?? "",
          slug: data?.slug ?? snapshot.id,
          description: data?.description ?? "",
          schedule: data?.schedule ?? "",
          time: data?.time ?? "",
          location: data?.location ?? "",
          coverUrl: data?.coverUrl ?? null,
          coverStoragePath: data?.coverStoragePath ?? null,
          createdAt: data?.createdAt ?? null,
          updatedAt: data?.updatedAt ?? null,
          featured: data?.featured ?? false,
        });
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [isNew, slugParam]);

  const heroTitle = useMemo(() => (isNew ? "Create Event" : `Edit ${initialEvent?.title ?? "event"}`), [initialEvent?.title, isNew]);

  const handleSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const slug = values.slug.trim();
      const docRef = doc(db, "events", slug);
      let coverUrl = initialEvent?.coverUrl ?? null;
      let coverStoragePath = initialEvent?.coverStoragePath ?? null;

      if (values.coverFile) {
        const storagePath = `event-covers/${slug}-${Date.now()}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, values.coverFile);
        coverUrl = await getDownloadURL(storageRef);
        if (initialEvent?.coverStoragePath && initialEvent.coverStoragePath !== storagePath) {
          try {
            await deleteObject(ref(storage, initialEvent.coverStoragePath));
          } catch {
            /* ignore cleanup failures */
          }
        }
        coverStoragePath = storagePath;
      }

      const payload: Record<string, unknown> = {
        title: values.title.trim(),
        slug,
        description: values.description.trim(),
        schedule: values.schedule.trim(),
        time: values.time.trim(),
        location: values.location.trim(),
        featured: values.featured,
        coverUrl,
        coverStoragePath,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(docRef, payload, { merge: !isNew });
      toast({ title: isNew ? "Event published" : "Event updated" });
      navigate("/admin/events");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-white/70">Loading editor…</p>
      </div>
    );
  }

  if (!isNew && error && !initialEvent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => navigate("/admin/events")}
            className="mt-6 rounded-xl bg-[#FFE500] px-5 py-2.5 text-sm font-semibold text-[#1B0B2E] hover:bg-[#ffd700] transition-colors"
          >
            Back to Events List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/admin/dashboard" className="text-white/60 hover:text-white transition-colors">
          Dashboard
        </Link>
        <ChevronRight size={16} className="text-white/40" />
        <Link to="/admin/events" className="text-white/60 hover:text-white transition-colors">
          Events
        </Link>
        <ChevronRight size={16} className="text-white/40" />
        <span className="text-white font-medium">{isNew ? "New Event" : "Edit Event"}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{heroTitle}</h1>
          <p className="text-white/60">
            {isNew ? "Create a new event" : "Edit your event"}
          </p>
        </div>
      </div>

      {/* Editor Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        <EventForm
          initialValues={initialEvent ?? undefined}
          onSubmit={handleSubmit}
          submitLabel={isNew ? "Publish Event" : "Save Changes"}
          disableSlug={!isNew}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EventEditor;

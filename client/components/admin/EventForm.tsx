import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import type { Event } from "@/types/event";

export type EventFormValues = {
  title: string;
  slug: string;
  description: string;
  schedule: string;
  time: string;
  location: string;
  featured: boolean;
  coverFile: File | null;
};

type EventFormProps = {
  initialValues?: Partial<Event>;
  onSubmit: (values: EventFormValues) => Promise<void> | void;
  submitLabel?: string;
  disableSlug?: boolean;
  isSubmitting?: boolean;
};

const defaultValues: EventFormValues = {
  title: "",
  slug: "",
  description: "",
  schedule: "",
  time: "",
  location: "",
  featured: false,
  coverFile: null,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const EventForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  disableSlug = false,
  isSubmitting = false,
}: EventFormProps) => {
  const [values, setValues] = useState<EventFormValues>(defaultValues);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({
        ...prev,
        ...initialValues,
        slug: initialValues.slug ?? prev.slug,
        featured: initialValues.featured ?? false,
        coverFile: null,
      }));
      setCoverPreview(initialValues.coverUrl ?? null);
    } else {
      setValues(defaultValues);
      setCoverPreview(null);
    }
  }, [initialValues]);

  const handleChange = (field: keyof EventFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
    setValues((prev) => {
      if (field === "title" && !disableSlug) {
        return {
          ...prev,
          title: value as string,
          slug: slugify(value as string),
        };
      }

      return {
        ...prev,
        [field]: value,
      } as EventFormValues;
    });
  };

  const handleSlugBlur = () => {
    if (disableSlug) return;
    setValues((prev) => ({
      ...prev,
      slug: slugify(prev.slug),
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      coverFile: file,
    }));

    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const coverLabel = useMemo(() => (coverPreview ? "Change cover" : "Upload cover"), [coverPreview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Event Title</label>
          <input
            value={values.title}
            onChange={handleChange("title")}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="e.g., Live Trading Session"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Slug (URL)</label>
          <input
            value={values.slug}
            onChange={handleChange("slug")}
            onBlur={handleSlugBlur}
            required
            disabled={disableSlug}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 disabled:bg-white/5 disabled:text-white/40 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="live-trading-session"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Description</label>
        <textarea
          value={values.description}
          onChange={handleChange("description")}
          required
          rows={4}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
          placeholder="Brief description of the event"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Schedule</label>
          <input
            value={values.schedule}
            onChange={handleChange("schedule")}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="e.g., Every Saturday"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Time</label>
          <input
            value={values.time}
            onChange={handleChange("time")}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="e.g., 8:00 PM"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/85">Location</label>
          <input
            value={values.location}
            onChange={handleChange("location")}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
            placeholder="e.g., YouTube Live"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={handleChange("featured")}
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#FFE500] focus:ring-2 focus:ring-[#FFE500]/30 focus:ring-offset-0"
          />
          <span className="text-sm font-medium text-white/85">
            Feature on homepage (show in "Upcoming Events" section)
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Cover image</label>
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover preview" className="h-48 w-full rounded-xl object-cover" />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-xl bg-white/5">
              <svg className="h-12 w-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#6E21FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5820DA]">
            {coverLabel}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-xl bg-[#FFE500] px-6 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EventForm;

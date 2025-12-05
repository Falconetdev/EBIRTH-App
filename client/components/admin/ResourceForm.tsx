import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import type { ResourceItem } from "@/types/resource";

export type ResourceFormValues = {
  title: string;
  description: string;
  placeholderFile: File | null;
  resourceFile: File | null;
};

type ResourceFormProps = {
  initialValues?: Partial<ResourceItem>;
  onSubmit: (values: ResourceFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
};

const defaultValues: ResourceFormValues = {
  title: "",
  description: "",
  placeholderFile: null,
  resourceFile: null,
};

const getReadableFileName = (url?: string | null) => {
  if (!url) return "";
  try {
    const decoded = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
    return decoded || "Existing file";
  } catch {
    const parts = url.split("/");
    const fallback = parts[parts.length - 1] ?? "";
    return fallback || "Existing file";
  }
};

const ResourceForm = ({ initialValues, onSubmit, isSubmitting = false }: ResourceFormProps) => {
  const [values, setValues] = useState<ResourceFormValues>(defaultValues);
  const [placeholderPreview, setPlaceholderPreview] = useState<string | null>(null);
  const [resourceName, setResourceName] = useState<string>("");

  useEffect(() => {
    if (initialValues) {
      setValues((prev) => ({
        ...prev,
        title: initialValues.title ?? prev.title,
        description: initialValues.description ?? prev.description,
        placeholderFile: null,
        resourceFile: null,
      }));
      setPlaceholderPreview(initialValues.placeholderUrl ?? null);
      setResourceName(getReadableFileName(initialValues.resourceUrl ?? null));
    } else {
      setValues(defaultValues);
      setPlaceholderPreview(null);
      setResourceName("");
    }
  }, [initialValues]);

  useEffect(() => {
    return () => {
      if (placeholderPreview && placeholderPreview.startsWith("blob:")) {
        URL.revokeObjectURL(placeholderPreview);
      }
    };
  }, [placeholderPreview]);

  const handleInputChange = (field: keyof ResourceFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlaceholderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      placeholderFile: file,
    }));
    if (file) {
      setPlaceholderPreview(URL.createObjectURL(file));
    } else {
      setPlaceholderPreview(initialValues?.placeholderUrl ?? null);
    }
  };

  const handleResourceFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((prev) => ({
      ...prev,
      resourceFile: file,
    }));
    if (file) {
      setResourceName(file.name);
    } else {
      setResourceName(getReadableFileName(initialValues?.resourceUrl ?? null));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const resourceLabel = useMemo(() => resourceName || "No file selected", [resourceName]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Resource title</label>
        <input
          value={values.title}
          onChange={handleInputChange("title")}
          required
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
          placeholder="Inner Racers Trading Template"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/85">Description</label>
        <textarea
          value={values.description}
          onChange={handleInputChange("description")}
          required
          rows={6}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:border-[#FFE500] focus:outline-none focus:ring-2 focus:ring-[#FFE500]/30"
          placeholder="Explain what learners will gain from this resource."
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-white/85">Placeholder image</label>
        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4">
          {placeholderPreview ? (
            <img src={placeholderPreview} alt="Placeholder" className="h-40 w-full rounded-xl object-cover" />
          ) : (
            <p className="text-sm text-white/60">No image selected</p>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#6E21FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5820DA]">
            Upload image
            <input type="file" accept="image/*" className="hidden" onChange={handlePlaceholderChange} />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-white/85">Resource file</label>
        <div className="rounded-2xl border border-dashed border-white/25 bg-white/5 p-4 text-sm text-white/70">
          <p>{resourceLabel}</p>
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#FFE500] px-4 py-2 text-sm font-semibold text-[#1B0B2E] hover:bg-[#ffd700]">
            Upload file
            <input type="file" className="hidden" onChange={handleResourceFile} />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-xl bg-[#FFE500] px-6 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save resource"}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;

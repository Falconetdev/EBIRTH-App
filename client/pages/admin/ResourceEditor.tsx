import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ChevronRight } from "lucide-react";

import ResourceForm, { type ResourceFormValues } from "@/components/admin/ResourceForm";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import type { ResourceItem } from "@/types/resource";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ResourceEditor = () => {
  const params = useParams<{ slug?: string }>();
  const slugParam = params.slug;
  const isNew = !slugParam;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [initialResource, setInitialResource] = useState<ResourceItem | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isNew || !slugParam) return;

    const fetchResource = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDoc(doc(db, "resources", slugParam));
        if (!snapshot.exists()) {
          setError("Resource not found");
          return;
        }
        const data = snapshot.data();
        setInitialResource({
          id: snapshot.id,
          title: data?.title ?? "",
          slug: data?.slug ?? snapshot.id,
          description: data?.description ?? "",
          placeholderUrl: data?.placeholderUrl ?? null,
          placeholderStoragePath: data?.placeholderStoragePath ?? null,
          resourceUrl: data?.resourceUrl ?? null,
          resourceStoragePath: data?.resourceStoragePath ?? null,
          createdAt: data?.createdAt ?? null,
          updatedAt: data?.updatedAt ?? null,
        });
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load resource");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [isNew, slugParam]);

  const heroTitle = useMemo(() => (isNew ? "Upload Resource" : `Edit ${initialResource?.title ?? "resource"}`), [initialResource?.title, isNew]);

  const ensureUniqueSlug = async (candidate: string) => {
    const safe = candidate || `resource-${Date.now()}`;
    const docRef = doc(db, "resources", safe);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return safe;
    }
    return `${safe}-${Date.now()}`;
  };

  const handleSubmit = async (values: ResourceFormValues) => {
    setError(null);
    if (!values.resourceFile && !initialResource?.resourceUrl) {
      setError("Please upload the resource file before publishing.");
      return;
    }
    setIsSubmitting(true);
    try {
      const baseSlug = slugify(values.title);
      const targetSlug = slugParam ?? (await ensureUniqueSlug(baseSlug));
      const docRef = doc(db, "resources", targetSlug);

      let placeholderUrl = initialResource?.placeholderUrl ?? null;
      let placeholderStoragePath = initialResource?.placeholderStoragePath ?? null;
      let resourceUrl = initialResource?.resourceUrl ?? null;
      let resourceStoragePath = initialResource?.resourceStoragePath ?? null;

      if (values.placeholderFile) {
        const storagePath = `resource-placeholders/${targetSlug}-${Date.now()}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, values.placeholderFile);
        placeholderUrl = await getDownloadURL(storageRef);
        if (initialResource?.placeholderStoragePath && initialResource.placeholderStoragePath !== storagePath) {
          try {
            await deleteObject(ref(storage, initialResource.placeholderStoragePath));
          } catch {
            /* ignore cleanup failures */
          }
        }
        placeholderStoragePath = storagePath;
      }

      if (values.resourceFile) {
        const storagePath = `resource-files/${targetSlug}-${Date.now()}-${values.resourceFile.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, values.resourceFile);
        resourceUrl = await getDownloadURL(storageRef);
        if (initialResource?.resourceStoragePath && initialResource.resourceStoragePath !== storagePath) {
          try {
            await deleteObject(ref(storage, initialResource.resourceStoragePath));
          } catch {
            /* ignore cleanup failures */
          }
        }
        resourceStoragePath = storagePath;
      }

      const payload: Record<string, unknown> = {
        title: values.title.trim(),
        description: values.description.trim(),
        slug: targetSlug,
        placeholderUrl,
        placeholderStoragePath,
        resourceUrl,
        resourceStoragePath,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(docRef, payload, { merge: !isNew });
      toast({ title: isNew ? "Resource uploaded" : "Resource updated" });
      navigate("/admin/resources");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save resource");
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

  if (!isNew && error && !initialResource) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => navigate("/admin/resources")}
            className="mt-6 rounded-xl bg-[#FFE500] px-5 py-2.5 text-sm font-semibold text-[#1B0B2E] hover:bg-[#ffd700] transition-colors"
          >
            Back to Resources List
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
        <Link to="/admin/resources" className="text-white/60 hover:text-white transition-colors">
          Resources
        </Link>
        <ChevronRight size={16} className="text-white/40" />
        <span className="text-white font-medium">{isNew ? "New Resource" : "Edit Resource"}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{heroTitle}</h1>
          <p className="text-white/60">
            {isNew ? "Upload a new resource" : "Edit your resource"}
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
        <ResourceForm
          initialValues={initialResource ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ResourceEditor;

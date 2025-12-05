import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import BlogForm, { type BlogFormValues } from "@/components/admin/BlogForm";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";

const BlogEditor = () => {
  const params = useParams<{ slug?: string }>();
  const slugParam = params.slug;
  const isNew = !slugParam;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [initialPost, setInitialPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isNew || !slugParam) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDoc(doc(db, "blogs", slugParam));
        if (!snapshot.exists()) {
          setError("Post not found");
          return;
        }
        const data = snapshot.data();
        setInitialPost({
          id: snapshot.id,
          title: data?.title ?? "",
          slug: data?.slug ?? snapshot.id,
          excerpt: data?.excerpt ?? "",
          content: data?.content ?? "",
          tags: Array.isArray(data?.tags) ? data.tags : [],
          coverUrl: data?.coverUrl ?? null,
          coverStoragePath: data?.coverStoragePath ?? null,
          createdAt: data?.createdAt ?? null,
          updatedAt: data?.updatedAt ?? null,
        });
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [isNew, slugParam]);

  const heroTitle = useMemo(() => (isNew ? "Create Post" : `Edit ${initialPost?.title ?? "post"}`), [initialPost?.title, isNew]);

  const handleSubmit = async (values: BlogFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const slug = values.slug.trim();
      const docRef = doc(db, "blogs", slug);
      let coverUrl = initialPost?.coverUrl ?? null;
      let coverStoragePath = initialPost?.coverStoragePath ?? null;

      if (values.coverFile) {
        const storagePath = `blog-covers/${slug}-${Date.now()}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, values.coverFile);
        coverUrl = await getDownloadURL(storageRef);
        if (initialPost?.coverStoragePath && initialPost.coverStoragePath !== storagePath) {
          try {
            await deleteObject(ref(storage, initialPost.coverStoragePath));
          } catch {
            /* ignore cleanup failures */
          }
        }
        coverStoragePath = storagePath;
      }

      const payload: Record<string, unknown> = {
        title: values.title.trim(),
        slug,
        excerpt: values.excerpt.trim(),
        content: values.content.trim(),
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        coverUrl,
        coverStoragePath,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(docRef, payload, { merge: !isNew });
      toast({ title: isNew ? "Post published" : "Post updated" });
      navigate("/admin/blog");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42]">
        <p className="text-sm text-white/70">Loading editor…</p>
      </div>
    );
  }

  if (!isNew && error && !initialPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] px-4">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-center text-white">
          <p className="text-red-200">{error}</p>
          <button
            onClick={() => navigate("/admin/blog")}
            className="mt-6 rounded-xl bg-[#FFE500] px-4 py-2 text-sm font-semibold text-[#1B0B2E]"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Inner Racers Studio</p>
            <h1 className="text-3xl font-semibold text-white">{heroTitle}</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/resources"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
            >
              Manage resources
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Back
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          {error && <p className="mb-4 text-sm text-red-200">{error}</p>}
          <BlogForm
            initialValues={initialPost ?? undefined}
            onSubmit={handleSubmit}
            submitLabel={isNew ? "Publish" : "Save Changes"}
            disableSlug={!isNew}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;

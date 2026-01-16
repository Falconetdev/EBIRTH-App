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
import type { BlogPost } from "@/types/blog";

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const postsQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const mapped = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as DocumentData;
          return {
            id: docSnapshot.id,
            title: data.title ?? "Untitled",
            slug: data.slug ?? docSnapshot.id,
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            tags: Array.isArray(data.tags) ? data.tags : [],
            coverUrl: data.coverUrl ?? null,
            coverStoragePath: data.coverStoragePath ?? null,
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          } satisfies BlogPost;
        });
        setPosts(mapped);
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

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) {
      return;
    }
    setDeletingSlug(post.slug);
    try {
      await deleteDoc(doc(db, "blogs", post.slug));
      if (post.coverStoragePath) {
        await deleteObject(ref(storage, post.coverStoragePath));
      }
      toast({ title: "Post deleted" });
    } catch (err) {
      toast({ title: "Failed to delete", description: err instanceof Error ? err.message : undefined });
    } finally {
      setDeletingSlug(null);
    }
  };

  const emptyState = !loading && posts.length === 0;

  const tableBody = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-10 text-center text-sm text-white/70">
            Loading posts…
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-10 text-center text-sm text-red-200">
            {error}
          </td>
        </tr>
      );
    }

    if (emptyState) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-16 text-center text-sm text-white/70">
            No blog posts yet. Create your first story!
          </td>
        </tr>
      );
    }

    return posts.map((post) => (
      <tr key={post.id} className="border-t border-white/10 font-light text-white/90">
        <td className="px-4 py-4 text-sm">{post.title}</td>
        <td className="px-4 py-4 text-sm text-white/70">{formatDate(post.createdAt)}</td>
        <td className="px-4 py-4 font-mono text-xs text-white/60">/{post.slug}</td>
        <td className="px-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(`/admin/blogs/${post.slug}/edit`)}
              className="inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post)}
              disabled={deletingSlug === post.slug}
              className="inline-flex items-center rounded-xl border border-red-400/40 px-3 py-1.5 text-sm text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              {deletingSlug === post.slug ? "Deleting…" : "Delete"}
            </button>
            <Link
              to={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            >
              View
            </Link>
          </div>
        </td>
      </tr>
    ));
  }, [deletingSlug, emptyState, error, loading, navigate, posts]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-white/60">Manage your blog content</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/blogs/new"
            className="rounded-xl bg-[#FFE500] px-5 py-2.5 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700] hover:shadow-lg hover:shadow-[#FFE500]/20"
          >
            + New Post
          </Link>
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
          >
            View Public Blog
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10 text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogAdmin;

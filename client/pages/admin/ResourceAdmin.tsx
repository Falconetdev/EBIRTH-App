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
import type { ResourceItem } from "@/types/resource";

const ResourceAdmin = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const resourcesQuery = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      resourcesQuery,
      (snapshot) => {
        const mapped = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as DocumentData;
          return {
            id: docSnapshot.id,
            title: data.title ?? "Untitled",
            slug: data.slug ?? docSnapshot.id,
            description: data.description ?? "",
            placeholderUrl: data.placeholderUrl ?? null,
            placeholderStoragePath: data.placeholderStoragePath ?? null,
            resourceUrl: data.resourceUrl ?? null,
            resourceStoragePath: data.resourceStoragePath ?? null,
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          } satisfies ResourceItem;
        });
        setResources(mapped);
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

  const handleDelete = async (resource: ResourceItem) => {
    if (!window.confirm(`Delete “${resource.title}”? This cannot be undone.`)) {
      return;
    }
    setDeletingSlug(resource.slug);
    try {
      await deleteDoc(doc(db, "resources", resource.slug));
      if (resource.placeholderStoragePath) {
        await deleteObject(ref(storage, resource.placeholderStoragePath));
      }
      if (resource.resourceStoragePath) {
        await deleteObject(ref(storage, resource.resourceStoragePath));
      }
      toast({ title: "Resource deleted" });
    } catch (err) {
      toast({ title: "Failed to delete", description: err instanceof Error ? err.message : undefined });
    } finally {
      setDeletingSlug(null);
    }
  };

  const emptyState = !loading && resources.length === 0;

  const tableBody = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td colSpan={4} className="px-4 py-10 text-center text-sm text-white/70">
            Loading resources…
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
            No resources yet. Upload your first toolkit!
          </td>
        </tr>
      );
    }

    return resources.map((resource) => (
      <tr key={resource.id} className="border-t border-white/10 font-light text-white/90">
        <td className="px-4 py-4 text-sm">{resource.title}</td>
        <td className="px-4 py-4 text-sm text-white/70">{formatDate(resource.createdAt)}</td>
        <td className="px-4 py-4 text-sm">
          {resource.resourceUrl ? (
            <a
              href={resource.resourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#FFE500] hover:text-white"
            >
              Download
            </a>
          ) : (
            <span className="text-white/50">No file</span>
          )}
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(`/admin/resources/${resource.slug}/edit`)}
              className="inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(resource)}
              disabled={deletingSlug === resource.slug}
              className="inline-flex items-center rounded-xl border border-red-400/40 px-3 py-1.5 text-sm text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              {deletingSlug === resource.slug ? "Deleting…" : "Delete"}
            </button>
          </div>
        </td>
      </tr>
    ));
  }, [deletingSlug, emptyState, error, loading, navigate, resources]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Inner Racers Studio</p>
            <h1 className="text-3xl font-semibold text-white">Resources Admin</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-white/20">
              <Link
                to="/admin/blog"
                className="px-4 py-2 text-sm text-white/70 hover:bg-white/10"
              >
                Blog
              </Link>
              <span className="bg-white/20 px-4 py-2 text-sm font-semibold text-white">Resources</span>
            </div>
            <Link
              to="/admin/resources/new"
              className="rounded-xl bg-[#FFE500] px-5 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700]"
            >
              New Resource
            </Link>
            <a
              href="/resources"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
            >
              View public page
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
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 font-semibold">Download</th>
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

export default ResourceAdmin;

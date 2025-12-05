import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";

import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/lib/firebase";
import type { ResourceItem } from "@/types/resource";

const formatDate = (timestamp?: { toDate: () => Date } | null) => {
  if (!timestamp) return "Available now";
  try {
    return timestamp.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Available now";
  }
};

const Resources = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(query(collection(db, "resources"), orderBy("createdAt", "desc")));
        if (!isMounted) return;
        const mapped = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as DocumentData;
          return {
            id: docSnapshot.id,
            title: data.title ?? "Untitled resource",
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
      } catch (fetchError) {
        if (!isMounted) return;
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load resources");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchResources();
    return () => {
      isMounted = false;
    };
  }, []);

  const heroSubtitle = useMemo(() => {
    if (!resources.length) return "Download the toolkits we use to coach Inner Racers every week.";
    return `${resources.length} premium drops · Updated ${formatDate(resources[0].updatedAt ?? resources[0].createdAt ?? null)}`;
  }, [resources]);

  return (
    <PageLayout className="bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <section className="relative mt-12 overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(255,229,0,0.25),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4">
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Inner Racers Library</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Download the playbooks we trust</h1>
            <p className="text-base text-white/80">{heroSubtitle}</p>
          </div>

          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <p className="text-white/70">Loading resources…</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-red-500/10 text-red-100">
              <p>{error}</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 text-white/70">
              <p>No resources yet. Check back soon for fresh drops.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource) => (
                <article
                  key={resource.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-white/40"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    {resource.placeholderUrl ? (
                      <img
                        src={resource.placeholderUrl}
                        alt={resource.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#6E21FF] to-[#4013A5] text-white/80">
                        <span className="text-3xl font-semibold">{resource.title.charAt(0)}</span>
                        <p className="text-xs uppercase tracking-[0.4em]">Inner Racers</p>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                      {formatDate(resource.updatedAt ?? resource.createdAt ?? null)}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-white">{resource.title}</h3>
                      <p className="text-sm text-white/80">{resource.description}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-sm">
                      <span className="text-white/60">{resource.resourceUrl ? "Ready to download" : "File coming soon"}</span>
                      {resource.resourceUrl ? (
                        <a
                          href={resource.resourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#FFE500] px-4 py-2 text-sm font-semibold text-[#1B0B2E] transition hover:bg-[#ffd700]"
                        >
                          Download kit
                          <span aria-hidden="true">↓</span>
                        </a>
                      ) : (
                        <span className="rounded-xl border border-white/20 px-4 py-2 text-xs text-white/50">Publishing soon</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Resources;

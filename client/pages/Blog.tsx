import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";

import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";

const formatDate = (timestamp?: { toDate: () => Date } | null) => {
  if (!timestamp) return "Just now";
  try {
    return timestamp.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Just now";
  }
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
        if (!isMounted) return;
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
      } catch (fetchError) {
        if (!isMounted) return;
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load blogs");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const heroCopy = useMemo(() => {
    if (posts.length === 0) return "Insights, analyses, and playbooks from the Inner Racers team.";
    const latest = formatDate(posts[0].createdAt as { toDate: () => Date } | null);
    return `Fresh ideas from Inner Racers · Updated ${latest}`;
  }, [posts]);

  return (
    <PageLayout className="bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <section className="relative overflow-hidden mt-12 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,229,0,0.2),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4">
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Inner Racers Blog</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Ideas for high-performance learners</h1>
            <p className="text-base text-white/80">{heroCopy}</p>
          </div>

          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <p className="text-white/70">Loading blog posts…</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-red-500/10 text-red-100">
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 text-white/70">
              <p>No blog posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-1 hover:border-white/40"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    {post.coverUrl ? (
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6E21FF] to-[#4013A5] text-white/70">
                        <span>No cover image</span>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                      {formatDate(post.createdAt as { toDate: () => Date } | null)}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
                      <p className="text-sm text-white/80">{post.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-white/70">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-sm">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[#FFE500] transition hover:text-white"
                      >
                        Read full story
                        <span aria-hidden="true">→</span>
                      </Link>
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

export default Blog;

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import PageLayout from "@/components/layout/PageLayout";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";

const formatDate = (timestamp?: { toDate: () => Date } | null) => {
  if (!timestamp) return "Just now";
  try {
    return timestamp.toDate().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Just now";
  }
};

const splitParagraphs = (content: string) =>
  content
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing blog slug");
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDoc(doc(db, "blogs", slug));
        if (!isMounted) return;
        if (!snapshot.exists()) {
          setError("Post not found");
          return;
        }
        const data = snapshot.data();
        setPost({
          id: snapshot.id,
          title: data?.title ?? "Untitled",
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
        if (!isMounted) return;
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load post");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const readingTime = useMemo(() => {
    const words = post?.content?.split(/\s+/).length ?? 0;
    return Math.max(1, Math.round(words / 200));
  }, [post?.content]);

  const renderContent = () => {
    if (!post?.content) return null;
    return splitParagraphs(post.content).map((paragraph, index) => (
      <p key={index} className="text-lg leading-relaxed text-white/80">
        {paragraph}
      </p>
    ));
  };

  const stateView = () => {
    if (loading) {
      return (
        <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/70">
          Loading post…
        </div>
      );
    }

    if (error || !post) {
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 text-center text-white">
          <p>{error ?? "Post unavailable"}</p>
          <button
            onClick={() => navigate("/blog")}
            className="rounded-full bg-[#FFE500] px-6 py-2 text-sm font-semibold text-[#1B0B2E]"
          >
            Back to blog
          </button>
        </div>
      );
    }

    return (
      <article className="space-y-8">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Inner Racers Blog</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">{post.title}</h1>
          <div className="text-sm text-white/70">
            <span>{formatDate(post.createdAt as { toDate: () => Date } | null)}</span>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-white/70">
            {post.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.coverUrl ? (
          <div className="overflow-hidden rounded-[32px] border border-white/10">
            <img src={post.coverUrl} alt={post.title} className="h-[420px] w-full object-cover" loading="lazy" />
          </div>
        ) : null}

        <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur">
          {renderContent()}
        </div>
      </article>
    );
  };

  return (
    <PageLayout className="bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,229,0,0.15),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-4">
          <div className="flex items-center gap-3 text-sm text-[#FFE500]">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            {post?.title ? (
              <>
                <span>/</span>
                <span className="text-white/70">{post.title}</span>
              </>
            ) : null}
          </div>
          {stateView()}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;

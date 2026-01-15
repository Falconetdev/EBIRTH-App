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
    // Render HTML content from CKEditor with enhanced styling
    return (
      <div
        className="prose prose-invert prose-xl max-w-none
          prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-[#FFE500]
          prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
          prose-p:text-white/90 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
          prose-a:text-[#FFE500] prose-a:underline prose-a:decoration-[#FFE500]/30 hover:prose-a:decoration-[#FFE500]
          prose-strong:text-white prose-strong:font-bold
          prose-em:text-white/80 prose-em:italic
          prose-ul:text-white/85 prose-ul:space-y-2 prose-ul:my-6
          prose-ol:text-white/85 prose-ol:space-y-2 prose-ol:my-6
          prose-li:text-lg prose-li:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-[#FFE500] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70
          prose-code:text-[#FFE500] prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-black/30 prose-pre:border prose-pre:border-white/10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    );
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
      <article className="space-y-10">
        {/* Hero Header */}
        <header className="space-y-6 text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE500]/10 px-4 py-1.5 border border-[#FFE500]/20">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#FFE500]">Inner Racers Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight px-4">
              {post.title}
            </h1>
          </div>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(post.createdAt as { toDate: () => Date } | null)}</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readingTime} min read</span>
            </div>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {post.coverUrl ? (
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-transparent to-transparent z-10"></div>
            <img
              src={post.coverUrl}
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Article Content */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-8 md:p-12 lg:p-16 backdrop-blur-sm shadow-xl">
          {renderContent()}
        </div>

        {/* Back to Blog CTA */}
        <div className="flex justify-center pt-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFE500] hover:bg-[#ffd700] px-8 py-3.5 text-sm font-semibold text-[#1B0B2E] transition-all shadow-lg shadow-[#FFE500]/20 hover:shadow-xl hover:shadow-[#FFE500]/30"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </article>
    );
  };

  return (
    <PageLayout className="bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42] text-white">
      <section className="relative overflow-hidden pt-28 pb-16">
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

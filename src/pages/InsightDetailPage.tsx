import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Icon } from "@iconify/react";
import { sanityClient, insightBySlugQuery } from "../lib/sanity";
import { portableTextComponents } from "../lib/portableText";
import TerminalLabel from "../components/ui/TerminalLabel";
import GridRails from "../components/ui/GridRails";

interface InsightPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  excerpt: string;
  readTime: string;
  publishedAt?: string;
  body?: unknown[];
}

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<InsightPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    sanityClient
      .fetch<InsightPost>(insightBySlugQuery, { slug })
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-mono-label text-white/40 animate-pulse">LOADING...</span>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <span className="text-mono-label text-accent">404 / NOT FOUND</span>
        <p className="text-white/60 text-sm font-light">This insight doesn't exist or hasn't been published yet.</p>
        <Link
          to="/insights"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
          Back to Insights
        </Link>
      </div>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* Header */}
      <section className="relative border-b border-white/5 px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 overflow-hidden">
        <GridRails />
        <div className="relative max-w-rail mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <TerminalLabel variant="accent">{post.category}</TerminalLabel>
            <Link
              to="/insights"
              className="text-mono-label text-white/40 hover:text-accent inline-flex items-center gap-1.5 transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" className="w-3 h-3" />
              All Insights
            </Link>
          </div>
          <h1 className="font-display font-light text-white text-display-md md:text-display-lg leading-[1.05] tracking-tight max-w-4xl">
            {post.title}
          </h1>
          <p className="text-white/50 text-body-md font-light max-w-2xl">{post.excerpt}</p>
          <dl className="flex flex-wrap gap-x-8 gap-y-4 mt-4 border-t border-white/10 pt-6">
            {post.readTime && (
              <div className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/40">READ TIME</dt>
                <dd className="text-white text-sm font-light">{post.readTime}</dd>
              </div>
            )}
            {publishedDate && (
              <div className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/40">PUBLISHED</dt>
                <dd className="text-white text-sm font-light">{publishedDate}</dd>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <dt className="text-mono-label text-white/40">CATEGORY</dt>
              <dd className="text-white text-sm font-light">{post.category}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 sm:px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
          <div>
            {post.body && post.body.length > 0 ? (
              <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} components={portableTextComponents} />
            ) : (
              <div className="border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-3">
                <span className="text-mono-label text-accent">DRAFT / IN PROGRESS</span>
                <p className="text-white/50 text-sm font-light">
                  This piece is still being written. Check back soon.
                </p>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
            <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
              <span className="text-mono-label text-white/40">ABOUT THIS PIECE</span>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-mono-label text-white/30 mb-1">CATEGORY</p>
                  <p className="text-white/80 text-sm font-light">{post.category}</p>
                </div>
                {post.readTime && (
                  <div>
                    <p className="text-mono-label text-white/30 mb-1">READ TIME</p>
                    <p className="text-white/80 text-sm font-light">{post.readTime}</p>
                  </div>
                )}
                {publishedDate && (
                  <div>
                    <p className="text-mono-label text-white/30 mb-1">PUBLISHED</p>
                    <p className="text-white/80 text-sm font-light">{publishedDate}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-accent/20 bg-accent/[0.04] p-5 flex flex-col gap-3">
              <span className="text-mono-label text-accent">NEED HELP WITH THIS?</span>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Most of what we write about, we build. If this topic connects to a problem you're working on, let's talk.
              </p>
              <Link
                to="/contact"
                className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors"
              >
                Start a conversation
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
              </Link>
            </div>
            <Link
              to="/insights"
              className="text-mono-label text-white/40 hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" className="w-3 h-3" />
              All Insights
            </Link>
          </aside>
        </div>
      </section>

      {/* Footer nav — mobile only */}
      <section className="lg:hidden px-4 sm:px-6 py-10 border-t border-white/10 flex flex-col gap-6">
        <div className="border border-accent/20 bg-accent/[0.04] p-5 flex flex-col gap-3">
          <span className="text-mono-label text-accent">NEED HELP WITH THIS?</span>
          <p className="text-white/60 text-xs font-light leading-relaxed">
            Most of what we write about, we build. If this topic connects to a problem you're working on, let's talk.
          </p>
          <Link
            to="/contact"
            className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors"
          >
            Start a conversation
            <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
          </Link>
        </div>
        <Link
          to="/insights"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
          Back to all insights
        </Link>
      </section>
    </>
  );
}

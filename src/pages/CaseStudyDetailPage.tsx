import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Icon } from "@iconify/react";
import { sanityClient, caseStudyBySlugQuery } from "../lib/sanity";
import { portableTextComponents } from "../lib/portableText";
import TerminalLabel from "../components/ui/TerminalLabel";
import GridRails from "../components/ui/GridRails";

interface CaseStudyDetail {
  _id: string;
  title: string;
  slug: string;
  kind: string;
  status: string;
  problem: string;
  solution: string;
  stack: string[];
  publishedAt?: string;
  body?: unknown[];
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    sanityClient
      .fetch<CaseStudyDetail>(caseStudyBySlugQuery, { slug })
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setStudy(data);
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

  if (notFound || !study) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <span className="text-mono-label text-accent">404 / NOT FOUND</span>
        <p className="text-white/60 text-sm font-light">This case study doesn't exist or hasn't been published yet.</p>
        <Link
          to="/work"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
          Back to Work
        </Link>
      </div>
    );
  }

  const publishedDate = study.publishedAt
    ? new Date(study.publishedAt).toLocaleDateString("en-CA", {
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
            <TerminalLabel variant="accent">{study.kind}</TerminalLabel>
            <Link
              to="/work"
              className="text-mono-label text-white/40 hover:text-accent inline-flex items-center gap-1.5 transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" className="w-3 h-3" />
              All Work
            </Link>
          </div>
          <h1 className="font-display font-light text-white text-display-md md:text-display-lg leading-[1.05] tracking-tight max-w-4xl">
            {study.title}
          </h1>
          <dl className="flex flex-wrap gap-x-8 gap-y-4 mt-4 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-1">
              <dt className="text-mono-label text-white/40">STATUS</dt>
              <dd className="text-white text-sm font-light">{study.status}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-mono-label text-white/40">TYPE</dt>
              <dd className="text-white text-sm font-light">{study.kind}</dd>
            </div>
            {publishedDate && (
              <div className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/40">PUBLISHED</dt>
                <dd className="text-white text-sm font-light">{publishedDate}</dd>
              </div>
            )}
          </dl>
          {study.stack && study.stack.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s} className="text-mono-label text-white/60 border border-white/15 px-2 py-1">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="px-4 sm:px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            {study.body && study.body.length > 0 ? (
              <PortableText value={study.body as Parameters<typeof PortableText>[0]["value"]} components={portableTextComponents} />
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <span className="text-mono-label text-white/40">PROBLEM</span>
                  <p className="text-white/70 text-body-md font-light leading-relaxed border-l border-accent/40 pl-4">
                    {study.problem}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-mono-label text-white/40">SOLUTION</span>
                  <p className="text-white/70 text-body-md font-light leading-relaxed border-l border-accent/40 pl-4">
                    {study.solution}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
            <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
              <span className="text-mono-label text-white/40">ABOUT THIS ENGAGEMENT</span>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-mono-label text-white/30 mb-1">TYPE</p>
                  <p className="text-white/80 text-sm font-light">{study.kind}</p>
                </div>
                <div>
                  <p className="text-mono-label text-white/30 mb-1">STATUS</p>
                  <p className="text-white/80 text-sm font-light">{study.status}</p>
                </div>
                {study.stack && study.stack.length > 0 && (
                  <div>
                    <p className="text-mono-label text-white/30 mb-2">STACK</p>
                    <ul className="flex flex-col gap-1">
                      {study.stack.map((s) => (
                        <li key={s} className="text-white/60 text-xs font-light">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="border border-accent/20 bg-accent/[0.04] p-5 flex flex-col gap-3">
              <span className="text-mono-label text-accent">WANT SOMETHING SIMILAR?</span>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Most engagements start from a case study conversation. Tell us which problem resonates and we'll scope the equivalent for your operation.
              </p>
              <Link
                to="/contact"
                className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors"
              >
                Discuss similar work
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
              </Link>
            </div>
            <Link
              to="/work"
              className="text-mono-label text-white/40 hover:text-accent inline-flex items-center gap-2 transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" className="w-3 h-3" />
              All Work
            </Link>
          </aside>
        </div>
      </section>

      {/* Footer nav — mobile only */}
      <section className="lg:hidden px-4 sm:px-6 py-10 border-t border-white/10 flex flex-col gap-6">
        <div className="border border-accent/20 bg-accent/[0.04] p-5 flex flex-col gap-3">
          <span className="text-mono-label text-accent">WANT SOMETHING SIMILAR?</span>
          <p className="text-white/60 text-xs font-light leading-relaxed">
            Most engagements start from a case study conversation. Tell us which problem resonates and we'll scope the equivalent for your operation.
          </p>
          <Link
            to="/contact"
            className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors"
          >
            Discuss similar work
            <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
          </Link>
        </div>
        <Link
          to="/work"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
          Back to all work
        </Link>
      </section>
    </>
  );
}

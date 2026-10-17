import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Icon } from "@iconify/react";
import { sanityClient, caseStudyBySlugQuery } from "../lib/sanity";
import { portableTextComponents } from "../lib/portableText";
import TerminalLabel from "../components/ui/TerminalLabel";
import GridRails from "../components/ui/GridRails";
import { CASE_STUDIES } from "../data/caseStudies";
import { replaceRetiredProductNames } from "../data/naming";

interface CaseStudyDetail {
  _id?: string;
  title: string;
  slug: string;
  kind: string;
  status: string;
  problem: string;
  solution: string;
  stack: string[];
  publishedAt?: string;
  body?: unknown[];
  clientLabel?: string;
  outcomes?: string[];
  systemStages?: { label: string; detail: string }[];
  disclosure?: string;
  evidenceBasis?: string;
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const staticMatch = CASE_STUDIES.find((item) => item.slug === slug);
  const staticStudy: CaseStudyDetail | null =
    staticMatch?.slug ? { ...staticMatch, slug: staticMatch.slug } : null;
  const [remoteStudy, setRemoteStudy] = useState<CaseStudyDetail | null>(null);
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    sanityClient
      .fetch<CaseStudyDetail>(caseStudyBySlugQuery, { slug })
      .then((data) => {
        if (cancelled) return;
        setRemoteStudy(data);
        setResolvedSlug(slug);
      })
      .catch(() => {
        if (!cancelled) {
          setRemoteStudy(null);
          setResolvedSlug(slug);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const study =
    resolvedSlug === slug && remoteStudy
      ? {
          ...staticStudy,
          ...remoteStudy,
          title: replaceRetiredProductNames(remoteStudy.title),
          evidenceBasis: remoteStudy.evidenceBasis || staticStudy?.evidenceBasis,
        }
      : staticStudy;
  const loading = !staticStudy && resolvedSlug !== slug;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-mono-label text-white/55 animate-pulse">LOADING...</span>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <span className="text-mono-label text-accent">404 / NOT FOUND</span>
        <p className="text-white/60 text-sm font-normal">This case study doesn't exist or hasn't been published yet.</p>
        <Link
          to="/work"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors py-2 -my-2"
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
      <section className="relative border-b border-white/5 px-4 sm:px-6 md:px-12 py-12 sm:py-14 md:py-20 overflow-hidden">
        <GridRails />
        <div className="relative max-w-rail mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <TerminalLabel variant="accent">{study.kind}</TerminalLabel>
            <Link
              to="/work"
              className="text-mono-label text-white/55 hover:text-accent inline-flex items-center gap-1.5 transition-colors py-2 -my-2"
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
              <dt className="text-mono-label text-white/55">STATUS</dt>
              <dd className="text-white text-sm font-normal">{study.status}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-mono-label text-white/55">TYPE</dt>
              <dd className="text-white text-sm font-normal">{study.kind}</dd>
            </div>
            {study.clientLabel && (
              <div className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/55">CONTEXT</dt>
                <dd className="text-white text-sm font-normal">{study.clientLabel}</dd>
              </div>
            )}
            {publishedDate && (
              <div className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/55">PUBLISHED</dt>
                <dd className="text-white text-sm font-normal">{publishedDate}</dd>
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
                <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
                  <span className="text-mono-label text-accent">Before</span>
                  <h2 className="font-display text-display-sm font-light text-white">
                    The operational constraint
                  </h2>
                  <p className="max-w-3xl text-body-md font-normal leading-relaxed text-white/70">
                    {study.problem}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
                  <span className="text-mono-label text-accent">Designed system</span>
                  <h2 className="font-display text-display-sm font-light text-white">
                    What changed
                  </h2>
                  <p className="max-w-3xl text-body-md font-normal leading-relaxed text-white/70">
                    {study.solution}
                  </p>
                </div>
                {study.systemStages && study.systemStages.length > 0 && (
                  <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
                    <div>
                      <span className="text-mono-label text-accent">System architecture</span>
                      <h2 className="mt-3 font-display text-display-sm font-light text-white">
                        One traceable operating flow
                      </h2>
                    </div>
                    <ol className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-5">
                      {study.systemStages.map((stage, index) => (
                        <li key={stage.label} className="bg-ink p-5">
                          <span className="text-mono-label text-white/55">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-5 text-sm font-medium text-white">{stage.label}</h3>
                          <p className="mt-2 text-xs font-normal leading-relaxed text-white/60">
                            {stage.detail}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {study.outcomes && study.outcomes.length > 0 && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-mono-label text-accent">
                        {study.kind === "Client System" ||
                        study.kind === "Private Engagement"
                          ? "Verified outcomes"
                          : "Validated capabilities"}
                      </span>
                      <h2 className="mt-3 font-display text-display-sm font-light text-white">
                        {study.kind === "Client System" ||
                        study.kind === "Private Engagement"
                          ? "Workflow changes delivered"
                          : "What the prototype demonstrates"}
                      </h2>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {study.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-5 text-sm font-normal text-white/70"
                        >
                          <Icon
                            icon="solar:check-circle-linear"
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {study.disclosure && (
                  <p className="border-l border-white/15 pl-4 text-xs font-normal leading-relaxed text-white/60">
                    {study.disclosure}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-28">
            <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
              <span className="text-mono-label text-white/55">ABOUT THIS ENGAGEMENT</span>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-mono-label text-white/55 mb-1">TYPE</p>
                  <p className="text-white/80 text-sm font-normal">{study.kind}</p>
                </div>
                <div>
                  <p className="text-mono-label text-white/55 mb-1">STATUS</p>
                  <p className="text-white/80 text-sm font-normal">{study.status}</p>
                </div>
                {study.evidenceBasis && (
                  <div>
                    <p className="text-mono-label text-white/55 mb-1">Basis</p>
                    <p className="text-white/80 text-sm font-normal">{study.evidenceBasis}</p>
                  </div>
                )}
                {study.stack && study.stack.length > 0 && (
                  <div>
                    <p className="text-mono-label text-white/55 mb-2">STACK</p>
                    <ul className="flex flex-col gap-1">
                      {study.stack.map((s) => (
                        <li key={s} className="text-white/60 text-xs font-normal">
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
              <p className="text-white/60 text-xs font-normal leading-relaxed">
                Most engagements start from a case study conversation. Tell us which problem resonates and we'll scope the equivalent for your operation.
              </p>
              <Link
                to="/contact"
                className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors py-2 -my-2"
              >
                Discuss similar work
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
              </Link>
            </div>
            <Link
              to="/work"
              className="text-mono-label text-white/55 hover:text-accent inline-flex items-center gap-2 transition-colors py-2 -my-2"
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
          <p className="text-white/60 text-xs font-normal leading-relaxed">
            Most engagements start from a case study conversation. Tell us which problem resonates and we'll scope the equivalent for your operation.
          </p>
          <Link
            to="/contact"
            className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors py-2 -my-2"
          >
            Discuss similar work
            <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
          </Link>
        </div>
        <Link
          to="/work"
          className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2 transition-colors py-2 -my-2"
        >
          <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
          Back to all work
        </Link>
      </section>
    </>
  );
}

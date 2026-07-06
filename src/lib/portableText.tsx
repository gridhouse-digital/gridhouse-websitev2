import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-white/75 text-body-md font-light leading-relaxed mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-normal text-white text-display-sm leading-tight mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-normal text-white text-xl leading-snug mt-10 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display font-normal text-white text-lg leading-snug mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 my-8 text-white/60 italic font-light">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/80">{children}</em>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-white/[0.06] text-accent px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-col gap-3 mb-6 pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="flex flex-col gap-3 mb-6 pl-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-white/75 font-light text-body-md flex gap-3 items-start">
        <span className="text-accent shrink-0 mt-[0.35em] leading-none">—</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-white/75 font-light text-body-md pl-1">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={value?.asset?.url}
          alt={value?.alt ?? ""}
          className="w-full border border-white/10"
        />
        {value?.caption && (
          <figcaption className="mt-3 text-center text-mono-label text-white/40">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    videoEmbed: ({ value }) => (
      <figure className="my-10">
        <video
          src={value?.url}
          controls
          playsInline
          className="w-full border border-white/10 bg-black"
        />
        {value?.caption && (
          <figcaption className="mt-3 text-center text-mono-label text-white/40">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

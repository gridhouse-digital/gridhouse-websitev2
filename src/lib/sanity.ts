import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "40pygomb",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const insightsQuery = `*[_type == "insight" && status == "Published"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  status,
  excerpt,
  readTime,
  publishedAt
}`;

export const insightBySlugQuery = `*[_type == "insight" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  status,
  excerpt,
  readTime,
  publishedAt,
  body
}`;

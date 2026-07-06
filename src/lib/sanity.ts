import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "40pygomb",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

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

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  kind,
  status,
  problem,
  solution,
  stack,
  coverImage
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  kind,
  status,
  problem,
  solution,
  stack,
  coverImage,
  body[] {
    ...,
    _type == "image" => { ..., asset-> },
    _type == "videoEmbed" => { url, caption }
  },
  publishedAt
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  "id": serviceId,
  title,
  description,
  problemsSolved,
  deliverables,
  bestFitClients
}`;

export const industriesQuery = `*[_type == "industry"] | order(order asc) {
  _id,
  "id": industryId,
  name,
  featured,
  gridhouseFit,
  painPoints,
  mappedOfferings,
  useCases
}`;

export const productsQuery = `*[_type == "product"] | order(order asc) {
  _id,
  "id": productId,
  code,
  name,
  status,
  description,
  lifecycle,
  capabilities,
  integrations
}`;

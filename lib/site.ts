import type { Metadata } from "next"

import { profile, seo } from "@/lib/data"

/**
 * Public address of the site, without a trailing slash. Set NEXT_PUBLIC_SITE_URL
 * in the hosting dashboard (e.g. https://example.com). On Vercel it falls back
 * to the project's production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "")

/** Share-card image (public/og.png, 1200x630). */
const ogImage = { url: "/og.png", width: 1200, height: 630, alt: seo.ogImageAlt }

/** Canonical URL plus Open Graph and Twitter tags for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Full title as it should appear in a share card. */
  title: string
  description: string
  path: string
}): Pick<Metadata, "description" | "alternates" | "openGraph" | "twitter"> {
  return {
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en",
      siteName: profile.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  }
}

import { education, experience, profile, skills } from "@/lib/data"
import { siteUrl } from "@/lib/site"

/** schema.org Person + WebSite, built only from what is in lib/data.ts. */
export function buildJsonLd() {
  const personId = `${siteUrl}/#person`
  const current = experience.filter(
    (e) => /present$/i.test(e.period) && e.company !== "Independent"
  )
  const completed = education.filter((e) => !e.note)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteUrl,
        image: `${siteUrl}${profile.portrait.src}`,
        jobTitle: profile.title,
        description: profile.headline,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressCountry: profile.location },
        sameAs: Object.values(profile.socials).filter(Boolean),
        knowsAbout: skills.flatMap((group) => group.items),
        worksFor: current.map((e) => ({ "@type": "Organization", name: e.company })),
        alumniOf: completed.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  }
}

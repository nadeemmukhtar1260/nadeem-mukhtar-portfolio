import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { profile, seo } from "@/lib/data"
import { pageMetadata, siteUrl } from "@/lib/site"
import { buildJsonLd } from "@/lib/structured-data"

// Hanken Grotesk (variable) and IBM Plex Mono, self-hosted from app/fonts.
const sans = localFont({
  src: "./fonts/HankenGrotesk-Variable.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
})
const mono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.homeTitle, template: `%s · ${profile.name}` },
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  ...pageMetadata({ title: seo.homeTitle, description: seo.homeDescription, path: "/" }),
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#0B0F10",
}

// Runs before paint so a saved light preference never flashes dark.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
        <a href="#top" className="skip-link">
          {seo.skipLink}
        </a>
        {children}
      </body>
    </html>
  )
}

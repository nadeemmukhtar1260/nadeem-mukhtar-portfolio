import Link from "next/link"

import { footer, navLinks, profile } from "@/lib/data"
import { LogoMark } from "@/components/logo"
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  XIcon,
} from "@/components/icons"

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  )
}

export function Footer() {
  const { linkedin, github, x, instagram, tiktok, facebook } = profile.socials
  // Only links that are filled in get a button.
  const socialLinks = [
    { label: "LinkedIn", href: linkedin, Icon: LinkedinIcon },
    { label: "GitHub", href: github, Icon: GithubIcon },
    { label: "X", href: x, Icon: XIcon },
    { label: "Instagram", href: instagram, Icon: InstagramIcon },
    { label: "TikTok", href: tiktok, Icon: TiktokIcon },
    { label: "Facebook", href: facebook, Icon: FacebookIcon },
  ].filter((link) => link.href)

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12 lg:py-20">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <LogoMark size={56} className="text-accent" />
            <div className="flex flex-col gap-1.5">
              <span className="text-xl font-semibold tracking-[-0.01em] lg:text-[22px]">
                {profile.name}
              </span>
              <span className="label">{profile.title}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="iconbtn rounded-full"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
              <a className="iconbtn rounded-full" href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="flex flex-col gap-4">
            <span className="label">Navigation</span>
            <ul className="flex list-none flex-col">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex min-w-0 flex-col gap-4">
            <span className="label">Let&rsquo;s connect</span>
            <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-card text-accent">
                <MailIcon />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="label">Email</span>
                <span className="break-words text-[15px] font-medium">{profile.email}</span>
              </span>
            </a>
            <a href={profile.phone.href} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-card text-accent">
                <PhoneIcon />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="label">Phone</span>
                <span className="text-[15px] font-medium">{profile.phone.display}</span>
              </span>
            </a>
            <div className="flex items-start gap-3 border-t border-border pt-4">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="flex flex-col gap-0.5">
                <span className="label">Location</span>
                <span className="text-[15px] font-medium">{profile.location}</span>
              </span>
            </div>
          </div>

          {/* Expertise */}
          <div className="flex flex-col gap-4">
            <span className="label">Expertise</span>
            <p className="text-[15px] leading-[1.6] text-muted-foreground lg:text-base">
              {footer.expertise}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border py-5 lg:py-7">
          <span className="font-mono text-[12.5px] text-muted-foreground lg:text-[13px]">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <a className="navlink shrink-0 px-0 lg:px-3.5" href="#top">
            <span className="lg:hidden">Top ↑</span>
            <span className="hidden lg:inline">Back to top ↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

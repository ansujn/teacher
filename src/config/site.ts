/**
 * Central site configuration. Swap these values to re-brand the template
 * for any theatre / arts organisation without touching component code.
 */
export const siteConfig = {
  name: "Stagecraft",
  shortName: "Stagecraft",
  tagline: "Theatre that moves young audiences",
  description:
    "Stagecraft is a generic, open-source template for theatre and youth-arts organisations: tour productions, publish news, manage your cast, and take bookings — all from one admin dashboard.",
  url: "http://localhost:3000",
  locale: "en-ZA",
  email: "hello@stagecraft.example",
  phone: "+27 00 000 0000",
  address: "123 Stage Lane, Cape Town",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/shows", label: "Shows" },
    { href: "/news", label: "News" },
    { href: "/cast", label: "Cast" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footerLinks: [
    { href: "/shows", label: "All productions" },
    { href: "/news", label: "Latest news" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Book a show" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

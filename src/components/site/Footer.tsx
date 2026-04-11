import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/site/SocialIcons";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <span className="font-heading text-lg leading-none">S</span>
              </div>
              <span className="font-heading text-xl">{siteConfig.name}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <Link href={siteConfig.social.instagram} aria-label="Instagram" className="hover:text-foreground">
                <InstagramIcon className="size-5" />
              </Link>
              <Link href={siteConfig.social.facebook} aria-label="Facebook" className="hover:text-foreground">
                <FacebookIcon className="size-5" />
              </Link>
              <Link href={siteConfig.social.youtube} aria-label="YouTube" className="hover:text-foreground">
                <YoutubeIcon className="size-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              Explore
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {siteConfig.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}. A generic theatre website template.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}

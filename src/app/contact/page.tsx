import { Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/site/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-gradient-to-b from-accent/60 to-background py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Book a performance, request a school tour, or ask us anything about our productions.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
            <aside>
              <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                <h2 className="font-heading text-lg font-semibold">Direct contact</h2>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 text-primary" />
                    <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 text-primary" />
                    <span>{siteConfig.phone}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 text-primary" />
                    <span>{siteConfig.address}</span>
                  </li>
                </ul>
              </div>
            </aside>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

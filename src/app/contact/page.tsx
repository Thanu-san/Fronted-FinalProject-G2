import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NextShop — questions, feedback, or just to say hello.",
};

// TODO: Keep these in sync with src/components/layout/Footer.tsx if they change.
const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "nextshop@gmail.com",
    href: "mailto:nextshop@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+855 99 677 687 / 12 345 678",
    href: "tel:+85599677687",
    icon: Phone,
  },
  {
    label: "Address",
    value: "Toul Kork, Phnom Penh",
    href: undefined,
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-canvas">
      {/* Hero */}
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden py-16 md:py-24"
      >
        {/* Decorative background wash, hidden from assistive tech */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-periwinkle/20 blur-3xl" />
        </div>

        <Container className="relative text-center">
          <Badge tone="soft">
            <Mail aria-hidden="true" className="h-4 w-4" />
            Contact
          </Badge>
          <h1
            id="contact-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Get in Touch
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Questions, feedback, or just want to say hello — drop us a message and we will get
            back to you as soon as we can.
          </p>
        </Container>
      </section>

      {/* Form + contact info */}
      <section aria-labelledby="contact-form-heading" className="bg-white py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="contact-form-heading"
              title="Send us a message"
              description="Fill in the form below and we will reply by email."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <SectionHeading
              id="contact-info-heading"
              title="Contact details"
              description="Prefer to reach us directly? These are the places to find us."
            />
            <ul className="mt-8 space-y-4">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-lavender bg-canvas p-5 shadow-sm"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-sm font-semibold text-ink transition-colors hover:text-primary-700"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 block text-sm font-semibold text-ink">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section aria-labelledby="map-heading" className="bg-canvas py-16 md:py-24">
        <Container>
          <SectionHeading
            id="map-heading"
            title="Find us in Toul Kork"
            description="Based in Toul Kork, Phnom Penh — come say hi."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-lavender shadow-sm">
            <iframe
              title="Map of Toul Kork, Phnom Penh"
              src="https://www.google.com/maps?q=Toul+Kork,+Phnom+Penh&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
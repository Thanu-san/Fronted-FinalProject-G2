import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamSection from "@/components/about/TeamSection";

const STORE_NAME = "NextShop";

export const metadata: Metadata = {
  title: "About Us | NextShop",
  description: `Learn more about ${STORE_NAME}, our mission, our mentors, and the ISTAD engineering team behind our platform.`,
};

const VALUES = [
  {
    title: "Fair prices, shown upfront",
    description:
      "No surprise markups at checkout, no hidden fees. The price you see is the price you pay.",
    accent: "border-primary-700",
  },
  {
    title: "Products we would buy ourselves",
    description:
      "Every product on the shelf is checked by real people before it earns a spot in the catalogue.",
    accent: "border-primary-500",
  },
  {
    title: "Support from real people",
    description:
      "Questions get answered by a human on the front lines, not a bot swimming through a script.",
    accent: "border-periwinkle",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="bg-canvas">
      {/* Hero */}
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden py-16 md:py-24"
      >
        {/* Decorative background wash, hidden from assistive tech */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-periwinkle/20 blur-3xl" />
        </div>

        <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="soft">About {STORE_NAME}</Badge>
            <h1
              id="about-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Online shopping that respects your time and your money.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {STORE_NAME} brings together high quality products we genuinely stand
              behind, priced fairly and supported by helpful humans, so you can buy
              with confidence and get back to your day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/products"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                Browse products
              </Link>
              <Link
                href="/cart"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                View cart
              </Link>
            </div>
          </div>

          <HeroArt />
        </Container>
      </section>

      {/* What you can expect from us */}
      <section aria-labelledby="values-heading" className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            id="values-heading"
            title="What you can expect from us"
            description={`Three simple promises guide every decision we make at ${STORE_NAME}.`}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className={`rounded-2xl border-l-4 bg-canvas p-6 shadow-sm ${value.accent}`}
              >
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Mentors & Team Section (Starts from teachers to students) */}
      <TeamSection />

      {/* Closing call to action */}
      <section aria-labelledby="cta-heading" className="pt-10 pb-16 md:pt-14 md:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* Decorative background shapes, hidden from assistive tech */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-lavender/20 blur-3xl" />
              <div className="absolute top-6 right-8 h-20 w-20 rounded-full bg-pop-green/25" />
            </div>

            <h2
              id="cta-heading"
              className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Ready to shop smarter?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
              Browse the catalogue, pick what works for you, and check out in a few clicks.
            </p>
            <Link
              href="/products"
              className={buttonStyles({
                variant: "success",
                size: "lg",
                className: "relative mt-6",
              })}
            >
              Shop now
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * Decorative CSS-only art panel for the hero. Purely visual; hidden from
 * assistive technology via aria-hidden.
 */
function HeroArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative hidden select-none lg:block lg:min-h-96"
    >
      <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-periwinkle/40 blur-2xl" />
      <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-primary-500/15 blur-2xl" />
      <div className="absolute left-10 top-12 h-80 w-96 -rotate-6 rounded-3xl bg-gradient-to-br from-lavender to-periwinkle shadow-xl shadow-primary-500/20" />
      <div className="absolute right-10 top-0 h-20 w-20 rounded-full bg-primary-500 shadow-lg" />
      <div className="absolute bottom-0 left-4 h-16 w-16 rounded-full bg-pop-green shadow-lg" />
      <div className="absolute bottom-16 right-24 h-10 w-10 rounded-full border-2 border-white bg-lavender shadow-md" />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Code, GraduationCap, Send } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamGrid, { type TeamMember } from "@/components/ui/TeamGrid";
import cheakchingLyheng from "@/assets/team/cheakching-lyheng.jpg";
import khoeurtSokleap from "@/assets/team/khoeurt-sokleap.jpg";
import limKunpheaktra from "@/assets/team/lim-kunpheaktra.jpg";
import menSenghak from "@/assets/team/men-senghak.jpg";
import sanSengthanu from "@/assets/team/san-sengthanu.jpg";
import seoungReaksa from "@/assets/team/seoung-reaksa.jpg";
import srorngSokcheat from "@/assets/team/srorng-sokcheat.jpg";

const STORE_NAME = "NextShop";

export const metadata: Metadata = {
  title: "About us",
  description: `Learn more about ${STORE_NAME} and how we respect your time and your money.`,
};

const MENTOR = {
  name: "Srorng Sokcheat",
  title: "IT Instructor",
  photo: srorngSokcheat.src,
  github: "https://github.com/CheatDev07",
  telegram: "https://t.me/Sokcheat_srorng",
} as const;

// The 6th member is Seoung Reaksa (identity confirmed via photo); role still TODO.
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "San Sengthanu",
    title: "Team Leader",
    role: "leader",
    photo: sanSengthanu.src,
    github: "https://github.com/Thanu-san",
    // Telegram swapped for a mailto link on this card.
    email: "thanusanseng@gmail.com",
  },
  {
    name: "Men Senghak",
    title: "Vice Team Lead",
    role: "sub-leader",
    photo: menSenghak.src,
    github: "https://github.com/hak22-legit",
    email: "haks5685@gmail.com",
  },
  {
    name: "Cheakching Lyheng",
    title: "Junior Developer",
    role: "member",
    photo: cheakchingLyheng.src,
    github: "https://github.com/lyheng142",
    email: "lyhengchheakching@gmail.com",
  },
  {
    name: "Khoeurt Sokleap",
    title: "Junior Developer",
    role: "member",
    photo: khoeurtSokleap.src,
    github: "https://github.com/Sokleap123",
    email: "johnleap9641@gmail.com",
  },
  {
    name: "Lim Kunpheaktra",
    title: "Junior Developer",
    role: "member",
    photo: limKunpheaktra.src,
    github: "https://github.com/Kunpheaktralim",
    email: "Kunpheaktralim@gmail.com",
  },
  {
    name: "Seoung Reaksa",
    title: "Junior Developer",
    role: "member",
    photo: seoungReaksa.src,
    github: "https://github.com/seungreaksa",
    email: "seungreaksa0@gmail.com",
  },
];

/* Shared style for the circular social icon buttons. */
const SOCIAL_ICON_STYLES =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-500/30 text-primary-700 transition-colors hover:bg-primary-50 hover:border-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

// TODO: Replace the placeholder descriptions below with the final copy.
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

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
  return initials.toUpperCase() || "?";
}

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
            {/* TODO: Replace with the final hero copy. */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {STORE_NAME} brings together a short list of products we genuinely stand
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
                href="/contact"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                Contact us
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
            // TODO: Replace with the final section copy.
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

      {/* Our mentor */}
      <section aria-labelledby="mentor-heading" className="bg-white py-16 md:py-24">
        <Container className="text-center">
          <Badge tone="soft">
            <GraduationCap aria-hidden="true" className="h-4 w-4" />
            Guidance &amp; Advisory
          </Badge>
          <SectionHeading
            id="mentor-heading"
            align="center"
            title="Our Mentor"
            description="The instructor guiding Group 2 through this final project."
          />
          <article className="mx-auto mt-10 w-full max-w-sm rounded-2xl border border-periwinkle bg-canvas p-8 text-center shadow-md shadow-primary-500/10">
            {MENTOR.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={MENTOR.photo}
                alt={`Portrait of ${MENTOR.name}`}
                className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-primary-500 shadow-md shadow-primary-500/20"
              />
            ) : (
              <div
                aria-hidden="true"
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 text-2xl font-bold text-primary-700 ring-2 ring-primary-500 shadow-md shadow-primary-500/20"
              >
                {getInitials(MENTOR.name)}
              </div>
            )}
            <h3 className="mt-4 text-xl font-bold text-ink">{MENTOR.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{MENTOR.title}</p>
            <Badge tone="primary" className="mt-5">
              <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
              Mentor
            </Badge>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href={MENTOR.github}
                className={SOCIAL_ICON_STYLES}
                aria-label={`${MENTOR.name}'s GitHub`}
              >
                <Code aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={MENTOR.telegram}
                className={SOCIAL_ICON_STYLES}
                aria-label={`${MENTOR.name}'s Telegram`}
              >
                <Send aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
        </Container>
      </section>

      {/* Our team */}
      <section aria-labelledby="team-heading" className="bg-canvas py-16 md:py-24">
        <Container>
          <SectionHeading
            id="team-heading"
            title="Our Team"
            description="The six members of Group 2 building this project together."
          />
          <TeamGrid members={TEAM_MEMBERS} />
        </Container>
      </section>

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
            {/* TODO: Replace with the final CTA copy. */}
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

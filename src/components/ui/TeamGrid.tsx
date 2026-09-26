"use client";

import * as React from "react";
import { Code, Mail, Send } from "lucide-react";
import Button from "@/components/ui/Button";

export type TeamRole = "leader" | "sub-leader" | "member";

export interface TeamMember {
  /** Display name. */
  name: string;
  /** Short descriptor shown under the name. */
  title: string;
  /** Drives the grid filter and the badge colour/label. */
  role: TeamRole;
  /** Optional photo URL; falls back to an initials avatar when absent. */
  photo?: string;
  /** GitHub URL — a single "#" is a placeholder (TODO). */
  github: string;
  /** Telegram URL — a single "#" is a placeholder (TODO). */
  telegram?: string;
  /** Optional email; when set, the second social button becomes a mailto link. */
  email?: string;
}

type TeamFilter = "all" | "leaders" | "juniors";

const ROLE_LABEL: Record<TeamRole, string> = {
  leader: "Leader",
  "sub-leader": "Vice Leader",
  member: "Member",
};

const ROLE_BADGE: Record<TeamRole, string> = {
  leader: "bg-primary-500 text-white border-primary-500/40",
  "sub-leader": "bg-periwinkle text-ink border-periwinkle",
  member: "bg-lavender text-ink border-lavender",
};

const AVATAR_STYLES = [
  "bg-primary-500 text-white",
  "bg-periwinkle text-ink",
  "bg-pop-green text-ink",
  "bg-lavender text-primary-700",
] as const;

const AVATAR_RING = "ring-2 ring-primary-500 shadow-md shadow-primary-500/20";

// TODO: Swap the Code icon (GitHub stand-in) for a brand GitHub icon/SVG if wanted.
const ICON_LINK_STYLES =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-500/30 text-primary-700 transition-colors hover:bg-primary-50 hover:border-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
  return initials.toUpperCase() || "?";
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const [activeFilter, setActiveFilter] = React.useState<TeamFilter>("all");

  const leaderCount = members.filter((member) => member.role !== "member").length;
  const juniorCount = members.length - leaderCount;

  const filters: Array<{ key: TeamFilter; label: string }> = [
    { key: "all", label: `All Members (${members.length})` },
    { key: "leaders", label: `Leaders (${leaderCount})` },
    { key: "juniors", label: `Junior Devs (${juniorCount})` },
  ];

  const visibleMembers =
    activeFilter === "leaders"
      ? members.filter((member) => member.role !== "member")
      : activeFilter === "juniors"
        ? members.filter((member) => member.role === "member")
        : members;

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div
        role="group"
        aria-label="Filter team members by role"
        className="flex flex-wrap items-center gap-3"
      >
        {filters.map((filter) => (
          <Button
            key={filter.key}
            type="button"
            size="sm"
            variant={activeFilter === filter.key ? "primary" : "outline"}
            aria-pressed={activeFilter === filter.key}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleMembers.map((member, index) => (
          <li
            key={member.name}
            className="rounded-2xl border border-lavender bg-white p-6 text-center shadow-sm"
          >
            {member.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                className={joinClasses("mx-auto h-16 w-16 rounded-full object-cover", AVATAR_RING)}
              />
            ) : (
              <div
                aria-hidden="true"
                className={joinClasses(
                  "mx-auto flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold",
                  AVATAR_RING,
                  AVATAR_STYLES[index % AVATAR_STYLES.length],
                )}
              >
                {getInitials(member.name)}
              </div>
            )}

            <p className="mt-3 text-sm font-semibold text-ink">{member.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{member.title}</p>

            <span
              className={joinClasses(
                "mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                ROLE_BADGE[member.role],
              )}
            >
              {ROLE_LABEL[member.role]}
            </span>

            <div className="mt-3 flex items-center justify-center gap-2">
              <a
                href={member.github}
                aria-label={`${member.name}'s GitHub`}
                className={ICON_LINK_STYLES}
                {...(isExternalHref(member.github)
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <Code aria-hidden="true" className="h-4 w-4" />
              </a>

              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className={ICON_LINK_STYLES}
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : (
                <a
                  href={member.telegram ?? "#"}
                  aria-label={`${member.name}'s Telegram`}
                  className={ICON_LINK_STYLES}
                  {...(isExternalHref(member.telegram ?? "#")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamGrid;
import React from "react";

export interface SectionHeadingProps {
  /** Small uppercase label rendered above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Optional id, e.g. as the aria-labelledby target of a <section>. */
  id?: string;
  className?: string;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={joinClasses("space-y-3", centered ? "text-center" : "", className)}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
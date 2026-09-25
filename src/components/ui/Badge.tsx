import React from "react";

export type BadgeTone = "primary" | "soft" | "success" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const toneStyles: Record<BadgeTone, string> = {
  primary: "bg-primary-50 text-primary-700 border-primary-500/25",
  soft: "bg-lavender text-primary-700 border-lavender",
  success: "bg-pop-green/15 text-emerald-900 border-pop-green/30",
  danger: "bg-pop-red/10 text-red-900 border-pop-red/30",
};

export function Badge({
  tone = "primary",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}

export default Badge;
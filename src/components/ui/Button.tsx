import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-accent",
    secondary: "bg-secondary text-primary hover:bg-indigo-100",
    outline:
      "border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-secondary dark:hover:bg-zinc-800",
    ghost:
      "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
    md: "text-sm px-5 py-2.5 h-10 gap-2",
    lg: "text-base px-6 py-3 h-12 gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

=======
import React, { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStylesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch the button to fill its parent's width. */
  fullWidth?: boolean;
  /** Extra classes, appended last so they can override variant defaults. */
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStylesOptions {
  /** Renders a spinner, disables the button and sets aria-busy="true". */
  loading?: boolean;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseStyles = joinClasses(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors select-none cursor-pointer",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
  "disabled:opacity-50 disabled:pointer-events-none",
);

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
  secondary: "bg-lavender text-ink hover:bg-periwinkle active:bg-periwinkle",
  outline:
    "border border-ink/25 bg-transparent text-ink hover:bg-lavender/40 hover:text-primary-700",
  ghost: "bg-transparent text-primary-700 hover:bg-primary-50 active:bg-primary-50",
  success: "bg-pop-green text-ink hover:bg-pop-green/90 active:bg-pop-green/80",
  danger: "bg-pop-red text-white hover:bg-pop-red/90 active:bg-pop-red/80",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
  md: "text-sm px-5 py-2.5 h-10 gap-2",
  lg: "text-base px-6 py-3 h-12 gap-2.5",
};

/**
 * Builds the class string used by the Button component so non-<button>
 * elements (for example next/link) can render exactly like a Button.
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonStylesOptions = {}): string {
  return joinClasses(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="animate-spin h-3.5 w-3.5 shrink-0 rounded-full border-2"
      style={{ borderColor: "currentColor", borderTopColor: "transparent" }}
    />
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    className = "",
    type = "button",
    disabled = false,
    children,
    "aria-busy": ariaBusy,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      disabled={loading || disabled}
      aria-busy={loading ? "true" : ariaBusy}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {loading ? <span className="opacity-70">{children}</span> : children}
    </button>
  );
});

export { Button };
export default Button;

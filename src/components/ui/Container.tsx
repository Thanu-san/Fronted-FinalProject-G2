import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use a wider max width (max-w-7xl instead of max-w-6xl). */
  wide?: boolean;
}

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  wide = false,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={joinClasses(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        wide ? "max-w-7xl" : "max-w-6xl",
        className,
      )}
      {...props}
    />
  );
}

export default Container;
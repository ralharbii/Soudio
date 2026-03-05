import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  alt?: boolean;
  noPadding?: boolean;
}

export function Section({ alt = false, noPadding = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        !noPadding && "py-16 md:py-24",
        alt && "bg-neutral-50/70",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ badge, title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {badge && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

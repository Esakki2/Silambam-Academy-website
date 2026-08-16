import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gold tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}

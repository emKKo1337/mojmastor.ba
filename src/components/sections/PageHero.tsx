import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/** Centered title/description block reused at the top of static content pages. */
export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <div className={cn("mx-auto mb-16 max-w-3xl text-center", className)}>
      {eyebrow ? <p className="mb-3 text-label-lg font-bold uppercase tracking-wide text-primary">{eyebrow}</p> : null}
      <h1 className="mb-4 text-display-lg-mobile md:text-display-lg">{title}</h1>
      {description ? <p className="text-body-lg text-text-muted">{description}</p> : null}
    </div>
  );
}

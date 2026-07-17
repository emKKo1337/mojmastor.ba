import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface BecomeCraftsmanCtaProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

/** Shared "become a craftsman" promo block used across landing/listing pages. */
export function BecomeCraftsmanCta({
  title,
  description,
  primaryLabel,
  primaryHref = "/registracija?tip=majstor",
  secondaryLabel,
  secondaryHref = "/o-nama",
  className,
}: BecomeCraftsmanCtaProps) {
  return (
    <section className={cn("relative overflow-hidden rounded-2xl bg-primary-container text-on-primary shadow-xl", className)}>
      <div className="absolute right-0 top-0 p-8 opacity-10">
        <MaterialIcon name="construction" className="text-[160px]" />
      </div>
      <div className="relative z-10 max-w-2xl p-12 md:p-16">
        <h2 className="mb-6 text-headline-lg">{title}</h2>
        <p className="mb-8 text-body-lg opacity-90">{description}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={primaryHref} variant="white" size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel ? (
            <Button
              href={secondaryHref}
              variant="ghost"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  href?: string;
}

/** Inline SVG recreation of the brand mark: a house roofline over a shield with a checkmark. */
export function Logo({ className, markClassName, wordmarkClassName, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn("h-9 w-9 md:h-10 md:w-10", markClassName)}
        aria-hidden="true"
      >
        <path
          d="M6 15 L20 4 L34 15"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 13 L20 6.5 L29 13 V23 C29 29 24.5 33.5 20 35.5 C15.5 33.5 11 29 11 23 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 21.5 L18.7 24.7 L25 18"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn("text-headline-md font-bold leading-none", wordmarkClassName)}>
        <span className="text-primary">MojMajstor</span>
        <span className="text-primary/60">.ba</span>
      </span>
    </Link>
  );
}

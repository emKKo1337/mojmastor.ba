import type { ReactNode } from "react";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalContentProps {
  updatedAt: string;
  sections: LegalSection[];
}

/** Shared long-form layout for the Terms of Use and Privacy Policy pages. */
export function LegalContent({ updatedAt, sections }: LegalContentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-10 text-label-sm text-text-muted">Zadnje ažurirano: {updatedAt}</p>
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-4 text-headline-md text-text-main">{section.heading}</h2>
            <div className="space-y-4 text-body-md leading-relaxed text-text-muted">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

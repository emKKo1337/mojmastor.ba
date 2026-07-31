import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FaqItem } from "@/data/faq";

/** Native <details>/<summary> accordion — accessible and interactive with no client JS. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-border-light bg-surface-white p-6 open:shadow-sm [&::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-label-lg text-text-main">
            {item.question}
            <MaterialIcon
              name="expand_more"
              className="shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="mt-4 text-body-md leading-relaxed text-text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

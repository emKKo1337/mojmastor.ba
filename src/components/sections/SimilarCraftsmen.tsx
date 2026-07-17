import { CraftsmanMiniCard } from "@/components/cards/CraftsmanMiniCard";
import type { Craftsman } from "@/types";

export function SimilarCraftsmen({ craftsmen }: { craftsmen: Craftsman[] }) {
  if (craftsmen.length === 0) return null;

  return (
    <div>
      <h2 className="mb-6 text-headline-lg">Slični majstori</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {craftsmen.map((craftsman) => (
          <CraftsmanMiniCard key={craftsman.id} craftsman={craftsman} />
        ))}
      </div>
    </div>
  );
}

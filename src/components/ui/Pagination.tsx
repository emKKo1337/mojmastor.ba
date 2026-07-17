import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const ELLIPSIS = "ellipsis" as const;
type PageToken = number | typeof ELLIPSIS;

function getPageTokens(current: number, total: number): PageToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const tokens = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(tokens)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result: PageToken[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push(ELLIPSIS);
    }
    result.push(page);
  });
  return result;
}

/** Clean, responsive pagination with windowed page numbers for large result sets. */
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const tokens = getPageTokens(currentPage, totalPages);

  return (
    <nav aria-label="Straničenje rezultata" className={cn("flex items-center justify-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        aria-label="Prethodna stranica"
      >
        <MaterialIcon name="chevron_left" />
      </button>

      {tokens.map((token, index) =>
        token === ELLIPSIS ? (
          <span key={`ellipsis-${index}`} className="px-1 text-text-muted">
            …
          </span>
        ) : (
          <button
            key={token}
            type="button"
            onClick={() => onPageChange(token)}
            aria-current={token === currentPage ? "page" : undefined}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border font-bold transition-all",
              token === currentPage
                ? "border-primary bg-primary text-white"
                : "border-border-light text-text-muted hover:border-primary hover:text-primary",
            )}
          >
            {token}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        aria-label="Sljedeća stranica"
      >
        <MaterialIcon name="chevron_right" />
      </button>
    </nav>
  );
}

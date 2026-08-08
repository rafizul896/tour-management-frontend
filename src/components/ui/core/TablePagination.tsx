import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
  isPending?: boolean;
  hideOnSinglePage?: boolean;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

/** Builds a compact page list like: 1 … 4 5 [6] 7 8 … 20 */
const buildPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  const siblingCount = 1;
  const totalVisible = siblingCount * 2 + 5;

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: PageItem[] = [1];

  if (showLeftEllipsis) items.push("ellipsis-start");
  for (let page = leftSibling; page <= rightSibling; page++) {
    if (page !== 1 && page !== totalPages) items.push(page);
  }
  if (showRightEllipsis) items.push("ellipsis-end");

  items.push(totalPages);

  return items;
};

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  limit = 10,
  onLimitChange,
  limitOptions = [1, 5, 10, 20, 50, 100],
  isPending = false,
  hideOnSinglePage = false,
}: TablePaginationProps) => {
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const navigateToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    onPageChange(newPage);
  };

  const changeLimit = (newLimit: string) => {
    onLimitChange?.(Number(newLimit));
    onPageChange(1);
  };

  const pageItems = buildPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Table pagination"
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full max-w-lg"
    >
      {/* Items per page — first on mobile (below controls), first column on desktop */}
      {onLimitChange && (
        <div className="order-3 sm:order-1 flex items-center justify-center sm:justify-start gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={String(limit)}
            onValueChange={changeLimit}
            disabled={isPending}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Page navigation — always centered, wraps to its own row on mobile */}
      <div className="order-1 sm:order-2 flex items-center justify-center gap-1 sm:mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
          aria-label="Previous page"
          className="h-8 px-2 sm:px-3"
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Numbered pages — hidden on very small screens to avoid overflow */}
        <div className="hidden xs:flex items-center gap-1">
          {pageItems.map((item, index) =>
            typeof item === "number" ? (
              <Button
                key={item}
                variant={item === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => navigateToPage(item)}
                disabled={isPending}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={cn(
                  "h-8 w-8 p-0 transition-colors",
                  item === currentPage && "pointer-events-none"
                )}
              >
                {item}
              </Button>
            ) : (
              <span
                key={`${item}-${index}`}
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            )
          )}
        </div>

        {/* Compact page readout for the smallest screens */}
        <span className="xs:hidden text-sm text-muted-foreground px-2 tabular-nums">
          {currentPage} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage >= totalPages || isPending}
          aria-label="Next page"
          className="h-8 px-2 sm:px-3"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>
      </div>

      {/* Page count — right-aligned on desktop, hidden on mobile (redundant with compact readout) */}
      <span className="order-2 sm:order-3 hidden sm:block text-sm text-muted-foreground text-right tabular-nums">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
};

export default TablePagination;
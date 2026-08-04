import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

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
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const changeLimit = (newLimit: string) => {
    onLimitChange?.(Number(newLimit));
    onPageChange(1);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;

          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }
          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>

      <span className="text-sm hidden md:block text-muted-foreground ml-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Items per page selector — only rendered if the caller wants it */}
      {onLimitChange && (
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm hidden md:block text-muted-foreground">
            Items per page:
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
    </div>
  );
};

export default TablePagination;

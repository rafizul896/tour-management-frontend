// src/pages/Tours.tsx  (or wherever this route file lives)
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { Link, useSearchParams } from "react-router";
import TourFilters from "@/components/modules/Tours/TourFilters";
import TablePagination from "@/components/ui/core/TablePagination";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  List,
  MapPin,
  Users,
  CalendarDays,
  Cake,
  SlidersHorizontal,
  SearchX,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "grid";

export default function Tours() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchParams] = useSearchParams();

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  const searchTerm = searchParams.get("searchTerm") || undefined;

  // reset to page 1 whenever filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [division, tourType, searchTerm]);

  const { data, isLoading } = useGetAllToursQuery({
    division,
    tourType,
    searchTerm,
    page: currentPage,
    limit,
    sortBy: "-startDate",
  });
  const totalPage = data?.meta?.totalPage || 1;
  const total = data?.meta?.total ?? data?.data?.length ?? 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters — sidebar on desktop only */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="lg:sticky lg:top-6">
            <TourFilters />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-9 w-full">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 min-w-0">
              {/* Mobile filters trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden gap-1.5 flex-shrink-0"
                  >
                    <SlidersHorizontal className="size-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[380px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 px-4 pb-6">
                    <TourFilters />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground truncate">
                {isLoading
                  ? "Loading tours..."
                  : `${total} tour${total === 1 ? "" : "s"} found`}
              </p>
            </div>

            <div className="inline-flex items-center rounded-lg border border-muted p-1 bg-muted/30 flex-shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  viewMode === "list"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="size-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  viewMode === "grid"
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>

          {/* Loading skeletons */}
          {isLoading && (
            <div
              className={cn(
                viewMode === "list"
                  ? "space-y-5"
                  : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              )}
            >
              {Array.from({ length: viewMode === "list" ? 3 : 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "border border-muted rounded-2xl overflow-hidden animate-pulse",
                    viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
                  )}
                >
                  <div
                    className={cn(
                      "bg-muted",
                      viewMode === "list"
                        ? "w-full sm:w-2/5 aspect-video sm:aspect-square"
                        : "w-full aspect-[4/3]"
                    )}
                  />
                  <div className="flex-1 p-4 sm:p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-8 bg-muted rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && data?.data?.length === 0 && (
            <div className="border border-dashed border-muted rounded-2xl py-16 px-6 text-center">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-muted mb-4">
                <SearchX className="size-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No tours found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting or clearing your filters and search.
              </p>
            </div>
          )}

          {/* Results: list view */}
          {!isLoading && viewMode === "list" && (
            <div className="space-y-5">
              {data?.data?.map((item) => (
                <div
                  key={item.slug}
                  className="group border border-muted rounded-2xl bg-card hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden flex flex-col sm:flex-row"
                >
                  <div className="relative w-full sm:w-2/5 flex-shrink-0 aspect-video sm:aspect-square bg-muted overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-primary shadow-sm">
                      From ৳{item.costFrom.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <Users className="size-3.5" /> Max {item.maxGuest}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="size-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {item.departureLocation} → {item.arrivalLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5 flex-shrink-0" />
                        {item.tourPlan.length} days
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cake className="size-3.5 flex-shrink-0" />
                        Min age {item.minAge}+
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {item.amenities.length > 3 && (
                        <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          +{item.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <Button asChild className="w-full mt-auto">
                      <Link to={`/tours/${item._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results: grid view */}
          {!isLoading && viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {data?.data?.map((item) => (
                <div
                  key={item.slug}
                  className="group border border-muted rounded-2xl bg-card hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold text-primary shadow-sm">
                      ৳{item.costFrom.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-base font-semibold mb-1.5 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" /> {item.maxGuest}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" />
                        {item.tourPlan.length} days
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 truncate">
                      <MapPin className="size-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {item.departureLocation} → {item.arrivalLocation}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.amenities.slice(0, 2).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {item.amenities.length > 2 && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[11px] font-medium rounded-full">
                          +{item.amenities.length - 2}
                        </span>
                      )}
                    </div>

                    <Button asChild size="sm" className="w-full mt-auto">
                      <Link to={`/tours/${item._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-5 flex justify-center">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={setCurrentPage}
              limit={limit}
              onLimitChange={setLimit}
              isPending={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
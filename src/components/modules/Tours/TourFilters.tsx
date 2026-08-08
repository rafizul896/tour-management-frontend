// src/components/modules/Tours/TourFilters.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, X, MapPin, Compass } from "lucide-react";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;
  const urlSearchTerm = searchParams.get("searchTerm") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);

  // keep local input in sync if URL changes externally (e.g. "Clear")
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  // debounce writing search text to the URL
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      const trimmed = searchTerm.trim();
      if (trimmed) {
        params.set("searchTerm", trimmed);
      } else {
        params.delete("searchTerm");
      }
      setSearchParams(params, { replace: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const activeFilterCount = [
    selectedDivision,
    selectedTourType,
    urlSearchTerm,
  ].filter(Boolean).length;

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    params.delete("searchTerm");
    setSearchParams(params);
    setSearchTerm("");
  };

  return (
    <div className="w-full rounded-2xl border border-muted bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-muted">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h2 className="font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearFilter}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Search */}
        <div>
          <Label className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Search tours
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Title, description or location..."
              className="pl-9 pr-8"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <MapPin className="size-3.5" />
              Division
            </Label>
            <Select
              onValueChange={handleDivisionChange}
              value={selectedDivision ?? ""}
              disabled={divisionIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All divisions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Divisions</SelectLabel>
                  {divisionOption?.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <Compass className="size-3.5" />
              Tour Type
            </Label>
            <Select
              onValueChange={handleTourTypeChange}
              value={selectedTourType ?? ""}
              disabled={tourTypeIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All tour types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tour Types</SelectLabel>
                  {tourTypeOptions?.map(
                    (item: { value: string; label: string }) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
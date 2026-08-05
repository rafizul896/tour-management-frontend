import { Button } from "@/components/ui/button";
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

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });
    console.log(tourTypeData)

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

  const hasActiveFilters = Boolean(selectedDivision || selectedTourType);

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
    setSearchParams(params);
  };

  return (
    <div className="w-full border border-muted rounded-md p-4 sm:p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button size="sm" variant="outline" onClick={handleClearFilter}>
            Clear
          </Button>
        )}
      </div>

      {/* Two columns on mobile/tablet sidebar-off state, single column on desktop sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <div>
          <Label className="mb-2 block">Division to visit</Label>
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
                {divisionOption?.map((item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Tour Type</Label>
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
  );
}
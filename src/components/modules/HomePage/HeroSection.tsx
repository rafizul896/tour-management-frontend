import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
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
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function HeroSection() {
  const [selectedDivision, setSelectedDivision] = useState<
    string | undefined
  >(undefined);

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  return (
    <section className="relative overflow-hidden min-h-[85v flex items-center py-20 sm:py-28">
      {/* Spotlight gradient glow, driven by the theme's --primary */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, var(--background) 52%, var(--primary) 100%)",
        }}
      />
      {/* Faint grid texture on top of the glow */}
      <div className="absolute inset-0 -z-10 opacity-[0.15]">
        <img
          alt=""
          aria-hidden="true"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="w-full h-full object-cover [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <div className="flex flex-col items-center gap-5 sm:gap-6 text-center">
            <div className="rounded-xl bg-background/40 p-3.5 sm:p-4 shadow-sm backdrop-blur-md border border-border/50">
              <Logo />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary mb-4">
                8 divisions · 100+ verified tours
              </span>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pretty leading-tight">
                Explore the beauty of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                From the world's longest sea beach in Cox's Bazar to the
                mangrove forests of the Sundarbans and the tea gardens of
                Sylhet — find a guided tour built around where you want to
                go.
              </p>
            </div>

            {/* Search bar */}
            <div className="w-full max-w-2xl mt-2 sm:mt-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 p-2 sm:p-1.5 rounded-2xl sm:rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg sm:items-center">
                <div className="flex items-center gap-2 flex-1 px-2 sm:pl-4 sm:pr-2">
                  <MapPin className="size-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
                  <Select
                    onValueChange={(value) => setSelectedDivision(value)}
                    disabled={divisionIsLoading}
                  >
                    <SelectTrigger className="w-full border-0 shadow-none focus-visible:ring-0 sm:h-11">
                      <SelectValue placeholder="Where do you want to go?" />
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

                {selectedDivision ? (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full sm:w-auto w-full flex-shrink-0"
                  >
                    <Link to={`/tours?division=${selectedDivision}`}>
                      <Search className="size-4" />
                      Search tours
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    size="lg"
                    className="rounded-full sm:w-auto w-full flex-shrink-0"
                  >
                    <Search className="size-4" />
                    Search tours
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 sm:mt-4 text-sm text-muted-foreground">
              <span>8 divisions covered</span>
              <span className="hidden sm:inline text-muted-foreground/40">•</span>
              <span>Verified local guides</span>
              <span className="hidden sm:inline text-muted-foreground/40">•</span>
              <span>Secure online booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
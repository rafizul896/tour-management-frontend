import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api"; // TODO: adjust to your actual division API slice path
import {
  getDivisionInfo,
  travelStyles,
  comparisonTable,
  seasons,
} from "@/components/modules/Division/divisionTravelInfo";
import {
  MapPinned,
  Compass,
  ArrowUpRight,
  Utensils,
  Landmark,
  Trees,
  ScrollText,
  Footprints,
  Sun,
  CloudRain,
  Leaf,
  Snowflake,
  Sparkles,
  Waves,
  Search,
} from "lucide-react";
import DivisionHero from "@/components/modules/Division/DivisionHero";

interface Division {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  updatedAt: string;
}

const seasonIcons: Record<string, typeof Sun> = {
  winter: Snowflake,
  spring: Leaf,
  monsoon: CloudRain,
  autumn: Sun,
};

const ExploreBangla = () => {
  const { data: divisionData, isLoading } = useGetDivisionsQuery(undefined);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    document.title = "Explore Bangladesh | ExploreBangla";
  }, []);

  // Track which division profile is in view, to highlight the active pill + rail node
  useEffect(() => {
    if (!divisionData?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSlug(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [divisionData]);

  const scrollToDivision = (slug: string) => {
    sectionRefs.current[slug]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const matchedDivisions = travelStyles.find(
    (s) => s.value === selectedStyle,
  )?.divisions;

  const activeIndex = divisionData?.findIndex(
    (d: Division) => d.slug === activeSlug,
  );
  const navProgress =
    divisionData?.length && activeIndex !== undefined && activeIndex >= 0
      ? ((activeIndex + 1) / divisionData.length) * 100
      : 0;

  return (
    <main className="flex flex-col bg-background text-foreground font-sans">
      <DivisionHero />

      {/* STICKY QUICK-JUMP NAV */}
      {!isLoading && !!divisionData?.length && (
        <nav
          id="division-nav"
          aria-label="Jump to division"
          className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />
            <div className="container mx-auto flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {divisionData.map((division: Division) => (
                <Button
                  key={division._id}
                  type="button"
                  size="sm"
                  variant={activeSlug === division.slug ? "default" : "outline"}
                  className="shrink-0 rounded-full"
                  aria-current={
                    activeSlug === division.slug ? "true" : undefined
                  }
                  onClick={() => scrollToDivision(division.slug)}
                >
                  {division.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-[2px] w-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${navProgress}%` }}
            />
          </div>
        </nav>
      )}

      {/* DIVISION DEEP-DIVE PROFILES */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Division by division
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need, one division at a time
          </h2>
          <p className="mt-4 text-muted-foreground">
            Places to see, food to try, culture to take in, and when to go — all
            in one stop before you move to the next.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-20">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid gap-8 lg:grid-cols-2 lg:gap-14">
                <Skeleton className="h-80 w-full rounded-xl" />
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="mt-4 h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !divisionData?.length ? (
          <Card className="border-dashed bg-transparent">
            <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
              <Search className="h-6 w-6 text-muted-foreground" />
              <p className="font-medium">No divisions to show yet</p>
              <p className="text-sm text-muted-foreground">
                Check back soon — new guides are on the way.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col">
            {divisionData.map((division: Division, index: number) => {
              const info = getDivisionInfo(division);
              const reversed = index % 2 === 1;

              return (
                <article key={division._id}>
                  <div
                    id={division.slug}
                    ref={(el) => {
                      sectionRefs.current[division.slug] = el;
                    }}
                    className="scroll-mt-32 py-12"
                  >
                    <div
                      className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                        reversed ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-72 overflow-hidden rounded-2xl border sm:h-96">
                        <img
                          src={division.thumbnail}
                          alt={`${division.name} division, Bangladesh`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-background/40 bg-foreground/50 font-mono text-xs text-background backdrop-blur">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        {info && (
                          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                            {info.idealFor.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-6">
                        <div>
                          <div className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-primary">
                            <MapPinned className="h-3.5 w-3.5" />
                            Division {String(index + 1).padStart(2, "0")}
                          </div>
                          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                            {division.name}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {division.description}
                          </p>
                        </div>

                        {info ? (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                                <Compass className="h-3.5 w-3.5 text-primary" />
                                Best places
                              </div>
                              <ul className="space-y-1">
                                {info.bestPlaces.slice(0, 4).map((place) => (
                                  <li
                                    key={place}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {place}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                                <Utensils className="h-3.5 w-3.5 text-primary" />
                                Try the food
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {info.foods.map((food) => (
                                  <Badge key={food} variant="outline">
                                    {food}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                                <Landmark className="h-3.5 w-3.5 text-primary" />
                                Culture & history
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {info.culture} {info.history}
                              </p>
                            </div>

                            <div>
                              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                                <Trees className="h-3.5 w-3.5 text-primary" />
                                Nature
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {info.nature}
                              </p>
                            </div>

                            <div>
                              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                                <Footprints className="h-3.5 w-3.5 text-primary" />
                                Best activities
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {info.activities.join(", ")}
                              </p>
                            </div>

                            <div className="sm:col-span-2 flex items-center gap-2 rounded-lg border bg-muted px-3 py-2">
                              <ScrollText className="h-4 w-4 shrink-0 text-primary" />
                              <span className="text-xs text-muted-foreground">
                                Best time to visit:{" "}
                                <span className="font-medium text-foreground">
                                  {info.bestSeason}
                                </span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Detailed travel guide coming soon for this division.
                          </p>
                        )}

                        <Button asChild className="w-fit gap-1.5 rounded-full">
                          <Link to={`/tours?division=${division._id}`}>
                            Explore {division.name}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* river connector between divisions */}
                  {index < divisionData.length - 1 && (
                    <div
                      className="mx-auto flex max-w-4xl items-center gap-3 px-6"
                      aria-hidden="true"
                    >
                      <span className="h-16 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
                      <Waves className="h-3.5 w-3.5 text-primary/40" />
                      <span className="h-16 flex-1 border-t border-dashed" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* BEST TIME TO TRAVEL */}
      <section className="border-y bg-muted/40">
        <div className="container mx-auto px-6 py-24">
          <div className="mb-14 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Trip planning
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              When should you visit which place?
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season) => {
              const Icon = seasonIcons[season.id] ?? Sun;
              return (
                <Card
                  key={season.id}
                  className={
                    season.isBestOverall ? "border-primary bg-primary/5" : ""
                  }
                >
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      {season.isBestOverall && (
                        <Badge className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          Best overall
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">
                        {season.name}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {season.range}
                      </p>
                    </div>
                    <div className="h-px w-full bg-border" />
                    <ul className="space-y-1">
                      {season.best.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAVEL MATCHER */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Find your fit
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What's your travel style?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick what you're after, and we'll point you to the divisions that
            fit — then jump straight to their profile above.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ToggleGroup
            type="single"
            value={selectedStyle}
            onValueChange={(v) => v && setSelectedStyle(v)}
            className="flex flex-wrap justify-center gap-2"
          >
            {travelStyles.map((style) => (
              <ToggleGroupItem
                key={style.value}
                value={style.value}
                className="gap-1.5 rounded-full border px-4 py-2 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <span aria-hidden="true">{style.emoji}</span>
                {style.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {matchedDivisions && (
            <Card className="mx-auto mt-8 max-w-md">
              <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Recommended for you
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {matchedDivisions.map((name) => {
                    const match = divisionData?.find(
                      (d: Division) => d.name === name,
                    );
                    return match ? (
                      <Button
                        key={name}
                        type="button"
                        size="sm"
                        className="rounded-full"
                        onClick={() => scrollToDivision(match.slug)}
                      >
                        {name}
                      </Button>
                    ) : (
                      <Badge key={name} variant="secondary">
                        {name}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* DIVISION COMPARISON — quick recap */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto px-6 py-24">
          <div className="mb-14 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Quick recap
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose your next adventure
            </h2>
          </div>

          <Card className="hidden overflow-hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Division</th>
                  <th className="px-5 py-3 font-medium">Best for</th>
                  <th className="px-5 py-3 font-medium">Best season</th>
                  <th className="px-5 py-3 font-medium">Top attraction</th>
                  <th className="px-5 py-3 font-medium">Food</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {comparisonTable.map((row) => (
                  <tr key={row.division} className="hover:bg-muted/50">
                    <td className="px-5 py-3 font-semibold">{row.division}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.bestFor}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.season}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.attraction}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.food}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex flex-col gap-3 md:hidden">
            {comparisonTable.map((row) => (
              <Card key={row.division}>
                <CardContent className="flex flex-col gap-1.5 pt-6">
                  <h3 className="font-display font-semibold">{row.division}</h3>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Best for:
                    </span>{" "}
                    {row.bestFor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Season:</span>{" "}
                    {row.season}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Top spot:
                    </span>{" "}
                    {row.attraction}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Food:</span>{" "}
                    {row.food}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — inverted section, same treatment as hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic view of Bangladesh"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/20" />
        <div className="container relative mx-auto flex flex-col items-center gap-6 px-6 py-24 text-center text-background">
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Your next Bangladesh adventure starts here
          </h2>
          <p className="max-w-md text-background/75">
            Choose a destination, meet local guides, discover authentic
            experiences and create memories worth keeping.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="rounded-full" asChild>
              <Link to="/tours">Explore tours</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreBangla;

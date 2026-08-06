import { Link } from "react-router";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { ArrowRight, MapPin } from "lucide-react";

export default function PopularDivisions() {
  const { data: divisionData, isLoading } = useGetDivisionsQuery(undefined);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-xl mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Explore Bangladesh
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-2">
            Discover tours by division
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid auto-rows-[220px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {divisionData?.map(
              (
                division: {
                  _id: string;
                  name: string;
                  thumbnail?: string;
                },
                index: number,
              ) => (
                <Link
                  key={division._id}
                  to={`/tours?division=${division._id}`}
                  className={`group relative overflow-hidden rounded-2xl border border-border/50 ${
                    index === 0
                      ? "sm:col-span-2 sm:row-span-2"
                      : index === 3
                        ? "lg:col-span-2"
                        : ""
                  }`}
                >
                  {division.thumbnail ? (
                    <img
                      src={division.thumbnail}
                      alt={division.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <MapPin className="size-8 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Overlay: subtle, only strong enough to guarantee text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3
                          className={`font-semibold text-white ${
                            index === 0
                              ? "text-2xl sm:text-3xl"
                              : "text-lg sm:text-xl"
                          }`}
                        >
                          {division.name}
                        </h3>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/95 text-foreground transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

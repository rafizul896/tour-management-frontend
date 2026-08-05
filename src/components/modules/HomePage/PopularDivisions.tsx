import { Link } from "react-router";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { ArrowRight } from "lucide-react";

export default function PopularDivisions() {
  const { data: divisionData, isLoading } = useGetDivisionsQuery(undefined);

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Explore by division
            </h2>
            <p className="text-muted-foreground">
              Pick a region and see every tour we run there.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {divisionData?.map((division: { _id: string; name: string; thumbnail?: string }) => (
              <Link
                key={division._id}
                to={`/tours?division=${division._id}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
              >
                {division.thumbnail ? (
                  <img
                    src={division.thumbnail}
                    alt={division.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {division.name}
                  </span>
                  <ArrowRight className="size-4 text-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { ArrowRight, Users, CalendarDays, MapPin } from "lucide-react";

export default function FeaturedTours() {
  const { data, isLoading } = useGetAllToursQuery({
    limit: 4,
    sortBy: "-startDate",
  });

  const tours = data?.data ?? [];
  const [primary, ...rest] = tours;

  return (
    <section className="py-16 sm:py-24 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Handpicked
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
              Featured tours
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto">
            <Link to="/tours">
              View all tours <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl bg-background animate-pulse min-h-80" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-background animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large featured card */}
            {primary && (
              <Link
                to={`/tours/${primary._id}`}
                className="group relative rounded-2xl overflow-hidden bg-background border border-border min-h-80 lg:min-h-full flex flex-col justify-end"
              >
                <img
                  src={primary.images[0]}
                  alt={primary.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative p-6 sm:p-7 text-white">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide bg-primary px-2.5 py-1 rounded-full mb-3">
                    Most popular
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {primary.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/85 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" /> {primary.departureLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3.5" /> {primary.tourPlan.length} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" /> Max {primary.maxGuest}
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    From ৳{primary.costFrom.toLocaleString()}
                  </span>
                </div>
              </Link>
            )}

            {/* Compact stacked list */}
            <div className="flex flex-col gap-4">
              {rest.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  to={`/tours/${item._id}`}
                  className="group flex gap-4 rounded-xl border border-border bg-background p-3 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="font-semibold mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" /> {item.tourPlan.length} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" /> Max {item.maxGuest}
                      </span>
                    </div>
                    <span className="text-primary font-bold text-sm">
                      From ৳{item.costFrom.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
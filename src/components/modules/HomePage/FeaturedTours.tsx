import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { ArrowRight, Users, CalendarDays } from "lucide-react";

export default function FeaturedTours() {
  const { data, isLoading } = useGetAllToursQuery({
    limit: 3,
    sortBy: "-startDate",
  });

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Featured tours
            </h2>
            <p className="text-muted-foreground">
              A few of the trips people are booking right now.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto">
            <Link to="/tours">
              View all tours <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-muted bg-card overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            : data?.data?.map((item) => (
                <Link
                  key={item.slug}
                  to={`/tours/${item._id}`}
                  className="group rounded-xl border border-muted bg-card overflow-hidden hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1.5 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="size-3.5" />
                        {item.tourPlan.length} days
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        Max {item.maxGuest}
                      </span>
                    </div>
                    <span className="text-primary font-bold">
                      From ৳{item.costFrom.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
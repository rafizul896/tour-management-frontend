import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { format } from "date-fns";
import { Calendar, Loader2, MapPin, Users } from "lucide-react";
import { Link } from "react-router";
import { useGetMyGuideApplicationQuery } from "@/redux/features/guide/guide.api";

interface Tour {
  _id: string;
  title: string;
  location: string;
  images?: string[];
  startDate: string;
  endDate: string;
  maxGuest: number;
}

function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link to={`/tours/${tour._id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        {tour.images?.[0] && (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="h-40 w-full object-cover"
          />
        )}
        <CardHeader>
          <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {tour.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {tour.startDate && tour.endDate
              ? `${format(new Date(tour.startDate), "PP")} – ${format(
                  new Date(tour.endDate),
                  "PP",
                )}`
              : "Dates TBA"}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Up to {tour.maxGuest} guests
          </div>
          <Badge variant="secondary">{tour.location}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function GuideDashboard() {
  const {
    data: guideApplication,
    isLoading: isGuideLoading,
    isError: isGuideError,
  } = useGetMyGuideApplicationQuery(undefined);

  const divisionId = guideApplication?.division?._id;
  const guideId = guideApplication?._id;

  const {
    data,
    isLoading: isToursLoading,
    isError: isToursError,
  } = useGetAllToursQuery(
    { division: divisionId, guides: guideId },
    { skip: !guideId },
  );

  const tours = useMemo<Tour[]>(() => data?.data ?? [], [data]);

  const isLoading = isGuideLoading || (Boolean(guideId) && isToursLoading);
  const isError = isGuideError || isToursError;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-5xl mx-auto px-5 mt-16">
        <p className="text-destructive">Failed to load your assigned tours.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-5 mt-16 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Assigned Tours</h1>
        <p className="text-muted-foreground">
          Tours you've been assigned to guide
        </p>
      </div>

      {tours.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            You haven't been assigned to any tours yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
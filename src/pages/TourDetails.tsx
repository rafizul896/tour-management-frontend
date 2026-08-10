import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetSingleTourQuery } from "@/redux/features/Tour/tour.api";
import { ITourPackage } from "@/types";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router";
import { useState } from "react";
import {
  MapPin,
  Wallet,
  Users,
  Calendar,
  PlaneTakeoff,
  PlaneLanding,
  Layers,
  Cake,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTourQuery(id);
  const [activeImage, setActiveImage] = useState(0);

  const { data: divisionData } = useGetDivisionsQuery(
    { _id: data?.[0]?.division },
    { skip: !data },
  );

  const tourData: ITourPackage = data;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-8 bg-muted rounded w-2/3 mb-3" />
        <div className="h-4 bg-muted rounded w-1/3 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-3 h-72 sm:h-96 bg-muted rounded-xl" />

          <div className="hidden md:flex flex-col gap-3">
            <div className="flex-1 bg-muted rounded-xl" />
            <div className="flex-1 bg-muted rounded-xl" />
            <div className="flex-1 bg-muted rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!tourData) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Tour not found</h1>
        <p className="mt-2 text-muted-foreground">
          The tour you are looking for could not be found.
        </p>
      </main>
    );
  }

  const title = `${tourData.title} | ExploreBangla`;

  const description =
    tourData.description?.slice(0, 155) ||
    `Explore ${tourData.title} with ExploreBangla. Discover beautiful destinations, tour details, pricing, travel plans and book your next trip in Bangladesh.`;

  const canonicalUrl = `https://explorebangla.com/tours/${tourData.slug || tourData._id}`;

  const ogImage =
    tourData.images?.[0] || "https://explorebangla.com/og-image.jpg";

  const divisionName = divisionData?.[0]?.name || tourData.location;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tourData.title,
    description,
    image: tourData.images || [],
    url: canonicalUrl,

    touristType: ["Adventure travelers", "Family travelers", "Tourists"],

    itinerary: tourData.tourPlan?.map((plan, index) => ({
      "@type": "ItemList",
      position: index + 1,
      name: plan,
    })),

    offers: {
      "@type": "Offer",
      price: tourData.costFrom,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
    },

    location: {
      "@type": "Place",
      name: tourData.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
        addressRegion: divisionName,
      },
    },

    provider: {
      "@type": "Organization",
      name: "ExploreBangla",
      url: "https://explorebangla.com",
    },
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <html lang="en" />

        <title>{title}</title>

        <meta name="description" content={description} />

        <meta
          name="keywords"
          content={`${tourData.title}, ${tourData.location}, ${divisionName}, Bangladesh tours, Bangladesh travel, ExploreBangla, tour booking`}
        />

        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ExploreBangla" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta
          property="og:image:alt"
          content={`${tourData.title} - ExploreBangla`}
        />
        <meta property="og:locale" content="en_BD" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <article>
          {/* Header */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {tourData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {tourData.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  Max {tourData.maxGuest} guests
                </span>
              </div>
            </div>

            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to={`/booking/${tourData._id}`}>Book this tour</Link>
            </Button>
          </header>

          {/* Image Gallery */}
          <section
            aria-label={`${tourData.title} image gallery`}
            className="mb-10"
          >
            <div className="relative group overflow-hidden rounded-2xl border bg-muted shadow-sm">
              <div className="aspect-[16/10] md:aspect-[16/8] lg:aspect-[21/9] overflow-hidden">
                {tourData.images?.[activeImage] && (
                  <img
                    key={activeImage}
                    src={tourData.images[activeImage]}
                    alt={`${tourData.title} - ${tourData.location} travel image ${activeImage + 1}`}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div
                className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur"
                aria-label={`Image ${activeImage + 1} of ${tourData.images?.length}`}
              >
                {activeImage + 1} / {tourData.images?.length}
              </div>

              {tourData.images?.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Previous tour image"
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? tourData.images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <Button
                    size="icon"
                    variant="secondary"
                    aria-label="Next tour image"
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === tourData.images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {tourData.images && tourData.images.length > 1 && (
              <div
                className="mt-4 flex gap-3 overflow-x-auto pb-2"
                aria-label="Tour image thumbnails"
              >
                {tourData.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View image ${index + 1}`}
                    aria-current={activeImage === index}
                    onClick={() => setActiveImage(index)}
                    className={`relative shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                      activeImage === index
                        ? "ring-2 ring-primary ring-offset-2 scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tourData.title} thumbnail ${index + 1}`}
                      loading="lazy"
                      className="h-20 w-24 sm:h-24 sm:w-32 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section aria-labelledby="about-tour">
                <h2 id="about-tour" className="text-lg font-semibold mb-3">
                  About this tour
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {tourData.description}
                </p>
              </section>

              <Separator />

              {/* Tour Details */}
              <section aria-labelledby="tour-details">
                <h2 id="tour-details" className="text-lg font-semibold mb-4">
                  Tour details
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <FactCard
                    icon={<Calendar className="size-4" />}
                    label="Dates"
                    value={`${format(
                      new Date(tourData.startDate || new Date()),
                      "MMM d",
                    )} - ${format(
                      new Date(tourData.endDate || new Date()),
                      "MMM d, yyyy",
                    )}`}
                  />

                  <FactCard
                    icon={<PlaneTakeoff className="size-4" />}
                    label="Departure"
                    value={tourData.departureLocation}
                  />

                  <FactCard
                    icon={<PlaneLanding className="size-4" />}
                    label="Arrival"
                    value={tourData.arrivalLocation}
                  />

                  <FactCard
                    icon={<MapPin className="size-4" />}
                    label="Division"
                    value={divisionName}
                  />

                  <FactCard
                    icon={<Layers className="size-4" />}
                    label="Tour type"
                    value={tourData.tourType?.name}
                  />

                  <FactCard
                    icon={<Cake className="size-4" />}
                    label="Min age"
                    value={`${tourData.minAge} years`}
                  />
                </div>
              </section>

              <Separator />

              {/* Amenities / Included / Excluded */}
              <section
                aria-labelledby="tour-features"
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                <div>
                  <h3 id="tour-features" className="font-semibold mb-3">
                    Amenities
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {tourData.amenities?.map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="font-normal"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Included</h3>

                  <ul className="space-y-2">
                    {tourData.included?.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Excluded</h3>

                  <ul className="space-y-2">
                    {tourData.excluded?.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <XCircle className="size-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Tour Plan */}
              <section aria-labelledby="tour-plan">
                <h2 id="tour-plan" className="text-lg font-semibold mb-4">
                  Tour plan
                </h2>

                <ol className="space-y-4">
                  {tourData.tourPlan?.map((plan, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>

                      <p className="pt-0.5 text-sm sm:text-base">{plan}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Booking Sidebar */}
            <aside
              aria-label="Tour booking information"
              className="lg:col-span-1"
            >
              <Card className="lg:sticky lg:top-6">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <Wallet className="size-5 text-primary mb-0.5" />

                    <span className="text-2xl font-bold text-primary">
                      ৳{tourData.costFrom?.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5">
                    per person, starting from
                  </p>

                  <Separator className="mb-5" />

                  <dl className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground flex items-center gap-1.5">
                        <Users className="size-4" />
                        Max guests
                      </dt>

                      <dd className="font-medium">{tourData.maxGuest}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        Duration
                      </dt>

                      <dd className="font-medium">
                        {tourData.tourPlan?.length} days
                      </dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="text-muted-foreground flex items-center gap-1.5">
                        <Cake className="size-4" />
                        Min age
                      </dt>

                      <dd className="font-medium">{tourData.minAge}+</dd>
                    </div>
                  </dl>

                  <Button asChild size="lg" className="w-full">
                    <Link to={`/booking/${tourData._id}`}>Book this tour</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}

function FactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="border border-muted rounded-lg p-3 bg-muted/30">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
        {icon}
        {label}
      </div>

      <p className="text-sm font-medium truncate">{value || "—"}</p>
    </div>
  );
}

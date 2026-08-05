import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetSingleTourQuery } from "@/redux/features/Tour/tour.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Minus,
  Plus,
  MapPin,
  Users,
  Layers,
  CalendarDays,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleTourQuery(id);
  const [createBooking] = useCreateBookingMutation();

  const tourData = data;

  useEffect(() => {
    if (!isLoading && !isError && tourData) {
      setTotalAmount(guestCount * tourData.costFrom);
    }
  }, [guestCount, isLoading, isError, tourData]);

  const incrementGuest = () => {
    if (tourData && guestCount < tourData.maxGuest) {
      setGuestCount((prv) => prv + 1);
    }
  };

  const decrementGuest = () => {
    setGuestCount((prv) => Math.max(1, prv - 1));
  };

  const handleBooking = async () => {
    if (!data) return;

    const bookingData = {
      tour: id,
      guestCount,
    };

    setIsBooking(true);
    try {
      const res = await createBooking(bookingData).unwrap();

      if (res.success) {
        window.open(res.data.paymentUrl);
      }
    } catch (err: any) {
      if (
        err?.data?.message?.trim() ===
        "Please Update your profile to book a tour"
      ) {
        navigate("/dashboard/my-profile", {
          state: { from: `/booking/${id}` },
        });
      }

      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError)
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="h-64 bg-muted rounded-xl" />
            <div className="h-6 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
          <div className="h-80 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>
        <p className="text-muted-foreground text-sm">
          We couldn't load this tour. Please try again.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-semibold mb-1">No data found</h2>
        <p className="text-muted-foreground text-sm">
          This tour may no longer be available.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Tour summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden bg-muted aspect-video">
            <img
              src={tourData.images[0]}
              alt={tourData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {tourData.title}
            </h1>
            <p className="text-muted-foreground mb-4">
              {tourData.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <InfoItem icon={<MapPin className="size-4" />} label="Location" value={tourData.location} />
              <InfoItem
                icon={<CalendarDays className="size-4" />}
                label="Dates"
                value={`${format(new Date(tourData.startDate), "MMM d")} – ${format(
                  new Date(tourData.endDate),
                  "MMM d"
                )}`}
              />
              <InfoItem icon={<Layers className="size-4" />} label="Tour type" value={tourData.tourType.name} />
              <InfoItem icon={<Users className="size-4" />} label="Max guests" value={String(tourData.maxGuest)} />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">What's included</h3>
            <ul className="space-y-2">
              {tourData.included.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Tour plan</h3>
            <ol className="space-y-4">
              {tourData.tourPlan.map((plan: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm sm:text-base">{plan}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Booking card */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-6">
            <CardContent className="p-5 sm:p-6">
              <h2 className="text-xl font-bold mb-5">Booking details</h2>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Number of guests
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementGuest}
                    disabled={guestCount <= 1}
                    aria-label="Decrease guests"
                    className="w-9 h-9 rounded-full border border-muted flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={incrementGuest}
                    disabled={guestCount >= tourData.maxGuest}
                    aria-label="Increase guests"
                    className="w-9 h-9 rounded-full border border-muted flex items-center justify-center disabled:opacity-40 hover:bg-muted transition-colors"
                  >
                    <Plus className="size-4" />
                  </button>
                  <span className="text-xs text-muted-foreground ml-1">
                    Max {tourData.maxGuest}
                  </span>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per person</span>
                  <span>৳{tourData.costFrom.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests</span>
                  <span>{guestCount}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total amount</span>
                  <span className="text-primary">
                    ৳{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full"
                size="lg"
                disabled={isBooking}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Book now"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="border border-muted rounded-lg p-2.5 bg-muted/30">
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
        {icon}
        {label}
      </div>
      <p className="text-sm font-medium truncate">{value || "—"}</p>
    </div>
  );
}
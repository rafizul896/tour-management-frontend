import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TablePagination from "@/components/ui/core/TablePagination";
import {
  useGetMyBookingsQuery,
  useInitPaymentMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  Users,
  CalendarDays,
  CreditCard,
  PackageOpen,
  ImageOff,
  Loader2,
} from "lucide-react";
import { Booking, BOOKING_STATUS, BookingStatus } from "@/types/Booking.type";
import { cn } from "@/lib/utils";

const statusStyles: Record<BookingStatus, string> = {
  PENDING:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
  CANCEL:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900",
  COMPLETE:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
  FAILED:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900",
};

// "ALL" is a UI-only filter, not part of BOOKING_STATUS
type StatusFilter = BookingStatus | "ALL";

const FILTER_TABS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: BOOKING_STATUS.PENDING },
  { label: "Complete", value: BOOKING_STATUS.COMPLETE },
  { label: "Cancelled", value: BOOKING_STATUS.CANCEL },
  { label: "Failed", value: BOOKING_STATUS.FAILED },
];

const currency = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const BookingCardSkeleton = () => (
  <Card className="flex flex-col sm:flex-row gap-4 p-4">
    <Skeleton className="w-full h-40 sm:w-40 sm:h-28 shrink-0 rounded-md" />
    <div className="flex-1 flex flex-col justify-between gap-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </Card>
);

const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const { data, isFetching } = useGetMyBookingsQuery({
    page: currentPage,
    limit,
  });

  const [initPayment] = useInitPaymentMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const allBookings: Booking[] = data?.data || data || [];
  const totalPage = data?.meta?.totalPage || 1;

  const bookings =
    statusFilter === "ALL"
      ? allBookings
      : allBookings.filter((b) => b.status === statusFilter);

  const handleTabChange = (value: string) => {
    setStatusFilter(value as StatusFilter);
    setCurrentPage(1);
  };

  const handleCancel = async (bookingId: string) => {
    const toastId = toast.loading("Cancelling booking...");
    setCancellingId(bookingId);
    try {
      const res = await updateBookingStatus({
        id: bookingId,
        status: BOOKING_STATUS.CANCEL,
      }).unwrap();

      if (res?.success) {
        toast.success("Booking cancelled", { id: toastId });
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    } finally {
      setCancellingId(null);
    }
  };

  const handlePayment = async (bookingId: string) => {
    const toastId = toast.loading("Redirecting to payment...");
    setPayingId(bookingId);
    try {
      const res = await initPayment(bookingId).unwrap();

      if (res.success) {
        window.open(res.data.paymentUrl, "_blank", "noopener,noreferrer");
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="my-6 sm:my-8">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          My Bookings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track the status of your tour bookings and payments.
        </p>
      </div>

      <Tabs
        value={statusFilter}
        onValueChange={handleTabChange}
        className="mb-6"
      >
        <TabsList className="w-full sm:w-auto flex h-auto flex-nowrap justify-start gap-1 overflow-x-auto rounded-lg p-1 no-scrollbar">
          {FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="shrink-0 whitespace-nowrap text-xs sm:text-sm"
            >
              {tab.label}
              {tab.value !== "ALL" && (
                <span className="ml-1.5 text-muted-foreground tabular-nums">
                  ({allBookings.filter((b) => b.status === tab.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isFetching ? (
        <div className="grid grid-cols-1 gap-4" aria-live="polite" aria-busy="true">
          <span className="sr-only">Loading your bookings…</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 px-4 text-center text-muted-foreground">
          <PackageOpen className="mb-1 h-8 w-8 opacity-60" />
          <p className="font-medium text-foreground">
            {statusFilter === "ALL"
              ? "No bookings yet"
              : `No ${statusFilter.toLowerCase()} bookings`}
          </p>
          <p className="text-sm max-w-xs">
            {statusFilter === "ALL"
              ? "Tours you book will show up here so you can track status and payments."
              : "Switch to another tab to see bookings with a different status."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => {
            const canPay =
              booking.status === "PENDING" &&
              booking.payment?.status !== "PAID";
            const canCancel = booking.status === "PENDING";
            const isPayingThis = payingId === booking._id;
            const isCancellingThis = cancellingId === booking._id;

            return (
              <Card
                key={booking._id}
                className="flex flex-col gap-4 p-4 transition-shadow hover:shadow-sm sm:flex-row"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md bg-muted sm:aspect-auto sm:h-28 sm:w-40">
                  {booking.tour?.images?.[0] ? (
                    <img
                      src={booking.tour.images[0]}
                      alt={booking.tour.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground">
                      <ImageOff className="h-5 w-5" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium leading-snug">
                        {booking.tour?.title || "Tour unavailable"}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 shrink-0" />
                          {booking.guestCount} guest
                          {booking.guestCount > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                          {booking.createdAt
                            ? format(new Date(booking.createdAt), "PP")
                            : "-"}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 font-medium",
                        statusStyles[booking.status],
                      )}
                    >
                      {booking.status}
                    </Badge>
                  </div>

                  <Separator className="sm:hidden" />

                  <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-1.5 text-sm">
                      <CreditCard className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      {booking.payment ? (
                        <span
                          className={cn(
                            "font-medium",
                            booking.payment.status === "PAID"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400",
                          )}
                        >
                          {currency.format(booking.payment.amount)} ·{" "}
                          {booking.payment.status}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Payment not initiated
                        </span>
                      )}
                    </div>

                    {(canPay || canCancel) && (
                      <div className="flex gap-2">
                        {canCancel && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 sm:flex-none"
                                disabled={isCancellingThis}
                              >
                                {isCancellingThis && (
                                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                )}
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Cancel this booking?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will cancel your booking for{" "}
                                  <span className="font-medium text-foreground">
                                    {booking.tour?.title || "this tour"}
                                  </span>
                                  . This action can't be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Keep booking
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleCancel(booking._id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Cancel booking
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        {canPay && (
                          <Button
                            size="sm"
                            className="flex-1 sm:flex-none"
                            disabled={isPayingThis}
                            onClick={() => handlePayment(booking._id)}
                          >
                            {isPayingThis && (
                              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            )}
                            Pay now
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
          limit={limit}
          onLimitChange={setLimit}
          isPending={isFetching}
        />
      </div>
    </div>
  );
};

export default BookingHistory;
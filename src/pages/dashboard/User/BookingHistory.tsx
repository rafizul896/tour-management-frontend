import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TablePagination from "@/components/ui/core/TablePagination";
import {
  useGetMyBookingsQuery,
  useInitPaymentMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Users, CalendarDays, Loader2, PackageOpen } from "lucide-react";
import { Booking, BOOKING_STATUS, BookingStatus } from "@/types/Booking.type";

const statusVariant: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "secondary",
  CANCEL: "destructive",
  COMPLETE: "outline",
  FAILED: "destructive",
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

const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const { data, isFetching } = useGetMyBookingsQuery({
    page: currentPage,
    limit,
  });

  const [initPayment, { isLoading: isPaying }] = useInitPaymentMutation();
  const [updateBookingStatus, { isLoading: isCancelling }] =
    useUpdateBookingStatusMutation();

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
    const status = BOOKING_STATUS.CANCEL;
    try {
      const res = await updateBookingStatus({
        id: bookingId,
        status,
      }).unwrap();

      if (res?.success) {
        toast.success("Booking cancelled", { id: toastId });
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    }
  };

  const handlePayment = async (bookingId: string) => {
    const toastId = toast.loading("Redirecting to payment...");

    try {
      const res = await initPayment(bookingId).unwrap();

      if (res.success) {
        window.open(res.data.paymentUrl, "_blank");
        toast.dismiss(toastId);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="my-6 sm:my-8">
        <h1 className="text-lg sm:text-xl font-semibold">My Bookings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track the status of your tour bookings and payments.
        </p>
      </div>

      <Tabs
        value={statusFilter}
        onValueChange={handleTabChange}
        className="mb-6"
      >
        <TabsList className="w-full sm:w-auto flex-wrap h-auto sm:h-10 justify-start overflow-x-auto no-scrollbar gap-1 p-1">
          {FILTER_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="whitespace-nowrap text-xs sm:text-sm"
            >
              {tab.label}
              {tab.value !== "ALL" && (
                <span className="ml-1.5 text-muted-foreground">
                  ({allBookings.filter((b) => b.status === tab.value).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isFetching ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-center py-16 text-muted-foreground border rounded-lg">
          <PackageOpen className="h-8 w-8 mb-1 opacity-60" />
          {statusFilter === "ALL"
            ? "You haven't booked any tours yet."
            : `No ${statusFilter.toLowerCase()} bookings found.`}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="flex flex-col sm:flex-row gap-4 p-4"
            >
              <div className="relative w-full h-40 sm:w-40 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted">
                {booking.tour?.images?.[0] ? (
                  <img
                    src={booking.tour.images[0]}
                    alt={booking.tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">
                      {booking.tour?.title || "Tour unavailable"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        {booking.guestCount} guest
                        {booking.guestCount > 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        {booking.createdAt
                          ? format(new Date(booking.createdAt), "PP")
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={statusVariant[booking.status]}
                    className="shrink-0"
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                  <div className="text-sm">
                    {booking.payment ? (
                      <span
                        className={
                          booking.payment.status === "PAID"
                            ? "text-green-600 font-medium"
                            : "text-amber-600 font-medium"
                        }
                      >
                        TK {booking.payment.amount} — {booking.payment.status}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Payment not initiated
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {booking.status === "PENDING" &&
                      booking.payment?.status !== "PAID" && (
                        <Button
                          size="sm"
                          className="flex-1 sm:flex-none"
                          disabled={isPaying}
                          onClick={() => handlePayment(booking._id)}
                        >
                          Pay Now
                        </Button>
                      )}
                    {booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        disabled={isCancelling}
                        onClick={() => handleCancel(booking._id)}
                      >
                        {isCancelling && (
                          <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                        )}
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
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

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/core/TablePagination";
import {
  useGetMyBookingsQuery,
  useInitPaymentMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Users, CalendarDays, Loader2 } from "lucide-react";

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CANCEL: "CANCEL",
  COMPLETE: "COMPLETE",
  FAILED: "FAILED",
} as const;

type BookingStatus = keyof typeof BOOKING_STATUS;

interface Booking {
  _id: string;
  tour: {
    _id: string;
    title: string;
    costFrom: number;
    images?: string[];
  };
  payment?: {
    _id: string;
    status: string;
    amount: number;
  };
  guestCount: number;
  status: BookingStatus;
  createdAt: string;
}

const statusVariant: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "secondary",
  CANCEL: "destructive",
  COMPLETE: "outline",
  FAILED: "destructive",
};

const MyBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching } = useGetMyBookingsQuery({
    page: currentPage,
    limit,
  });

  console.log(data);

  const [initPayment] = useInitPaymentMutation();
  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const bookings: Booking[] = data?.data || data || [];
  const totalPage = data?.meta?.totalPage || 1;
  console.log(totalPage)

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
    const toastId = toast.loading("Cancelling booking...");

    try {
      const res = await initPayment(bookingId).unwrap();

      if (res.success) {
        window.open(res.data.paymentUrl, "_blank");
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-5">
      <div className="my-8">
        <h1 className="text-xl font-semibold">My Bookings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track the status of your tour bookings and payments.
        </p>
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border rounded-lg">
          You haven&apos;t booked any tours yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4"
            >
              <div className="relative w-full sm:w-40 h-28 shrink-0 rounded-md overflow-hidden bg-muted">
                {booking.tour?.images?.[0] ? (
                  <img
                    src={booking.tour.images[0]}
                    alt={booking.tour.title}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">
                      {booking.tour?.title || "Tour unavailable"}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {booking.guestCount} guest
                        {booking.guestCount > 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {booking.createdAt
                          ? format(new Date(booking.createdAt), "PP")
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <Badge variant={statusVariant[booking.status]}>
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm">
                    {booking.payment ? (
                      <span
                        className={
                          booking.payment.status === "PAID"
                            ? "text-green-600 font-medium"
                            : "text-amber-600 font-medium"
                        }
                      >
                        TK {" "}
                        {booking.payment.amount} — {booking.payment.status}
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
                          onClick={() => handlePayment(booking._id)}
                        >
                          Pay Now
                        </Button>
                      )}
                    {booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPage > 1 && (
        <div className="mt-6">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={setCurrentPage}
            limit={limit}
            onLimitChange={setLimit}
            isPending={isFetching}
          />
        </div>
      )}
    </div>
  );
};

export default MyBookings;

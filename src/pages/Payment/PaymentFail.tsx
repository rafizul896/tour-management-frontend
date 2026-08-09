import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";

import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api"; // TODO: adjust to your booking API slice
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  XCircle,
  Copy,
  Users,
  Calendar,
  Compass,
  RotateCcw,
  MessageCircleQuestion,
} from "lucide-react";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface BookingListItem {
  _id: string;
  guestCount: number;
  status: string;
  createdAt: string;
  tour?: {
    _id: string;
    title: string;
    costFrom: number;
    images: string[];
  };
  payment?: {
    transactionId: string;
    amount: number;
    status: string;
  };
}

const formatBDT = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id") ?? "";
  const message =
    searchParams.get("message") ?? "Your payment could not be completed.";
  const amountParam = searchParams.get("amount");
  const amount = amountParam ? Number(amountParam) : undefined;

  const { data: userInfo } = useUserInfoQuery(undefined);

  const { data, isFetching } = useGetMyBookingsQuery(
    {
      user: userInfo?._id,
      page: 1,
      limit: 10,
    },
    { skip: !userInfo?._id },
  );

  const booking = useMemo<BookingListItem | undefined>(
    () =>
      (data as any)?.data?.find(
        (b: BookingListItem) => b.payment?.transactionId === tranId,
      ),
    [data, tranId],
  );

  const handleCopy = () => {
    if (!tranId) return;
    navigator.clipboard.writeText(tranId);
    toast.success("Transaction ID copied");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/40 px-4 py-16 sm:px-6">
      <div className="w-full max-w-xl">
        {/* Fail header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="h-9 w-9" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Payment failed
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {decodeURIComponent(message)} — no amount was deducted, and your
            booking is still on hold.
          </p>
        </div>

        {/* Summary card */}
        <Card className="mt-8 border-border">
          <CardContent className="flex flex-col gap-5 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Attempted amount
              </span>
              <span className="text-xl font-bold text-foreground">
                {amount !== undefined ? formatBDT(amount) : "—"}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs font-medium text-muted-foreground">
                  Transaction ID
                </span>
                <p className="break-all font-mono text-sm text-foreground">
                  {tranId || "—"}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleCopy}
                disabled={!tranId}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {isFetching && (
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            )}

            {!isFetching && booking && (
              <>
                <Separator />
                <div className="flex gap-4">
                  {booking.tour?.images?.[0] && (
                    <img
                      src={booking.tour.images[0]}
                      alt={booking.tour.title}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground">
                        {booking.tour?.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="shrink-0 border-destructive/40 text-[11px] text-destructive"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {booking.guestCount} guest
                        {booking.guestCount > 1 ? "s" : ""}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Reserved {formatDate(booking.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to={`/tours/${booking.tour?._id}?retry=${booking._id}`}>
                    <RotateCcw className="h-4 w-4" />
                    Try payment again
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/user/bookings">View my bookings</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/contactUs">
              <MessageCircleQuestion className="h-4 w-4" />
              Contact support
            </Link>
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Compass className="h-3.5 w-3.5" />
          Still deciding?{" "}
          <Link
            to="/tours"
            className="font-medium text-primary hover:underline"
          >
            Browse other tours
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;

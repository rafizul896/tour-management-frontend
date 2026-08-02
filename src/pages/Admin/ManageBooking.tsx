import { toast } from "sonner";
import { useState } from "react";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/booking.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CANCEL: "CANCEL",
  COMPLETE: "COMPLETE",
  FAILED: "FAILED",
} as const;

type BookingStatus = keyof typeof BOOKING_STATUS;

interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
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
  CANCEL: "default",
  COMPLETE: "outline",
  FAILED: "destructive",
};

const ManageBooking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching } = useGetAllBookingsQuery({
    page: currentPage,
    limit,
  });

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const handleStatusChange = async (bookingId: string, status: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateBookingStatus({
        id: bookingId,
        status,
      }).unwrap();

      if (res.success) {
        toast.success("Status updated", { id: toastId });
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
        { id: toastId },
      );
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  const columns: Column<Booking>[] = [
    {
      header: "User",
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-medium">{item?.user?.name || "N/A"}</span>
          <span className="text-muted-foreground text-xs">
            {item?.user?.email}
          </span>
        </div>
      ),
    },
    {
      header: "Tour",
      className: "w-full",
      accessor: (item) => item.tour?.title || "N/A",
    },
    {
      header: "Guests",
      accessor: (item) => item.guestCount,
    },
    {
      header: "Payment",
      accessor: (item) =>
        item.payment ? (
          <div className="flex flex-col">
            <span>${item.payment.amount}</span>
            <span className="text-muted-foreground text-xs">
              {item.payment.status}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">Unpaid</span>
        ),
    },
    {
      header: "Booked On",
      accessor: (item) =>
        item.createdAt ? format(new Date(item.createdAt), "PP") : "-",
    },
    {
      header: "Status",
      accessor: (item) => (
        <div className="flex justify-center items-center gap-2">
          <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
        </div>
      ),
    },
    {
      header: "Action",
      accessor: (item) => (
        <div className="flex justify-center items-center gap-2">
          <Select
            value={item.status}
            onValueChange={(value) => handleStatusChange(item._id, value)}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(BOOKING_STATUS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Bookings</h1>
      </div>

      <ManagementTable<Booking>
        data={data?.data ?? []}
        columns={columns}
        getRowKey={(item) => item._id}
        isRefreshing={isFetching}
        emptyMessage="No bookings found."
      />

      {totalPage > 1 && (
        <div className="mt-4">
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

export default ManageBooking;

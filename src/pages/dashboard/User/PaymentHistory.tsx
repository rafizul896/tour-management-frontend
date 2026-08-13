import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Wallet, Receipt, TrendingUp, Download, Search } from "lucide-react";
import { Booking } from "@/types/Booking.type";
import { PaymentRow, PaymentWithInvoice } from "@/types/payment.type";

const paymentStatusVariant: Record<string, string> = {
  PAID: "bg-green-100 text-green-700 hover:bg-green-100",
  UNPAID: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  FAILED: "bg-red-100 text-red-700 hover:bg-red-100",
};

const currency = (amount: number) => `TK ${amount.toLocaleString("en-BD")}`;

const PaymentHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: userInfo } = useUserInfoQuery(undefined);

  const { data, isFetching } = useGetMyBookingsQuery(
    {
      user: userInfo?._id,
      status: "COMPLETE",
      page: currentPage,
      limit,
    },
    { skip: !userInfo?._id },
  );

  const bookings: Booking[] = data?.data?.data || data?.data || [];
  const totalPage = data?.data?.meta?.totalPage || 1;

  const payments: PaymentRow[] = useMemo(
    () =>
      bookings
        .filter((b) => b.payment)
        .map((b) => ({
          booking: b,
          payment: b.payment as PaymentWithInvoice,
        })),
    [bookings],
  );

  const filteredPayments = useMemo(() => {
    if (!search.trim()) return payments;
    const q = search.trim().toLowerCase();
    return payments.filter(
      ({ booking, payment }) =>
        booking.tour?.title?.toLowerCase().includes(q) ||
        payment.transactionId?.toLowerCase().includes(q),
    );
  }, [payments, search]);

  const totalPaid = payments
    .filter(({ payment }) => payment.status === "PAID")
    .reduce((sum, { payment }) => sum + payment.amount, 0);

  const paidCount = payments.filter(
    ({ payment }) => payment.status === "PAID",
  ).length;

  const thisMonthPaid = payments
    .filter(({ payment }) => {
      if (payment.status !== "PAID") return false;
      const d = new Date(payment.updatedAt || payment.createdAt);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, { payment }) => sum + payment.amount, 0);

  const columns: Column<PaymentRow>[] = [
    {
      header: "Tour",
      accessor: (row) => (
        <p className="font-medium truncate max-w-[220px]">
          {row.booking.tour?.title || "Tour unavailable"}
        </p>
      ),
      className: "min-w-[220px]",
    },
    {
      header: "Transaction ID",
      accessor: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.payment.transactionId}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (row) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {format(new Date(row.payment.createdAt), "PP")}
        </span>
      ),
    },
    {
      header: "Method",
      accessor: (row) =>
        row.payment.paymentGatewayData?.card_issuer ||
        row.payment.paymentGatewayData?.card_type || (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      header: "Amount",
      accessor: (row) => (
        <span className="font-medium whitespace-nowrap">
          {currency(row.payment.amount)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <Badge
          className={
            paymentStatusVariant[row.payment.status] ??
            "bg-slate-100 text-slate-700 hover:bg-slate-100"
          }
        >
          {row.payment.status}
        </Badge>
      ),
    },
    {
      header: "Invoice",
      accessor: (row) =>
        row.payment.invoiceUrl ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs"
            asChild
          >
            <a
              href={row.payment.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-3.5 w-3.5" />
              Invoice
            </a>
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">Not available</span>
        ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto md:px-5">
      <div className="my-6 sm:my-8">
        <h1 className="text-lg sm:text-xl font-semibold">Payment History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          A record of every payment made against your completed bookings.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground text-center">Total paid</p>
            <p className="text-lg font-semibold truncate">
              {currency(totalPaid)}
            </p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Transactions</p>
            <p className="text-lg text-center font-semibold">{paidCount}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground text-center">This month</p>
            <p className="text-lg font-semibold truncate">
              {currency(thisMonthPaid)}
            </p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by tour or transaction ID"
          className="pl-9"
        />
      </div>

      <ManagementTable<PaymentRow>
        data={filteredPayments}
        columns={columns}
        getRowKey={(row) => row.payment._id}
        isRefreshing={isFetching}
        emptyMessage={
          search
            ? "No payments match your search."
            : "You don't have any payments yet."
        }
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

export default PaymentHistory;

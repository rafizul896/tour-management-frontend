import { toast } from "sonner";
import { useState } from "react";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";
import { Link, useNavigate } from "react-router";
import {
  useDeleteTourMutation,
  useGetAllToursQuery,
} from "@/redux/features/Tour/tour.api";
import { ITourPackage } from "@/types";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const ManageTour = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc",
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const { data, isFetching } = useGetAllToursQuery({
    page: currentPage,
    limit,
    sortBy: sortOrder === "desc" ? `-${sortBy}` : sortBy,
  });

  const [deleteTour] = useDeleteTourMutation();

  const handleRemoveTour = async (tourId: string) => {
    try {
      const res = await deleteTour(tourId).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Column definitions — same shape as your old <TableHead>/<TableCell> pairs
  const columns: Column<ITourPackage>[] = [
    {
      header: "Title",
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-medium">{item.title}</span>
          <span className="text-xs text-muted-foreground">
            {item.location || "—"}
          </span>
        </div>
      ),
      className: "min-w-[200px]",
      sortKey: "title",
    },
    {
      header: "Start Date",
      accessor: (item) => formatDate(item.startDate),
      sortKey: "startDate",
    },
    {
      header: "End Date",
      accessor: (item) => formatDate(item.endDate),
      sortKey: "endDate",
    },
    {
      header: "Cost From",
      accessor: (item) =>
        item.costFrom !== undefined ? `$${item.costFrom}` : "—",
      sortKey: "costFrom",
    },
    {
      header: "Max Guest",
      accessor: (item) => item.maxGuest ?? "—",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tours</h1>
        <Link to="/admin/add-tour">
          <Button>Add Tour</Button>
        </Link>
      </div>

      <ManagementTable<ITourPackage>
        data={data?.data ?? []}
        columns={columns}
        getRowKey={(item) => item._id}
        isRefreshing={isFetching}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        emptyMessage="No tours found."
        onView={(item) => navigate(`/tours/${item.slug}`)}
        onEdit={(item) => navigate(`/admin/update-tour/${item._id}`)}
        onDelete={(item) => handleRemoveTour(item._id)}
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

export default ManageTour;

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";

interface TourType {
  _id: string;
  name: string;
}

const ManageTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(1);

  const { data, isFetching } = useGetTourTypesQuery({
    page: currentPage,
    limit,
  });
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage || 2;

  // Column definitions — same shape as your old <TableHead>/<TableCell> pairs
  const columns: Column<TourType>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "w-full font-medium",
    },
    {
      header: "Action",
      accessor: (item) => (
        <div className="flex justify-end">
          <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
            <Button size="sm">
              <Trash2 />
            </Button>
          </DeleteConfirmation>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>

      <ManagementTable<TourType>
        data={data ?? []}
        columns={columns}
        getRowKey={(item) => item._id}
        isRefreshing={isFetching}
        emptyMessage="No tour types found."
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

export default ManageTourType;

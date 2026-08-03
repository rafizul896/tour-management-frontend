import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { toast } from "sonner";
import { useState } from "react";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";
import {
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} from "@/redux/features/division/division.api";
import { UpdateDivisionModal } from "@/components/modules/Admin/Division/UpdateDivisionModal";

interface Division {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}

const ManageDivision = () => {
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching } = useGetDivisionsQuery({
    page: currentPage,
    limit,
  });

  const [deleteDivision] = useDeleteDivisionMutation();

  const handleDeleteDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await deleteDivision(divisionId).unwrap();

      if (res.success) {
        toast.success(res?.message || "Division deleted", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  const columns: Column<Division>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-medium",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Divisions</h1>
        <AddDivisionModal />
      </div>

      <ManagementTable<Division>
        data={data ?? []}
        columns={columns}
        getRowKey={(item) => item._id}
        isRefreshing={isFetching}
        emptyMessage="No divisions found."
        onDelete={(item) => handleDeleteDivision(item._id)}
        onEdit={(item) => setEditingDivision(item)}
      />

      {editingDivision && (
        <UpdateDivisionModal
          division={editingDivision}
          open={!!editingDivision}
          onOpenChange={(open) => !open && setEditingDivision(null)}
        />
      )}

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

export default ManageDivision;

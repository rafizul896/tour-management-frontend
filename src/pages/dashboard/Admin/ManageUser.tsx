import { useMemo, useState } from "react";
import ManagementTable, { Column } from "@/components/ui/core/ManageTable";
import TablePagination from "@/components/ui/core/TablePagination";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye } from "lucide-react";
import { useGetAllGuideApplicationsQuery } from "@/redux/features/guide/guide.api";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import {
  GuideApplication,
  GuideApplicationDetailsModal,
  GuideApplicationUser,
} from "@/components/modules/Admin/User/GuideApplicationDetailsModal";

interface User extends GuideApplicationUser {
  role: "USER" | "GUIDE" | "ADMIN" | "SUPER_ADMIN";
  isActive: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isVerified: boolean;
  isDeleted: boolean;
}

const ROLE_BADGE: Record<string, string> = {
  USER: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  GUIDE: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  ADMIN: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  SUPER_ADMIN: "bg-purple-200 text-purple-800 hover:bg-purple-200",
};

const ACCOUNT_STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700 hover:bg-green-100",
  INACTIVE: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  BLOCKED: "bg-red-100 text-red-700 hover:bg-red-100",
};

const GUIDE_STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  APPROVED: "bg-green-100 text-green-700 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
};

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isFetching } = useGetAllUsersQuery({
    page: currentPage,
    limit,
  });

  // All guide applications, used to look up each user's application status
  const { data: guideApplications } =
    useGetAllGuideApplicationsQuery(undefined);

    console.log(guideApplications)

  // The application (+ owning user) currently open in the details modal
  const [activeApplication, setActiveApplication] = useState<{
    application: GuideApplication;
    user: User;
  } | null>(null);
  
const applicationByUser = useMemo(() => {
  const map = new Map<string, GuideApplication>();
  (guideApplications?.data ?? []).forEach((app: GuideApplication) => {
    const userId =
      typeof app.user === "string" ? app.user : (app.user as any)?._id;
    if (userId) map.set(userId, app);
  });
  return map;
}, [guideApplications]);

  const totalPage = data?.meta?.totalPage || 1;

  const columns: Column<User>[] = [
    {
      header: "User",
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={item?.picture} alt={item?.name} />
            <AvatarFallback className="text-xs">
              {item?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium leading-tight">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
      className: "min-w-[220px]",
    },
    {
      header: "Role",
      accessor: (item) => (
        <Badge className={ROLE_BADGE[item.role] ?? ROLE_BADGE.USER}>
          {item.role}
        </Badge>
      ),
    },
    {
      header: "Account Status",
      accessor: (item) => (
        <div className="flex flex-col gap-1">
          <Badge
            className={
              ACCOUNT_STATUS_BADGE[item.isActive] ?? ACCOUNT_STATUS_BADGE.ACTIVE
            }
          >
            {item.isActive}
          </Badge>
          {item.isDeleted && (
            <span className="text-[11px] font-medium text-destructive">
              Deleted
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Verified",
      accessor: (item) =>
        item.isVerified ? (
          <ShieldCheck className="h-4 w-4 text-green-600" />
        ) : (
          <span className="text-xs text-muted-foreground">No</span>
        ),
    },
    {
      header: "Guide Application",
      accessor: (item) => {
        const application = applicationByUser.get(item._id);

        if (!application) {
          return (
            <span className="text-xs text-muted-foreground">Not applied</span>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Badge
              className={
                GUIDE_STATUS_BADGE[application.status] ??
                GUIDE_STATUS_BADGE.PENDING
              }
            >
              {application.status}
            </Badge>

            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-xs"
              onClick={() => setActiveApplication({ application, user: item })}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
      className: "min-w-[220px]",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto md:px-5">
      <div className="flex justify-between my-8">
        <div>
          <h1 className="text-xl font-semibold">Manage Users</h1>
          <p className="text-sm text-muted-foreground">
            View all users and review guide applications.
          </p>
        </div>
      </div>

      <ManagementTable<User>
        data={data?.data ?? []}
        columns={columns}
        getRowKey={(item) => item._id}
        isRefreshing={isFetching}
        emptyMessage="No users found."
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

      <GuideApplicationDetailsModal
        open={!!activeApplication}
        onOpenChange={(open) => !open && setActiveApplication(null)}
        application={activeApplication?.application ?? null}
        user={activeApplication?.user ?? null}
      />
    </div>
  );
};

export default ManageUsers;

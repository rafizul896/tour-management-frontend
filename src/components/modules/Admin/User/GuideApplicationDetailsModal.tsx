import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUpdateApplicationStatusMutation } from "@/redux/features/guide/guide.api";

export interface GuideApplication {
  _id: string;
  user: string;
  division?: { _id: string; name: string };
  nidPhoto: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
}

export interface GuideApplicationUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  picture?: string;
}

const GUIDE_STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  APPROVED: "bg-green-100 text-green-700 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
};

interface GuideApplicationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: GuideApplication | null;
  user: GuideApplicationUser | null;
}

export function GuideApplicationDetailsModal({
  open,
  onOpenChange,
  application,
  user,
}: GuideApplicationDetailsModalProps) {
  const [updateGuideStatus, { isLoading: isUpdatingStatus }] =
    useUpdateApplicationStatusMutation();

  const handleUpdateGuideStatus = async (status: "APPROVED" | "REJECTED") => {
    if (!application) return;

    const toastId = toast.loading(
      status === "APPROVED" ? "Approving..." : "Rejecting...",
    );

    try {
      const res = await updateGuideStatus({
        id: application._id,
        status,
      }).unwrap();

      console.log(res);

      if (res.success) {
        toast.success(
          status === "APPROVED"
            ? "Guide application approved"
            : "Guide application rejected",
          { id: toastId },
        );
        onOpenChange(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update application", { id: toastId });
    }
  };

  if (!application || !user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Guide Application</DialogTitle>
          <DialogDescription>
            Review the applicant&apos;s details before approving or rejecting.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* User info */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge
              className={`md:ml-auto ${GUIDE_STATUS_BADGE[application.status]}`}
            >
              {application.status}
            </Badge>
          </div>

          <Separator />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone || "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Division</p>
              <p className="font-medium">{application.division?.name || "—"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{user.address || "—"}</p>
            </div>
          </div>

          <Separator />

          {/* NID photo */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">NID Photo</p>
            <a
              href={application.nidPhoto}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={application.nidPhoto}
                alt="NID"
                className="max-h-64 w-full rounded-md border object-contain"
              />
            </a>
          </div>
        </div>

        <DialogFooter className="mt-2 gap-2 sm:justify-end">
          {application.status === "PENDING" ? (
            <>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                disabled={isUpdatingStatus}
                onClick={() => handleUpdateGuideStatus("REJECTED")}
              >
                Reject
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={isUpdatingStatus}
                onClick={() => handleUpdateGuideStatus("APPROVED")}
              >
                Approve
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

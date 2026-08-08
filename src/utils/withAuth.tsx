import { ComponentType, useEffect } from "react";
import { Navigate } from "react-router";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { openAuthDialog } from "@/redux/features/uiModeSlice";
import { useAppDispatch } from "@/redux/hook";
import { TRole } from "@/types";
import { Loader2 } from "lucide-react";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const dispatch = useAppDispatch();

    const { data, isLoading } = useUserInfoQuery(undefined);

    useEffect(() => {
      if (!isLoading && !data?.email) {
        dispatch(openAuthDialog("login"));
      }
    }, [data, isLoading, dispatch]);

    // Loading state
    if (isLoading) {
      return (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    // Not authenticated
    if (!data?.email) {
      return <Navigate to="/" replace />;
    }

    // Role check
    if (requiredRole && data.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};

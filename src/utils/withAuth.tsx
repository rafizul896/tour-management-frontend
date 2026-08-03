import { ComponentType, useEffect } from "react";
import { Navigate } from "react-router";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { openAuthDialog } from "@/redux/features/uiModeSlice";
import { useAppDispatch } from "@/redux/hook";
import { TRole } from "@/types";

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
        <div className="flex h-screen items-center justify-center">
          Loading...
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

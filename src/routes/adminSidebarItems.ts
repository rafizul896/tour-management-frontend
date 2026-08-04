import ManageBooking from "@/pages/dashboard/Admin/ManageBooking";
import ManageDivision from "@/pages/dashboard/Admin/ManageDivision";
import ManageTour from "@/pages/dashboard/Admin/ManageTour";
import ManageTourType from "@/pages/dashboard/Admin/ManageTourType";
import ManageUsers from "@/pages/dashboard/Admin/ManageUser";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/dashboard/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Tour Type",
        url: "/admin/manage-tour-type",
        component: ManageTourType,
      },
      {
        title: "Division",
        url: "/admin/manage-division",
        component: ManageDivision,
      },
      {
        title: "Tour",
        url: "/admin/manage-tour",
        component: ManageTour,
      },
      {
        title: "Booking",
        url: "/admin/manage-booking",
        component: ManageBooking,
      },
      {
        title: "User",
        url: "/admin/manage-user",
        component: ManageUsers,
      },
    ],
  },
];

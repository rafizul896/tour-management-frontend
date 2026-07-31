import AddTour from "@/components/modules/Admin/Tour/AddTour";
import ManageDivision from "@/pages/Admin/AddDivision";
import ManageTour from "@/pages/Admin/ManageTour";
// import ManageTour from "@/components/modules/Admin/Tour/AddTour";
import ManageTourType from "@/pages/Admin/ManageTourType";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

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
    ],
  },
];

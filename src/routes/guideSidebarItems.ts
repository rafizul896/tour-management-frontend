import GuideDashboard from "@/pages/dashboard/Guide/GuideDashboard";
import { ISidebarItem } from "@/types";

export const guideSidebarItems: ISidebarItem[] = [
  {
    title: "Management",
    items: [
      {
        title: "My Tours",
        url: "/guide/my-tours",
        component: GuideDashboard,
      },
    ],
  },
];

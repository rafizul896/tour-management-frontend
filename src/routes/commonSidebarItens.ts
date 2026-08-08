import ChangePassword from "@/pages/dashboard/Common/ChangePassword";
import Profile from "@/pages/dashboard/Common/Profile";
import { ISidebarItem } from "@/types";

export const commonSidebarItems: ISidebarItem[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        component: Profile,
      },
      {
        title: "Change Password",
        url: "/dashboard/change-password",
        component: ChangePassword,
      },
    ],
  }
];

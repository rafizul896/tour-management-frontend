import Bookings from "@/pages/User/MyBookings";
import { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: Bookings,
      },
      {
        title: "Change Password",
        url: "/user/change-password",
        component: Bookings,
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];

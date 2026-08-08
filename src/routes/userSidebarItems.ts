import BookingHistory from "@/pages/dashboard/User/BookingHistory";
import PaymentHistory from "@/pages/dashboard/User/PaymentHistory";
import { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: BookingHistory,
      },
      {
        title: "Payments",
        url: "/user/payments",
        component: PaymentHistory,
      },
    ],
  },
];

import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AddTour from "@/components/modules/Admin/Tour/AddTour";
import UpdateTour from "@/components/modules/Admin/Tour/UpdateTour";
import NotFound from "@/pages/NotFound";
import { commonSidebarItems } from "./commonSidebarItens";
import ApplyForGuide from "@/pages/ApplyForGuide";
import { guideSidebarItems } from "./guideSidebarItems";
import PaymentFail from "@/pages/Payment/PaymentFail";
import PaymentSuccess from "@/pages/Payment/PaymentSuccess";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Verify from "@/pages/Auth/Verify";
import PrivacyPolicy from "@/pages/Info/PrivacyPolicy";
import TermsAndConditions from "@/pages/Info/TermsAndConditions";
import FAQ from "@/pages/Info/FAQ";
import Division from "@/pages/Division";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contactUs",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: Division,
        path: "division",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id",
      },
      {
        Component: PrivacyPolicy,
        path: "privacy-policy",
      },
      {
        Component: TermsAndConditions,
        path: "terms-and-conditions",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
      {
        Component: AddTour,
        path: "/admin/add-tour",
      },
      {
        Component: UpdateTour,
        path: "/admin/update-tour/:tourId",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout),
    path: "/dashboard",
    children: [
      { index: true, element: <Navigate to="/dashboard/profile" /> },
      ...generateRoutes(commonSidebarItems),
      {
        Component: ApplyForGuide,
        path: "/dashboard/apply-guide",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout),
    path: "/guide",
    children: [
      { index: true, element: <Navigate to="/dashboard/profile" /> },
      ...generateRoutes(guideSidebarItems),
    ],
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: ResetPassword,
    path: "/reset-password",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: NotFound,
    path: "*",
  },
  {
    Component: withAuth(PaymentSuccess),
    path: "/payment/success",
  },
  {
    Component: withAuth(PaymentFail),
    path: "/payment/fail",
  },
]);

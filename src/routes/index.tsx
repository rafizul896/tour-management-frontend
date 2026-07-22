import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import AboutPage from "@/pages/About";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: AboutPage,
        path: "about",
      },
    ],
  },
  {
    Component: AdminLayout,
    path: "/admin",
    children: [
      {
        Component: Analytics,
        path: "analytics",
      },
    ],
  },
]);

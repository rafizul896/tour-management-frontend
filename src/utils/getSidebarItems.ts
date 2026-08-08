import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { commonSidebarItems } from "@/routes/commonSidebarItens";
import { guideSidebarItems } from "@/routes/guideSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...commonSidebarItems,...adminSidebarItems];
    case role.admin:
      return [...commonSidebarItems,...adminSidebarItems];
    case role.user:
      return [...commonSidebarItems,...userSidebarItems];
    case role.guide:
      return [...commonSidebarItems,...guideSidebarItems];
    default:
      return [];
  }
};

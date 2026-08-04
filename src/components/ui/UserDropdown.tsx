import { Link } from "react-router";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LayoutDashboard, User } from "lucide-react";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { Avatar, AvatarImage } from "./avatar";

const links = [
  { href: "/admin", role: role.admin },
  { href: "/admin", role: role.superAdmin },
  { href: "/user", role: role.user },
  { href: "/guide", role: role.guide },
];

const UserDropdown = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {userInfo?.picture ? (
            <Avatar className="border bg-muted">
              <AvatarImage src={userInfo?.picture} alt={userInfo?.name} />
            </Avatar>
          ) : (
            <span className="text-sm font-semibold">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            <p className="text-xs text-primary capitalize">
              {userInfo.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={"/dashboard/profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        {links?.map(
          (link) =>
            link?.role === userInfo?.role && (
              <DropdownMenuItem asChild>
                <Link to={link?.href} className="cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  dashboard
                </Link>
              </DropdownMenuItem>
            ),
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant="outline"
            size={"sm"}
            className="cursor-pointer text-red-600 hover:bg-red-500 hover:text-white"
          >
            Logout
          </Button>
          {userInfo?.role === "USER" && (
            <Button variant="default" size={"sm"}>
              <Link to="/dashboard/apply-guide">Apply for Guide</Link>
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

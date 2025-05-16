import {
  ChevronsUpDown,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  User2,
  UserPen,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, logOut } from "@/redux/auth/authAction";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import useProfile from "@/hooks/useProfile";
import { UpdateProfileModal } from "@/Pages/Dashboard/User/UpdateProfileModal";
import { GiRamProfile } from "react-icons/gi";

export function NavUser() {
  // const { isMobile } = useSidebar();
  const user = useAuthUser();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [result, transactions, message, memberLoading, refetch] = useProfile();
  // console.log(result);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip="My Account"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt={user?.name}
                  className={"object-cover"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.displayName}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg object-cover">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    className={"object-cover"}
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/dashboard/profile"}>
                <DropdownMenuItem>
                  <User2 />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {user && (
              <DropdownMenuGroup>
                <Link to={"/dashboard"}>
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  disabled={memberLoading}
                  onClick={() => setIsModalOpen(true)}
                >
                  <UserPen />
                  Update Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem
                onClick={() => {
                  dispatch(logOut);
                  toast.success("Log out successful");
                  navigate("/");
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            ) : (
              <Link to={"/login"}>
                <DropdownMenuItem>
                  <LogIn />
                  Log In
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultValues={result}
        refetch={refetch}
      />
    </SidebarMenu>
  );
}

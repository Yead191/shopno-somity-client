import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  CreditCard,
  FileSpreadsheet,
  Home,
  LayoutGrid,
  Logs,
  TicketSlash,
  UserRoundCog,
} from "lucide-react";

import logo from "/logo-oli.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { GiMedicines } from "react-icons/gi";
import { MdManageHistory, MdReport } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";

import { Separator } from "../ui/separator";
import { Link, NavLink } from "react-router-dom";
import { NavUser } from "./Nav-user";

const items = [
  {
    title: "Statics",
    url: "/dashboard/admin",
    icon: ChartNoAxesCombined,
    role: "admin",
  },
  {
    title: "Manage Members",
    url: "/dashboard/admin/manage-users",
    icon: UserRoundCog,
    role: "admin",
  },
  {
    title: "Transaction Report",
    url: "/dashboard/admin/transaction-report",
    icon: BadgeDollarSign,
    role: "admin",
  },
  {
    title: "Payment History",
    url: "/dashboard/manage/users/payments",
    icon: CreditCard,
    role: "user",
  },
];

export function AppSidebar() {
  // const { role } = useRole();
  const role = "admin";
  const { state, toggleSidebar } = useSidebar();
  // console.log(state);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <h2 className="font-bold my-4">
            <div className="flex items-center gap-1" onClick={toggleSidebar}>
              <img src={logo} alt="logo" className="w-[45px] -mt-0.5" />
              <h4
                className={`text-2xl font-semibold ${
                  state === "expanded" && "lg:flex"
                }  md:hidden`}
              >
                স্বপ্নস্বাক্ষর{" "}
                <span className="text-[#3B9DF8] ml-1">সমিতি</span>
              </h4>
            </div>
          </h2>
          <SidebarGroupContent>
            <SidebarMenu id="sidebarmenus">
              {items.map((item) => {
                return role === item.role ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <NavLink to={item.url} end>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  ""
                );
              })}
              <div>
                <Separator />
              </div>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"Home"} asChild>
                  <NavLink to={"/"}>
                    <Home />
                    <span>{"Home"}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

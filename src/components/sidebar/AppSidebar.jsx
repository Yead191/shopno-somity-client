import {
    ChartNoAxesCombined,
    CreditCard,
    FileSpreadsheet,
    Home,
    LayoutGrid,
    Logs,
    TicketSlash,
    UserRoundCog,
} from "lucide-react";

import logo from '/logo-oli.png'

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
import { MdManageHistory } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";

import { Separator } from "../ui/separator";
import { Link, NavLink } from "react-router-dom";


const items = [
    {
        title: "Statics",
        url: "/dashboard/admin",
        icon: ChartNoAxesCombined,
        role: "admin",
    },
    {
        title: "Seller Statics",
        url: "/dashboard/seller",
        icon: ChartNoAxesCombined,
        role: "seller",
    },
    {
        title: "Manage Medicines",
        url: "/dashboard/manage/medicines",
        icon: GiMedicines,
        role: "seller",
    },
    {
        title: "Payments History",
        url: "/dashboard/manage/history/payments",
        icon: MdManageHistory,
        role: "seller",
    },
    {
        title: "Ask For Advertisement",
        url: "/dashboard/manage/advertisements",
        icon: RiAdvertisementFill,
        role: "seller",
    },
    {
        title: "Manage Users",
        url: "/dashboard/manage/users",
        icon: UserRoundCog,
        role: "admin",
    },
    {
        title: "Manage Category",
        url: "/dashboard/manage/category",
        icon: LayoutGrid,
        role: "admin",
    },
    {
        title: "Payment Management",
        url: "/dashboard/manage/payments",
        icon: CreditCard,
        role: "admin",
    },
    {
        title: "Sales Report",
        url: "/dashboard/sales/report",
        icon: FileSpreadsheet,
        role: "admin",
    },
    {
        title: "Manage Banner",
        url: "/dashboard/manage/banners",
        icon: TicketSlash,
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
    const role = "admin"
    const { state, toggleSidebar } = useSidebar();
    // console.log(state);
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <h2 className="font-bold my-4">

                        <div className="flex items-center gap-3" onClick={toggleSidebar} >

                            <Logs />
                            <h4 className={`text-2xl font-semibold ${state === 'expanded' && "lg:flex"}  md:hidden`}>
                                Menu  <span className="text-[#3B9DF8] ml-0.5">Items</span>
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
                {/* <NavUser /> */}
            </SidebarFooter>
        </Sidebar>
    );
}

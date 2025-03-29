import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet,  } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex font-lato overflow-x-scroll">

            <SidebarProvider>
                <AppSidebar />
                <main className="px-4 flex-1">
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    );
}

export default DashboardLayout;

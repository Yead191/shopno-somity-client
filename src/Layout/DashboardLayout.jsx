import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex font-lato overflow-x-scroll">
      <SidebarProvider>
        <AppSidebar />
        <main className="px-2 md:px-4 lg:px-6 flex-1 w-full py-4">
          <SidebarTrigger />
          <div className="py-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;

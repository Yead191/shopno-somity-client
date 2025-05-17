import { AppSidebar } from "@/components/sidebar/AppSidebar";
import Spinner from "@/components/Spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";

function DashboardLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <div className="flex font-lato overflow-x-scroll">
        <SidebarProvider>
          <AppSidebar />
          <main className="px-2 md:px-4 lg:px-6 flex-1 w-full py-4">
            <SidebarTrigger className={"fixed z-50"} />
            <div className="my-12">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}

export default DashboardLayout;

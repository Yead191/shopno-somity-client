import { AppSidebar } from "@/components/sidebar/AppSidebar";
import Spinner from "@/components/Spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authAction";
import Navbar from "@/shared/Navbar";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const [role, roleLoading] = useRole();
  if (loading || roleLoading) return <Spinner />;
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (role === "admin") {
    return <Navigate to={"/dashboard/admin/statistics"} />;
  } else {
    return <Navigate to={"/dashboard/profile"} />;
  }
  //   return (
  //     <div className="flex flex-col min-h-screen">
  //       <nav className="h-[64px] ">
  //         <Navbar SidebarTrigger={SidebarTrigger} />
  //       </nav>

  //       <main className="px-4 flex-1">
  //         <Outlet />
  //       </main>

  //       <footer></footer>
  //     </div>
  //   );
};

export default MainLayout;

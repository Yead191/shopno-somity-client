import Spinner from "@/components/Spinner";
import useRole from "@/hooks/useRole";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authAction";
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const AdminRoutes = ({ children }) => {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const [role, roleLoading] = useRole();
  if (loading || roleLoading) {
    return <Spinner />;
  }
  if (user && role === "admin") {
    return children;
  }
  if (user && role !== "admin") {
    toast.error("You don't have permission to visit admin routes!");
  }

  return <Navigate to={"/dashboard"} />;
};

export default AdminRoutes;

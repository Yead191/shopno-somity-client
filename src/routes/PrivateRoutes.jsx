import Spinner from "@/components/Spinner";
import useRole from "@/hooks/useRole";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authAction";
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoutes = ({ children }) => {
  const loading = useAuthLoading();
  const user = useAuthUser();
  const [, roleLoading] = useRole();
  if (loading || roleLoading) {
    return <Spinner />;
  }
  if (user && user.email) {
    return children;
  }
  if (!user) {
    toast.error("Please login to continue");
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoutes;

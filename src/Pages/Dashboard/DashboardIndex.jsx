import Spinner from "@/components/Spinner";
import useRole from "@/hooks/useRole";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authAction";
import { Navigate, useNavigate } from "react-router-dom";

function DashboardIndex() {
  const [role, roleLoading] = useRole();
//   console.log(role);
  const user = useAuthUser();
  const loading = useAuthLoading();
  if (loading || roleLoading) return <Spinner />;
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (role === "admin") {
    return <Navigate to={"/dashboard/admin/statistics"} />;
  }

  return <Navigate to={"/dashboard/profile"} />;
}

export default DashboardIndex;

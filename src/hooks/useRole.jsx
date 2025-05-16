import React from "react";
import { useAxiosPublic } from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "@/redux/auth/authAction";

const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const user = useAuthUser();
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/users/profile/id?email=${user.email}`
      );
      return data.result.role;
    },
  });
  return [role, roleLoading];
};

export default useRole;

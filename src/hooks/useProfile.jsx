import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "@/redux/auth/authAction";

const useProfile = () => {
  const user = useAuthUser();
  const axiosSecure = useAxiosSecure();
  // console.log(id);
  const {
    data: member = {},
    isLoading: memberLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users/profile/:id?email=${user.email}`
      );
      return data;
    },
  });
  // console.log(member.result);

  const { result = {}, transactions = [], message = "" } = member || {};
  return [result, transactions, message, memberLoading, refetch];
};

export default useProfile;

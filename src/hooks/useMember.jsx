import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";

const useMember = (page, sort, search, selectedFilter, active) => {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["members", page, sort, search, selectedFilter],
    queryFn: async () => {
      const res = await axiosSecure(
        `${
          import.meta.env.VITE_API_URL
        }/users?page=${page}&sort=${sort}&search=${search}&filter=${selectedFilter}&active=${
          active ? active : ""
        }`
      );
      return res.data;
    },
  });
  return [data, isLoading, refetch, error];
};

export default useMember;

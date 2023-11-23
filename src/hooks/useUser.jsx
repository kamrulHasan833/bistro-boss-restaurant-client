import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useUser = () => {
  const axiosInstance = useAxiosPrivate();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("bistro-boss-restaurant/v1/users");
      return res.data;
    },
  });
  return { users, isLoading, refetch };
};

export default useUser;

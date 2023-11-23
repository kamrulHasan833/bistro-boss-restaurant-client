import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
const useIsAdmin = () => {
  const axiosInstace = useAxiosPrivate();
  const { user } = useAuth();
  const { data: res = null, isLoading } = useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data } = await axiosInstace.get(
        `/bistro-boss-restaurant/v1/admin?email=${user.email}`
      );

      return data;
    },
  });
  const isAdmin = res ? res.isAdmin : {};
  return { isAdmin, isLoading };
};

export default useIsAdmin;

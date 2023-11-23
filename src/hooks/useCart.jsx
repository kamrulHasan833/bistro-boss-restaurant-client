import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useCart = () => {
  const { user } = useAuth();

  const axiosInstance = useAxiosPrivate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartFoods"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bistro-boss-restaurant/v1/cart?email=${user.email}`
      );
      return res.data;
    },
  });
  return { data, isLoading, refetch };
};

export default useCart;

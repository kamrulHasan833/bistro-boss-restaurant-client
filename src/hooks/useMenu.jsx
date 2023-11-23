import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = (category) => {
  const axiosInstance = useAxiosPublic();
  const {
    data: items = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["menu-items"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/bistro-boss-restaurant/v1/menu?category=${
          category !== "offer" ? category : "offered"
        }`
      );

      return data;
    },
  });

  return { items, isLoading, refetch };
};

export default useMenu;

import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenuByCategory = (category) => {
  const [items, setItems] = useState();
  const axiosInstance = useAxiosPublic();
  useEffect(() => {
    axiosInstance &&
      axiosInstance
        .get(
          `/bistro-boss-restaurant/v1/menu?category=${
            category !== "offer" ? category : "offered"
          }`
        )
        .then(({ data }) => setItems(data))
        .catch((err) => console.log(err));
  }, [axiosInstance, category]);

  return items;
};

export default useMenuByCategory;

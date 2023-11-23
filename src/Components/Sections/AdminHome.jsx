import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderBarChart from "../Shared/OrderBarChart";
import OrderPieChart from "../Shared/OrderPieChart";
import Stats from "../Shared/Stats";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { data: value = null, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosPrivate(
        "/bistro-boss-restaurant/v1/statistics"
      );
      return data;
    },
  });
  return (
    <div className="bg-white mt-20 md:mt-24 p-6 md:p-10">
      {" "}
      <h3 className="text-xl md:text-2xl font-bold font-cinzel text-title-color  pb-6 md:pb-6">
        Hi {user?.displayName}, Welcome Back!
      </h3>
      <div className="flex justify-center ">
        {!isLoading && value && <Stats value={value} />}
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mt-10 md:mt-6">
        {!isLoading && value && (
          <>
            <OrderBarChart categories={value.categories} />
            <div className="w-96 h-96">
              <OrderPieChart categories={value.categories} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;

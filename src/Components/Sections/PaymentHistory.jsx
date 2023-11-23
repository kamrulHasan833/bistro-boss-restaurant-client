import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";

const PaymentHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user, loading } = useAuth();
  const { email } = user ? user : {};

  const { data: payments, isLoading } = useQuery({
    queryKey: ["my-payment"],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosPrivate(
        `/bistro-boss-restaurant/v1/payments?email=${email}`
      );
      return data;
    },
  });

  console.log(payments);
  return (
    <section>
      <SectionWrapperSmall>
        <SectionHeader subTitle="At a Glance!" title="PAYMENT HISTORY" />

        <div className="bg-white px-8 md:px-14  pb-6 md:pb-10 pt-2 md:pt-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-cinzel text-title-color pt-2">
              Total Pyments: {payments && payments.length}
            </h3>
          </div>
          <div className="overflow-x-auto mt-6  rounded-lg">
            <table className="table text-base ">
              {/* head */}
              <thead className=" bg-primary-color ">
                <tr className="text-white text-base py-10 uppercase ">
                  <th></th>

                  <th>email</th>
                  <th>Category</th>
                  <th>Totla Price</th>
                  <th>payment date</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {!isLoading &&
                  payments &&
                  payments.length > 0 &&
                  payments.map(
                    ({ _id, consumer_email, price, payment_date }, idx) => (
                      <tr key={_id}>
                        <th>{idx + 1}</th>

                        <td>{consumer_email}</td>
                        <td>Food Order</td>
                        <td>${price}</td>
                        <td>
                          {moment
                            .utc(payment_date)
                            .local()
                            .format("dddd, MMM DD, yyyy")}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
          {isLoading ? (
            <p className="pt-4 text-center ">Loading..</p>
          ) : !isLoading && payments.length === 0 ? (
            <p className="pt-4 text-center ">No User</p>
          ) : (
            ""
          )}
        </div>
      </SectionWrapperSmall>
    </section>
  );
};

export default PaymentHistory;

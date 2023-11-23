import { RiDeleteBin6Line } from "react-icons/ri";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCart from "../../hooks/useCart";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";
const MyCart = () => {
  const { data: foods, isLoading, refetch } = useCart();
  const axiosInstance = useAxiosPrivate();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/bistro-boss-restaurant/v1/cart/${id}`)
          .then(({ data }) => {
            if (data && data.deletedCount > 0) {
              refetch();
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "You have deleted successfully",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <section>
      <SectionHeader title="WANNA ADD MORE?" subTitle="My Cart" />
      <SectionWrapperSmall>
        <div className="bg-white px-8 md:px-14  pb-6 md:pb-10 pt-2 md:pt-4">
          <div className="flex justify-between mt-6 mb-5 items-center">
            <div>
              <p className="text-xl md:text-2xl font-bold font-cinzel text-title-color">
                Total Order:{" "}
                <span className="font-medium">{foods && foods.length}</span>
              </p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold font-cinzel text-title-color">
                price:
                <span className="font-medium">
                  {" "}
                  $
                  {foods &&
                    parseFloat(
                      foods.reduce((ac, ci) => ac + ci.price, 0).toFixed(2)
                    )}
                </span>
              </p>
            </div>
            <div>
              <Link to="/dashboard/payment-getway">
                <button className="text-sm md:text-base font-bold font-cinzel text-white py-2 px-3 bg-primary-color hover:bg-secondary-color rounded-lg">
                  Pay
                </button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto  rounded-lg">
            <table className="table text-base ">
              {/* head */}
              <thead className=" bg-primary-color ">
                <tr className="text-white text-base py-10  ">
                  <th></th>
                  <th>ITEM IMAGE</th>
                  <th>ITEM NAME</th>
                  <th>PRICE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {!isLoading &&
                  foods.length > 0 &&
                  foods.map(({ _id, name, image, price }, idx) => (
                    <tr key={_id}>
                      <th>{idx + 1}</th>
                      <td>
                        <img src={image} alt="" className="w-[75px]" />
                      </td>
                      <td>{name}</td>
                      <td>${price}</td>
                      <td>
                        {
                          <RiDeleteBin6Line
                            onClick={() => handleDelete(_id)}
                            className="bg-red-600 text-white hover:bg-secondary-color text-xl md:text-2xl rounded-lg px-2 py-2 box-content cursor-pointer"
                          />
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {isLoading ? (
            <p className="pt-4 text-center ">Loading..</p>
          ) : !isLoading && foods.length === 0 ? (
            <p className="pt-4 text-center ">No Food Added</p>
          ) : (
            ""
          )}
        </div>
      </SectionWrapperSmall>
    </section>
  );
};

export default MyCart;

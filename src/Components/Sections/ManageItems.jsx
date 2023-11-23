import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useMenu from "../../hooks/useMenu";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";
const ManageItems = () => {
  const { items, refetch } = useMenu();

  const axiosPrivate = useAxiosPrivate();
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
        axiosPrivate
          .delete(`bistro-boss-restaurant/v1/menu/${id}`)
          .then(({ data }) => {
            if (data.deletedCount > 0) {
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
                title: `Item has been deleted  successfully`,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <section>
      <SectionWrapperSmall>
        <SectionHeader title="MANAGE ALL ITEMS" subTitle="Hurry Up!" />

        <div className="bg-white px-8 md:px-14  pb-6 md:pb-10 pt-2 md:pt-4">
          <div className=" mt-6 mb-5 ">
            <p className="text-xl md:text-2xl font-bold font-cinzel text-title-color">
              Total items:{" "}
              <span className="font-medium">{items && items.length}</span>
            </p>
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
                {items.length > 0 &&
                  items.map(({ _id, name, image, price }, idx) => (
                    <tr key={_id}>
                      <th>{idx + 1}</th>
                      <td>
                        <img src={image} alt="" className="w-[75px]" />
                      </td>
                      <td>{name}</td>
                      <td>${price}</td>
                      <td>
                        {
                          <div className="flex gap-2">
                            <Link to={`/dashboard/update-item/${_id}`}>
                              <FaRegEdit className="bg-primary-color text-white hover:bg-secondary-color text-xl md:text-2xl rounded-lg px-2 py-2 box-content cursor-pointer" />
                            </Link>
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(_id)}
                              className="bg-red-600 text-white hover:bg-secondary-color text-xl md:text-2xl rounded-lg px-2 py-2 box-content cursor-pointer"
                            />
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {items && items.length === 0 ? (
            <p className="pt-4 text-center ">No Item</p>
          ) : (
            ""
          )}
        </div>
      </SectionWrapperSmall>
    </section>
  );
};

export default ManageItems;

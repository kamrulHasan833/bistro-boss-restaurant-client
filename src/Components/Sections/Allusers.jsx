import { HiMiniUserGroup } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUser from "../../hooks/useUser";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapperSmall from "../Shared/SectionWrapperSmall";

const Allusers = () => {
  const { users, isLoading, refetch } = useUser();

  const handleDelete = (id, name) => {
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
          .delete(`/bistro-boss-restaurant/v1/users/${id}`)
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
                title: `${name} has been deleted  successfully`,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const axiosInstance = useAxiosPrivate();
  const handleSetRole = (id, name) => {
    axiosInstance
      .patch(`/bistro-boss-restaurant/v1/users/${id}`)
      .then(({ data }) => {
        if (data.modifiedCount > 0) {
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
            title: `${name} has been made admin  successfully`,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <SectionHeader title="MANAGE ALL USERS" subTitle="How many?" />
      <SectionWrapperSmall>
        <div className="bg-white px-8 md:px-14  pb-6 md:pb-10 pt-2 md:pt-4">
          <div className="overflow-x-auto mt-6  rounded-lg">
            <table className="table text-base ">
              {/* head */}
              <thead className=" bg-primary-color ">
                <tr className="text-white text-base py-10 uppercase ">
                  <th></th>

                  <th>name</th>
                  <th>email</th>
                  <th>role</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {!isLoading &&
                  users &&
                  users.length > 0 &&
                  users.map(({ _id, name, email, role }, idx) => (
                    <tr key={_id}>
                      <th>{idx + 1}</th>

                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        {role === "admin" ? (
                          "Admin"
                        ) : (
                          <HiMiniUserGroup
                            onClick={() => handleSetRole(_id, name)}
                            className="bg-primary-color text-white hover:bg-secondary-color text-xl md:text-2xl rounded-lg px-2 py-2 box-content cursor-pointer"
                          />
                        )}
                      </td>
                      <td>
                        {
                          <RiDeleteBin6Line
                            onClick={() => handleDelete(_id, name)}
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
          ) : !isLoading && users.length === 0 ? (
            <p className="pt-4 text-center ">No User</p>
          ) : (
            ""
          )}
        </div>
      </SectionWrapperSmall>
    </section>
  );
};
export default Allusers;

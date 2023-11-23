import useAxiosPrivate from "./useAxiosPrivate";

function useCreateUser() {
  const axiosInstance = useAxiosPrivate();

  const createUser = (userInfo) => {
    axiosInstance
      .post("/bistro-boss-restaurant/v1/users", userInfo)
      .then(() => {})
      .catch(() => {});
  };

  return createUser;
}

export default useCreateUser;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://bistro-boss-restaurant-server-puce-two.vercel.app",
});
const useAxiosPrivate = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        signout();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosPrivate;

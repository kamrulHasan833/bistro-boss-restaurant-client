import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (loading) {
    return <p>Loading...</p>;
  } else if (!loading && user) {
    return <>{children}</>;
  } else {
    Swal.fire({
      title: "Notice!",
      text: "Without singin, you won't be able to visite this page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign In",
      cancelButtonText: "Home",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signin", {
          state: pathname,
        });
      } else {
        navigate("/");
      }
    });
  }
  return <div className="h-screen w-screen bg-white"></div>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;

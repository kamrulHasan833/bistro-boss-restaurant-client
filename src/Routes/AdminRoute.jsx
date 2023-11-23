import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useIsAdmin from "../hooks/useIsAdmin";

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useIsAdmin();
  const { user, loading } = useAuth();

  if (loading || isLoading) {
    return <p>Loading...</p>;
  } else if (!loading && !isLoading && user && isAdmin) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
};
AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;

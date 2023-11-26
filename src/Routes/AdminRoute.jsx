/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAdminManager from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingPage from "../Pages/ErrorPages/LoadingPage";

const AdminRoute = ({children}) => {
  const [data, isPending] = useAdminManager();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isPending) {
    return <LoadingPage></LoadingPage>;
  }

  if (user && data) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" />;
};

export default AdminRoute;

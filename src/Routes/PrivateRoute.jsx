/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

import LoadingPage from "../Pages/ErrorPages/LoadingPage";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
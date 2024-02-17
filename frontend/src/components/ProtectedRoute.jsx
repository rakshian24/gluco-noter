import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user?.userId ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
export default ProtectedRoute;

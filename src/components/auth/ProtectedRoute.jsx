import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const { auth } = useAuth();

  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;

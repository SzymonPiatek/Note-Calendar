import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.tsx";

const PrivateRoute = ({ isSuperuser = false }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    if (isSuperuser && user?.isSuperuser) {
      return <Outlet />;
    }

    return user ? <Outlet /> : <Navigate to="/" replace />;
  }
};

export default PrivateRoute;

import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { FC } from "react";

const ProtectedRoute: FC<any> = ({ children }) => {
  const authContext = useAuthContext();
  if (!authContext?.loading && !authContext?.currentUser) {
    return <Navigate to="/auth/signin" />;
  }
  return children;
};
export default ProtectedRoute;

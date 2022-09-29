import { Navigate } from "react-router-dom";
// import PrivateContainer from "../templates/PrivateContainer";
// import Utils from "../utils";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default RequireAuth;

import { Navigate } from "react-router-dom";
// import PrivateContainer from "../templates/PrivateContainer";
// import Utils from "../utils";

const PublicAuth = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  debugger
  if (token?.length>10) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

export default PublicAuth;

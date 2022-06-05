import { Navigate } from "react-router-dom";
import PrivateContainer from "../templates/PrivateContainer";
import Utils from "../utils";

type RequireAuthProps = {
  children: React.ReactNode | any;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const token = Utils.constants.getUserIdToken();
  const status = localStorage.getItem("user_status");

  if (status !== null || status !== undefined) {
    if (status == "6") {
      return <Navigate to="/" />;
    }
  }

  if (status === null || status === undefined) {
    return <Navigate to="/" />;
  }

  if (token === undefined || token === null) {
    return <Navigate to="/" />;
  }

  return <PrivateContainer>{children}</PrivateContainer>;
};

export default RequireAuth;

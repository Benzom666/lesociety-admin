import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../screens/login";
import Dashboard from "../pages/dashboard/index.js"
import Login from "../pages/auth/login.js"
import ResetPassword from "../pages/auth/reset-password.js"
import UserList from "../pages/pageContainer/user-list"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/dashboard"} element={<Dashboard/>} />
        <Route path={"/userList"} element={<UserList/>} />
        <Route path={"/reset-Password"} element={<ResetPassword/>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

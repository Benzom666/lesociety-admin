import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../screens/login";
import Dashboard from "../pages/dashboard/index.js";
import Login from "../pages/auth/login.js";
import ResetPassword from "../pages/auth/reset-password.js";
import ForgotPassword from "../pages/auth/forgot-password";
import RequireAuth from "./RequireAuth";
import User from "../pages/pages/admin/user-list"
import UserList from "../pages/pageContainer/user-list";
import PostList from "../pages/pageContainer/post.js";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route
          path={"/dashboard"}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
         <Route
          path={"/user"}
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route path={"/reset-Password"} element={<ResetPassword />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        
        <Route path={"/"} element={<Login/>} />
        <Route path={"/dashboard"} element={<Dashboard/>} />
        <Route path={"/userList"} element={<UserList/>} />
        <Route path={"/post"} element={<PostList/>} />
        <Route path={"/reset-Password"} element={<ResetPassword/>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

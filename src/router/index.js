import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../screens/login";
import Dashboard from "../pages/dashboard/index.js";
import Login from "../pages/auth/login.js";
import ResetPassword from "../pages/auth/reset-password.js";
import ForgotPassword from "../pages/auth/forgot-password";
import RequireAuth from "./RequireAuth";
import User from "../pages/pages/admin/user-list";
import UserList from "../pages/pageContainer/user-list";
import PostList from "../pages/pageContainer/post.js";
import PublicAuth from "./publicAuth";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <PublicAuth>
              <Login />
           </PublicAuth>
          }
        />
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
        <Route
          path={"/reset-Password"}
          element={
            <PublicAuth>
              <ResetPassword />
            </PublicAuth>
          }
        />
        <Route
          path={"/forgot-password"}
          element={
            <PublicAuth>
              <ForgotPassword />
            </PublicAuth>
          }
        />

        <Route
          path={"/userList"}
          element={
            <RequireAuth>
              <UserList />
            </RequireAuth>
          }
        />
        <Route path={"/post"} element={<PostList />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

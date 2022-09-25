import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Login from "../screens/login";
import Dashboard from "../pages/dashboard/index.js";
import Login from "../pages/auth/login.js";
import ResetPassword from "../pages/auth/reset-password.js";
import ForgotPassword from "../pages/auth/forgot-password";
import RequireAuth from "./RequireAuth";
// import UserList from "../pages/pageContainer/user-list";
// import Allinfluencers from "../pages/pageContainer/influencers";
import PostList from "../pages/pageContainer/post.js";
import PublicAuth from "./publicAuth";
import VerifyPhoto from "../pages/pageContainer/verifyPhoto.js";
import UserProfile from "../pages/pageContainer/userProfile";
import UserList from "../pages/UserList/UserList";
import InfluencerPage from "../pages/Influencer/Influencer.js";
function Router() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    <BrowserRouter><Navigate to="/" /></BrowserRouter>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            // <PublicAuth>
            <Login />
            //  </PublicAuth>
          }
        />
        <Route
          path={"/dashboard"}
          element={
            // <RequireAuth>
            <Dashboard />
            // </RequireAuth>
          }
        />
        <Route
          path={"/profile/:username"}
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path={"/verifyPhoto"}
          element={
            <RequireAuth>
              <VerifyPhoto />
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
        {/* <Route
          path={"/country"}
          element={
            <RequireAuth>
              <InfluencerPage />
            </RequireAuth>
          }
        /> */}
        <Route path={"/post"} element={<PostList />} />
        <Route path={"/reset-Password"} element={<ResetPassword />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/all-influencers"} element={<InfluencerPage />} />
        <Route path={"/reset-Password"} element={<ResetPassword />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

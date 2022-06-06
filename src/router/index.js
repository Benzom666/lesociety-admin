import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../screens/login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<h1>Login</h1>} />
        <Route path={"/"} element={<h1>landing page</h1>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

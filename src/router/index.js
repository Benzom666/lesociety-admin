import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "../screens/login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Utils.routes.otp} element={<>Login</>} />

        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

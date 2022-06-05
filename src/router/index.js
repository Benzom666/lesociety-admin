import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/login";
import RequireAuth from "./RequireAuth";
import Utils from "../utils";
import Container from "../templates/Container";
import LeftScreen from "../screens/login/LeftScreen";
import OtpScreen from "../screens/login/Otp";
import SignUp from "../screens/signUp";
import TermsAndCondition from "../screens/termsCondition/index";
import NotFound from "../components/notfound";
import Dashboard from "../screens/dashboard";
import MyClaims from "../screens/myClaims";
import CreateClaim from "../screens/myClaims/createClaim";
import ClaimDetail from "../screens/myClaims/claimDetail";
import DoctorPrescriptions from "../screens/doctorPrescriptions";
import DrugFormulary from "../screens/drugFormulary";
import MyProfile from "../screens/myProfile";
import EditMyProfile from "../screens/myProfile/editMyProfile";
import SentClaimDetail from "../screens/myClaims/sentClaims/sentClaimDetail";
import CreateClaimPrescription from "../screens/doctorPrescriptions/createClaimPrescription";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login children={<LeftScreen />} />} />
        <Route
          path={Utils.routes.otp}
          element={<Login children={<OtpScreen />} />}
        />

        <Route
          path={Utils.routes.signUp}
          element={
            <Container>
              <SignUp />
            </Container>
          }
        />
        <Route
          path={Utils.routes.termsAndCondition}
          element={
            <>
              <TermsAndCondition />
            </>
          }
        />
        <Route
          path={Utils.routes.dashboard}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path={Utils.routes.myClaims}
          element={
            <RequireAuth>
              <MyClaims />
            </RequireAuth>
          }
        />
        <Route
          path={`${Utils.routes.createClaim}`}
          element={
            <RequireAuth>
              <CreateClaim />
            </RequireAuth>
          }
        />
        <Route
          path={`${Utils.routes.sentClaimDetail}/:claimId`}
          element={
            <RequireAuth>
              <SentClaimDetail />
            </RequireAuth>
          }
        />
        <Route
          path={`${Utils.routes.claimDetail}/:claimId`}
          element={
            <RequireAuth>
              <ClaimDetail />
            </RequireAuth>
          }
        />
        <Route
          path={Utils.routes.doctorPrescriptions}
          element={
            <RequireAuth>
              <DoctorPrescriptions />
            </RequireAuth>
          }
        />
        <Route
          path={`${Utils.routes.createClaimPrescription}/:draftedClaimId`}
          element={
            <RequireAuth>
              <CreateClaimPrescription />
            </RequireAuth>
          }
        />
        <Route
          path={Utils.routes.drugFormulary}
          element={
            <RequireAuth>
              <DrugFormulary />
            </RequireAuth>
          }
        />
        <Route
          path={Utils.routes.myProfile}
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route
          path={Utils.routes.myProfileEdit}
          element={
            <RequireAuth>
              <EditMyProfile />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

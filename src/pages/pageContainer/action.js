import Utils from "../../utility";
import axios from "axios";
import qs from "query-string";

export const getUserList = () => {
  return (dispatch) => {
    // axios({
    //   method: "get",
    //   url: "https://staging-api.secrettime.com/api/v1/user",
    //   data: qs.stringify({
    //     email: "user1@getnada.com",
    //     location: "delhi",
    //     status: 0,
    //     assetOnly: true,
    //   }),
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
    //   },
    // })
    //   .then((res) => {})
    //   .catch((ree) => {});
    // const { password } = values;
    // const dataToSend = {
    //   password,
    // };
    Utils.api.getApiCall(
      Utils.endPoints.user,
      "",
      (respData) => {
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;

        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      },
      { email: "", location: "", status: 0, assetOnly: true }
    );
  };
};

export const getAllDate = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      "",
      "date?location=Delhi&per_page=5&user_name=user1",
      (respData) => {
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;

        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      },
      { email: "", location: "", status: 0, assetOnly: true }
    );
  };
};

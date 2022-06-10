import Utils from "../../utility";
export const onSubmit = (values, navigate) => {
  return (dispatch) => {
    const { email, password } = values;
    const dataToSend = {
      email,
      password,
    };
    Utils.api.postApiCall(
      Utils.endPoints.login,
      dataToSend,
      (respData) => {
        debugger
        localStorage.setItem("accessToken",respData?.data?.data?.token)
        navigate("/dashboard");
      },
      (error) => {
        let { data } = error;
        debugger;
        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      }
    );
  };
};


export const forgotPassword = (values, navigate) => {
  return (dispatch) => {
    const { email, password } = values;
    const dataToSend = {
      email,
      password,
    };
    Utils.api.postApiCall(
      Utils.endPoints.forgotPassword,
      dataToSend,
      (respData) => {
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;
        debugger;
        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      }
    );
  };
};

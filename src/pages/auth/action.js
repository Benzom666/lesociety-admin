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
        debugger;
        localStorage.setItem("accessToken", respData?.data?.data?.token);
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

export const forgotPassword = (values, navigate, sendEmailSend) => {
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
        sendEmailSend(true);
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

export const resetPassword = (values, navigate, token) => {
  return (dispatch) => {
    const { password } = values;
    const dataToSend = {
      password,
    };
    Utils.api.postApiCall(
      Utils.endPoints.resetPassword + `?token=${token}`,
      dataToSend,
      (respData) => {
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;

        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      }
    );
  };
};

import Utils from "../../utility";
import axios from "axios";
import qs from "query-string";

export const getUserList = () => {
  return (dispatch, getState) => {
    const { per_page, current_page, search } = getState().userListReducer;

    // axios({
    //   method: "get",
    //   url: "https://staging-api.secrettime.com/api/v1/user",
    //   data: {
    //     email: "",
    //     location: "",
    //     status: 0,
    //     assetOnly: true,
    //     per_page: 20,
    //   },

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
      `?email=${search}&location=&status=&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: respData?.data?.data?.users,
            pagination: respData?.data?.data?.pagination,
          },
        });
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

export const getDeactivateUser = () => {
  return (dispatch, getState) => {
    const { per_page, current_page, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?email=${search}&location=&status=3&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: respData?.data?.data?.users,
            pagination: respData?.data?.data?.pagination,
          },
        });
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};

export const getPendingUser = () => {
  return (dispatch, getState) => {
    const { per_page, current_page ,search} = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?email=${search}&location=&status=0&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: respData?.data?.data?.users,
            pagination: respData?.data?.data?.pagination,
          },
        });
        // navigate("/dashboard");
      },
      (error) => {
        let { data } = error;

        Utils.showAlert(2, data?.message);
        // setSubmitting(true);
      },
      { email: "", location: "", status: 0, assetOnly: true, per_page }
    );
  };
};

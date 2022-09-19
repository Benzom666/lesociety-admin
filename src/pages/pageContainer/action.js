import moment from "moment";
import Utils from "../../utility";

export const getUserList = (status, offSet) => {
  // alert(status);
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
      },
    });
    const { per_page, current_page, search, userlist } =
      getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?user_name=${search}&location=&status=${
        status ? status : ""
      }&assetOnly=&per_page=${per_page}&current_page=1`,
      (respData) => {
        console.log(respData?.data?.data?.total_pages, "333");
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: search.length
              ? respData?.data?.data?.users
              : [...userlist, ...respData?.data?.data?.users],
            pagination: respData?.data?.data?.pagination,
            loading: false,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get Default Message List
export const getDefaultMsgList = (msgType) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getDefaultMsgList,
      `?messageType=${msgType}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DEFAULT_MSG,
          payload: {
            defaultMsg: respData.data.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// user profile
export const getUserProfile = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.userProfile,
      `?user_name=${username}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_PROFILE,
          payload: {
            userProfileData: respData?.data?.data?.user,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// user status counter
export const getUserStatusCounter = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.userStatusCounter,
      ``,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_COUNTER,
          payload: {
            usersAdminStatus: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get all request
export const getAllRequest = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getRequest,
      ``,
      (respData) => {
        console.log("GET_REQUEST", respData);
        dispatch({
          type: Utils.ActionName.GET_REQUEST,
          payload: {
            // usersAdminStatus: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};

// get influencer
export const getInfluencer = (status = "", active = "", offSet = 1) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
      },
    });
    const { per_page, influencerList, current_page = 1, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.getInfluencer,
      `?name=${search}&location=&status=${status}&assetOnly=&per_page=${per_page}&current_page=${offSet}&active=${active}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER,
          payload: {
            influencerList: search.length
              ? respData?.data?.data?.influencer
              : [...influencerList, ...respData?.data?.data?.influencer],
            loading: false,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get influencer email exists
export const getInfluencerEmailExists = (email) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.influencerEmail,
      `?email=${email}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_EXIST_MAIL,
          payload: {
            existEmailScuse: respData?.data?.data?.message,
            existEmail: "",
          },
        });
      },
      (error) => {
        console.log(error?.data?.data[0].message);
        dispatch({
          type: Utils.ActionName.GET_EXIST_MAIL,
          payload: {
            existEmail: error?.data?.data[0]?.message,
            existEmailScuse: "",
          },
        });
      }
    );
  };
};
// get Influencer exists
export const getInfluencerExistCode = (code) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.influencerExistCode,
      `?code=${code}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER_EXIST,
          payload: {
            existCodeMsg: respData?.data?.message,
            existCode: "",
          },
        });
      },
      (error) => {
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER_EXIST,
          payload: {
            existCode: error?.data?.data[0]?.message,
            existCodeMsg: "",
          },
        });
      }
    );
  };
};
// get Influencers Stats
export const getInfluencerStats = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getInfluencersStats,
      ``,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER_STATS,
          payload: {
            influencerStats: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get Influencers Stats
export const getGeoStats = (city, country, gender) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getGeo,
      `?status=2&locationType=country&country=${
        !!country ? country : ""
      }&gender=${!!gender ? gender : ""}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_GEO_STATS,
          payload: {
            geoStats: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// influencer update status
export const influencerCreate = (formData) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.influencerCreate,
      formData,
      (respData) => {
        Utils.showAlert(1, "Influence created successfully!");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// influencer update status
export const influencerUpdateStatus = (status, email, active) => {
  return (dispatch) => {
    const dataToSend = {
      status,
      email,
      active,
    };
    Utils.api.putApiCall(
      Utils.endPoints.influencerUpdateStatus,
      dataToSend,
      (respData) => {
        Utils.showAlert(1, "Influencer status updated.");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// influencer detail update
export const influencerUpdate = (name, email, promo, code, source) => {
  return (dispatch) => {
    const dataToSend = {
      name,
      email,
      promo,
      code,
      source,
    };
    Utils.api.putApiCall(
      Utils.endPoints.influencerPut,
      dataToSend,
      (respData) => {
        Utils.showAlert(1, "Influencer updated.");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post Send Request
export const postSetRequest = () => {
  return (dispatch) => {
    // const { password } = values;
    const dataToSend = {
      // password,
    };
    Utils.api.postApiCall(
      Utils.endPoints.postSetRequest,
      dataToSend,
      (respData) => {},
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post send default msg
export const postSendDefaulMsg = (messageType, message_id, user_email_list) => {
  return (dispatch) => {
    // const { password } = values;
    const dataToSend = {
      messageType,
      message_id,
      user_email_list,
    };
    Utils.api.postApiCall(
      Utils.endPoints.sendDefaultMsg,
      dataToSend,
      (respData) => {
        Utils.showAlert(1, "Request mail sent to users");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post verfiy user
export const postVerfiyUser = (email) => {
  return (dispatch) => {
    const dataToSend = {
      email,
    };
    Utils.api.postApiCall(
      Utils.endPoints.userVerify,
      dataToSend,
      (respData) => {
        Utils.showAlert(1, "Tagline and description updated successfully!");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post update user status
export const postUpdateUserStatus = (status, emails) => {
  return (dispatch) => {
    const dataToSend = {
      status,
      emails,
    };
    Utils.api.postApiCall(
      Utils.endPoints.updateUserStatus,
      dataToSend,
      (respData) => {
        console.log("respData==>saaa", respData);
        // Utils.showAlert(1, "Tagline and description updated successfully!")
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post update date status
export const postUpdateDateStatus = (status, ids) => {
  return (dispatch) => {
    const dataToSend = {
      status,
      ids,
    };
    Utils.api.postApiCall(
      Utils.endPoints.updateDateStatus,
      dataToSend,
      (respData) => {
        console.log("respData==>saaa", respData);
        Utils.showAlert(1, "Post Blocked successfully!");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getDeactivateUser = () => {
  return (dispatch, getState) => {
    const { per_page, current_page, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?user_name=${search}&location=&status=3&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: search.length
              ? respData?.data?.data?.users
              : respData?.data?.data?.users,
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
    const { per_page, current_page, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?user_name=${search}&location=&status=0&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: search.length
              ? respData?.data?.data?.users
              : respData?.data?.data?.users,
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
// get influencer
export const getAllDates = (status, active, offSet) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
      },
    });
    const { per_page, current_page, search, datesList } =
      getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.getAllDate,
      `?user_name=${search}&status=${
        status ? status : ""
      }&per_page=${per_page}&current_page=${offSet}`,
      (respData) => {
        console.log("respDatarespData", respData);
        dispatch({
          type: Utils.ActionName.GET_ALL_DATES,
          payload: {
            datesList: search.length
              ? respData?.data?.data?.dates
              : [...datesList, ...respData?.data?.data?.dates],
            datesCont: respData?.data?.data?.pagination,
            loading: false,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get register dashboard
export const getRegDashboard = () => {
  return (dispatch, getState) => {
    const { rStartDate, rEndDate } = getState().userListReducer;
    let start_date = moment(rStartDate);
    let start_mins_date = start_date.format("YYYY-MM-DD");
    let end_date = moment(rEndDate).format("YYYY-MM-DD:HH:mm:ss");
    Utils.api.getApiCall(
      Utils.endPoints.getRegisterDashboard,
      `?gender=female&status=2&start_date=${start_mins_date}&end_date=${end_date}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_REGCOMPFEMALE,
          payload: {
            registerCompFemaleList: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getRegDashboardMale = () => {
  return (dispatch, getState) => {
    const { rStartDate, rEndDate } = getState().userListReducer;
    let start_date = moment(rStartDate);
    let start_mins_date = start_date.format("YYYY-MM-DD");
    let end_date = moment(rEndDate).format("YYYY-MM-DD:HH:mm:ss");

    Utils.api.getApiCall(
      Utils.endPoints.getRegisterDashboard,
      `?gender=male&status=2&start_date=${start_mins_date}&end_date=${end_date}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_REGCOMPMALE,
          payload: {
            registerCompMaleList: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getUnRegDashboard = () => {
  return (dispatch, getState) => {
    const { unRstartDate, unRendDate } = getState().userListReducer;
    let start_date = moment(unRstartDate);
    let start_mins_date = start_date.format("YYYY-MM-DD");
    let end_date = moment(unRendDate).format("YYYY-MM-DD:HH:mm:ss");
    Utils.api.getApiCall(
      Utils.endPoints.getRegisterDashboard,
      `?gender=female&status=1&start_date=${start_mins_date}&end_date=${end_date}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_REGUNCOMPFEMALE,
          payload: {
            registerUnCompFemaleList: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getUnRegDashboardMale = () => {
  return (dispatch, getState) => {
    const { unRstartDate, unRendDate } = getState().userListReducer;
    let start_date = moment(unRstartDate);
    let start_mins_date = start_date.format("YYYY-MM-DD");
    let end_date = moment(unRendDate).format("YYYY-MM-DD:HH:mm:ss");
    Utils.api.getApiCall(
      Utils.endPoints.getRegisterDashboard,
      `?gender=male&status=1&start_date=${start_mins_date}&end_date=${end_date}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_REGUNCOMPMALE,
          payload: {
            registerUnCompMaleList: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get country
export const getCountry = (status, active) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getCountry,
      ``,
      (respData) => {
        console.log("respData==>LLsss", respData);
        dispatch({
          type: Utils.ActionName.GET_ALL_DATES,
          payload: {
            // datesList: respData?.data?.data?.dates,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get date stats
export const getDateStats = (status, active) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.datestats,
      ``,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DATES_STATS,
          payload: {
            datesStats: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get dashboard total user stats
export const getDashboardStats = (start_date = "", end_date = "") => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.datedashboardstats,
      `?status=&start_date=${start_date}&end_date=${end_date}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DASHBOARD_STATS,
          payload: {
            dashboardStats: respData?.data?.data[0],
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getDashboardStatsNew = (status, start_date, end_date) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.datedashboardstats,
      `?status=${status}&start_date=${start_date ? start_date : ""}&end_date=${
        end_date ? end_date : ""
      }`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DASHBOARDNEW_STATS,
          payload: {
            dashboardStatsNew: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
export const getDashboardStatsDeactive = (status, start_date) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.datedashboardstats,
      `?status=${status}&start_date=${start_date ? start_date : ""}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DASHBOARDDEACTIVATE_STATS,
          payload: {
            dashboardStatsDeactive: respData?.data?.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// create country
export const createCountry = () => {
  return (dispatch) => {
    const dataToSend = {
      // email, name, source, code, promo
    };
    Utils.api.postApiCall(
      Utils.endPoints.postCountry,
      dataToSend,
      (respData) => {
        Utils.showAlert(1, "Influence created successfully!");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// get country
export const deleteInfluencer = (email) => {
  console.log("email", email);
  return (dispatch) => {
    Utils.api.deleteApiCall(
      Utils.endPoints.deleteInf,
      { data: { email: email } },
      (respData) => {
        Utils.showAlert(1, "Influence Delete successfully!");
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};

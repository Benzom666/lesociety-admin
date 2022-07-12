import Utils from "../../utility";

export const getUserList = (status) => {
  return (dispatch, getState) => {
    const { per_page, current_page, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.user,
      `?email=${search}&location=&status=${status ? status : ""}&assetOnly=&per_page=${per_page}&current_page=${current_page}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: {
            userlist: respData?.data?.data?.users,
            pagination: respData?.data?.data?.pagination,
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
      Utils.endPoints.getDefaultMsgList, `?messageType=${msgType}` ,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_DEFAULT_MSG,
          payload: {
            defaultMsg : respData.data.data
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
      Utils.endPoints.userStatusCounter, `` ,
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
      Utils.endPoints.getRequest, `` ,
      (respData) => {
        console.log("GET_REQUEST", respData)
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
export const getInfluencer = (status, active) => {
  return (dispatch, getState) => {
    const { per_page, current_page = 1, search } = getState().userListReducer;
    Utils.api.getApiCall(
      Utils.endPoints.getInfluencer,`?email=${search}&location=&status=${status ? status : ""}&assetOnly=&per_page=${per_page}&current_page=${current_page}&active=${active ? active : ''}`,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER,
          payload: {
            influencerList: respData?.data?.data?.influencer,
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
      Utils.endPoints.influencerEmail,`?email=${email}`,
      (respData) => {
        console.log("respData email=>", respData)
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER,
          payload: {
            // influencerList: respData?.data?.data?.influencer,
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
// get Influencer exists
export const getInfluencerExists = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getInfluencerExist, `` ,
      (respData) => {
        console.log("getInfluencerExist", respData)
        dispatch({
          type: Utils.ActionName.GET_INFLUENCER_EXIST,
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
// get Influencers Stats
export const getInfluencerStats = (username) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getInfluencersStats, `` ,
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
// influencer update status
export const influencerCreate = (email, name, source, code, promo) => {
  console.log("email, name, source, code, promo", email, name, source, code, promo)
  return (dispatch) => {
    const dataToSend = {
      email, name, source, code, promo
    };
    Utils.api.postApiCall(
      Utils.endPoints.influencerCreate,
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
// influencer update status
export const influencerUpdateStatus = (status, email, active) => {
  return (dispatch) => {
    const dataToSend = {
      status, email, active
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
      (respData) => {

      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.message);
      }
    );
  };
};
// post send default msg 
export const postSendDefaulMsg = () => {
  return (dispatch) => {
    // const { password } = values;
    const dataToSend = {
      // password,
    };
    Utils.api.postApiCall(
      Utils.endPoints.sendDefaultMsg,
      dataToSend,
      (respData) => {
        console.log("respData==>", respData)
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
        Utils.showAlert(1, "Tagline and description updated successfully!")
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
      status, emails
    };
    Utils.api.postApiCall(
      Utils.endPoints.updateUserStatus,
      dataToSend,
      (respData) => {
        console.log("respData==>saaa", respData)
        // Utils.showAlert(1, "Tagline and description updated successfully!")
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
// get influencer
export const getAllDates = (status, active) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getAllDate,``,
      (respData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_DATES,
          payload: {
            datesList: respData?.data?.data?.dates,
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
export const getRegDashboard = (status, active) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getRegisterDashboard,`?gender=female&status=2&start_date=2022-07-01`,
      (respData) => {
        console.log("respData==>LL", respData)
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
// get country
export const getCountry = (status, active) => {
  return (dispatch, getState) => {
    Utils.api.getApiCall(
      Utils.endPoints.getCountry,``,
      (respData) => {
        console.log("respData==>LLsss", respData)
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
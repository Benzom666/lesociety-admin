import Utils from "../../utility";

const initialState = {
  userlist: [],
  userProfileData: [],
  usersAdminStatus: [],
  influencerStats: [],
  defaultMsg: [],
  influencerList: [],
  datesList: [],
  pagination: {},
  per_page: 10,
  search: "",
  tab: 1,
};
export const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${Utils.ActionName.USER_LIST}`:
      return {
        ...state,
        ...action.payload,
      };
    case `${Utils.ActionName.USER_PROFILE}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.USER_COUNTER}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_INFLUENCER_STATS}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_DEFAULT_MSG}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_INFLUENCER}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_ALL_DATES}`:
        return {
          ...state,
          ...action.payload,
      };
    default:
      return { ...state };
  }
};

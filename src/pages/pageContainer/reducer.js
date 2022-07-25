import Utils from "../../utility";

const initialState = {
  userlist: [],
  userProfileData: [],
  usersAdminStatus: [],
  influencerStats: [],
  defaultMsg: [],
  influencerList: [],
  datesList: [],
  datesCont:[],
  registerCompFemaleList: [],
  registerCompMaleList: [],
  registerUnCompFemaleList:[],
  registerUnCompMaleList: [],
  existEmail: "",
  existCodeMsg: "",
  existCode: "",
  pagination: {},
  per_page: 10,
  search: "",
  current_page: "1",
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
      case `${Utils.ActionName.GET_EXIST_MAIL}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_INFLUENCER_EXIST}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_REGCOMPFEMALE}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_REGCOMPMALE}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_REGUNCOMPFEMALE}`:
        return {
          ...state,
          ...action.payload,
      };
      case `${Utils.ActionName.GET_REGUNCOMPMALE}`:
        return {
          ...state,
          ...action.payload,
      };
    default:
      return { ...state };
  }
};

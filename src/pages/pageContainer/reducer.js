import Utils from "../../utility";

const initialState = {
  userlist: [],
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

    default:
      return { ...state };
  }
};

import React, { useEffect } from "react";
import SideBar from "../sideBar/sidebar.js";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../pageContainer/header";
import { getDefaultMsgList, getUserList, getUserStatusCounter } from "./action.js";
import DataTablePagination from "./DataTablePagination.js";

function PostList(props) {
  const dispatch = useDispatch();
  const { userlist } = useSelector(
    (state) => state.userListReducer
  );

  useEffect(() => {
    dispatch(getUserStatusCounter());
    dispatch(getUserList());
    dispatch(getDefaultMsgList("taglineAndDesc"))
  }, []);

  

  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader />
        <DataTablePagination data={userlist} />
      </div>
    </div>
  );
}

export default PostList;

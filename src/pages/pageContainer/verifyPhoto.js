import React, { useEffect, useState } from "react";
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
  const [endUser, setEndUser] = useState()
  
  let offSet = 1;
  const handleScroll = (e) => {
    e.preventDefault();
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      dispatch(getUserList("", offSet += 1))
      setEndUser("End The Post.")
    }
  }
  useEffect(() => {
    dispatch(getUserList("", offSet));
    window.addEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    dispatch(getUserStatusCounter());
    dispatch(getDefaultMsgList("taglineAndDesc"))
  }, []);

  

  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader title="Verify Photo"/>
        <DataTablePagination data={userlist} />
        <p className="text-danger">{endUser}</p>
      </div>
    </div>
  );
}

export default PostList;

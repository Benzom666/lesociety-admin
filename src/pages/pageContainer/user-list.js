import React, { useEffect, useState, useRef, useCallback } from "react";
import SideBar from "../sideBar/sidebar.js";
import UserTableContent from "./userTable.js";
import {
  getUserList,
  getUserStatusCounter,
  getDefaultMsgList
} from "./action";
import { Nav, Tab, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility/index.js";
import PageHeader from "../pageContainer/header";

function UserList() {
  const dispatch = useDispatch();
  const { userlist, pagination, tab, search, usersAdminStatus } = useSelector(
    (state) => state.userListReducer
  );
  const [endUser, setEndUser] = useState();
  
  let offSet = 1;
  let paginations = pagination;
  const handleScroll = function (e) {
    console.log("offSet <= pagination?.total_pages", offSet , paginations)
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      dispatch(getUserList("", offSet += 1))
      setEndUser("End The UserList.")
    }
  }
  useEffect(() => {
    dispatch(getUserList("", offSet));
    window.addEventListener("scroll", handleScroll, true);
    // setTimeout(() => {
    //   window.addEventListener("scroll", handleScroll);
    //   console.log(paginations);
    // }, 1000)
  },[]);
  useEffect(() => {
    console.log(pagination.current_page >= pagination.total_pages);
    if( pagination.total_pages <= pagination.current_page ) window.removeEventListener("scroll", handleScroll, true);
  }, [pagination])

  useEffect(() => {
    dispatch(getUserStatusCounter());
    dispatch(
      getDefaultMsgList("taglineAndDesc")
    )
  }, []);
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader title="Users list" />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 1, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getUserList());
              }}
            >
              <Nav.Link eventKey="link-1">
                Total Users
                <Badge pill bg="secondary">
                  {usersAdminStatus?.total_users ? usersAdminStatus?.total_users : "0"}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => {
                  dispatch({
                    type: Utils.ActionName.USER_LIST,
                    payload: { tab: 2, search: "", per_page: 10, userlist: [] },
                  });
                  dispatch(getUserList(2));
                }}
              >
                Verified Users
                <Badge pill bg="secondary">
                  {usersAdminStatus?.verified_users ? usersAdminStatus?.verified_users : "0"}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 3, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getUserList(1));
              }}
            >
              <Nav.Link eventKey="link-3">
                Pending Verification
                <Badge pill bg="secondary">
                  {usersAdminStatus?.pending_users ? usersAdminStatus?.pending_users : "0"}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <UserTableContent endUser={endUser}/>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">{<UserTableContent endUser={endUser} />}</Tab.Pane>
            <Tab.Pane eventKey="link-3">{<UserTableContent endUser={endUser} />}</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default UserList;

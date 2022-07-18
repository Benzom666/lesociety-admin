import React, { useEffect } from "react";
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
  useEffect(() => {
    dispatch(getUserStatusCounter());
    dispatch(getUserList());
    dispatch(
      getDefaultMsgList("taglineAndDesc")
    )
  }, []);
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader />
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
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">{<UserTableContent />}</Tab.Pane>
            <Tab.Pane eventKey="link-3">{<UserTableContent />}</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default UserList;

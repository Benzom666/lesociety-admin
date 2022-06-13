import React, { useEffect } from "react";
// import useWindowSize from "/utils/useWindowSize";
import SideBar from "../sideBar/sidebar.js";
import UserTableContent from "./userTable.js";
import { getUserList, getPendingUser, getDeactivateUser } from "./action";
import { Nav, Tab, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility/index.js";

function UserList() {
  const dispatch = useDispatch();
  // const { width } = useWindowSize();
  const { userlist, pagination, tab, search } = useSelector(
    (state) => state.userListReducer
  );
  useEffect(() => {
    // dispatch(getAllDate());
    dispatch(getUserList());
  }, []);

  console.log(tab, "tab");
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI pt-5">
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 1, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getPendingUser());
              }}
            >
              <Nav.Link eventKey="link-1">
                Total Users
                <Badge pill bg="secondary">
                  {pagination?.total_users}
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
                  dispatch(getDeactivateUser());
                }}
              >
                Deactivated Users
                <Badge pill bg="secondary">
                  {pagination?.total_users}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 3, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getPendingUser());
              }}
            >
              <Nav.Link eventKey="link-3">
                Pending Verification
                <Badge pill bg="secondary">
                  {pagination?.total_users}
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

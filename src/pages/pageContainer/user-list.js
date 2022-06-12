import React, { useEffect } from "react";
// import useWindowSize from "/utils/useWindowSize";
import SideBar from "../sideBar/sidebar.js";
import UserTableContent from "./userTable.js";
import { getUserList, getAllDate } from "./action";
import { Nav, Tab, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";

function UserList() {
  const dispatch = useDispatch();
  // const { width } = useWindowSize();
  useEffect(() => {
    // dispatch(getAllDate());
    dispatch(getUserList());
  }, []);
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI pt-5">
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                Total Users
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">
                Deactivated Users
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">
                Pending Verification
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <UserTableContent />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default UserList;

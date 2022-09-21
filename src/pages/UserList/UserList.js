import React, { useEffect, useState, useRef, useCallback } from "react";
import { Nav, Tab, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../sideBar/sidebar.js";
import UserTable from "./UserTable.js";
import {
  getUserList,
  getUserStatusCounter,
  getDefaultMsgList
} from "../pageContainer/action";
import Utils from "../../utility/index.js";
import PageHeader from "../pageContainer/header";
import { NavItemSet, SearchDropdownSet } from "../pageContainer/Component";

function UserList() {
  const dispatch = useDispatch();
  const { pagination, tab, search, usersAdminStatus, loading } = useSelector(
    (state) => state.userListReducer
  );
  const [endUser, setEndUser] = useState("");
  const [page, setPage] = useState(2);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { tab: 1, search: "", per_page: 10, userlist: [] },
    })
    dispatch(getUserList("", 1));
    dispatch(getUserStatusCounter());
    dispatch(
      getDefaultMsgList("taglineAndDesc")
    )
  }, []);
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && pagination.total_pages >= page) {
        dispatch(getUserList(status, page));
        setPage(page+1);
      }
      else {
        setEndUser("End of page");
      }
    });
    if(node) observer.current.observe(node);
  });
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader title="Users list" />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <NavItemSet
              eventKey="link-1"
              dispatch={dispatch}
              status=""
              badge={usersAdminStatus?.total_users }
              setStatus={setStatus}
              title="Total Users"
              setPage={setPage}
              payload={{ tab: 1, search: "", per_page: 10, userlist: [] }}
              getFunc={getUserList}
            />
            <NavItemSet
              eventKey="link-2"
              status={2}
              badge={usersAdminStatus?.verified_users }
              setStatus={setStatus}
              title="Total Users"
              setPage={setPage}
              payload={{ tab: 1, search: "", per_page: 10, userlist: [] }}
              getFunc={getUserList}
            />
            <NavItemSet
              eventKey="link-3"
              status={1}
              badge={usersAdminStatus?.pending_users }
              setStatus={setStatus}
              title="Pending Verification"
              setPage={setPage}
              payload={{ tab: 3, search: "", per_page: 10, userlist: [] }}
              getFunc={getUserList}
            />
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
            {!status ? <UserTable endUser={endUser} lastPostElementRef={lastPostElementRef} status={status}/> : null}
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">{status === 2 ? <UserTable endUser={endUser} lastPostElementRef={lastPostElementRef} status={status} /> : null}</Tab.Pane>
            <Tab.Pane eventKey="link-3">{status === 1 ? <UserTable endUser={endUser} lastPostElementRef={lastPostElementRef} status={status}/> : null}</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      <p className="text-danger">{endUser}</p>
      </div>
    </div>
  );
}

export default UserList;

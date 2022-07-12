import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility/index.js";
import {
  Nav,
  Tab,
  Badge,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import VerifyProfileImages from "./profileImage";
import PageHeader from "../pageContainer/header";
import { getDefaultMsgList, getUserList, getUserStatusCounter, postSendDefaulMsg, postSetRequest, postVerfiyUser } from "./action.js";
import VerifyPhotoCards from "./VerifyPhotoCards.js";
import { DefaultMsg } from "./DefaultMsg";
import DataTablePagination from "./DataTablePagination.js";

function PostList(props) {
  const dispatch = useDispatch();
  const { usersAdminStatus, userlist, defaultMsg } = useSelector(
    (state) => state.userListReducer
  );
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState();
  const [defaultCard, setDefaultCard] = useState(true);
  const [msg, setMsg] = useState();
  const [cardId, setCardId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePic= () => {
    setIsActive(false);
  };

  const msgSubmit = () => {
    dispatch(
      postSendDefaulMsg()
    )
  }
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
        <DataTablePagination data={userlist}/>
      </div>
      <DefaultMsg defaultMsg={defaultMsg[0]?.taglineAndDesc} show= {show} msg={msg} setMsg={setMsg} msgSubmit ={msgSubmit} handleClose={handleClose}/>
    </div>
  );
}

export default PostList;

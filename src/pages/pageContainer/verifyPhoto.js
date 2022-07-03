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

function PostList(props) {
  const dispatch = useDispatch();
  const { usersAdminStatus, userlist, defaultMsg } = useSelector(
    (state) => state.userListReducer
  );
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [userId, setUserId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePic= () => {
    setIsActive(false);
    setUserId(userlist._id)
  };
  const handleInfo = () => {
    setIsActive(true);
    setUserId(userlist._id)
  }
  const onRequest = () => {
    dispatch(
      postSetRequest()
    )
  }
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

  const UserPostList = userlist.map((post) => (
    <Card className={"bg-dark text-white verifyPhotoCard"} key={post.id}>
      <div className="cardActionBox">
        <Form.Check className="checkboxUI" type="checkbox" />
      </div>
      <div className="userProfileDetail">
        {
          isActive === false && <VerifyProfileImages img={post?.images} />
        }
        {
          isActive === true && <Card.Body>
          <Card.Text>
            {post?.description}
          </Card.Text>
          <Card.Title>{post?.tagline}</Card.Title>
        </Card.Body>
        }
        <Card.Title> {post?.user_name} </Card.Title>
        <div className="userInfoLink">
          <Card.Link onClick={handlePic}>picture</Card.Link>
          <Card.Link onClick={handleInfo}>Info</Card.Link>
        </div>
        <div>
          <Button className="requestBtn" onClick={handleShow}>Request</Button>
          {
            post?.status == 2 ? 
            <Button
            className={"verifyBtn verified-user-card"} disabled>verify</Button>
            :
            <Button
              className={"verifyBtn"} onClick = {() =>
              {
                dispatch(postVerfiyUser(post.email))
                dispatch(getUserList())
              }
              }>verify</Button>
          }
        </div>
      </div>
      <Card.Footer>
        Email <span>{post?.email}</span>
      </Card.Footer>
    </Card>
  ));

  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="link-1"
                onClick={() => {
                  dispatch({
                    type: Utils.ActionName.USER_LIST,
                    payload: { tab: 2, search: "", per_page: 10, userlist: [] },
                  });
                  dispatch(getUserList());
                }}
              >
                Total Users
                <Badge pill bg="secondary">
                  {usersAdminStatus?.total_users}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 2, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getUserList(5));
              }}
              >
                New Users
                <Badge pill bg="secondary">
                  {usersAdminStatus?.new_photos}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2"
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
                {usersAdminStatus?.verified_users}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 2, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getUserList(1));
              }}>
                Pending Verification
                <Badge pill bg="secondary">
                {usersAdminStatus?.pending_users}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <VerifyPhotoCards UserPostList={UserPostList} />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <VerifyPhotoCards UserPostList={UserPostList} />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <VerifyPhotoCards UserPostList={UserPostList} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      <DefaultMsg defaultMsg={defaultMsg} show= {show} msg={msg} setMsg={setMsg} msgSubmit ={msgSubmit} handleClose={handleClose}/>
    </div>
  );
}

export default PostList;

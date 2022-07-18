
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
  const [show, setShow] = useState();
  const [defaultCard, setDefaultCard] = useState(true);
  const [msg, setMsg] = useState();
  const [cardId, setCardId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePic= () => {
    setIsActive(false);
  };
  const handleInfo = () => {
    setIsActive(true);
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
    <Card className={"text-white verifyPhotoCard"} key={post.id}>
      <div className="cardActionBox">
        <Form.Check className="checkboxUI" type="checkbox" />
      </div>
      {console.log("cardIdcardIdcardId", cardId)}
      <div className="userProfileDetail">
        { cardId === undefined || cardId != post?._id ? <VerifyProfileImages img={post?.images} /> : ""}
        {
          isActive === false || cardId === post?._id && <VerifyProfileImages img={post?.images} />
        }
        {
          isActive === true || cardId === post?._id && <Card.Body>
          <Card.Text>
            {post?.description}
          </Card.Text>
          <Card.Title>{post?.tagline}</Card.Title>
        </Card.Body>
        }
        <Card.Title> {post?.user_name} </Card.Title>
        <div className="userInfoLink">
          <Card.Link onClick={() => {
            setIsActive(true)
            setCardId(post?._id)
            }}>picture</Card.Link>
          <Card.Link onClick={() => {
            setIsActive(false)
            setCardId(post?._id)
            }}>Info</Card.Link>
            {console.log("is active", isActive)}
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
    <>
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
      <DefaultMsg defaultMsg={defaultMsg[0]?.taglineAndDesc} show= {show} msg={msg} setMsg={setMsg} msgSubmit ={msgSubmit} handleClose={handleClose}/>
    </>
  );
}

export default PostList;

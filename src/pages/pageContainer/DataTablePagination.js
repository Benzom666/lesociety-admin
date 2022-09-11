import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../utility/index.js";
import { Nav, Tab, Badge, Form, Card, Button } from "react-bootstrap";
import VerifyProfileImages from "./profileImage";
import {
  getDefaultMsgList,
  getUserList,
  getUserStatusCounter,
  postSendDefaulMsg,
  postSetRequest,
  postVerfiyUser,
} from "./action.js";
import VerifyPhotoCards from "./VerifyPhotoCards.js";
import { DefaultMsg } from "./DefaultMsg";

function PostList(props) {
  const { setEndUser } = props;
  const dispatch = useDispatch();
  const { usersAdminStatus, userlist, defaultMsg, pagination, loading } = useSelector(
    (state) => state.userListReducer
  );
  const [id, setId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState();
  const [msg, setMsg] = useState();
  const [cardId, setCardId] = useState();
  const [page, setPage] = useState(2);
  const [status, setStatus] = useState(5);
  const handleClose = () => setShow(false);


  const msgSubmit = () => {
    dispatch(postSendDefaulMsg("taglineAndDesc", id, userEmail));
    setShow(false);
  };
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && pagination.total_pages >= page) {
        console.log("visible");
        dispatch(getUserList(status, page));
        setPage(page+1);
      }
      else {
        setEndUser("End of page");
      }
    });
    if(node) observer.current.observe(node);
  });
  const UserPostList = userlist.map((post, index) => {
    return (
      <Card className={"text-white verifyPhotoCard"} key={post.id} ref={userlist.length === index+1 ? lastPostElementRef : null} >
        <div className="cardActionBox">
          <Form.Check className="checkboxUI" type="checkbox" />
        </div>
        {console.log("cardIdcardIdcardId", cardId)}
        <div className="userProfileDetail">
          {cardId === undefined || cardId != post?._id ? (
            <VerifyProfileImages
              img={post?.images}
              un_verified_images={post?.un_verified_images}
              image_verified={post?.image_verified}
            />
          ) : (
            ""
          )}
          {isActive === false ||
            (cardId === post?._id && (
              <VerifyProfileImages
                img={post?.images}
                un_verified_images={post?.un_verified_images}
                image_verified={post?.image_verified}
              />
            ))}
          {isActive === true ||
            (cardId === post?._id && (
              <Card.Body>
                <Card.Text className="y-scroll">
                  {post?.tag_desc_verified === true &&
                  post?.un_verified_description.length > 0
                    ? post?.un_verified_description
                    : post?.description}
                </Card.Text>
                <Card.Title className="y-scroll">
                  {post?.tag_desc_verified === true &&
                  post?.un_verified_tagline.length > 0
                    ? post?.un_verified_tagline
                    : post?.tagline}
                </Card.Title>
              </Card.Body>
            ))}
          <Card.Title> {post?.user_name} </Card.Title>
          <div className="userInfoLink">
            <Card.Link
              onClick={() => {
                setIsActive(true);
                setCardId(post?._id);
              }}
            >
              picture
            </Card.Link>
            <Card.Link
              onClick={() => {
                setIsActive(false);
                setCardId(post?._id);
              }}
            >
              Info
            </Card.Link>
          </div>
          <div>
            {post?.status == 2 ? (
              <Button className={"verifyBtn verified-user-card"} disabled>
                verified
              </Button>
            ) : (
              <>
                <Button
                  className="requestBtn"
                  onClick={() => {
                    setShow(true);
                    setUserEmail(post?.email);
                  }}
                >
                  Request
                </Button>
                <Button
                  className={"verifyBtn"}
                  onClick={() => {
                    dispatch(postVerfiyUser(post.email));
                    dispatch(getUserList());
                  }}
                >
                  verify
                </Button>
              </>
            )}
          </div>
        </div>
        <Card.Footer>
          Email <span>{post?.email}</span>
        </Card.Footer>
      </Card>
    );
  });

  return (
    <>
      <Tab.Container defaultActiveKey="link-2">
        <Nav variant="tabs">
         
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 2, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getUserList(5, 1));
                setStatus(5);
                setPage(2);
              }}
            >
              New Users Pending Verification
              <Badge pill bg="secondary">
                {usersAdminStatus?.new_users}
              </Badge>
            </Nav.Link>
          </Nav.Item>
         
          <Nav.Item>
            <Nav.Link
              eventKey="link-4"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { status: 1, tab: 2, search: "", per_page: 10, userlist: [],  },
                });
                setStatus(1);
                dispatch(getUserList(1, 1));
                setPage(2)
              }}
            >
              All Users Pending Verification
              <Badge pill bg="secondary">
                {usersAdminStatus?.pending_users}
              </Badge>
            </Nav.Link>
          </Nav.Item>
           {/* <Nav.Item>
            <Nav.Link
              eventKey="link-1"
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
          </Nav.Item> */}
           {/* <Nav.Item>
            <Nav.Link
              eventKey="link-3"
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
          </Nav.Item> */}
        </Nav>
        <Tab.Content>
           <Tab.Pane eventKey="link-2">
            <VerifyPhotoCards UserPostList={status === 5 ? UserPostList : []} />
          </Tab.Pane> 
           <Tab.Pane eventKey="link-4">
            <VerifyPhotoCards UserPostList={status === 1 ? UserPostList : []}
            />
          </Tab.Pane> 
          {/* <Tab.Pane eventKey="link-1">
            <VerifyPhotoCards UserPostList={UserPostList} />
          </Tab.Pane> */}
          {/* <Tab.Pane eventKey="link-3">
            <VerifyPhotoCards UserPostList={UserPostList} />
          </Tab.Pane> */}
        </Tab.Content>
      </Tab.Container>
      <DefaultMsg
        setid={setId}
        defaultMsg={defaultMsg[0]?.taglineAndDesc}
        show={show}
        msg={msg}
        setMsg={setMsg}
        msgSubmit={msgSubmit}
        handleClose={handleClose}
      />
    </>
  );
}

export default PostList;

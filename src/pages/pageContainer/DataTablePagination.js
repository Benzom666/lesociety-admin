import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Tab, Form, Card, Button } from "react-bootstrap";
import VerifyProfileImages from "./profileImage";
import { getUserList, postVerfiyUser, postSendDefaulMsg } from "./action.js";
import VerifyPhotoCards from "./VerifyPhotoCards.js";
import { DefaultMsg } from "./DefaultMsg";
import { NavItemSet } from "./Component";

function PostList(props) {
  const { setEndUser } = props;
  const dispatch = useDispatch();
  const { usersAdminStatus, userlist, defaultMsg, pagination, loading } =
    useSelector((state) => state.userListReducer);
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
    dispatch(postSendDefaulMsg("taglineAndDesc", id, userEmail, "6323e3ae8c8a4613fdf79256", status, getUserList));
    setShow(false);
  };
  const observer = useRef();
  const lastPostElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pagination.total_pages >= page) {
        dispatch(getUserList(status, page));
        setPage(page + 1);
      } else {
        setEndUser("End of page");
      }
    });
    if (node) observer.current.observe(node);
  });
  const UserPostList = userlist.map((post, index) => {
    return (
      <Card
        className={"text-white verifyPhotoCard"}
        key={post.id}
        ref={userlist.length === index + 1 ? lastPostElementRef : null}
      >
        <div className="cardActionBox">
          <Form.Check className="checkboxUI" type="checkbox" />
        </div>
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
                    // dispatch(getUserList());
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
          <NavItemSet
            eventKey="link-2"
            status={5}
            badge={usersAdminStatus?.new_users}
            setStatus={setStatus}
            title="New Users Pending Verification"
            setPage={setPage}
            payload={{ tab: 2, search: "", per_page: 10, userlist: [] }}
            getFunc={getUserList}
          />
          <NavItemSet
            eventKey="link-4"
            status={1}
            badge={usersAdminStatus?.pending_users}
            setStatus={setStatus}
            title="All Users Pending Verification"
            setPage={setPage}
            payload={{ tab: 4, search: "", per_page: 10, userlist: [] }}
            getFunc={getUserList}
          />
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="link-2">
            <VerifyPhotoCards
              UserPostList={status === 5 ? UserPostList : []}
              status={status}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="link-4">
            <VerifyPhotoCards
              UserPostList={status === 1 ? UserPostList : []}
              status={status}
            />
          </Tab.Pane>
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

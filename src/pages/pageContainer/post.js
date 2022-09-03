import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  Tab,
  Badge,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Card,
  Toast,
  Button,
} from "react-bootstrap";
import LocationIcon from "../../assets/images/location.svg";
import GetReadyIcon from "../../assets/images/getReady.svg";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import PageHeader from "../pageContainer/header";
import { getDefaultMsgList, postSendDefaulMsg, getAllDates, getDateStats, postUpdateDateStatus } from "./action.js";
import { DefaultMsg } from "./DefaultMsg";
import Utils from "../../utility/index.js";

function PostList(props) {
  const dispatch = useDispatch();
  const { tab, search, per_page, datesList, defaultMsg, datesCont, datesStats } = useSelector(
    (state) => state.userListReducer
  );
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [emailSelected, setEmailSelected] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedUser, setSelectedUser] = useState(false);
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const [isActive, setIsActive] = useState(false);
  const [saveId, setSaveId] = useState();
  const [id, setId] = useState();
  const [endUser, setEndUser] = useState()
  
  let offSet = 1;
  const handleScroll = (e) => {
    e.preventDefault();
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      dispatch(getAllDates("", "", offSet += 1))
      setEndUser("End The Post.")
    }
  }
  useEffect(() => {
    dispatch(getAllDates("", "", offSet));
    window.addEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    dispatch(getDefaultMsgList("postMessage"));
    dispatch(getDateStats())
  }, []);
  const msgSubmit = () => {
    dispatch(postSendDefaulMsg("postMessage", id, emailSelected));
    setShow(false)
  };
 
  const UserPostList = datesList.map((value) => {
    const checkedUser = () =>{
      setSelectedUser(!selectedUser)
      selectedUser == true && setEmailSelected(value?.user_data[0]?.email)
    }
    return(
      <>
      <Card className="bg-dark text-white">
      {value?.user_data.map((userDetail, index) => (
        <Card.Img key={index} src={userDetail?.images[0]} alt="Card image" />
      ))}
      <div className="cardActionBox">
        <Form.Check
          className="checkboxUI"
          type="checkbox"
          value={selectedUser}
          onClick={checkedUser}
        />
        <Card.Link
          className="showDetail"
          onClick={(e) => {
            setIsActive(!isActive);
            setSaveId(value?._id);
          }}
        >
          <MdOutlineRotate90DegreesCcw />
        </Card.Link>
      </div>
      <Card.ImgOverlay>
        <Card.Title>
          {value?.user_name},{" "}
          <span> {value?.user_data.map((userDetail) => userDetail?.age)} </span>
        </Card.Title>
        <div className="mb-3 mt-3 d-flex justify-content-between align-items-end">
          <Card.Subtitle>
            <img src={LocationIcon} />
            {value?.location}, {value?.province}
          </Card.Subtitle>
          <Card.Text>
            ${value?.price} / <span> {value?.date_length} </span>
          </Card.Text>
        </div>
        <Card.Link href="#">
          {" "}
          <img src={GetReadyIcon} />{" "}
          {value?.middle_class_dates ||
            value?.standard_class_date ||
            value?.executive_class_dates}
        </Card.Link>
      </Card.ImgOverlay>
      {saveId === value?._id && (
        <Card.Body
          className={`posterDetails r-spacing ${isActive ? "posterDetailShow" : ""}`}
        >
          <div className="y-scroll post-cont-spacing">
          <h3> {value?.middle_class_dates} </h3>
          <p>{value?.date_details}</p>
          </div>
        </Card.Body>
      )}
    </Card>
    </>
    )
  });

  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader title="Posts" />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="link-1"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 1, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getAllDates());
              }}
              >
                Total Users
                <Badge pill bg="secondary">
                  {datesStats?.total_dates}
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
                dispatch(getAllDates(5));
              }}
              >
                New
                <Badge pill bg="secondary">
                {datesStats?.new_dates}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3"
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.USER_LIST,
                  payload: { tab: 3, search: "", per_page: 10, userlist: [] },
                });
                dispatch(getAllDates(3));
              }}>
                Deactivated
                <Badge pill bg="secondary">
                {datesStats?.deactivated_dates}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <InputGroup className="">
                <Form.Control
                  placeholder="Search"
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { search: e.target.value },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates());
                    }
                  }}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={`${per_page} Per Page`}
                  id="input-group-dropdown-2"
                  align="end"
                  onSelect={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { per_page: e },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates(1));
                    }
                  }}
                >
                  <Dropdown.Item eventKey="10">10</Dropdown.Item>
                  <Dropdown.Item eventKey="20">20</Dropdown.Item>
                  <Dropdown.Item eventKey="25">25</Dropdown.Item>
                  <Dropdown.Item eventKey="50">50</Dropdown.Item>
                  <Dropdown.Item eventKey="100">100</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
              <div className="userPostListBox">
                {UserPostList}
                <p className="text-danger">{endUser}</p>
                </div>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <InputGroup className="">
                <Form.Control
                  placeholder="Search"
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { search: e.target.value },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates());
                    }
                  }}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={`${per_page} Per Page`}
                  id="input-group-dropdown-2"
                  align="end"
                  onSelect={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { per_page: e },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates(1));
                    }
                  }}
                >
                  <Dropdown.Item eventKey="10">10</Dropdown.Item>
                  <Dropdown.Item eventKey="20">20</Dropdown.Item>
                  <Dropdown.Item eventKey="25">25</Dropdown.Item>
                  <Dropdown.Item eventKey="50">50</Dropdown.Item>
                  <Dropdown.Item eventKey="100">100</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
              <div className="userPostListBox">{UserPostList}</div>
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <InputGroup className="">
                <Form.Control
                  placeholder="Search"
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { search: e.target.value },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates());
                    }
                  }}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={`${per_page} Per Page`}
                  id="input-group-dropdown-2"
                  align="end"
                  onSelect={(e) => {
                    dispatch({
                      type: Utils.ActionName.USER_LIST,
                      payload: { per_page: e },
                    });
                    if (tab === 1) {
                      dispatch(getAllDates());
                    } else if (tab === 2) {
                      dispatch(getAllDates());
                    } else {
                      dispatch(getAllDates(1));
                    }
                  }}
                >
                  <Dropdown.Item eventKey="10">10</Dropdown.Item>
                  <Dropdown.Item eventKey="20">20</Dropdown.Item>
                  <Dropdown.Item eventKey="25">25</Dropdown.Item>
                  <Dropdown.Item eventKey="50">50</Dropdown.Item>
                  <Dropdown.Item eventKey="100">100</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
              <div className="userPostListBox">{UserPostList}</div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        {selectedUser && (
          <Toast show={showA} onClose={toggleShowA} className="requestPopup">
            <Toast.Header></Toast.Header>
            <Toast.Body className="d-flex align-items-center w-100">
              <Form.Check type="checkbox" label="people" />
              <Button className="requestBtn" onClick={handleShow}>
                Request
              </Button>
              <Button className="verifyBtn"
              onClick={() => {
                dispatch(postUpdateDateStatus())
              }}
              >Block</Button>
            </Toast.Body>
          </Toast>
        )}
      </div>
      <DefaultMsg
        setid={setId}
        defaultMsg={defaultMsg[0]?.postMessage}
        show={show}
        msg={msg}
        setMsg={setMsg}
        msgSubmit={msgSubmit}
        handleClose={handleClose}
      />
    </div>
  );
}

export default PostList;

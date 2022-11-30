import React, { useState } from "react";
import {
  Form,
  DropdownButton,
  Dropdown,
  Button,
  Toast,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { Link } from "react-router-dom";

import {
  getUserList,
  getUserProfile,
  postSendDefaulMsg,
  postUpdateUserStatus,
} from "../pageContainer/action";
import Utils from "../../utility";
import ProfileImage from "../../assets/images/profleIamge.svg";
import { DefaultMsg } from "../pageContainer/DefaultMsg";
import { SearchDropdownSet } from "../pageContainer/Component";

function UserTable({ lastPostElementRef, endUser, status, noAction = false }) {
  const dispatch = useDispatch();
  const {
    userlist,
    pagination,
    tab,
    search,
    per_page,
    defaultMsg,
    rowSelected,
    emails,
  } = useSelector((state) => state.userListReducer);

  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [msg, setMsg] = useState();
  const [id, setId] = useState();

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const searchHandler = _.debounce((e) => {
    let payload = { search: e.target.value, userlist: [] };
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload,
    });
    dispatch(getUserList(status));
  }, 1500);
  const msgSubmit = () => {
    dispatch(postSendDefaulMsg("taglineAndDesc", 0, rowSelected, "", status, getUserList));
    setShow(false);
    // dispatch((rowSelected = []));
  };
  const checkboxHandler = (e) => {
    let selectedRow = rowSelected;
    if (e.target.checked) {
      selectedRow = [...selectedRow, e.target.value];
    } else {
      selectedRow.splice(selectedRow.indexOf(e.target.value), 1);
      let allCheckId = document.getElementById("all-check");
      allCheckId.checked = false;
    }
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: selectedRow },
    });
  };
  const allCheckboxHandler = (e) => {
    let allEmail = [];
    if (e.target.checked) {
      allEmail = userlist
        .filter((user) => user.email_verified && user.status === 1)
        .map((item) => item.email);
    }
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: allEmail },
    });
  };
  return (
    <div>
      <SearchDropdownSet
        per_page={per_page}
        dispatch={dispatch}
        searchHandler={searchHandler}
        status={status}
        getFunc={getUserList}
        payload={{ userlist: [] }}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              {!noAction && <input
                type="checkbox"
                onChange={(e) => allCheckboxHandler(e)}
                id="all-check"
              />}
            </th>
            <th>User Name</th>
            <th>Gender</th>
            <th>Registered Date</th>
            <th>Email</th>
            <th>Email Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userlist) && userlist.length
            ? userlist.map((user, index) => {
                return (
                  <tr
                    key={user.id}
                    ref={
                      userlist.length === index + 1 ? lastPostElementRef : null
                    }
                  >
                    <td>
                      {user?.email_verified && user.status === 1 && !noAction ? (
                        <input
                          id="user-checkbox"
                          type="checkbox"
                          onChange={checkboxHandler}
                          value={user.email}
                          name="user-checkbox"
                          checked={rowSelected.includes(user.email)}
                        />
                      ) : null}
                    </td>
                    <td>
                      <div className="userNameImage" key={index}>
                        <Link
                          to={"/profile/" + user.user_name}
                          onClick={(e) => {
                            dispatch(getUserProfile(user.user_name));
                          }}
                        >
                          <img
                            src={user.images[0] || ProfileImage}
                            alt="RyanUser"
                            border="0"
                          />{" "}
                          <p> {user.user_name} </p>
                        </Link>
                      </div>
                    </td>
                    <td>{user?.gender}</td>
                    <td>{moment(user?.created_at).format("DD.MM.YYYY")}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.email_verified ? (
                        <p className="greenTxt">Verified </p>
                      ) : (
                        <p className="redTxt">Pending</p>
                      )}
                    </td>
                    <td>
                      {
                        <span className="greenTxt">
                          {user?.email_verified == true && user.status == 1 && (
                            <p className="text-warning">Pending</p>
                          )}
                          {user?.email_verified == true && user.status == 2 && (
                            <p className="greenTxt">Verified</p>
                          )}
                          {user?.email_verified == true && user.status == 3 && (
                            <p className="redTxt">Block</p>
                          )}
                        </span>
                      }
                    </td>
                    <td>
                      {user?.email_verified && user.status == 1 && !noAction ? (
                        <DropdownButton
                          variant="outline-secondary"
                          title={
                            <img
                              src="https://i.ibb.co/jwq9z0R/moreIcon.png"
                              alt="moreIcon"
                              border="0"
                            />
                          }
                          id="input-group-dropdown-2"
                          align="end"
                        >
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() => {
                              dispatch(postUpdateUserStatus(2, user.email, "user-list", status));
                              // dispatch(getUserList());
                            }}
                          >
                            Verify
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="req"
                            onClick={() => {
                              setShow(true);
                              setUserEmail(user?.email);
                              dispatch({
                                type: Utils.ActionName.USER_LIST,
                                payload: {rowSelected: [user?.email]},
                              });
                            }}
                          >
                            Request a Change
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="3"
                            onClick={() => {
                              dispatch(postUpdateUserStatus(3, user.email, 'user-list', status));
                            }}
                          >
                            Block
                          </Dropdown.Item>
                        </DropdownButton>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      {!!rowSelected && rowSelected.length > 0 ? (
        <Toast show={showA} onClose={toggleShowA} className="requestPopup">
          <Toast.Header></Toast.Header>
          <Toast.Body className="d-flex align-items-center w-100">
            <Form.Check type="checkbox" label="people" checked />
            <Button className="requestBtn" onClick={handleShow}>
              Request
            </Button>
            <Button
              className="verifyBtn"
              onClick={() =>
                dispatch(postUpdateUserStatus(2, !!rowSelected && rowSelected))
              }
            >
              Verify
            </Button>
          </Toast.Body>
        </Toast>
      ) : null}
      <DefaultMsg
        setId={setId}
        defaultMsg={defaultMsg[0]?.taglineAndDesc}
        show={show}
        msg={msg}
        setMsg={setMsg}
        msgSubmit={msgSubmit}
        handleClose={handleClose}
      />
    </div>
  );
}

export default UserTable;

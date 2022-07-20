import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
import Utils from "../../utility/index.js";
import { getUserList } from "./action.js";


function VerifyPhotoCards(props) {
    const dispatch = useDispatch();
    const { tab, search, per_page} = useSelector(
      (state) => state.userListReducer
    );
    const {UserPostList} = props
  return (
    <>
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
              dispatch(getUserList());
            } else if (tab === 2) {
              dispatch(getUserList());
            } else {
              dispatch(getUserList());
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
              dispatch(getUserList());
            } else if (tab === 2) {
              dispatch(getUserList());
            }else if (tab === 3) {
              dispatch(getUserList(2));
            } else {
              dispatch(getUserList(1));
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
    </>
  );
}

export default VerifyPhotoCards;

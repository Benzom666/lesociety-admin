import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";

function VerifyPhotoCards(props) {
    const {UserPostList} = props
  return (
    <>
      <InputGroup className="">
        <Form.Control type="text" placeholder="Search" />
        <DropdownButton
          variant="outline-secondary"
          title="Per Page"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="userPostListBox">{UserPostList}</div>
    </>
  );
}

export default VerifyPhotoCards;

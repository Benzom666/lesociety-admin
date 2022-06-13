import React, { useState, useEffect } from "react";
import { Form, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Utils from "../../utility";
import { getUserList, getPendingUser, getDeactivateUser } from "./action";
import paginationFactory from "react-bootstrap-table2-paginator";

const UserTableData = (props) => {
  const dispatch = useDispatch();
  const { userlist, pagination, tab, search, per_page } = useSelector(
    (state) => state.userListReducer
  );
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  // console.log(tab, "tab");
  const products = userlist?.map((item) => {
    return {
      id: item._id,
      name: (
        <div className="userNameImage">
          <img src={item.images[0]} alt="RyanUser" border="0" />{" "}
          {item.user_name}{" "}
        </div>
      ),
      gender: item?.gender,
      registerDate: moment(item?.created_at).format("DD.MM.YYYY"),
      emailId: item?.email,
      statusId: (
        <span className="greenTxt">
          {item.status == 0
            ? "pending"
            : item.status == 1
            ? "Verified"
            : item.status == 2
            ? "Freeze"
            : item.status == 3
            ? "Block"
            : "Delete"}{" "}
        </span>
      ),
      DropDown: (
        <img
          src="https://i.ibb.co/jwq9z0R/moreIcon.png"
          alt="moreIcon"
          border="0"
        />
      ),
    };
  });

  const columns = [
    {
      dataField: "name",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "registerDate",
      text: "Registered Date",
      sort: true,
    },
    {
      dataField: "emailId",
      text: "Email",
      sort: true,
    },
    {
      dataField: "statusId",
      text: "Status",
      sort: true,
    },
    {
      dataField: "DropDown",
      text: "",
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];
  const selectRow1 = (row,isSelect) => {
    debugger;
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: selectRow1,
  };
  console.log(search, "search");
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
              dispatch(getDeactivateUser());
            } else {
              dispatch(getPendingUser());
            }
          }}
        />
        <DropdownButton
          variant="outline-secondary"
          title={`${per_page} Per Page`}
          id="input-group-dropdown-2"
          align="end"
          onSelect={(e) => {
            // e.preventDefault();

            dispatch({
              type: Utils.ActionName.USER_LIST,
              payload: { per_page: e },
            });
            if (tab === 1) {
              dispatch(getUserList());
            } else if (tab === 2) {
              dispatch(getDeactivateUser());
            } else {
              dispatch(getPendingUser());
            }
          }}
        >
          <Dropdown.Item eventKey="5">5</Dropdown.Item>
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="20">20</Dropdown.Item>
          <Dropdown.Item eventKey="25">25</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
          {/* <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
        </DropdownButton>
      </InputGroup>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        pagination={paginationFactory({ totalSize: pagination.total_users })}
      />
    </>
  );
};

export default UserTableData;

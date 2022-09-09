import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
  Toast,
  Spinner,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Utils from "../../utility";
import {
  getUserList,
  getPendingUser,
  getDeactivateUser,
  getUserProfile,
  getDefaultMsgList,
  postSendDefaulMsg,
  postVerfiyUser,
  postUpdateUserStatus,
} from "./action";
import paginationFactory from "react-bootstrap-table2-paginator";
import { DefaultMsg } from "./DefaultMsg";
import ProfileImage from '../../assets/images/profleIamge.svg';

const UserTableData = (props) => {
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
  const [msg, setMsg] = useState();
  const [id, setId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [paginationRerender, setPaginationRerender] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  const msgSubmit = () => {
    dispatch(postSendDefaulMsg("taglineAndDesc", id, rowSelected));
    setShow(false);
    dispatch((rowSelected = {}));
  };
  const products = userlist?.map((item, index) => {
    return {
      id: item?._id,
      name: (
        <div className="userNameImage" key={index}>
          <Link
            to={"/profile/" + item.user_name}
            onClick={(e) => {
              dispatch(getUserProfile(item.user_name));
            }}
          >
            <img src={item.images[0] || ProfileImage} alt="RyanUser" border="0" />{" "}
            <p> {item.user_name} </p>
          </Link>
        </div>
      ),
      gender: item?.gender,
      registerDate: moment(item?.created_at).format("DD.MM.YYYY"),
      emailId: item?.email,
      emailStatus:
        item?.email_verified == true ? (
          <p className="greenTxt">Verified </p>
        ) : (
          <p className="redTxt">Pending</p>
        ),
      statusId: (
        <span className="greenTxt">
          {item?.email_verified == true && item.status == 1 && (
            <p className="text-warning">Pending</p>
          )}
          {item?.email_verified == true && item.status == 2 && (
            <p className="greenTxt">Verified</p>
          )}
          {item?.email_verified == true && item.status == 3 && (
            <p className="redTxt">Block</p>
          )}
        </span>
      ),
      DropDown:
        item?.email_verified && item.status != 2 ? (
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
                dispatch(postUpdateUserStatus(2, item.email));
                dispatch(getUserList());
              }}
            >
              Verify
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="req"
              onClick={() => {
                setShow(true);
                setUserEmail(item?.email);
              }}
            >
              Request a Change
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              onClick={() => {
                dispatch(postUpdateUserStatus(3, item.email));
                dispatch(getUserList());
              }}
            >
              Block
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          ""
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
      sort: false,
    },
    {
      dataField: "emailId",
      text: "Email",
      sort: true,
    },
    {
      dataField: "emailStatus",
      text: "Email Status",
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

  // const selectRow1 = (row, isSelect) => {
  //   console.log("isSelect", isSelect, row?.emailId);
  //   var emails = rowSelected;
  //   console.log("if isSelect--1", rowSelected);
  //   if (isSelect) {
  //     console.log("if isSelect", rowSelected);
  //     emails = !!emails.push(row.emailId);
  //   } else {
  //     console.log("if isSelect--2", rowSelected);
  //     emails = emails.filter((item) => item !== row.emailId);
  //   }
  //   dispatch({
  //     type: Utils.ActionName.USER_LIST,
  //     payload: { rowSelected: emails },
  //   });
  // };
  const selectRow1 = (row, checkType) => {
    let selectedRow = rowSelected;
    if(checkType) {
      selectedRow = [...selectedRow, row.emailId];
    } else {
      selectedRow.splice(selectedRow.indexOf(row.emailId), 1);
    }
    // setEmail([...email, row?.emailId])
    // const email = isSelect.map((item) => item.emailId);
    // let emailSelected = [...rowSelected, row.emailId];
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: selectedRow },
    });
  };

  const handleOnSelectAll = (row, isSelect) => {
    const allEmail = isSelect.map((item) => item.emailId);
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: allEmail },
    });
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: selectRow1,
    onSelectAll: handleOnSelectAll,
  };
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
  };
  // const paginations = paginationFactory({
  //   totalSize: pagination?.total_users,
  //   page: 2,
  //   activePage: 2,
  //   sizePerPage: pagination?.per_page,

  //   onPageChange: function (page, sizePerPage) {
  //     setPaginationRerender(true);
  //     if (paginationRerender) {
  //       setPaginationRerender(false);
  //       dispatch({
  //         type: Utils.ActionName.USER_LIST,
  //         payload: { current_page: page },
  //       });
  //       if (tab === 1) {
  //         dispatch(getUserList());
  //       } else if (tab === 2) {
  //         dispatch(getUserList(2));
  //       } else {
  //         dispatch(getUserList(1));
  //       }
  //     }
  //   },
  // });

  // const customTotal = (from, to, size) => (
  //   <span className="react-bootstrap-table-pagination-total">
  //     Showing { from } to { to } of { size } Results
  //   </span>
  // );
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    hideSizePerPage: true,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    // showTotal: true,
    // paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: pagination?.total_users,
      },
    ],
  };
  return (
    <>
      <InputGroup className="">
        <Form.Control
          placeholder="Search"
          type="text"
          id="search"
          name="search"
          value={search}
          // disabled={}
          onChange={(e) => {
            dispatch({
              type: Utils.ActionName.USER_LIST,
              payload: { search: e.target.value },
            });
            if (tab === 1) {
              dispatch(getUserList());
            } else if (tab === 2) {
              dispatch(getUserList(2));
            } else {
              dispatch(getUserList(1));
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

      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        // ref={userlist.length === index+1 ? props.ref : null}
        // pagination={ paginationFactory(options) }
        // pagination={ paginationFactory() }
      />
      <p className="text-danger">{props?.endUser}</p>
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
};

export default UserTableData;

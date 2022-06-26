import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
  Toast,
  Modal,
  ListGroup,
} from "react-bootstrap";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";


// require("bootstrap/less/bootstrap.less");
// import ReactPaginate from 'react-paginate';

import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Utils from "../../utility";
import { getUserList, getPendingUser, getDeactivateUser } from "./action";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";

const UserTableData = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [paginationRerender, setPaginationRerender] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const { userlist, pagination, tab, search, per_page ,rowSelected} = useSelector(
    (state) => state.userListReducer
  );
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  // console.log(tab, "tab");
  const products = userlist?.map((item) => {
    return {
      id: item?._id,
      name: (
        <div className="userNameImage">
          <Link to="/profile">
          <img src={item.images[0]} alt="RyanUser" border="0" />{" "}
          {item.user_name}{" "}
          </Link>
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
        
        <DropdownButton
          variant="outline-secondary"
          title={<img
            src="https://i.ibb.co/jwq9z0R/moreIcon.png"
            alt="moreIcon"
            border="0"
          />}
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
          <Dropdown.Item eventKey="1">Verify</Dropdown.Item>
          <Dropdown.Item eventKey="req">Request a change</Dropdown.Item>
          <Dropdown.Item eventKey="2">Freeze</Dropdown.Item>
          <Dropdown.Item eventKey="3">Block</Dropdown.Item>
          {/* <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
        </DropdownButton>
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
  const selectRow1 = (row, isSelect) => {
    var emails = rowSelected;

    if(isSelect){
      emails.push(row.emailId)
    }else{
      emails=  emails.filter((item)=>item!==row.emailId)
    }

    
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: emails },
    });
  };
  const handleOnSelectAll = (row, isSelect) => {
    const allEmail = isSelect.map((item)=>item.emailId)

    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { rowSelected: allEmail },
    });
    // dispatch(changeStatue())
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: selectRow1,
    onSelectAll: handleOnSelectAll
  };
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
  };
  const paginations = paginationFactory({
    totalSize: pagination?.total_users,
    page: 2,
    activePage: 2,
    sizePerPage: pagination?.per_page,
    // hideSizePerPage: true,
    // onPageChange: (e) => {
    //   // e.preventDefault();
    //   dispatch({
    //     type: Utils.ActionName.USER_LIST,
    //     payload: { current_page: e },
    //   });
    //   if (tab === 1) {
    //     dispatch(getUserList());
    //   } else if (tab === 2) {
    //     dispatch(getDeactivateUser());
    //   } else {
    //     dispatch(getPendingUser());
    //   }
    // },

    onPageChange: function (page, sizePerPage) {
      setPaginationRerender(true);
      if (paginationRerender) {
        setPaginationRerender(false);
        dispatch({
          type: Utils.ActionName.USER_LIST,
          payload: { current_page: page },
        });
        if (tab === 1) {
          dispatch(getUserList());
        } else if (tab === 2) {
          dispatch(getDeactivateUser());
        } else {
          dispatch(getPendingUser());
        }
      }
    },
  });
  const handlePageClick = (event) => {
    dispatch({
      type: Utils.ActionName.USER_LIST,
      payload: { current_page: event.selected+1 },
    });
    if (tab === 1) {
      dispatch(getUserList());
    } else if (tab === 2) {
      dispatch(getDeactivateUser());
    } else {
      dispatch(getPendingUser());
    }
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset}`
    );
    // setItemOffset(newOffset);
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
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="20">20</Dropdown.Item>
          <Dropdown.Item eventKey="25">25</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
          {/* <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
        </DropdownButton>
      </InputGroup>
      {/* {pagination?.total_users && ( */}
      
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        // pagination={paginations}
      />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagination.total_users/per_page}
        previousLabel=""
        renderOnZeroPageCount={null}
      /> */}
      {/* <PaginationProvider
        pagination={paginationFactory({
          totalSize: pagination?.total_users,
          page: pagination?.current_page,
          sizePerPage: pagination?.per_page,
          hideSizePerPage: true,
          onPageChange: (e) => {
            dispatch({
              type: Utils.ActionName.USER_LIST,
              payload: { current_page: e },
            });
            if (tab === 1) {
              dispatch(getUserList());
            } else if (tab === 2) {
              dispatch(getDeactivateUser());
            } else {
              dispatch(getPendingUser());
            }
          },
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <SizePerPageDropdownStandalone {...paginationProps} />
            <PaginationTotalStandalone {...paginationProps} />
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={products}
              columns={columns}
              defaultSorted={defaultSorted}
              selectRow={selectRow}
              // pagination={paginationFactory(pagination?.total_users?{
              //   totalSize: pagination?.total_users,
              //   page: pagination?.current_page,
              //   sizePerPage: pagination?.per_page,
              //   hideSizePerPage: true,
              //   onPageChange: (e) => {
              //     // e.preventDefault();
              //     dispatch({
              //       type: Utils.ActionName.USER_LIST,
              //       payload: { current_page: e }
              //     });
              //     if (tab === 1) {
              //       dispatch(getUserList());
              //     } else if (tab === 2) {
              //       dispatch(getDeactivateUser());
              //     } else {
              //       dispatch(getPendingUser());
              //     }
              //   },
              // }:{})}
            />
            <PaginationListStandalone {...paginationProps} />
          </div>
        )}
      </PaginationProvider> */}

    
      {/* )} */}
      {/* <Button onClick={toggleShowA} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
      <Toast show={showA} onClose={toggleShowA} className="requestPopup">
        <Toast.Header></Toast.Header>
        <Toast.Body className="d-flex align-items-center w-100">
          {/* {rowSelected.length} */}
          <Form.Check type="checkbox" label="people" checked />
          <Button className="requestBtn" onClick={handleShow}>
            Request
          </Button>
          <Button className="verifyBtn" >verify</Button>
        </Toast.Body>
      </Toast>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="requestModal"
      >
        <Modal.Header closeButton>
          <Modal.Title> Request Task</Modal.Title>
          <p> Select an Option </p>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <Form.Check type="radio" id="radio1" label="Cras justo odio" />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                id="radio2"
                label="Dapibus ac facilisis in"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check type="radio" id="radio3" label="Morbi leo risus" />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check
                type="radio"
                id="radio4"
                label="Porta ac consectetur ac"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check type="radio" id="radio5" label="Vestibulum at eros" />
            </ListGroup.Item>
          </ListGroup>
          <Button className="verifyBtn">verify</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserTableData;
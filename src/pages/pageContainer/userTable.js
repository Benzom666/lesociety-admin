import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
  Toast
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Utils from "../../utility";
import { getUserList, getPendingUser, getDeactivateUser, getUserProfile, getDefaultMsgList, postSendDefaulMsg, postVerfiyUser, postUpdateUserStatus } from "./action";
import paginationFactory from "react-bootstrap-table2-paginator";
import { DefaultMsg } from "./DefaultMsg";

const UserTableData = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [paginationRerender, setPaginationRerender] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const { userlist, pagination, tab, search, per_page, defaultMsg, rowSelected} = useSelector(
    (state) => state.userListReducer
  );
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  const msgSubmit = () => {
    dispatch(
      postSendDefaulMsg()
    )
  }
  const products = userlist?.map((item) => {
    return {
      id: item?._id,
      name: (
        <div className="userNameImage">
          <Link to={"/profile/" + item.user_name}
           onClick={(e) => {
            dispatch(getUserProfile(item.user_name));
          }}
          >
            <img src={item.images[0]} alt="RyanUser" border="0" />{" "}          
            <p> {item.user_name}{" "} </p>
          </Link>
        </div>
      ),
      gender: item?.gender,
      registerDate: moment(item?.created_at).format("DD.MM.YYYY"),
      emailId: item?.email,
      emailStatus: item?.email_verified == true ? <p className="greenTxt">Verified </p> : <p className="redTxt">Pending</p>,
      statusId: (
        <span className="greenTxt">
          {item.status == 1
            ? "pending"
            : item.status == 2
            ? "Verified"
            : item.status == 3
            ? "Block"
            : ""}
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
          // onSelect={(e) => {
          //   dispatch({
          //     type: Utils.ActionName.USER_LIST,
          //     payload: { per_page: e },
          //   });
          //   if (tab === 1) {
          //     dispatch(getUserList());
          //   } else if (tab === 2) {
          //     dispatch(getDeactivateUser());
          //   } else {
          //     dispatch(getPendingUser());
          //   }
          // }}
        >
          <Dropdown.Item eventKey="1" onClick={() => {
             dispatch(postUpdateUserStatus(2, item.email))
             dispatch(getUserList())
          }}>Verify</Dropdown.Item>
          <Dropdown.Item eventKey="req" onClick={handleShow}>Request a Change</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => {
            dispatch(postUpdateUserStatus(3, item.email))
            dispatch(getUserList())
          }}>Block</Dropdown.Item>
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
        </DropdownButton>
      </InputGroup>
      
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        // pagination={paginations}
      />
      <Toast show={showA} onClose={toggleShowA} className="requestPopup">
        <Toast.Header></Toast.Header>
        <Toast.Body className="d-flex align-items-center w-100">
          <Form.Check type="checkbox" label="people" checked />
          <Button className="requestBtn" onClick={handleShow}>
            Request
          </Button>
          <Button className="verifyBtn" >verify</Button>
        </Toast.Body>
      </Toast>
      <DefaultMsg defaultMsg={defaultMsg[0]?.taglineAndDesc} show= {show} msg={msg} setMsg={setMsg} msgSubmit ={msgSubmit} handleClose={handleClose}/>
    </>
  );
};

export default UserTableData;
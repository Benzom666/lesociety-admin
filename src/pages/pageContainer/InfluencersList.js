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
import { getUserList, getPendingUser, getDeactivateUser, getUserProfile, getDefaultMsgList, postSendDefaulMsg, postVerfiyUser, postUpdateUserStatus, influencerUpdateStatus, getInfluencer, deleteInfluencer } from "./action";
import paginationFactory from "react-bootstrap-table2-paginator";
import { DefaultMsg } from "./DefaultMsg";
import FaceBookIcon from "../../assets/images/facebook.svg"
import TicTocIcon from "../../assets/images/ticTok.svg"
import InstagramIcon from "../../assets/images/instagram.svg"


const InfluencersList = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [paginationRerender, setPaginationRerender] = useState(false);
  

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const { influencerList, pagination, tab, search, per_page, defaultMsg, rowSelected} = useSelector(
    (state) => state.userListReducer
  );
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  const products = !!influencerList && influencerList?.map((item, index) => {
    return {
      id: index,
      name: item?.name,
      source: <div className="social-source-icon"> 
      {item?.source == "facebook" && <img src={FaceBookIcon}/> || item?.source == "instagram" && <img src={InstagramIcon}/> || item?.source == "tiktok" && <img src={TicTocIcon}/>}</div>,
      email: item?.email,
      promo: item?.promo + "%",
      code: item?.code,
      count: item?.count,
      status: item?.status === 2 ? "Active" : "Inactive" ,
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
        >
          <Dropdown.Item eventKey="1" onClick={() => {
             dispatch(influencerUpdateStatus(2, item?.email, true))
             dispatch(getInfluencer())
          }}>Active</Dropdown.Item>
          <Dropdown.Item eventKey="req" onClick={() => {
             dispatch(influencerUpdateStatus(3, item?.email, false))
             dispatch(getInfluencer())
          }}>Inactive</Dropdown.Item>
          <Dropdown.Item eventKey="req">Edit</Dropdown.Item>
          <Dropdown.Item eventKey="req" onClick={ async() => {
             await dispatch(deleteInfluencer(item?.email))
             dispatch(getInfluencer())
          }}>Delete</Dropdown.Item>
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
      dataField: "source",
      text: "Source",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
   {
      dataField: "promo",
      text: "Promo %",
      sort: true,
    },
    {
      dataField: "code",
      text: "Code",
      sort: true,
    }, 
    {
      dataField: "count",
      text: "Count",
      sort: true,
    },
    {
        dataField: "status",
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
      type: Utils.ActionName.GET_INFLUENCER,
      payload: { rowSelected: emails },
    });
  };
  const handleOnSelectAll = (row, isSelect) => {
    const allEmail = isSelect.map((item)=>item.emailId)

    dispatch({
      type: Utils.ActionName.GET_INFLUENCER,
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
          type: Utils.ActionName.GET_INFLUENCER,
          payload: { current_page: page },
        });
        if (tab === 1) {
          dispatch(getInfluencer());
        } else if (tab === 2) {
          dispatch(getInfluencer(2));
        } else {
          dispatch(getInfluencer(3));
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
              type: Utils.ActionName.GET_INFLUENCER,
              payload: { search: e.target.value },
            });
            if (tab === 1) {
              dispatch(getInfluencer());
            } else if (tab === 2) {
              dispatch(getInfluencer(2));
            } else {
              dispatch(getInfluencer(3));
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
              type: Utils.ActionName.GET_INFLUENCER,
              payload: { per_page: e },
            });
            if (tab === 1) {
              dispatch(getInfluencer());
            } else if (tab === 2) {
              dispatch(getInfluencer(2));
            } else {
              dispatch(getInfluencer(3));
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
        // pagination={paginations}
      />
      {/* <Toast show={showA} onClose={toggleShowA} className="requestPopup">
        <Toast.Header></Toast.Header>
        <Toast.Body className="d-flex align-items-center w-100">
          <Form.Check type="checkbox" label="people" checked />
          <Button className="requestBtn" onClick={handleShow}>
            Request
          </Button>
          <Button className="verifyBtn" >verify</Button>
        </Toast.Body>
      </Toast>
      <DefaultMsg defaultMsg={defaultMsg} show= {show} msg={msg} setMsg={setMsg} msgSubmit ={msgSubmit} handleClose={handleClose}/> */}
    </>
  );
};

export default InfluencersList;
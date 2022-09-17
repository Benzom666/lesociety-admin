import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Utils from "../../utility";
import {
  influencerUpdateStatus,
  getInfluencer,
  deleteInfluencer,
} from "../pageContainer/action";
import FaceBookIcon from "../../assets/images/facebook.svg";
import TicTocIcon from "../../assets/images/ticTok.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import EditInfluencers from "./EditInfluencers";

const InfluencersTable = ({ lastPostElementRef }) => {
  const dispatch = useDispatch();
  
  const {
    influencerList,
    pagination,
    tab,
    search,
    per_page,
    defaultMsg,
    rowSelected,
  } = useSelector((state) => state.userListReducer);
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);
  

  const handleOnSelectAll = (e) => {
    const allEmail = influencerList.map((item) => item.emailId);

    dispatch({
      type: Utils.ActionName.GET_INFLUENCER,
      payload: { rowSelected: allEmail },
    });
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

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleOnSelectAll(e)}
                id="all-check"
              />
            </th>
            <th>User Name</th>
            <th>Source</th>
            <th>Email</th>
            <th>Promo %</th>
            <th>Code</th>
            <th>Count</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(influencerList) && influencerList.length
            ? influencerList.map((influencer, index) => {
                return (
                  <tr
                    key={influencer.id}
                    ref={
                      influencerList.length === index + 1
                        ? lastPostElementRef
                        : null
                    }
                  >
                    <td>
                      <input
                        id="user-checkbox"
                        type="checkbox"
                        // onChange={checkboxHandler}
                        value={influencer.email}
                        name="user-checkbox"
                        // checked={rowSelected.includes(user.email)}
                      />
                    </td>
                    <td>{influencer?.name}</td>
                    <td>
                      {
                        <div className="social-source-icon">
                          {(influencer?.source == "facebook" && (
                            <img src={FaceBookIcon} alt="facebook" />
                          )) ||
                            (influencer?.source == "instagram" && (
                              <img src={InstagramIcon} alt="instagram" />
                            )) ||
                            (influencer?.source == "tiktok" && (
                              <img src={TicTocIcon} alt="tiktok" />
                            ))}
                        </div>
                      }
                    </td>
                    <td>{influencer?.email}</td>
                    <td>{influencer?.promo + "%"}</td>
                    <td>{influencer?.code}</td>
                    <td>{influencer?.count}</td>
                    <td>{influencer?.status === 2 ? "Active" : "Inactive"}</td>
                    <td>
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
                          onClick={async () => {
                            dispatch(
                              await influencerUpdateStatus(
                                2,
                                influencer?.email,
                                true
                              )
                            );
                            dispatch(getInfluencer());
                          }}
                        >
                          Active
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="req"
                          onClick={() => {
                            dispatch(
                              influencerUpdateStatus(
                                3,
                                influencer?.email,
                                false
                              )
                            );
                            dispatch(getInfluencer());
                          }}
                        >
                          Inactive
                        </Dropdown.Item>
                        <EditInfluencers
                          name={influencer?.name}
                          email={influencer?.email}
                          promo={influencer?.promo}
                          code={influencer?.code}
                          source={influencer?.source}
                        />
                        <Dropdown.Item
                          eventKey="req"
                          onClick={async () => {
                            dispatch(deleteInfluencer(influencer?.email));
                            dispatch(getInfluencer());
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default InfluencersTable;

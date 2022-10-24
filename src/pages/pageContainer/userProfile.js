
import React, { useEffect, useState } from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Card, Dropdown, Button, Row, Col, ListGroup } from "react-bootstrap";
import PageHeader from '../pageContainer/header'
import ProfileImages from './profileImage'
import { useDispatch, useSelector } from "react-redux";
import { TbDots } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { getUserProfile, getDefaultMsgList, postUpdateUserStatus, postSendDefaulMsg } from './action.js';
import { DefaultMsg } from "./DefaultMsg";
import moment from 'moment';

const PageContainer = props => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { userProfileData, defaultMsg } = useSelector(
    (state) => state.userListReducer
  );
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();
  const [id, setId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(
      getUserProfile(username)
    )
    dispatch(getDefaultMsgList("taglineAndDesc"))
  }, [])
  const msgSubmit = () => {
    dispatch(
      postSendDefaulMsg("taglineAndDesc", id, userProfileData?.email)
    )
    setShow(false)
  }
  return (
    <div className='dashboardUi'>
      <SideBar />
      <div className="inner-page userProfile-page">
        <PageHeader title="Users profile" />
        <div className='userProfileDetail'>
          <ProfileImages img={!!userProfileData && userProfileData?.images} />
          <Card body className="userProfileName">
            <Card.Title>{userProfileData?.user_name}</Card.Title>
            <Card.Subtitle className="mb-2 ">{userProfileData?.tagline}</Card.Subtitle>
          </Card>
          {userProfileData?.email_verified ? <div className='userProfilebtn'>
            {
              userProfileData?.status === 2 ?
                <button type="button" disabled class="verifyBtn verified-user-card btn btn-primary">verified</button> :
                <>
                  <Button className="requestBtn" onClick={handleShow}>Request</Button>
                  <Button className="verifyBtn"
                    onClick={() => dispatch(postUpdateUserStatus(2, userProfileData?.email))}
                  >Verifyyy</Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <TbDots />
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item role="button" onClick={() => {
                        dispatch(postUpdateUserStatus(2, userProfileData.email))
                      }}>Verify</Dropdown.Item>
                      <Dropdown.Item role="button" onClick={handleShow}>Request a Change</Dropdown.Item>
                      <Dropdown.Item role="button" onClick={() => {
                        dispatch(postUpdateUserStatus(3, userProfileData.email))
                      }}>Block</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
            }

          </div> : ''}
        </div>
        <Row>
          <Col md="9" sm="8" className='pl-0' >
            <Card body className="profileCardBox">
              <Card.Title> More about {userProfileData?.user_name}</Card.Title>
              <Card.Text>
                {userProfileData?.description}
              </Card.Text>
            </Card>

            <div className="profileCardBox">
              <ListGroup horizontal className='userPersonalDetail'>
                <ListGroup.Item>
                  <h6>{userProfileData?.body_type}</h6>
                  <p> Body Type </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6>{userProfileData?.max_education}</h6>
                  <p> Education Completed </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6> {userProfileData?.height} </h6>
                  <p> Height </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6> {userProfileData?.ethnicity} </h6>
                  <p> Ethnicity </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6> {userProfileData?.ethnicity} </h6>
                  <p> Ethnicity </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6> {userProfileData?.occupation} </h6>
                  <p> Occupation </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6> {userProfileData?.is_smoker} </h6>
                  <p> Smoker </p>
                </ListGroup.Item>

              </ListGroup>
            </div>
          </Col>
          <Col md="3" sm="4" className='pr-0'>
            <div className="profileCardBox py-0">
              <ListGroup variant="flush" className='userOfficalDetails'>
                <ListGroup.Item>
                  <h6>
                    Age
                    <span> {userProfileData?.age} </span>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>
                    Joined
                    <span> {moment(userProfileData?.created_at).format("DD.MM.YYYY")} </span>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>
                    Location
                    <span> {userProfileData?.location} </span>
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>
                    Email
                    <a> {userProfileData?.email} </a>
                  </h6>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>
      <DefaultMsg setid={setId} defaultMsg={defaultMsg[0]?.taglineAndDesc} show={show} msg={msg} setMsg={setMsg} msgSubmit={msgSubmit} handleClose={handleClose} />
    </div>
  )
}
export default PageContainer;
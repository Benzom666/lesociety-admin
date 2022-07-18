import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/sidebar.js";
import { getInfluencer, getInfluencerEmailExists, getInfluencerExistCode, getInfluencerStats, influencerCreate} from "./action";
import {
  Nav,
  Tab,
  Badge,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "./header";
import InfluencersList from "./InfluencersList.js";
import Utils from "../../utility/index.js";

function UserList() {
  const dispatch = useDispatch();
  const { influencerStats, existEmail, existCodeMsg, existCode} = useSelector(
    (state) => state.userListReducer
  );
  console.log("existEmailexistEmail", existEmail)
  useEffect(() => {
    dispatch(getInfluencer());
    dispatch(getInfluencerStats())
  }, []);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [source, setSource] = useState();
  const [code, setCode] = useState();
  const [promo, setPromo] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const createInflu = () => {
    dispatch(influencerCreate(email, name, source, code, promo))
  }
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item
            onClick={() => {
              dispatch({
                type: Utils.ActionName.GET_INFLUENCER,
                payload: { tab: 1, search: "", per_page: 10, influencerList: [] },
              });
              dispatch(getInfluencer());
            }}
            >
              <Nav.Link eventKey="link-1">
                Total
                <Badge pill bg="secondary">
                  {influencerStats?.total}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
            onClick={() => {
              dispatch({
                type: Utils.ActionName.GET_INFLUENCER,
                payload: { tab: 1, search: "", per_page: 10, influencerList: [] },
              });
              dispatch(getInfluencer(2, true));
            }}>
              <Nav.Link eventKey="link-2">
                Active
                <Badge pill bg="secondary">
                {influencerStats?.active}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
            onClick={() => {
              dispatch(getInfluencer(1, false));
              dispatch({
                type: Utils.ActionName.GET_INFLUENCER,
                payload: { tab: 1, search: "", per_page: 10, influencerList: [] },
              });
              
            }}>
              <Nav.Link eventKey="link-3">
                Inactive
                <Badge pill bg="secondary">
                {influencerStats?.inactive}
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Button
              variant="primary"
              onClick={handleShow}
              className="ml-auto createNewBtn"
            >
              Create new
            </Button>
          </Nav>
          <Tab.Content className="influencersContent">
            <Tab.Pane eventKey="link-1">
              <InfluencersList />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <InfluencersList />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <InfluencersList />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
          className="requestModal influencerModal"
        >
          <Modal.Header closeButton>
            <Modal.Title> New Influencer </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form> */}
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} 
                onChange={
                  (e) => {
                  setEmail(e.target.value)
                  dispatch(
                    getInfluencerEmailExists(email)
                  )
                  }
                }
                 placeholder="Enter Email" />
              </Form.Group>
                {!!existEmail && <p>{existEmail}</p>}
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Source</Form.Label>
                <select class="form-control" value={source} onChange={(e) => setSource(e.target.value)} >
                  <option>Enter Source</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">Tik tok</option>
                </select>
                {/* <Form.Control type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Enter Source" /> */}
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Code</Form.Label>
                  <Form.Control type="text" value={code} 
                  onChange={(e) => {
                    setCode(e.target.value)
                    dispatch(
                    getInfluencerExistCode(code))
                    }} placeholder="Enter Code" />
                </Form.Group>
                  {existCodeMsg || existCode}
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Promo %</Form.Label>
                  <Form.Control type="text" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter Promo %" />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                type="submit"
                className="InfluencerSubmitBtn"
                onClick={createInflu}
              >
                Submit
              </Button>
            {/* </Form> */}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default UserList;

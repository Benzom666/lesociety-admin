import React, { useEffect, useState, useRef, useCallback } from "react";
import _ from 'lodash';
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

import SideBar from "../sideBar/sidebar.js";
import {
  getInfluencer,
  getInfluencerEmailExists,
  getInfluencerExistCode,
  getInfluencerStats,
  influencerCreate,
} from "../pageContainer/action";
import PageHeader from "../pageContainer/header";
import InfluencersList from "./InfluencerTable";
import Utils from "../../utility/index.js";

function InfluencerPage() {
  const dispatch = useDispatch();
  const {
    influencerStats,
    existEmail,
    existEmailScuse,
    existCodeMsg,
    existCode,
    loading,
    pagination
  } = useSelector((state) => state.userListReducer);
  const [endUser, setEndUser] = useState();
  
  useEffect(() => {
    dispatch(getInfluencer("", "", 1));
    // window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // dispatch(getInfluencer());
    dispatch(getInfluencerStats());
  }, []);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [source, setSource] = useState();
  const [code, setCode] = useState();
  const [promo, setPromo] = useState();
  const [page, setPage] = useState(2);
  const [status, setStatus] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const clearState = () => {
    setEmail("");
    setName("");
    setSource("Enter Source");
    setCode("");
    setPromo("");
    dispatch({
      type: Utils.ActionName.GET_INFLUENCER_EXIST,
      payload: {
        existCodeMsg: "",
      },
    });
    dispatch({
      type: Utils.ActionName.GET_INFLUENCER_EXIST,
      payload: {
        existCode: "",
      },
    });
    dispatch({
      type: Utils.ActionName.GET_EXIST_MAIL,
      payload: {
        existEmailScuse: "",
      },
    });
    dispatch({
      type: Utils.ActionName.GET_EXIST_MAIL,
      payload: {
        existEmail: "",
      },
    });
  };
  const createInflu = () => {
    dispatch(influencerCreate(email, name, source, code, promo));
    setShow(false);
    clearState();
  };
  const emailChangeHandler = _.debounce(async (e) => {
    setEmail(e.target.value);
    dispatch(getInfluencerEmailExists(e.target.value));
  }, 2000);
  
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && pagination.total_pages >= page) {
        dispatch(getInfluencer(status, page));
        setPage(page+1);
      }
      else {
        setEndUser("End of page");
      }
    });
    if(node) observer.current.observe(node);
  });
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <PageHeader title="Promo codes" />
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item
              onClick={() => {
                dispatch({
                  type: Utils.ActionName.GET_INFLUENCER,
                  payload: {
                    tab: 1,
                    search: "",
                    per_page: 10,
                    influencerList: [],
                  },
                });
                dispatch(getInfluencer());
                setStatus("");
                setPage(2);
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
                  payload: {
                    tab: 1,
                    search: "",
                    per_page: 10,
                    influencerList: [],
                  },
                });
                dispatch(getInfluencer(2, true));
                setStatus(2);
                setPage(2);
              }}
            >
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
                  payload: {
                    tab: 1,
                    search: "",
                    per_page: 10,
                    influencerList: [],
                  },
                });
                setStatus(1);
                setPage(2);
              }}
            >
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
              {!status ? <InfluencersList lastPostElementRef={lastPostElementRef}/>: null}
              <p className="text-danger">{endUser}</p>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
            {status === 2 ? <InfluencersList lastPostElementRef={lastPostElementRef} /> : null}
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
            {status === 1 ?<InfluencersList lastPostElementRef={lastPostElementRef} />: null}
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
              <Form.Control
                type="email"
                value={email}
                onChange={emailChangeHandler}
                placeholder="Enter Email"
              />
            </Form.Group>
            {existEmailScuse.length > 0 ? (
              <p className="text-success">{existEmailScuse}</p>
            ) : (
              <p className="text-danger">{existEmail}</p>
            )}
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Source</Form.Label>
              <select
                class="form-control"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
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
                <Form.Control
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    dispatch(getInfluencerExistCode(code));
                  }}
                  placeholder="Enter Code"
                />
              </Form.Group>
              {existCodeMsg && <p className="text-success">{existCodeMsg}</p>}
              {existCode && <p className="text-danger">{existCode}</p>}
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Promo %</Form.Label>
                <Form.Control
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Enter Promo %"
                />
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

export default InfluencerPage;

import React, { useEffect, useState } from "react";
// import useWindowSize from "/utils/useWindowSize";
import SideBar from "../sideBar/sidebar.js";
import UserTableContent from "./userTable.js";
import { getUserList, getAllDate } from "./action";
import { Nav, Tab, Badge, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import PageHeader from './header'

function UserList() {
  const dispatch = useDispatch();
  // const { width } = useWindowSize();
  useEffect(() => {
    // dispatch(getAllDate());
    dispatch(getUserList());
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
      <PageHeader/>
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                 Total
                <Badge pill bg="secondary">
                38
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">
                 Active
                <Badge pill bg="secondary">
                20
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">
                 Inactive
                <Badge pill bg="secondary">
                38
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Button variant="primary" onClick={handleShow} className="ml-auto createNewBtn">Create new</Button>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <UserTableContent />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <Modal 
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show} 
          onHide={handleClose} 
          className="requestModal influencerModal" >
          <Modal.Header closeButton>
            <Modal.Title> New Influencer </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>   

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>         

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Source</Form.Label>
                <Form.Control type="text" placeholder="Enter Source" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter Code" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Promo %</Form.Label>
                  <Form.Control type="text" placeholder="Enter Promo %" />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit" className="InfluencerSubmitBtn">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
}

export default UserList;

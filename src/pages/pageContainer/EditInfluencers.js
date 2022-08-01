import React, { useState, useEffect } from 'react'
import {
    Form,
    InputGroup,
    DropdownButton,
    Dropdown,
    Button,
    Modal,
    Row,
    Col,
  } from "react-bootstrap";

const EditInfluencers = (props) => {
    const {name, email, promo, code, source} = props
    const [showPop, setShowPop] = useState(false);
    const handleShow = () => setShowPop(true);
    const popupClosed = () => {setShowPop(false)};
  return (
    <><Dropdown.Item eventKey="req" onClick={handleShow}>
        Edit </Dropdown.Item>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showPop}
                onHide={popupClosed}
                className="requestModal influencerModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title> Edit Influencer </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <Form> */}
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      // onChange={
                      //   (e) => {
                      //   setEmail(e.target.value)
                      //   dispatch(
                      //     getInfluencerEmailExists(email)
                      //   )
                      //   }
                      // }
                      placeholder="Enter Email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      // onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Source</Form.Label>
                    <select
                      class="form-control"
                      value=""
                      // onChange={(e) => setSource(e.target.value)}
                    >
                      <option>{source}</option>
                      {/* {item?.source == "facebook" && <option value="facebook">Facebook</option>}
                  {item?.source == "instagram" && <option value="instagram">Instagram</option>}
                  {item?.source == "tiktok" && <option value="tiktok">Tik tok</option>} */}
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">Tik tok</option>
                    </select>
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={code}
                        // onChange={(e) => {
                        //   setCode(e.target.value)
                        //   dispatch(
                        //   getInfluencerExistCode(code))
                        //   }}
                        placeholder="Enter Code"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Promo %</Form.Label>
                      <Form.Control
                        type="text"
                        value={promo}
                        // onChange={(e) => setPromo(e.target.value)}
                        placeholder="Enter Promo %"
                      />
                    </Form.Group>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    className="InfluencerSubmitBtn"
                    onClick={popupClosed}
                  >
                    Submit
                  </Button>
                  {/* </Form> */}
                </Modal.Body>
              </Modal>
    </>
  )
}
export default EditInfluencers;
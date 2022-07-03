import React from 'react'
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

export const DefaultMsg = (props) => {
    const {defaultMsg, msg, setMsg, show, handleClose, msgSubmit} = props
  return (
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
            {!!defaultMsg && defaultMsg[0]?.taglineAndDesc.map((value) => {
              return(
                <ListGroup.Item>
              <Form.Check type="radio" id="radio1" value={msg} onChange={(e) => setMsg(e.currentTarget.value)} label={value} />
            </ListGroup.Item>
              )
            })}
          </ListGroup>
          <Button className="verifyBtn" onClick={msgSubmit}>Submit</Button>
        </Modal.Body>
      </Modal>
  )
}

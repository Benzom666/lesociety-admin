import React from 'react'
import {
  Form,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";

export const DefaultMsg = (props) => {
    const {defaultMsg, setid, setMsg, show, handleClose, msgSubmit} = props
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
            {!!defaultMsg && defaultMsg.map((value, index) => {
              return(
                <ListGroup.Item key={index}>
              <Form.Check type="radio" id={index} name="requestmsg" value={value} 
              onChange={(e) => {
                setMsg(e.target.value)
                setid(index)
              }} label={value} />
            </ListGroup.Item>
              )
            })}
          </ListGroup>
          <Button className="verifyBtn" onClick={msgSubmit}>Submit</Button>
        </Modal.Body>
      </Modal>
  )
}

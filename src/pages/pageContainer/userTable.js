import React, { useState, useEffect } from 'react';
import { Form, InputGroup, DropdownButton, Dropdown, Button, Toast, Modal, ListGroup  } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const UserTableData = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const products = [
    {id: 1, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Ryan Johnston </div> , gender: 'Male', registerDate:'26.07.2021', emailId: 'Oran.Olson94@hotmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/>  },
    {id: 2, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Anna Adams </div> , gender: 'Female', registerDate:'23.07.2021', emailId: 'Gerda27@yahoo.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 3, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Sharon McClure </div> , gender: 'Female', registerDate:'21.07.2021', emailId: 'Nicolette56@gmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 4, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Ryan Johnston </div> , gender: 'Male', registerDate:'26.07.2021', emailId: 'Oran.Olson94@hotmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 5, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Anna Adams </div> , gender: 'Female', registerDate:'23.07.2021', emailId: 'Gerda27@yahoo.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 6, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Sharon McClure </div> , gender: 'Female', registerDate:'21.07.2021', emailId: 'Nicolette56@gmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 7, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Ryan Johnston </div> , gender: 'Male', registerDate:'26.07.2021', emailId: 'Oran.Olson94@hotmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 8, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Anna Adams </div> , gender: 'Female', registerDate:'23.07.2021', emailId: 'Gerda27@yahoo.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
    {id: 9, name: <div className='userNameImage'> <img src="https://i.ibb.co/JvCy0kr/RyanUser.png" alt="RyanUser" border="0"/>  Sharon McClure </div> , gender: 'Female', registerDate:'21.07.2021', emailId: 'Nicolette56@gmail.com', statusId: <span className='greenTxt'> Verified </span>, DropDown: <img src="https://i.ibb.co/jwq9z0R/moreIcon.png" alt="moreIcon" border="0"/> },
  ];
  const columns = [{
    dataField: 'name',
    text: 'User Name',
    sort: true
  },{
    dataField: 'gender',
    text: 'Gender',
    sort: true
  },{
    dataField: 'registerDate',
    text: 'Registered Date',
    sort: true
  },{
    dataField: 'emailId',
    text: 'Email',
    sort: true
  },{
    dataField: 'statusId',
    text: 'Status',
    sort: true
  },{
    dataField: 'DropDown',
    text: '',
  }];
  
  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };

	return (
		<>      
      <InputGroup className="">
        <Form.Control type="text" placeholder='Search'/>

        <DropdownButton
          variant="outline-secondary"
          title="Per Page"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={ products }
        columns={ columns }
        defaultSorted={ defaultSorted } 
        selectRow={ selectRow }
      />
       {/* <Button onClick={toggleShowA} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
        <Toast show={showA} onClose={toggleShowA} className="requestPopup">
          <Toast.Header>
          </Toast.Header>
          <Toast.Body className='d-flex align-items-center w-100'>
            <Form.Check 
              type='checkbox'
              label='people'
              checked
            />
            <Button className='requestBtn'  onClick={handleShow}>Request</Button>
            <Button className='verifyBtn' >verify</Button>
          </Toast.Body>
        </Toast>
        <Modal show={show} onHide={handleClose} 
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            className='requestModal'>
            <Modal.Header closeButton>           
              <Modal.Title> Request Task</Modal.Title>
              <p> Select an Option </p>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check 
                    type='radio'
                    id='radio1'
                    label="Cras justo odio"
                  /> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check 
                    type='radio'
                    id='radio2'
                    label="Dapibus ac facilisis in"
                  /> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check 
                    type='radio'
                    id='radio3'
                    label="Morbi leo risus"
                  /> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check 
                    type='radio'
                    id='radio4'
                    label="Porta ac consectetur ac"
                  /> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check 
                    type='radio'
                    id='radio5'
                    label="Vestibulum at eros"
                  /> 
                </ListGroup.Item>
              </ListGroup>
              <Button className='verifyBtn' >verify</Button>
            </Modal.Body>          
        </Modal>
		</>
	)
}

export default UserTableData;
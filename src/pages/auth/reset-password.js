import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ResetPassword = props => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/login`; 
      navigate(path);
    }
    
  return (
    <div className='LoginUI restPswdUI'>
      <Form className='authUI'>
        <h2>Password Recovery</h2>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="user@gmail.com" />
          <Form.Text className="text-center mt-4 px-5">
            Please check your email and follow the link to recover your password.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className='loginBtn' onClick={routeChange} >
            BACK
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword;

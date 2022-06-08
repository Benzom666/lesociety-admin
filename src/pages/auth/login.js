import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate, useHistory  } from "react-router-dom";

const LoginPage = props => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/reset-Password`; 
    navigate(path);
  }

  return (
    <div className='LoginUI'>
      <Form className='authUI'>
        <h2>Let's sign you in.</h2>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            <a onClick={routeChange} > Forgot Password ? </a>
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className='loginBtn' >
        LOG IN
        </Button>
      </Form>
    </div>
  )
}

export default LoginPage;

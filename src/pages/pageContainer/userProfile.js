
import React from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Card, Dropdown, Button, Row, Col, ListGroup} from "react-bootstrap";
import PageHeader from '../pageContainer/header'
import ProfileImages from './profileImage'
import { TbDots } from "react-icons/tb";

const PageContainer = props => {
  return (
    <div className="inner-page userProfile-page">
      <PageHeader/>
        <div className='dashboardUi'>
            <SideBar />
            <div className='userProfileDetail'>
              <ProfileImages/>
              <Card body className="userProfileName">
                <Card.Title>Ryan Johnston</Card.Title>
                <Card.Subtitle className="mb-2 ">Let’s keep it simple!</Card.Subtitle>               
              </Card>
              <div className='userProfilebtn'>
                  <Button className="requestBtn">Request</Button>
                  <Button className="verifyBtn">Verify</Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <TbDots/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
            </div>
            <Row>
              <Col  md="9" sm="8" className='pl-0' >
                <Card body  className="profileCardBox">
                  <Card.Title> More about Ryan</Card.Title>
                  <Card.Text>
                    Business owner and part-time student looking for someone to enjoy my free time with. Love to travel and I’m always down to try something new.
                    Travel lover, enjoy exploring new people and new things. I have visited more than 50 countires, would like to meet an interesting girl to travel together  
                  </Card.Text>   
                </Card>

                <div className="profileCardBox">
                  <ListGroup horizontal className='userPersonalDetail'>
                    <ListGroup.Item>
                      <h6>Curvy</h6>
                      <p> Body Type </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <h6>University</h6>
                      <p> Education Completed </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <h6> 5’7 </h6>
                      <p> Height </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <h6> Mixed </h6>
                      <p> Ethnicity </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h6> Mixed </h6>
                      <p> Ethnicity </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <h6> Finance </h6>
                      <p> Occupation </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h6> No </h6>
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
                          Birthday
                          <span> 10/12/86 </span>
                        </h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>
                        Joined
                          <span> 22/07/21 </span>
                        </h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>
                        Location
                          <span> Toronto </span>
                        </h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>
                        Email
                          <a> Trey86@gmail.com </a>
                        </h6>
                      </ListGroup.Item>
                    </ListGroup>
                </div>
              </Col>
            </Row>
        </div>
    </div>
  )
}
export default PageContainer;

import React from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Card, Dropdown, Button} from "react-bootstrap";
import PageHeader from '../pageContainer/header'
import ProfileImages from './profileImage'


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
              <>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
            </div>
        </div>
    </div>
  )
}
export default PageContainer;
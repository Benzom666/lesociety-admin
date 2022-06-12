import React from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Nav, Tab, Badge ,Form, InputGroup, DropdownButton, Dropdown, Card  } from 'react-bootstrap';
import LocationIcon from "../../assets/images/location.svg"
import AdventureIcon from "../../assets/images/Adventure.svg"
import GetReadyIcon from "../../assets/images/getReady.svg"

function PostList(props){
  // const { width } = useWindowSize();
    // const UserPostList = props.Card;
    
    const numbers = [1, 2, 3, 4, 5];
    const UserPostList = numbers.map((number) =>
      
         <Card className="bg-dark text-white">
            <Card.Img src="https://i.ibb.co/84y2bZv/Bitmap-3.png" alt="Card image" />
            <div className='cardActionBox'>
              <Form.Check 
                className='checkboxUI'
                type="checkbox"
              />
            </div>
            <Card.ImgOverlay>
              <Card.Title>Anna, <span> 21 </span></Card.Title>
              <div className='mb-3 mt-3 d-flex justify-content-between align-items-end'>
                <Card.Subtitle >
                  <img src={LocationIcon} />
                  Toronto, ON</Card.Subtitle>
                <Card.Text>
                    $80 / <span> 2hr </span>
                </Card.Text>
              </div> 
              <Card.Link href="#"> <img src={GetReadyIcon}/> Get sporty</Card.Link>
              <Card.Link href="#"> <img src={AdventureIcon}/>  Adventure</Card.Link>
            </Card.ImgOverlay>
          </Card>  
    );

  return (
    <div className="dashboardUi">
      <SideBar/>
      <div className="inner-page userListUI pt-5">
        <Tab.Container defaultActiveKey="link-1" >
          <Nav variant="tabs" >
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                Total Users 
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">
              New 
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">
              Deactivated 
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <InputGroup className="">
                <Form.Control  placeholder='Search'/>

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
              <div className='userPostListBox'>               
                {UserPostList}
              </div>

            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
                {/* <UserTableContent/> */}
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
                {/* <UserTableContent/> */}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  )
}

export default PostList;
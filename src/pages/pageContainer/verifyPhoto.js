import React, {useState} from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Nav, Tab, Badge ,Form, InputGroup, DropdownButton, Dropdown, Card, ProfileImages, Button } from 'react-bootstrap';
import { TbDots } from "react-icons/tb";
import VerifyProfileImages from './profileImage'


function PostList(props){
  // const { width } = useWindowSize();
    // const UserPostList = props.Card;

    const [isActive, setIsActive] = useState("false");
    const handleToggle = () => {
      setIsActive(current => !current);  };
  
       
  const posts = [
    {id: 1,},
    {id: 2,}
  ];

      // const UserPostList = props.posts.map((post) =>
    const UserPostList = posts.map((post) =>      
      <Card className="bg-dark text-white verifyPhotoCard" key={post.id}>
          <div className='cardActionBox' >
            <Form.Check 
              className='checkboxUI'
              type="checkbox"
            />
          </div>
        <div className='userProfileDetail'>
          <VerifyProfileImages/>
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Card.Title>Special title treatment</Card.Title>
          </Card.Body>
          <Card.Title> Ryan Johnston  </Card.Title>
          <div className='userInfoLink'>
            <Card.Link href="#">picture</Card.Link>
            <Card.Link href="#">Info</Card.Link>
          </div>
          <div>
            <Button className='requestBtn'>Request</Button>
            <Button className='verifyBtn'>verify</Button>
          </div>
        </div>
        <Card.Footer>
          Email <span>Olson94@hotmail.com</span>
        </Card.Footer>
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
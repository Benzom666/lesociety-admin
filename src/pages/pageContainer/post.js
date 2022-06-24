import React, {useState} from 'react';
import SideBar from "../sideBar/sidebar.js";
import { Nav, Tab, Badge ,Form, InputGroup, DropdownButton, Dropdown, Card  } from 'react-bootstrap';
import LocationIcon from "../../assets/images/location.svg"
import AdventureIcon from "../../assets/images/Adventure.svg"
import GetReadyIcon from "../../assets/images/getReady.svg"
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import PageHeader from '../pageContainer/header'

function PostList(props){
  // const { width } = useWindowSize();
    // const UserPostList = props.Card;

    const [isActive, setIsActive] = useState("false");
    const handleToggle = () => {
      setIsActive(current => !current);  };
       
    
    const numbers = [1, 2, 3, 4, 5];
    const UserPostList = numbers.map((number) =>
      
         <Card className="bg-dark text-white">
            <Card.Img src="https://i.ibb.co/84y2bZv/Bitmap-3.png" alt="Card image" />
            <div className='cardActionBox' >
              <Form.Check 
                className='checkboxUI'
                type="checkbox"
              />
            <Card.Link className='showDetail'  onClick={handleToggle}  >
              <MdOutlineRotate90DegreesCcw />
            </Card.Link>
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
            <Card.Body className={`posterDetails ${isActive ? 'posterDetailShow' : ''}`} >
              <h3> Date Details </h3>
              <p> Let’s do something fun, I’m not picky so be adventurous. Must be day time activity only. I am usually starting my shift at 5 so we have to be done by 3 pm latest. Ciao! </p>
            </Card.Body>
          </Card>  
    );

  return (
    <div className="dashboardUi">
      <SideBar/>
      <div className="inner-page userListUI">
      <PageHeader/>
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
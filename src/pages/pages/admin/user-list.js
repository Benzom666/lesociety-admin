// import Createdates from 'modules/date/Createdates';
// import HeaderLoggedIn from '@/core/loggedInHeader';
// import Footer from 'core/footer'
// import useWindowSize from "/utils/useWindowSize";
// import withAuth from "../../core/withAuth";
import SideBar from "../../sideBar/sidebar.js";
import UserTableContent from "../userTable/userTable";
import { Nav, Tab, Badge } from "react-bootstrap";

function userList() {
  // const { width } = useWindowSize();
  return (
    <div className="dashboardUi">
      <SideBar />
      <div className="inner-page userListUI">
        <Tab.Container defaultActiveKey="link-1">
          <Nav variant="tabs">
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
                Deactivated Users
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">
                Pending Verification
                <Badge pill bg="secondary">
                  3,876
                </Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="link-1">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
              <UserTableContent />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
              <UserTableContent />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default userList;

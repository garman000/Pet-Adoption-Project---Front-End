import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
//   const { activeUser, handleShowLogin, handleLogout, showLogin } = useAuth();

  return (
    <Container>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink}>
                My Pets Adoption
              </Nav.Link>
              <>
                <Nav.Link to="/homepage" as={NavLink}>
                  Home |
                </Nav.Link>
                <Nav.Link to="/mypets" as={NavLink}>
                  My Pets |
                </Nav.Link>
                <Nav.Link to="/search" as={NavLink}>
                  Find Your Pet
                </Nav.Link>
              </>
              
            </Nav>
          </Navbar.Brand>
          <Navbar.Brand>
            <>
              {" "}
              <NavDropdown
                title="My Profile"
                id="basic-nav-dropdown"
                className="outline-dark"
              >
                <NavDropdown.Item to="/userprofile" as={NavLink}>
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item to="/mypets" as={NavLink}>
                  My Pets Page
                </NavDropdown.Item>
                <NavDropdown.Item to="/search" as={NavLink}>
                  Find Your Pet
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="/" as={NavLink} /*onClick={handleLogout}*/>
                  Sign Out
                </NavDropdown.Item>

                <NavDropdown.Item to="/admin" as={NavLink}>
                  Admin
                </NavDropdown.Item>
              </NavDropdown>
            </>

            <>
              {" "}
              <Nav.Link
                to="/homepage"
                as={NavLink}
                onClick={[]}
                showLogin={[]}
              >
                Login
              </Nav.Link>
            </>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavBar;

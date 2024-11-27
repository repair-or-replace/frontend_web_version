import { NavLink, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";
import { FaUser } from 'react-icons/fa'; // Importing the profile icon
import "./styles.css"; 

function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("user"); 
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <Navbar className="navbar" bg="success" expand="md">
      <Container fluid>
      <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Add margin-end to the Profile link */}
          <Nav.Link
            as={NavLink}
            to="/profile"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link") + " me-3"} // Bootstrap margin-end class
          >
            <FaUser /> {/* Profile icon */}
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/properties"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Properties
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/appliances"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Appliances
          </Nav.Link>
        </Nav>
        
        <Button className="navbar-button" onClick={handleLogOut}>
          Log Out
        </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";
import { FaUser } from "react-icons/fa"; // User icon
import "./styles.css"; // Ensure your custom styles are properly loaded

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.user.authToken);

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar
      expand="md"
      className="navbar"
      style={{ backgroundColor: "#84b474" }}
      variant="light"
    >
      <Container>
        {/* Navigation Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Profile link with user icon */}
            {authToken && (
              <Nav.Link as={NavLink} to="/profile" className="d-flex align-items-center">
                <FaUser className="me-2" size={20} />
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {authToken && (
              <Nav.Link as={NavLink} to="/properties">
                Properties
              </Nav.Link>
            )}
          </Nav>
          {/* Authentication Buttons */}
          {authToken ? (
            <Button
              onClick={handleLogOut}
              className="btn btn-danger"
              style={{ marginLeft: "1rem" }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
              style={{ marginLeft: "1rem" }}
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;


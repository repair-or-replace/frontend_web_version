import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";

function NavigationBar() {
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
    <Navbar expand="md" className="navbar" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/properties">
              Properties
            </Nav.Link>
            {authToken && (
              <Nav.Link as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            )}
            {authToken && (
              <Nav.Link as={NavLink} to="/appliances">
                Appliances
              </Nav.Link>
            )}
          </Nav>
          {authToken ? (
            <Button onClick={handleLogOut} className="btn btn-danger">
              Log Out
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} className="btn btn-primary">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

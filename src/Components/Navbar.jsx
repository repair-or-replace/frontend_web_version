import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userSlice";

function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 获取 Redux 状态
  const authToken = useSelector((state) => state.user.authToken);

  const handleLogOut = () => {
    // 清除 Redux 和 localStorage 状态
    dispatch(logOut());
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    // 跳转到首页
    navigate("/");
  };

  return (
    <Navbar expand="md" className="navbar">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/properties">
            Properties
          </Nav.Link>
        </Nav>
        {authToken ? (
          <Button onClick={handleLogOut} className="btn btn-danger">
            Log Out
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")} // 确保点击时跳转到登录页
            className="btn btn-primary"
          >
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

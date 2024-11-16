import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';

function NavigationBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem("user");
        dispatch(logOut())
        navigate("/");
    }

    return (
        <Navbar bg="primary" expand="md">
            <Navbar.Brand as= {Link} to="/homepage">Welcome to E-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    
                    <Nav.Link as= {NavLink} to="/profile" activeclassname="active">
                    Profile
                    </Nav.Link>

                    <Nav.Link as= {NavLink} to="/properties" activeclassname="active">
                    Properties
                    </Nav.Link>
                    
                </Nav>

                <Button variant='mx-3' onClick={handleLogOut}>Log Out</Button>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;
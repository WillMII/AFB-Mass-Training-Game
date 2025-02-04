import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../imgs/SoftwareDirectorateShield.png';

const Hdr = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand to={"/"} as={NavLink}>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Warner Robins Training
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to={"/"} as={NavLink}>Home</Nav.Link>
                        <Nav.Link to={"/Admin"} as={NavLink}>Admin</Nav.Link>
                    </Nav>
                    <Nav className='justify-content-end'>
                        <Navbar.Text>
                            Signed in as: <a href="#login">Trainee Name</a>
                        </Navbar.Text>
                        <Nav.Link to={"/login"} as={NavLink}>Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Hdr;
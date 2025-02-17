import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../imgs/402_SWEG_Shield.png';

const Hdr = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand to={"/"} as={NavLink} className='text-primary fw-medium'>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Mass Training
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr></hr>
                    <Nav className="me-auto">
                        <Nav.Link to={"/"} as={NavLink}>Home</Nav.Link>
                        <Nav.Link to={"/Admin"} as={NavLink}>Training Reports</Nav.Link>
                    </Nav>
                    <Nav className='justify-content-end no-wrap'>
                        <div className='flex-wrap d-flex'>
                            <Navbar.Text>Signed in as: </Navbar.Text>
                            <Nav.Link to={"/"} as={NavLink} className="ps-1"> Trainee Name</Nav.Link>
                        </div>
                        <Nav.Link to={"/login"} as={NavLink} className="text-primary fw-medium">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Hdr;
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../imgs/402_SWEG_Shield.png";

const Hdr = () => {
    const [userName, setUserName] = useState("My Name");

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        axios.get(`${apiUrl}/api/user`, { withCredentials: true })
            .then(response => {
                const { firstName, lastName } = response.data;
                setUserName(`${firstName} ${lastName}`);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand to={"/"} as={NavLink} className="text-primary fw-medium">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Mass Training
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr />
                    <Nav className="me-auto">
                        <Nav.Link to={"/"} as={NavLink}>Home</Nav.Link>
                        <Nav.Link to={"/user-progress"} as={NavLink}>User Progress</Nav.Link>
                        <Nav.Link to={"/user-management"} as={NavLink}>User Management</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end no-wrap">
                        <div className="flex-wrap d-flex">
                            <Nav.Link to={"/user-profile"} as={NavLink} className="ps-1">
                                <i className="bi bi-person-fill"></i> {userName}
                            </Nav.Link>
                        </div>
                        <Nav.Link to={"/login"} as={NavLink} className="text-primary fw-medium">
                            Sign Out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Hdr;

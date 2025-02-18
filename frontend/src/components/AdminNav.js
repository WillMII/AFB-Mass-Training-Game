import React from 'react'
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';

const AdminNav = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className="justify-content-between">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search Users" aria-label="Search" />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </form>
                <Nav className="justify-content-end">
                    <Nav.Link to={"/Admin"} as={NavLink}>
                        Print Report <i class="bi bi-file-earmark-arrow-down"></i>
                    </Nav.Link>
                    <Nav.Link to={"/Admin"} as={NavLink} onClick={handleShow}>
                        Filters<i class="bi bi-funnel"></i> 
                    </Nav.Link>
                </Nav>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AdminNav

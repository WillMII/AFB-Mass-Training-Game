import React from 'react'
import SearchBar from './SearchBar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

const AdminNav = () => {
    return (
        <Navbar className="justify-content-between">
            <SearchBar />
            <Nav className="me-auto">
                <Nav.Link to={"/Admin"} as={NavLink}>Filter</Nav.Link>
                <Nav.Link to={"/Admin"} as={NavLink}>View Report</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default AdminNav

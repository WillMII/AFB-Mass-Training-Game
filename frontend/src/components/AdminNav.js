import React from 'react'
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import FilterMenu from './FilterMenu';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminNav = ({ report }) => {

    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleCloseFilterMenu = () => setShowFilterMenu(false);
    const handleShowFilterMenu = () => setShowFilterMenu(true);

    const applyFilters = (filters) => {
        console.log("Applied Filters:", filters);
        // Implement filter logic
    };

    return (
        <>
            <Navbar className="justify-content-between">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search Users" aria-label="Search" />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </form>
                <Nav className="justify-content-end">
                    {report ? (
                        <Button variant="link" className="nav-link">
                            Print Report <i className="bi bi-file-earmark-arrow-down"></i>
                        </Button>
                    ) : null}
                    <Button variant="link" className="nav-link" onClick={handleShowFilterMenu}>
                        Filters <i className="bi bi-funnel"></i>
                    </Button>
                </Nav>
            </Navbar>

            <FilterMenu show={showFilterMenu} handleClose={handleCloseFilterMenu} applyFilters={applyFilters} />
        </>
    )
}

export default AdminNav

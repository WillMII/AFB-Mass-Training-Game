import React from 'react'
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import { Navbar } from 'react-bootstrap'
import FilterMenu from './FilterMenu';
import Button from 'react-bootstrap/Button';

const AdminNav = ({ report, setFilters, filter_mods, filter_manager }) => {

    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCloseFilterMenu = () => setShowFilterMenu(false);
    const handleShowFilterMenu = () => setShowFilterMenu(true);
    const applyFilters = (filters) => {
        setFilters(filters);  
        const count = Object.keys(filters).filter(val => val !== "").length;
        setFilterCount(count);
    };
    const applySearch = () => setFilters(prev => ({ ...prev, search: searchTerm }));
    const resetFilters = () => {
        setFilters({});
        setFilterCount(0);
    };

    useEffect(() => {
        applySearch();
    }, [searchTerm]);

    const downloadPDF = () => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        window.open(`${apiUrl}/api/download-report`, "_blank");
    };

    return (
        <>
            <Navbar className="justify-content-between">
                <form className="d-flex" role="search"
                    onSubmit={(e) => {
                        e.preventDefault();
                        applySearch();
                    }}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search Users"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </form>
                <Nav className="justify-content-end">
                    {report ? (
                        <Button onClick={downloadPDF} variant="link" className="nav-link">
                            Print Report <i className="bi bi-file-earmark-arrow-down"></i>
                        </Button>
                    ) : null}
                    <Button variant="link" className="nav-link" onClick={handleShowFilterMenu}>
                        Filters <i className="bi bi-funnel"></i>
                        {filterCount > 0 &&
                                <span
                                className="badge bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  fontWeight: "normal",
                                  fontSize: "0.8rem",
                                  marginLeft: "5px",
                                }}
                              >
                                {filterCount}
                              </span>
                        }
                    </Button>
                </Nav>
            </Navbar>

            <FilterMenu
                show={showFilterMenu}
                handleClose={handleCloseFilterMenu}
                applyFilters={applyFilters}
                filterCount={filterCount}
                resetFilters={resetFilters}
                filter_mods={filter_mods}
                filter_manager={filter_manager}
            />
        </>
    )
}

export default AdminNav

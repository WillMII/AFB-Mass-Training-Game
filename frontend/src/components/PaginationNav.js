import React from 'react'
import { useState } from 'react';
import { Navbar, Pagination } from 'react-bootstrap';

const PaginationNav = ({ users, totalPages, setCurrentPage, currentPage, setUsersPerPage, usersPerPage }) => {

    const renderPagination = () => {
        const items = [];
        items.push(
            <Pagination.First
                key="first"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
            />
        );
        items.push(
            <Pagination.Prev
                key="prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            />
        );

        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        items.push(
            <Pagination.Next
                key="next"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            />
        );
        items.push(
            <Pagination.Last
                key="last"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
            />
        );
        return <Pagination>{items}</Pagination>;
    };

    return (
        <Navbar className="d-flex justify-content-between align-items-center">
            <div>
                {users.length > usersPerPage && renderPagination()}
            </div>
            <div className="d-flex align-items-center gap-2">
                <label htmlFor="usersPerPage" className="mb-0">Rows per page:</label>
                <select
                    id="usersPerPage"
                    className="form-select form-select-sm"
                    style={{ width: "auto" }}
                    value={usersPerPage}
                    onChange={(e) => {
                        setCurrentPage(1); // Reset to page 1 on change
                        setUsersPerPage(Number(e.target.value));
                    }}
                >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </Navbar>
    )
}

export default PaginationNav

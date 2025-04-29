import React from 'react'
import { Navbar, Pagination } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const PaginationNav = ({ users, totalPages, setCurrentPage, currentPage, setUsersPerPage, usersPerPage }) => {

    const renderPagination = () => {
        const items = [];
      
        items.push(
          <Pagination.First
            key="first"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          />,
          <Pagination.Prev
            key="prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          />
        );
      
        if (totalPages <= 7) {
          for (let number = 1; number <= totalPages; number++) {
            items.push(
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Pagination.Item>
            );
          }
        } else {
          if (currentPage <= 3) {
            for (let number = 1; number <= 5; number++) {
              items.push(
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              );
            }
            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
              <Pagination.Item
                key={totalPages}
                active={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Pagination.Item>
            );
          } else if (currentPage >= totalPages - 2) {
            items.push(
              <Pagination.Item
                key={1}
                active={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                1
              </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            for (let number = totalPages - 4; number <= totalPages; number++) {
              items.push(
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              );
            }
          } else {
            // currentPage in the middle
            items.push(
              <Pagination.Item
                key={1}
                active={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                1
              </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            for (let number = currentPage - 1; number <= currentPage + 1; number++) {
              items.push(
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              );
            }
            items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
              <Pagination.Item
                key={totalPages}
                active={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Pagination.Item>
            );
          }
        }
      
        items.push(
          <Pagination.Next
            key="next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          />,
          <Pagination.Last
            key="last"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          />
        );
      
        return <Pagination>{items}</Pagination>;
      };
      
      
    return (
        <Navbar className="d-flex justify-content-between align-items-start">
            <div>
                {users.length > usersPerPage && renderPagination()}
            </div>
            <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0">Rows per page:</Form.Label>
                <Form.Select
                    id="usersPerPage"
                    className="form-select form-select-sm"
                    style={{ width: "auto" }}
                    value={usersPerPage}
                    onChange={(e) => {
                        setCurrentPage(1); // Reset to page 1 on change
                        setUsersPerPage(Number(e.target.value));
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </Form.Select>
            </div>
        </Navbar>
    )
}

export default PaginationNav

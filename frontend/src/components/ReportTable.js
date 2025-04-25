import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import PaginationNav from "./PaginationNav";

const ReportTable = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(20);

  useEffect(() => {
    const queryParams = new URLSearchParams(filters).toString();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    console.log("Query Params:", queryParams)
    fetch(`${apiUrl}/api/user-progress?${queryParams}`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user progress:", error));
  }, [filters]);

  const getStatusIcon = (progress) => {
    if (progress === 100) return <i className="bi bi-check-circle text-success"></i>;
    if (progress === 0) return <i className="bi bi-x-circle text-danger"></i>;
    return <i className="bi bi-clock text-warning"></i>;
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="my-4">
      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Squadron</th>
            <th>Flight</th>
            <th>STINFO - Status</th>
            <th>Records Management - Status</th>
            <th>No FEAR Act - Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.squadron}</td>
              <td>{user.flight}</td>
              <td>{getStatusIcon(user.module1)} {user.module1}%</td>
              <td>{getStatusIcon(user.module2)} {user.module2}%</td>
              <td>{getStatusIcon(user.module3)} {user.module3}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationNav 
        users={users} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
        setUsersPerPage={setUsersPerPage}
        usersPerPage={usersPerPage}
      />

    </div>
  );
};

export default ReportTable;

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/user-list")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleToggleManager = (user) => {
    setTempUser(user);
    setShowConfirmModal(true);
  };

  const confirmToggleManager = () => {
    if (!tempUser) return;

    fetch("http://localhost:8000/api/update-manager-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: tempUser.id,
        newStatus: !tempUser.manager,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update manager status");
        // Update the local state
        const updatedUsers = users.map((u) =>
          u.id === tempUser.id ? { ...u, manager: !u.manager } : u
        );
        setUsers(updatedUsers);
        setShowConfirmModal(false);
      })
      .catch((err) => {
        console.error("Error updating manager status:", err);
        setShowConfirmModal(false);
      });
  };

  return (
    <div className="my-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Squadron</th>
            <th>Flight</th>
            <th>Manager Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.squadron}</td>
              <td>{user.flight}</td>
              <td>
              <Form.Check 
                type="switch"
                id={`manager-switch-${user.id}`}
                label=""
                checked={user.manager}
                onChange={() => handleToggleManager(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {tempUser?.manager ? "remove" : "make"}{" "}
          <strong>{tempUser?.first_name} {tempUser?.last_name}</strong> a training manager?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmToggleManager}>
            Yes, Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;

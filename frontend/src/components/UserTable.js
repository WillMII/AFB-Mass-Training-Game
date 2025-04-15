import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';

const UserTable = ({ filters }) => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(filters).toString();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    console.log("Query Params:", queryParams)
    fetch(`${apiUrl}/api/user-list?${queryParams}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [filters]);

  const handleToggleManager = (user) => {
    setTempUser(user);
    setShowConfirmModal(true);
  };

  const handleDeleteAccount = (user) => {
    setTempUser(user);
    setShowDeleteModal(true);
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

  const confirmDeleteAccount = async () => {
    if (!tempUser) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
      await axios.delete(`${apiUrl}/api/users/delete`, { 
        withCredentials: true,
        data: { userId: tempUser.id },
      });
      alert("Account deleted successfully.");
      setUsers((prev) => prev.filter((u) => u.id !== tempUser.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="my-4">
      <Table striped hover responsive className="align-middle">
        <thead>
          <tr>
            <th ></th>
            <th >First Name</th>
            <th >Last Name</th>
            <th >Squadron</th>
            <th >Flight</th>
            <th >Manager Status</th>
            <th >Delete User</th>
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
                // label=""
                checked={user.manager}
                className="my-0 py-0"
                onChange={() => handleToggleManager(user)}
                />
              </td>
              <td>
                <Button variant="link" className="text-danger px-0" onClick={() => handleDeleteAccount(user)}>
                  Delete User
                </Button>
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the account for <strong>{tempUser?.first_name} {tempUser?.last_name}</strong>? This action is permanent and cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default UserTable;
